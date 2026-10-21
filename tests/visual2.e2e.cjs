/* End-to-end test for the newer visual types (integration, science sorting, pH, energy, place value, percentages,
   thermometer, journeys, formulae, coordinates, sharing wholes): each is driven by mouse, drag or keyboard, and
   axe finds no violations on desktop or mobile. Run: node tests/visual2.e2e.cjs */
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=5';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 6).join('\n      ')) } }
const desc = p => p.textContent('#vbox .vis-desc');
const open = (p, id) => p.evaluate(id => select(id), id);
async function expectDesc(p, re) { await p.waitForFunction(r => new RegExp(r).test(document.querySelector('#vbox .vis-desc').textContent), re.source, { timeout: 4000 }).catch(() => {}); assert.match(await desc(p), re) }
const btn = (p, name) => p.click(`#vbox .vis-ctl button:text-is("${name}")`);
async function setRange(p, label, v) { await p.evaluate(([l, v]) => { const r = [...document.querySelectorAll('#vbox .vis-range')].find(x => x.textContent.trim().startsWith(l)).querySelector('input'); r.value = v; r.dispatchEvent(new Event('input')) }, [label, v]) }
async function keys(p, sel, ...ks) { await p.focus(sel); for (const k of ks) await p.keyboard.press(k) }
async function axe(p, label) {
  if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
  const r = await p.evaluate(() => axe.run(document.getElementById('vbox'), { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] }));
  const v = r.violations.map(x => `${x.id} (${x.nodes.length}): ${x.nodes[0].target.join(' ')}`); assert.deepStrictEqual(v, [], `${label}: ` + v.join('; '));
}
const L = { riemann: 'mt_XW5d2G7v01', family: 'mt_gbnMvpN_Lj', definite: 'mt_P-VlHqNpca', ftc: 'mt_ckLHNZCBUi', velocity: 'mt_g7J4GJuLrf', sorter: 'mt_1hgck6ucII',
  phscale: 'mt_AN2kJE6I0s', energy: 'mt_UoqUPI_uNz', placevalue: 'mt_EDgw64OmfA', percent: 'mt_iEXqN48w3x', thermo: 'mt_RVK655t391', journey: 'mt_OUv-QXmW7_',
  formula: 'mt_mGBtwKr7Wl', coords: 'mt_oDlduFnemk', wholes: 'mt_4Km38F4L-6',
  expo: 'mt_93GREOFJAe', ladder: 'mt_mq4eGlJDk9', root: 'mt_OcSj7J9q1t', roots: 'mt_iHEB0g_nCc', grid: 'mt_Vn2yQGKnvi',
  symbols: 'mt_8RmpkDxT9L', sealed: 'mt_ehC1wsdmUz', sealedGas: 'mt_dzgK92gM32', sealedCount: 'mt_t20A6RuTJn', circuit: 'mt_Ge4Wtg6QMM', light: 'mt_MVovx37Xct', polyterms: 'mt_yYs2sYPwjl', vlt: 'mt_x68PoRveI0', tiles: 'mt_zt4q9lu5va', vectors: 'mt_hdlI0Sacpa' };

(async () => {
  const browser = await chromium.launch();
  const p = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage(); const errors = [];
  p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()) });
  await p.goto(URL);await p.waitForFunction("window.WN_WARM");
  L.formula = await p.evaluate(() => Object.keys(LEARN.L).find(id => LEARN.L[id].visual.type === 'formula' && LEARN.L[id].visual.opts.pic));
  await test('Riemann sums: more strips and trapezia close in on the exact area', async () => {
    await open(p, L.riemann); await expectDesc(p, /4 rectangles .* too small/); await setRange(p, 'Strips n', 40); await btn(p, 'Trapezia');
    await expectDesc(p, /40 trapezia .* ≈ 2\.668\. The exact area is 2\.667, so the estimate is 0\.001 too big/); assert.strictEqual(await p.getAttribute('#vbox button:text-is("Trapezia")', 'aria-pressed'), 'true');
  });
  await test('antiderivative family: sliding C onto the point fixes C', async () => { await open(p, L.family); await expectDesc(p, /misses the point/); await setRange(p, 'Constant C', 3); await expectDesc(p, /passes through \(1, 4\), so C = 3/) });
  await test('definite integral: keyboard limits change the signed area', async () => {
    await open(p, L.definite); await expectDesc(p, /is 1\.5/); await keys(p, '#vbox [aria-label="Upper limit"]', 'ArrowRight', 'ArrowRight'); await expectDesc(p, /x = 4 is 0:/);
  });
  await test('fundamental theorem: the area graph gradient equals the height', async () => { await open(p, L.ftc); await keys(p, '#vbox [role=slider]', 'End'); await expectDesc(p, /x = 4 is A\(x\) = 8.*gradient .* is 3, the same as the height f\(4\) = 3/) });
  await test('velocity: displacement and distance differ once the graph dips below zero', async () => { await open(p, L.velocity); await expectDesc(p, /Displacement = 8 − 2 = 6 m; total distance travelled = 10 m/) });
  await test('sorter: tap-and-place, drag-and-drop, then check', async () => {
    await open(p, L.sorter); await p.click('#vbox .vis-card:text-is("Ice melting")'); await p.click('#vbox [aria-label="Put the chosen card in Physical change"]');
    const card = await p.locator('#vbox .vis-card:text-is("Wood burning")').boundingBox(), bin = await p.locator('#vbox .vis-bin >> nth=1').boundingBox();
    await p.mouse.move(card.x + 10, card.y + 10); await p.mouse.down(); await p.mouse.move(bin.x + bin.width / 2, bin.y + 30, { steps: 8 }); await p.mouse.up();
    await expectDesc(p, /2 of 8 cards sorted/); await btn(p, 'Check'); await expectDesc(p, /2 of 8 in the right box/);
  });
  await test('pH scale: adding alkali and arrow keys move the pH', async () => { await open(p, L.phscale); await btn(p, 'Add alkali'); await expectDesc(p, /pH 4: acidic/); await keys(p, '#vbox [role=slider]', 'ArrowRight', 'ArrowRight', 'ArrowRight'); await expectDesc(p, /pH 7: neutral.*green/) });
  await test('energy profile: endothermic lowers the temperature', async () => { await open(p, L.energy); await btn(p, 'Endothermic example'); await expectDesc(p, /Endothermic: .* temperature falls/); await keys(p, '#vbox [role=slider]', 'Home'); await expectDesc(p, /Exothermic: .* 80 kJ less/) });
  await test('place value: × 10 and ÷ 10 slide the digits', async () => { await open(p, L.placevalue); await btn(p, '× 10'); await expectDesc(p, /^47: 4 tens, 7 ones\. × 10/); await btn(p, '÷ 10'); await btn(p, '÷ 10'); await expectDesc(p, /^0\.47: 4 tenths, 7 hundredths/) });
  await test('percentage change: the multiplier updates', async () => { await open(p, L.percent); await setRange(p, 'Change %', -25); await expectDesc(p, /Decrease by 25%.*multiply by 0\.75\. 80 × 0\.75 = 60/) });
  await test('thermometer: warming across zero', async () => { await open(p, L.thermo); await btn(p, 'Warmer by 5'); await btn(p, 'Warmer by 5'); await expectDesc(p, /reads 5 °C/); await keys(p, '#vbox [role=slider]', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown'); await expectDesc(p, /reads −3 °C.*fall of 11 degrees: 8 to zero, then 3 more/) });
  await test('journey: stopped and returning sections are named', async () => { await open(p, L.journey); await keys(p, '#vbox [role=slider]', ...Array(12).fill('ArrowRight')); await expectDesc(p, /At 12 min .* 1 km .* flat, so they are stopped/); await keys(p, '#vbox [role=slider]', 'End'); await expectDesc(p, /head back home/) });
  await test('formula: sliders substitute and the picture follows', async () => { await open(p, L.formula); await setRange(p, 'l', 7); await expectDesc(p, /l = 7, w = 3.*P = 20 cm/); assert.match(await p.textContent('#vbox .vis-steps'), /2 × \(7 \+ 3\)/) });
  await test('coordinates: arrow keys reach the target', async () => { await open(p, L.coords); await keys(p, '#vbox [role=slider]', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp'); await expectDesc(p, /\(3, 5\).*You found \(3, 5\)/) });
  await test('sharing wholes: share out gives a/b each', async () => { await open(p, L.wholes); await btn(p, 'Share out'); await expectDesc(p, /3 ÷ 4 = 3\/4/) });
  await test('exponent laws: add, subtract, multiply the powers', async () => { await open(p, L.expo); await expectDesc(p, /3 \+ 2 = 5/); await btn(p, 'Divide'); await expectDesc(p, /3 − 2 = 1/); await btn(p, 'Power of a power'); await expectDesc(p, /3 × 2 = 6/) });
  await test('power ladder: stepping below zero gives fractions', async () => { await open(p, L.ladder); for (let i = 0; i < 5; i++) await btn(p, 'Power down (÷ 2)'); await expectDesc(p, /2⁻² = 1 ÷ 2² = 1\/4 = 0\.25/) });
  await test('fractional power: root then power', async () => { await open(p, L.root); await setRange(p, 'Power m', 2); await expectDesc(p, /power 2\/3 take 2 of those factors: 4/) });
  await test('x² = p: two, one or no solutions', async () => { await open(p, L.roots); await expectDesc(p, /−3 and 3\. Two answers/); await keys(p, '#vbox [role=slider]', ...Array(9).fill('ArrowDown')); await expectDesc(p, /Only x = 0/); await keys(p, '#vbox [role=slider]', 'ArrowDown'); await expectDesc(p, /no real answer/) });
  await test('polynomial grid: products collect into like terms', async () => { await open(p, L.grid); assert.match(await p.textContent('#vbox .vis-line.cur'), /= x³ − 1$/); await setRange(p, 'Number in first bracket', 2); assert.match(await p.textContent('#vbox .vis-line.cur'), /= x³ \+ 3x² \+ 3x \+ 2$/) });
  await test('symbols: + and − act on the counters and = reads as the same', async () => { await open(p, L.symbols); await expectDesc(p, /7 − 2 = 5 reads “seven take away two is the same as five”/); await btn(p, '+ add'); await expectDesc(p, /7 \+ 2 = 9 reads “seven add two/) });
  await test('sealed flask: reacting keeps the mass; atoms are tallied', async () => { await open(p, L.sealed); await expectDesc(p, /scale reads 176 g/); await btn(p, 'React'); await expectDesc(p, /After: 2 iron sulfide.*Before 176 g, after 176 g/);
    await open(p, L.sealedCount); assert.match(await p.textContent('#vbox .vis-tally'), /H\s*2\s*2/) });
  await test('open flask: oxygen comes in from the air, so the reading rises', async () => { await open(p, L.sealedGas); await btn(p, 'Open the flask'); await expectDesc(p, /reads 48 g before and 80 g after/); await btn(p, 'React'); await expectDesc(p, /scale reads 80 g/) });
  await test('circuit tester: conductors light the bulb', async () => { await open(p, L.circuit); await p.click('#vbox .vis-card:text-is("Copper wire")'); await expectDesc(p, /bulb lights.*conductor/); await p.click('#vbox .vis-card:text-is("Rubber band")'); await expectDesc(p, /stays off.*insulator/) });
  await test('light test: transparent, translucent, opaque', async () => { await open(p, L.light); await p.click('#vbox .vis-card:text-is("Frosted glass")'); await expectDesc(p, /40% .* translucent/); await p.click('#vbox .vis-card:text-is("Cardboard")'); await expectDesc(p, /0% .* opaque/) });
  await test('vertical line test: a circle fails, a line passes', async () => { await open(p, L.vlt); await expectDesc(p, /once.*IS a function/); await btn(p, 'circle x² + y² = 9'); await expectDesc(p, /2 times.*NOT a function/); await keys(p, '#vbox [role=slider]', 'End'); await expectDesc(p, /nowhere/) });
  await test('polynomial terms: standard form, degree and names update', async () => { await open(p, L.polyterms); await expectDesc(p, /3 terms, so it is a trinomial.*degree is 2/); await btn(p, 'Standard form'); await expectDesc(p, /^−3x² \+ 2x \+ 5 .*It is in standard form/); await btn(p, 'Remove term'); await expectDesc(p, /binomial/) });
  await test('algebra tiles: subtract flips, combine cancels zero pairs', async () => { await open(p, L.tiles); await btn(p, 'Combine'); await expectDesc(p, /Result: 3x² \+ 4x − 5/); await btn(p, 'Add'); await btn(p, 'Combine'); await expectDesc(p, /Result: 7x² − 2x − 3/) });
  await test('vectors: distance adds, displacement does not; walking back gives 0', async () => { await open(p, L.vectors); await expectDesc(p, /just add: 7 m.*5 m, bearing 037°/); await keys(p, '#vbox [aria-label^="Second walk"]', 'ArrowUp'); await expectDesc(p, /Walk 2 \(green\): 5 m/); await btn(p, 'Walk back to the start'); await expectDesc(p, /start to finish is 0 m/) });
  await test('axe: no violations in the newer visuals', async () => { for (const [t, id] of Object.entries(L)) { await open(p, id); await axe(p, t) } });
  await test('no console errors or visual failures', async () => assert.deepStrictEqual(errors, []));
  const m = await (await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage(); await m.goto(URL);await m.waitForFunction("window.WN_WARM");
  await test('mobile: newer visuals fit the screen and pass axe', async () => {
    for (const [t, id] of Object.entries(L)) { await open(m, id); assert.ok(!(await m.evaluate(() => document.documentElement.scrollWidth > innerWidth)), 'overflow on ' + t) }
    await open(m, L.sorter); await axe(m, 'mobile sorter');
  });
  await browser.close(); console.log(failures ? `${failures} failed` : 'all newer-visual e2e tests passed'); process.exit(failures ? 1 : 0);
})();
