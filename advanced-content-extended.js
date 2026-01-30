/**
 * Advanced Content Extended Module
 * Hardware Engineer Knowledge Base
 * Additional deep technical content with complete derivations
 */

(function() {
    'use strict';

    /**
     * 初级篇扩展 - MOSFET与数字电路
     */
    const basicExtendedContent = {
        // MOSFET深度解析
        mosfetDeep: {
            title: 'MOSFET原理与应用详解',
            difficulty: '入门进阶',
            readTime: '50分钟',
            sections: [
                {
                    heading: '1. MOSFET物理结构与工作原理',
                    content: `
                        <div class="content-block">
                            <h5>N沟道增强型MOSFET结构</h5>

                            <div class="structure-explanation">
                                <p><strong>四个端子：</strong></p>
                                <ul>
                                    <li><strong>栅极 (Gate)：</strong>控制端，通过电场调控沟道</li>
                                    <li><strong>源极 (Source)：</strong>载流子的源头</li>
                                    <li><strong>漏极 (Drain)：</strong>载流子的漏出端</li>
                                    <li><strong>衬底 (Body/Substrate)：</strong>通常与源极连接</li>
                                </ul>

                                <div class="info-card">
                                    <h6>MOS电容器原理</h6>
                                    <p>MOSFET的核心是MOS电容结构：Metal-Oxide-Semiconductor</p>
                                    <ol>
                                        <li><strong>积累：</strong>V<sub>GS</sub> < 0，多数载流子积累在界面</li>
                                        <li><strong>耗尽：</strong>V<sub>GS</sub> 略大于0，多数载流子被排斥</li>
                                        <li><strong>反型：</strong>V<sub>GS</sub> > V<sub>TH</sub>，形成反型层（沟道）</li>
                                    </ol>
                                </div>
                            </div>

                            <h5>阈值电压 V<sub>TH</sub></h5>

                            <div class="formula-box">
                                <div class="formula-title">阈值电压公式（完整推导）</div>
                                <div class="formula-content">
                                    $$V_{TH} = V_{FB} + 2\\phi_F + \\frac{\\sqrt{2\\varepsilon_{Si}qN_A(2\\phi_F)}}{C_{ox}}$$

                                    <p class="formula-desc">
                                        <strong>各参数详解：</strong><br>
                                        V<sub>FB</sub>: 平带电压 = Φ<sub>MS</sub> - Q<sub>ox</sub>/C<sub>ox</sub><br>
                                        Φ<sub>MS</sub>: 金属-半导体功函数差<br>
                                        Q<sub>ox</sub>: 氧化层固定电荷<br>
                                        φ<sub>F</sub>: 费米势 = (kT/q)ln(N<sub>A</sub>/n<sub>i</sub>)<br>
                                        C<sub>ox</sub>: 单位面积栅氧化层电容 = ε<sub>ox</sub>/t<sub>ox</sub><br>
                                        N<sub>A</sub>: 衬底掺杂浓度<br>
                                        ε<sub>Si</sub>: 硅的介电常数 = 11.7ε<sub>0</sub>
                                    </p>

                                    <div class="derivation-steps">
                                        <h6><i class="fas fa-pencil-alt"></i> 推导步骤：</h6>
                                        <ol>
                                            <li><strong>能带弯曲：</strong>表面势φ<sub>s</sub> = 2φ<sub>F</sub>时发生强反型</li>
                                            <li><strong>耗尽层电荷：</strong>Q<sub>B</sub> = -√(2ε<sub>Si</sub>qN<sub>A</sub>·2φ<sub>F</sub>)</li>
                                            <li><strong>高斯定律：</strong>V<sub>GS</sub> = V<sub>FB</sub> + φ<sub>s</sub> - Q<sub>B</sub>/C<sub>ox</sub></li>
                                            <li><strong>代入φ<sub>s</sub>=2φ<sub>F</sub>：</strong>得到V<sub>TH</sub>表达式</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div class="example-calculation">
                                <h6><i class="fas fa-calculator"></i> 数值计算实例</h6>
                                <p><strong>条件：</strong></p>
                                <ul>
                                    <li>N<sub>A</sub> = 10<sup>17</sup> cm<sup>-3</sup> (P型衬底)</li>
                                    <li>t<sub>ox</sub> = 10nm (栅氧化层厚度)</li>
                                    <li>Q<sub>ox</sub> = 10<sup>10</sup> q cm<sup>-2</sup></li>
                                    <li>T = 300K (室温)</li>
                                </ul>

                                <p><strong>计算过程：</strong></p>
                                <div class="calculation-steps">
                                    <p>1. φ<sub>F</sub> = 0.026V × ln(10<sup>17</sup>/1.5×10<sup>10</sup>) = 0.407V</p>
                                    <p>2. C<sub>ox</sub> = 3.45×10<sup>-7</sup> F/cm<sup>2</sup> (ε<sub>ox</sub>=3.9ε<sub>0</sub>)</p>
                                    <p>3. Q<sub>B</sub> = -√(2×11.7ε<sub>0</sub>×q×10<sup>17</sup>×2×0.407)</p>
                                    <p>   = -3.7×10<sup>-8</sup> C/cm<sup>2</sup></p>
                                    <p>4. V<sub>FB</sub> ≈ -0.95V (Φ<sub>MS</sub> ≈ -1V，多晶硅栅)</p>
                                    <p>5. V<sub>TH</sub> = -0.95 + 2×0.407 + 3.7×10<sup>-8</sup>/3.45×10<sup>-7</sup></p>
                                    <p>   <strong>= 0.02V ≈ 0V</strong></p>
                                </div>

                                <div class="note-box">
                                    <i class="fas fa-info-circle"></i>
                                    <p>实际器件V<sub>TH</sub>需要通过离子注入调整到所需值（NMOS: 0.4~0.8V，PMOS: -0.4~-0.8V）</p>
                                </div>
                            </div>

                            <h5>MOSFET电流-电压特性</h5>

                            <div class="iv-characteristics">
                                <h6>三个工作区域</h6>

                                <div class="region-card">
                                    <h7>1. 截止区 (Cut-off)</h7>
                                    <p><strong>条件：</strong>V<sub>GS</sub> < V<sub>TH</sub></p>
                                    <div class="formula-box">
                                        $$I_D ≈ 0$$
                                        <p class="formula-desc">
                                            实际存在亚阈值电流：<br>
                                            I<sub>D,sub</sub> = I<sub>0</sub> exp(qV<sub>GS</sub>/nkT)[1 - exp(-qV<sub>DS</sub>/kT)]<br>
                                            亚阈值摆幅 SS = n(kT/q)ln10 ≈ 60~100 mV/decade
                                        </p>
                                    </div>
                                </div>

                                <div class="region-card">
                                    <h7>2. 线性区 (Triode/Linear)</h7>
                                    <p><strong>条件：</strong>V<sub>GS</sub> > V<sub>TH</sub> 且 V<sub>DS</sub> < V<sub>GS</sub> - V<sub>TH</sub></p>
                                    <div class="formula-box">
                                        $$I_D = \\mu_n C_{ox} \\frac{W}{L}\\left[(V_{GS} - V_{TH})V_{DS} - \\frac{V_{DS}^2}{2}\\right]$$

                                        <p class="formula-desc">
                                            μ<sub>n</sub>: 电子迁移率 (≈450 cm²/V·s for Si)<br>
                                            W/L: 沟道宽长比（设计参数）<br>
                                            C<sub>ox</sub>: 栅氧化层单位面积电容
                                        </p>

                                        <div class="derivation-box">
                                            <h8>公式推导：</h8>
                                            <p>1. 沟道电荷密度：Q<sub>n</sub>(y) = -C<sub>ox</sub>[V<sub>GS</sub> - V(y) - V<sub>TH</sub>]</p>
                                            <p>2. 漂移电流：I<sub>D</sub> = -Q<sub>n</sub>(y) × W × μ<sub>n</sub> × dV/dy</p>
                                            <p>3. 从y=0到y=L积分：∫<sub>0</sub><sup>L</sup>I<sub>D</sub>dy = ∫<sub>0</sub><sup>V<sub>DS</sub></sup>μ<sub>n</sub>C<sub>ox</sub>W(V<sub>GS</sub>-V-V<sub>TH</sub>)dV</p>
                                            <p>4. 得到：I<sub>D</sub>L = μ<sub>n</sub>C<sub>ox</sub>W[(V<sub>GS</sub>-V<sub>TH</sub>)V<sub>DS</sub> - V<sub>DS</sub>²/2]</p>
                                        </div>
                                    </div>

                                    <p><strong>小V<sub>DS</sub>时导通电阻：</strong></p>
                                    <div class="formula-inline">
                                        $$R_{DS(on)} = \\frac{1}{\\mu_n C_{ox}(W/L)(V_{GS}-V_{TH})}$$
                                    </div>
                                </div>

                                <div class="region-card">
                                    <h7>3. 饱和区 (Saturation)</h7>
                                    <p><strong>条件：</strong>V<sub>GS</sub> > V<sub>TH</sub> 且 V<sub>DS</sub> ≥ V<sub>GS</sub> - V<sub>TH</sub></p>
                                    <div class="formula-box">
                                        $$I_D = \\frac{1}{2}\\mu_n C_{ox} \\frac{W}{L}(V_{GS} - V_{TH})^2(1 + \\lambda V_{DS})$$

                                        <p class="formula-desc">
                                            λ: 沟道长度调制系数 (≈0.01~0.1 V<sup>-1</sup>)<br>
                                            (1+λV<sub>DS</sub>)项考虑了Early效应
                                        </p>

                                        <div class="derivation-box">
                                            <h8>饱和条件推导：</h8>
                                            <p>1. 夹断点：V(y=L) = V<sub>GS</sub> - V<sub>TH</sub></p>
                                            <p>2. 代入线性区公式，V<sub>DS</sub> = V<sub>GS</sub> - V<sub>TH</sub></p>
                                            <p>3. 得到：I<sub>D,sat</sub> = ½μ<sub>n</sub>C<sub>ox</sub>(W/L)(V<sub>GS</sub>-V<sub>TH</sub>)²</p>
                                            <p>4. 沟道长度调制：有效L减小为L'=L-ΔL</p>
                                            <p>5. ΔL ≈ λ'V<sub>DS</sub>，引入λ=λ'/L</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mosfet-parameters">
                                <h5>MOSFET关键参数</h5>

                                <table class="parameter-table">
                                    <thead>
                                        <tr>
                                            <th>参数</th>
                                            <th>符号</th>
                                            <th>公式/典型值</th>
                                            <th>意义</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>阈值电压</td>
                                            <td>V<sub>TH</sub></td>
                                            <td>0.4~0.8V (NMOS)<br>-0.4~-0.8V (PMOS)</td>
                                            <td>导通所需栅压</td>
                                        </tr>
                                        <tr>
                                            <td>导通电阻</td>
                                            <td>R<sub>DS(on)</sub></td>
                                            <td>10mΩ~1Ω</td>
                                            <td>导通时的等效电阻</td>
                                        </tr>
                                        <tr>
                                            <td>跨导</td>
                                            <td>g<sub>m</sub></td>
                                            <td>μ<sub>n</sub>C<sub>ox</sub>(W/L)(V<sub>GS</sub>-V<sub>TH</sub>)</td>
                                            <td>电流对栅压的控制能力</td>
                                        </tr>
                                        <tr>
                                            <td>输出电阻</td>
                                            <td>r<sub>o</sub></td>
                                            <td>1/(λI<sub>D</sub>)</td>
                                            <td>饱和区输出电阻</td>
                                        </tr>
                                        <tr>
                                            <td>栅源电容</td>
                                            <td>C<sub>gs</sub></td>
                                            <td>⅔C<sub>ox</sub>WL + C<sub>ov</sub>W</td>
                                            <td>影响开关速度</td>
                                        </tr>
                                        <tr>
                                            <td>栅漏电容</td>
                                            <td>C<sub>gd</sub></td>
                                            <td>C<sub>ov</sub>W (饱和区)</td>
                                            <td>Miller电容</td>
                                        </tr>
                                        <tr>
                                            <td>体效应系数</td>
                                            <td>γ</td>
                                            <td>√(2qε<sub>Si</sub>N<sub>A</sub>)/C<sub>ox</sub></td>
                                            <td>V<sub>SB</sub>对V<sub>TH</sub>的影响</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="body-effect">
                                    <h6>体效应 (Body Effect)</h6>
                                    <p>当源极和衬底之间存在电压V<sub>SB</sub>时，阈值电压增大：</p>
                                    <div class="formula-box">
                                        $$V_{TH}(V_{SB}) = V_{TH0} + \\gamma(\\sqrt{2\\phi_F + V_{SB}} - \\sqrt{2\\phi_F})$$

                                        <p class="formula-desc">
                                            V<sub>TH0</sub>: V<sub>SB</sub>=0时的阈值电压<br>
                                            γ: 体效应系数 (典型0.3~0.5 V<sup>1/2</sup>)<br>
                                            这会降低串联MOSFET的性能
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="mosfet-applications">
                                <h5>MOSFET应用设计</h5>

                                <div class="application-card">
                                    <h6>1. 开关应用</h6>
                                    <p><strong>设计考虑：</strong></p>
                                    <ul>
                                        <li><strong>R<sub>DS(on)</sub>选择：</strong>导通损耗P = I²R<sub>DS(on)</sub></li>
                                        <li><strong>栅极驱动：</strong>V<sub>GS</sub> = 10~15V（逻辑电平MOSFET可4.5V）</li>
                                        <li><strong>开关损耗：</strong>P<sub>sw</sub> = ½V<sub>DS</sub>I<sub>D</sub>(t<sub>r</sub>+t<sub>f</sub>)f<sub>sw</sub></li>
                                        <li><strong>安全工作区（SOA）：</strong>I<sub>D</sub>-V<sub>DS</sub>曲线内</li>
                                    </ul>

                                    <div class="design-example">
                                        <h7><i class="fas fa-pencil-ruler"></i> 设计实例：12V/10A开关</h7>
                                        <p><strong>要求：</strong></p>
                                        <ul>
                                            <li>电源电压：12V</li>
                                            <li>负载电流：10A</li>
                                            <li>开关频率：100kHz</li>
                                            <li>效率目标：>95%</li>
                                        </ul>

                                        <p><strong>MOSFET选型：</strong></p>
                                        <div class="selection-criteria">
                                            <p>1. <strong>电压裕量：</strong>V<sub>DSS</sub> > 2×V<sub>in</sub> = 24V → 选择30V或40V器件</p>
                                            <p>2. <strong>导通电阻：</strong>
                                                <br>允许导通损耗：P<sub>cond</sub> < 0.05 × (12V×10A) = 6W
                                                <br>R<sub>DS(on)</sub> < 6W / (10A)² = 60mΩ
                                                <br>考虑温度影响（+50%@100°C），选择≤40mΩ
                                            </p>
                                            <p>3. <strong>栅极电荷：</strong>Q<sub>g</sub> < 50nC（降低驱动损耗）</p>
                                            <p>4. <strong>推荐型号：</strong>IRFB4110 (100V, 180A, 3.7mΩ, Q<sub>g</sub>=170nC)
                                                <br>或 IRLB8743PBF (30V, 178A, 1.65mΩ, Q<sub>g</sub>=120nC) ✓✓
                                            </p>
                                        </div>

                                        <p><strong>损耗分析：</strong></p>
                                        <div class="loss-calculation">
                                            <p><strong>导通损耗：</strong></p>
                                            <p>P<sub>cond</sub> = I<sub>D</sub>² × R<sub>DS(on)</sub> × D</p>
                                            <p>= (10A)² × 1.65mΩ × 1.0 = 0.165W ✓</p>

                                            <p><strong>开关损耗（简化估算）：</strong></p>
                                            <p>P<sub>sw</sub> ≈ ½V<sub>DS</sub>I<sub>D</sub>(t<sub>r</sub>+t<sub>f</sub>)f<sub>sw</sub></p>
                                            <p>假设t<sub>r</sub>+t<sub>f</sub> = 50ns</p>
                                            <p>= ½×12V×10A×50ns×100kHz = 0.3W</p>

                                            <p><strong>驱动损耗：</strong></p>
                                            <p>P<sub>gate</sub> = Q<sub>g</sub>V<sub>GS</sub>f<sub>sw</sub></p>
                                            <p>= 120nC × 10V × 100kHz = 0.12W</p>

                                            <p><strong>总损耗：</strong>0.165 + 0.3 + 0.12 = 0.585W</p>
                                            <p><strong>效率：</strong>(120W - 0.585W) / 120W = <span class="highlight">99.5%</span> ✓✓</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="application-card">
                                    <h6>2. 模拟放大应用</h6>
                                    <p><strong>共源放大器设计：</strong></p>

                                    <div class="amplifier-design">
                                        <p><strong>小信号模型：</strong></p>
                                        <ul>
                                            <li>电压增益：A<sub>v</sub> = -g<sub>m</sub>R<sub>D</sub></li>
                                            <li>输入阻抗：Z<sub>in</sub> ≈ ∞（DC）</li>
                                            <li>输出阻抗：Z<sub>out</sub> = R<sub>D</sub> || r<sub>o</sub></li>
                                        </ul>

                                        <div class="formula-box">
                                            <div class="formula-title">增益带宽积</div>
                                            <div class="formula-content">
                                                $$GBW = \\frac{g_m}{2\\pi C_{L}}$$

                                                <p class="formula-desc">
                                                    C<sub>L</sub>: 总负载电容（包括C<sub>gd</sub> Miller效应）<br>
                                                    C<sub>L,eff</sub> = C<sub>L</sub> + C<sub>gd</sub>(1 + g<sub>m</sub>R<sub>D</sub>)
                                                </p>
                                            </div>
                                        </div>

                                        <p><strong>偏置设计：</strong></p>
                                        <ol>
                                            <li>选择静态工作点I<sub>D</sub>和V<sub>DS</sub></li>
                                            <li>确定R<sub>D</sub> = (V<sub>DD</sub> - V<sub>DS</sub>) / I<sub>D</sub></li>
                                            <li>计算所需V<sub>GS</sub>：I<sub>D</sub> = ½μ<sub>n</sub>C<sub>ox</sub>(W/L)(V<sub>GS</sub>-V<sub>TH</sub>)²</li>
                                            <li>设计偏置网络提供V<sub>GS</sub></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div class="mosfet-vs-bjt">
                                <h5>MOSFET vs BJT 对比</h5>

                                <table class="comparison-table">
                                    <thead>
                                        <tr>
                                            <th>特性</th>
                                            <th>MOSFET</th>
                                            <th>BJT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>控制方式</strong></td>
                                            <td>电压控制（栅极电压）</td>
                                            <td>电流控制（基极电流）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>输入阻抗</strong></td>
                                            <td>极高（>10<sup>12</sup>Ω DC）</td>
                                            <td>中等（βr<sub>π</sub>，kΩ级）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>导通压降</strong></td>
                                            <td>I<sub>D</sub>×R<sub>DS(on)</sub>，可很小</td>
                                            <td>V<sub>CE(sat)</sub> ≈ 0.2V</td>
                                        </tr>
                                        <tr>
                                            <td><strong>开关速度</strong></td>
                                            <td>快（ns级），受C<sub>g</sub>限制</td>
                                            <td>较慢（ns~μs），受存储时间限制</td>
                                        </tr>
                                        <tr>
                                            <td><strong>跨导</strong></td>
                                            <td>g<sub>m</sub> ∝ √I<sub>D</sub></td>
                                            <td>g<sub>m</sub> ∝ I<sub>C</sub></td>
                                        </tr>
                                        <tr>
                                            <td><strong>温度系数</strong></td>
                                            <td>正温度系数（利于并联）</td>
                                            <td>负温度系数（不利并联）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>成本</strong></td>
                                            <td>中等（高压功率器件较贵）</td>
                                            <td>低</td>
                                        </tr>
                                        <tr>
                                            <td><strong>应用领域</strong></td>
                                            <td>开关电源、数字电路、射频</td>
                                            <td>模拟放大、低噪声前端</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `
                },
                {
                    heading: '2. 运算放大器深度原理',
                    content: `
                        <div class="content-block">
                            <h5>理想运放特性</h5>

                            <div class="ideal-opamp">
                                <ul>
                                    <li><strong>无穷大开环增益：</strong>A<sub>OL</sub> → ∞</li>
                                    <li><strong>无穷大输入阻抗：</strong>Z<sub>in</sub> → ∞</li>
                                    <li><strong>零输出阻抗：</strong>Z<sub>out</sub> = 0</li>
                                    <li><strong>无穷大共模抑制比：</strong>CMRR → ∞</li>
                                    <li><strong>无穷大带宽：</strong>BW → ∞</li>
                                    <li><strong>零失调电压：</strong>V<sub>OS</sub> = 0</li>
                                </ul>

                                <div class="golden-rules">
                                    <h6><i class="fas fa-star"></i> 运放两大黄金法则</h6>
                                    <ol>
                                        <li><strong>虚短：</strong>V<sub>+</sub> = V<sub>-</sub> （负反馈时，输入端电压相等）</li>
                                        <li><strong>虚断：</strong>I<sub>+</sub> = I<sub>-</sub> = 0 （输入端无电流流入）</li>
                                    </ol>
                                    <div class="note-box">
                                        <i class="fas fa-info-circle"></i>
                                        <p>这两个法则是理想运放在负反馈条件下的推论，极大简化了电路分析</p>
                                    </div>
                                </div>
                            </div>

                            <h5>基本运放电路分析</h5>

                            <div class="opamp-circuits">
                                <div class="circuit-card">
                                    <h6>1. 反相放大器</h6>
                                    <div class="formula-box">
                                        <div class="formula-content">
                                            $$\\frac{V_{out}}{V_{in}} = -\\frac{R_f}{R_{in}}$$

                                            <div class="derivation-box">
                                                <h7>推导过程：</h7>
                                                <p>1. 虚短：V<sub>-</sub> = V<sub>+</sub> = 0（地电位）</p>
                                                <p>2. 虚断：流过R<sub>in</sub>的电流 = 流过R<sub>f</sub>的电流</p>
                                                <p>3. I = (V<sub>in</sub> - 0) / R<sub>in</sub> = (0 - V<sub>out</sub>) / R<sub>f</sub></p>
                                                <p>4. 解得：V<sub>out</sub> / V<sub>in</sub> = -R<sub>f</sub> / R<sub>in</sub></p>
                                            </div>

                                            <p class="formula-desc">
                                                <strong>特点：</strong><br>
                                                • 输入阻抗：Z<sub>in</sub> = R<sub>in</sub>（不是无穷大！）<br>
                                                • 输出阻抗：Z<sub>out</sub> ≈ 0<br>
                                                • 带宽：受增益带宽积限制<br>
                                                • 相位：180°反相
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="circuit-card">
                                    <h6>2. 同相放大器</h6>
                                    <div class="formula-box">
                                        <div class="formula-content">
                                            $$\\frac{V_{out}}{V_{in}} = 1 + \\frac{R_f}{R_g}$$

                                            <div class="derivation-box">
                                                <h7>推导过程：</h7>
                                                <p>1. 虚短：V<sub>-</sub> = V<sub>+</sub> = V<sub>in</sub></p>
                                                <p>2. V<sub>-</sub>通过分压器确定：V<sub>-</sub> = V<sub>out</sub> × R<sub>g</sub>/(R<sub>f</sub>+R<sub>g</sub>)</p>
                                                <p>3. V<sub>in</sub> = V<sub>out</sub> × R<sub>g</sub>/(R<sub>f</sub>+R<sub>g</sub>)</p>
                                                <p>4. 解得：V<sub>out</sub>/V<sub>in</sub> = 1 + R<sub>f</sub>/R<sub>g</sub></p>
                                            </div>

                                            <p class="formula-desc">
                                                <strong>特点：</strong><br>
                                                • 输入阻抗：Z<sub>in</sub> ≈ ∞（极高！）<br>
                                                • 最小增益为1（电压跟随器）<br>
                                                • 相位：0°同相<br>
                                                • 适合高阻抗信号源
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="circuit-card">
                                    <h6>3. 差分放大器</h6>
                                    <div class="formula-box">
                                        <div class="formula-content">
                                            $$V_{out} = \\frac{R_f}{R_g}(V_2 - V_1)$$

                                            <p class="formula-desc">
                                                条件：R<sub>1</sub>=R<sub>g</sub>, R<sub>2</sub>=R<sub>f</sub><br>
                                                <strong>应用：</strong>传感器信号放大、共模噪声抑制
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="circuit-card">
                                    <h6>4. 积分器</h6>
                                    <div class="formula-box">
                                        <div class="formula-content">
                                            $$V_{out}(t) = -\\frac{1}{RC}\\int_0^t V_{in}(\\tau)d\\tau + V_{out}(0)$$

                                            <div class="derivation-box">
                                                <h7>频域分析：</h7>
                                                <p>H(s) = -1/(RCs) = -1/(j2πfRC)</p>
                                                <p>幅频特性：|H(f)| = 1/(2πfRC)</p>
                                                <p>相频特性：∠H(f) = -90°</p>
                                                <p>-20dB/decade衰减，相位滞后90°</p>
                                            </div>

                                            <p class="formula-desc">
                                                <strong>应用：</strong><br>
                                                • 波形转换（方波→三角波）<br>
                                                • 低通滤波（f<sub>-3dB</sub> = 1/(2πRC)）<br>
                                                • ADC积分型转换
                                            </p>
                                        </div>
                                    </div>

                                    <div class="warning-box">
                                        <i class="fas fa-exclamation-triangle"></i>
                                        <strong>注意：</strong>理想积分器在DC时增益无穷大，实际需要并联R<sub>f</sub>限制DC增益
                                    </div>
                                </div>

                                <div class="circuit-card">
                                    <h6>5. 微分器</h6>
                                    <div class="formula-box">
                                        <div class="formula-content">
                                            $$V_{out}(t) = -RC\\frac{dV_{in}(t)}{dt}$$

                                            <div class="derivation-box">
                                                <h7>频域分析：</h7>
                                                <p>H(s) = -RCs = -j2πfRC</p>
                                                <p>幅频特性：|H(f)| = 2πfRC</p>
                                                <p>+20dB/decade增益，相位超前90°</p>
                                            </div>

                                            <p class="formula-desc">
                                                <strong>应用：</strong>边缘检测、高通滤波<br>
                                                <strong>问题：</strong>高频噪声放大严重
                                            </p>
                                        </div>
                                    </div>

                                    <div class="improvement-box">
                                        <h7><i class="fas fa-tools"></i> 改进型微分器</h7>
                                        <p>串联电阻R<sub>s</sub>限制高频增益：</p>
                                        <p>H(f) = -j2πfRC / (1 + j2πfR<sub>s</sub>C)</p>
                                        <p>高频增益限制为 R/R<sub>s</sub></p>
                                    </div>
                                </div>
                            </div>

                            <h5>实际运放非理想特性</h5>

                            <div class="non-ideal-parameters">
                                <table class="specs-table">
                                    <thead>
                                        <tr>
                                            <th>参数</th>
                                            <th>符号</th>
                                            <th>典型值</th>
                                            <th>影响</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>失调电压</strong></td>
                                            <td>V<sub>OS</sub></td>
                                            <td>0.1~5mV<br>精密: <100μV</td>
                                            <td>输出直流偏移<br>V<sub>out,DC</sub> = V<sub>OS</sub>(1+R<sub>f</sub>/R<sub>g</sub>)</td>
                                        </tr>
                                        <tr>
                                            <td><strong>偏置电流</strong></td>
                                            <td>I<sub>B</sub></td>
                                            <td>BJT: nA~μA<br>FET: pA~fA</td>
                                            <td>输入端产生电压误差<br>V<sub>err</sub> = I<sub>B</sub> × R<sub>source</sub></td>
                                        </tr>
                                        <tr>
                                            <td><strong>失调电流</strong></td>
                                            <td>I<sub>OS</sub></td>
                                            <td>I<sub>B+</sub> - I<sub>B-</sub></td>
                                            <td>即使平衡仍有误差</td>
                                        </tr>
                                        <tr>
                                            <td><strong>共模抑制比</strong></td>
                                            <td>CMRR</td>
                                            <td>80~120dB</td>
                                            <td>共模信号转换为差模<br>CMRR = 20log(A<sub>d</sub>/A<sub>cm</sub>)</td>
                                        </tr>
                                        <tr>
                                            <td><strong>电源抑制比</strong></td>
                                            <td>PSRR</td>
                                            <td>80~120dB</td>
                                            <td>电源纹波耦合到输出</td>
                                        </tr>
                                        <tr>
                                            <td><strong>转换速率</strong></td>
                                            <td>SR</td>
                                            <td>0.5~50V/μs<br>高速: >1000V/μs</td>
                                            <td>限制大信号带宽<br>f<sub>max</sub> = SR/(2πV<sub>pk</sub>)</td>
                                        </tr>
                                        <tr>
                                            <td><strong>增益带宽积</strong></td>
                                            <td>GBW</td>
                                            <td>1MHz~1GHz</td>
                                            <td>闭环带宽 = GBW/A<sub>CL</sub></td>
                                        </tr>
                                        <tr>
                                            <td><strong>输入噪声电压</strong></td>
                                            <td>e<sub>n</sub></td>
                                            <td>1~20nV/√Hz</td>
                                            <td>信噪比恶化</td>
                                        </tr>
                                        <tr>
                                            <td><strong>输入噪声电流</strong></td>
                                            <td>i<sub>n</sub></td>
                                            <td>BJT: pA/√Hz<br>FET: fA/√Hz</td>
                                            <td>与源阻抗形成噪声</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="noise-analysis">
                                    <h6>噪声分析</h6>
                                    <p><strong>总输入噪声电压：</strong></p>
                                    <div class="formula-box">
                                        $$e_{n,total} = \\sqrt{e_n^2 + (i_n R_s)^2 + (4kTR_s)^2}$$

                                        <p class="formula-desc">
                                            e<sub>n</sub>: 运放电压噪声<br>
                                            i<sub>n</sub>R<sub>s</sub>: 电流噪声×源阻抗<br>
                                            √(4kTR<sub>s</sub>): 电阻热噪声<br>
                                            k = 1.38×10<sup>-23</sup> J/K (玻尔兹曼常数)
                                        </p>
                                    </div>

                                    <p><strong>最佳源阻抗：</strong></p>
                                    <div class="formula-inline">
                                        $$R_{s,opt} = \\frac{e_n}{i_n}$$
                                    </div>
                                    <p>在此阻抗下，电压噪声和电流噪声贡献相等，总噪声最小</p>
                                </div>
                            </div>

                            <h5>运放稳定性分析</h5>

                            <div class="stability-analysis">
                                <h6>相位裕度与增益裕度</h6>

                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$PM = 180° + \\angle H(j\\omega)|_{\\omega=\\omega_c}$$
                                        $$GM = -20\\log|H(j\\omega)|_{\\angle H(j\\omega)=-180°}$$

                                        <p class="formula-desc">
                                            PM: 相位裕度，通常要求 > 45°<br>
                                            GM: 增益裕度，通常要求 > 10dB<br>
                                            ω<sub>c</sub>: 0dB交越频率（增益为1的频率）
                                        </p>
                                    </div>
                                </div>

                                <div class="stability-guidelines">
                                    <h7>稳定性设计准则</h7>
                                    <ol>
                                        <li><strong>环路增益衰减：</strong>保证-20dB/decade穿越0dB</li>
                                        <li><strong>相位补偿：</strong>内部补偿 vs 外部补偿</li>
                                        <li><strong>容性负载：</strong>可能引入额外极点，需要隔离电阻</li>
                                        <li><strong>PCB布局：</strong>反馈网络短而直，避免寄生电容</li>
                                    </ol>
                                </div>

                                <div class="compensation-techniques">
                                    <h7>补偿技术</h7>
                                    <table class="technique-table">
                                        <tr>
                                            <td><strong>Miller补偿：</strong></td>
                                            <td>主极点补偿，最常用</td>
                                        </tr>
                                        <tr>
                                            <td><strong>零点补偿：</strong></td>
                                            <td>通过C<sub>f</sub>串联R<sub>z</sub>消除右半平面零点</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Lead补偿：</strong></td>
                                            <td>提升相位裕度</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Lag补偿：</strong></td>
                                            <td>改善低频增益精度</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <div class="opamp-selection">
                                <h5>运放选型指南</h5>

                                <div class="selection-flowchart">
                                    <h6>按应用场景选择</h6>

                                    <div class="scenario-card">
                                        <h7>1. 精密DC测量</h7>
                                        <p><strong>关键参数：</strong>V<sub>OS</sub>, I<sub>B</sub>, 温漂</p>
                                        <p><strong>推荐：</strong>斩波稳定运放（ADA4051）、零漂移运放（LTC2057）</p>
                                        <p><strong>典型规格：</strong>V<sub>OS</sub><10μV, 温漂<0.1μV/°C</p>
                                    </div>

                                    <div class="scenario-card">
                                        <h7>2. 低噪声信号调理</h7>
                                        <p><strong>关键参数：</strong>e<sub>n</sub>, i<sub>n</sub>, CMRR</p>
                                        <p><strong>推荐：</strong>低噪声BJT输入（AD797：0.9nV/√Hz）</p>
                                        <p><strong>源阻抗匹配：</strong>低阻抗用BJT，高阻抗用FET</p>
                                    </div>

                                    <div class="scenario-card">
                                        <h7>3. 高速数据采集</h7>
                                        <p><strong>关键参数：</strong>GBW, SR, 建立时间</p>
                                        <p><strong>推荐：</strong>电流反馈放大器（AD8000：1.5GHz）</p>
                                        <p><strong>带宽估算：</strong>BW = GBW / (1+R<sub>f</sub>/R<sub>in</sub>)</p>
                                    </div>

                                    <div class="scenario-card">
                                        <h7>4. 低功耗便携设备</h7>
                                        <p><strong>关键参数：</strong>静态电流I<sub>Q</sub></p>
                                        <p><strong>推荐：</strong>Nanopower运放（TLV9061：0.3μA）</p>
                                        <p><strong>权衡：</strong>低功耗 vs 带宽/噪声性能</p>
                                    </div>

                                    <div class="scenario-card">
                                        <h7>5. 高压大电流驱动</h7>
                                        <p><strong>关键参数：</strong>输出电压/电流能力</p>
                                        <p><strong>推荐：</strong>功率运放（OPA548：±30V, 5A）</p>
                                        <p><strong>注意：</strong>热管理，SOA曲线</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }
            ]
        },

        // 数字逻辑基础
        digitalLogicDeep: {
            title: '数字逻辑电路深度解析',
            difficulty: '入门进阶',
            readTime: '45分钟',
            sections: [
                {
                    heading: '1. 数字电路基础理论',
                    content: `
                        <div class="content-block">
                            <h5>逻辑电平与噪声容限</h5>

                            <div class="logic-levels">
                                <h6>TTL电平标准</h6>
                                <table class="level-table">
                                    <thead>
                                        <tr>
                                            <th>参数</th>
                                            <th>最小值</th>
                                            <th>典型值</th>
                                            <th>最大值</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>V<sub>OH</sub> (输出高电平)</td>
                                            <td>2.4V</td>
                                            <td>3.4V</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>V<sub>OL</sub> (输出低电平)</td>
                                            <td>-</td>
                                            <td>0.2V</td>
                                            <td>0.4V</td>
                                        </tr>
                                        <tr>
                                            <td>V<sub>IH</sub> (输入高电平)</td>
                                            <td>2.0V</td>
                                            <td>-</td>
                                            <td>5.5V</td>
                                        </tr>
                                        <tr>
                                            <td>V<sub>IL</sub> (输入低电平)</td>
                                            <td>-1.5V</td>
                                            <td>-</td>
                                            <td>0.8V</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="formula-box">
                                    <div class="formula-title">噪声容限</div>
                                    <div class="formula-content">
                                        $$NM_H = V_{OH(min)} - V_{IH(min)} = 2.4V - 2.0V = 0.4V$$
                                        $$NM_L = V_{IL(max)} - V_{OL(max)} = 0.8V - 0.4V = 0.4V$$

                                        <p class="formula-desc">
                                            噪声容限表示系统对噪声的免疫能力<br>
                                            TTL噪声容限较小（0.4V），CMOS更大（通常>1V）
                                        </p>
                                    </div>
                                </div>

                                <h6>CMOS电平标准</h6>
                                <p>取决于电源电压V<sub>DD</sub>：</p>
                                <ul>
                                    <li>V<sub>OH</sub> ≈ V<sub>DD</sub> - 0.1V (通常0.9V<sub>DD</sub>)</li>
                                    <li>V<sub>OL</sub> ≈ 0.1V (通常0.1V<sub>DD</sub>)</li>
                                    <li>V<sub>IH</sub> ≈ 0.7V<sub>DD</sub></li>
                                    <li>V<sub>IL</sub> ≈ 0.3V<sub>DD</sub></li>
                                </ul>

                                <div class="comparison-table">
                                    <h7>TTL vs CMOS 对比</h7>
                                    <table>
                                        <tr>
                                            <td><strong>噪声容限</strong></td>
                                            <td>TTL: ~0.4V</td>
                                            <td>CMOS: ~30%V<sub>DD</sub></td>
                                        </tr>
                                        <tr>
                                            <td><strong>功耗</strong></td>
                                            <td>TTL: 1~22mW/门</td>
                                            <td>CMOS: 10nW~1mW（静态几乎为0）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>扇出能力</strong></td>
                                            <td>TTL: 10</td>
                                            <td>CMOS: >50</td>
                                        </tr>
                                        <tr>
                                            <td><strong>速度</strong></td>
                                            <td>TTL: 3~33ns</td>
                                            <td>CMOS: 几ns~几百ns</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <h5>组合逻辑与时序逻辑</h5>

                            <div class="logic-types">
                                <div class="logic-card">
                                    <h6>组合逻辑电路</h6>
                                    <p><strong>特点：</strong>输出只取决于当前输入，无记忆功能</p>

                                    <p><strong>基本门电路：</strong></p>
                                    <table class="truth-table">
                                        <tr>
                                            <th>门类型</th>
                                            <th>逻辑表达式</th>
                                            <th>CMOS实现</th>
                                        </tr>
                                        <tr>
                                            <td>NOT (非门)</td>
                                            <td>Y = Ā</td>
                                            <td>1个PMOS + 1个NMOS</td>
                                        </tr>
                                        <tr>
                                            <td>NAND (与非)</td>
                                            <td>Y = A·B (上划线)</td>
                                            <td>2个PMOS并联 + 2个NMOS串联</td>
                                        </tr>
                                        <tr>
                                            <td>NOR (或非)</td>
                                            <td>Y = A+B (上划线)</td>
                                            <td>2个PMOS串联 + 2个NMOS并联</td>
                                        </tr>
                                    </table>

                                    <div class="universal-gates">
                                        <h7>通用门</h7>
                                        <p>NAND和NOR是<strong>功能完备</strong>的，可以实现任何逻辑函数：</p>
                                        <ul>
                                            <li>NOT: A NAND A = Ā</li>
                                            <li>AND: (A NAND B) NAND (A NAND B) = A·B</li>
                                            <li>OR: (A NAND A) NAND (B NAND B) = A+B</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="logic-card">
                                    <h6>时序逻辑电路</h6>
                                    <p><strong>特点：</strong>输出取决于当前输入和电路历史状态</p>

                                    <h7>基本触发器</h7>

                                    <div class="flipflop-types">
                                        <p><strong>1. RS触发器（最基本）</strong></p>
                                        <div class="formula-box">
                                            <p>特性方程：Q<sup>n+1</sup> = S + R̄·Q<sup>n</sup></p>
                                            <p>约束条件：R·S = 0（不能同时为1）</p>
                                        </div>

                                        <p><strong>2. D触发器（数据锁存）</strong></p>
                                        <div class="formula-box">
                                            <p>特性方程：Q<sup>n+1</sup> = D</p>
                                            <p>无约束，使用最广泛</p>
                                        </div>

                                        <p><strong>3. JK触发器（万能触发器）</strong></p>
                                        <div class="formula-box">
                                            <p>特性方程：Q<sup>n+1</sup> = J·Q̄<sup>n</sup> + K̄·Q<sup>n</sup></p>
                                            <p>J=K=1时翻转，消除了RS的约束</p>
                                        </div>

                                        <p><strong>4. T触发器（翻转触发器）</strong></p>
                                        <div class="formula-box">
                                            <p>特性方程：Q<sup>n+1</sup> = T ⊕ Q<sup>n</sup></p>
                                            <p>T=1时翻转，常用于计数器</p>
                                        </div>
                                    </div>

                                    <div class="timing-parameters">
                                        <h7>关键时序参数</h7>
                                        <table class="timing-table">
                                            <tr>
                                                <td><strong>建立时间 t<sub>su</sub></strong></td>
                                                <td>时钟沿前数据必须稳定的时间</td>
                                                <td>典型1~5ns</td>
                                            </tr>
                                            <tr>
                                                <td><strong>保持时间 t<sub>h</sub></strong></td>
                                                <td>时钟沿后数据必须保持的时间</td>
                                                <td>典型0.5~3ns</td>
                                            </tr>
                                            <tr>
                                                <td><strong>传播延迟 t<sub>pd</sub></strong></td>
                                                <td>时钟沿到输出变化的时间</td>
                                                <td>典型2~10ns</td>
                                            </tr>
                                            <tr>
                                                <td><strong>时钟到输出 t<sub>co</sub></strong></td>
                                                <td>CLK边沿到Q变化的时间</td>
                                                <td>典型1~5ns</td>
                                            </tr>
                                        </table>

                                        <div class="formula-box">
                                            <div class="formula-title">最大时钟频率</div>
                                            <div class="formula-content">
                                                $$f_{max} = \\frac{1}{t_{co} + t_{logic} + t_{su}}$$

                                                <p class="formula-desc">
                                                    t<sub>logic</sub>: 组合逻辑延迟<br>
                                                    必须满足：T<sub>clk</sub> ≥ t<sub>co</sub> + t<sub>logic</sub> + t<sub>su</sub>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>逻辑设计实例</h5>

                            <div class="design-examples">
                                <div class="example-card">
                                    <h6>实例1：4位同步计数器</h6>
                                    <p><strong>设计要求：</strong>0000→1111计数，同步清零</p>

                                    <p><strong>设计步骤：</strong></p>
                                    <ol>
                                        <li><strong>选择触发器：</strong>使用T触发器（翻转特性适合计数）</li>
                                        <li><strong>激励方程推导：</strong>
                                            <ul>
                                                <li>T<sub>0</sub> = 1（最低位每次都翻转）</li>
                                                <li>T<sub>1</sub> = Q<sub>0</sub></li>
                                                <li>T<sub>2</sub> = Q<sub>0</sub>·Q<sub>1</sub></li>
                                                <li>T<sub>3</sub> = Q<sub>0</sub>·Q<sub>1</sub>·Q<sub>2</sub></li>
                                            </ul>
                                        </li>
                                        <li><strong>最大频率：</strong>
                                            <div class="calculation-steps">
                                                <p>假设t<sub>co</sub>=3ns, t<sub>su</sub>=2ns</p>
                                                <p>3级AND门延迟：3×1ns=3ns</p>
                                                <p>T<sub>min</sub> = 3+3+2 = 8ns</p>
                                                <p>f<sub>max</sub> = 1/8ns = <strong>125MHz</strong></p>
                                            </div>
                                        </li>
                                    </ol>
                                </div>

                                <div class="example-card">
                                    <h6>实例2：3-8译码器设计</h6>
                                    <p><strong>功能：</strong>3位输入A₂A₁A₀，8个输出Y₇~Y₀</p>

                                    <p><strong>逻辑表达式：</strong></p>
                                    <div class="decoder-equations">
                                        <p>Y<sub>0</sub> = Ā<sub>2</sub>·Ā<sub>1</sub>·Ā<sub>0</sub></p>
                                        <p>Y<sub>1</sub> = Ā<sub>2</sub>·Ā<sub>1</sub>·A<sub>0</sub></p>
                                        <p>...</p>
                                        <p>Y<sub>7</sub> = A<sub>2</sub>·A<sub>1</sub>·A<sub>0</sub></p>
                                    </div>

                                    <p><strong>CMOS实现：</strong></p>
                                    <ul>
                                        <li>3个NOT门（产生互补输入）</li>
                                        <li>8个3输入NAND门</li>
                                        <li>总共：3 + 8×3 = 27个晶体管对</li>
                                    </ul>

                                    <p><strong>应用：</strong>地址译码、数据选择、状态机输出</p>
                                </div>
                            </div>

                            <div class="hazards-and-glitches">
                                <h5>冒险与毛刺</h5>

                                <div class="hazard-types">
                                    <h6>静态冒险</h6>
                                    <p>信号应该保持不变，却出现瞬间脉冲</p>
                                    <p><strong>原因：</strong>不同路径延迟不同</p>
                                    <p><strong>示例：</strong>Y = A·B + Ā·C，当A翻转时</p>

                                    <div class="solution-box">
                                        <h7>消除方法</h7>
                                        <ol>
                                            <li><strong>增加冗余项：</strong>Y = A·B + Ā·C + B·C</li>
                                            <li><strong>同步设计：</strong>所有变化由时钟同步</li>
                                            <li><strong>滤波电容：</strong>硬件滤除短脉冲（慢速应用）</li>
                                        </ol>
                                    </div>

                                    <h6>动态冒险</h6>
                                    <p>信号变化过程中出现多次翻转</p>
                                    <p><strong>解决：</strong>重新设计逻辑，消除多余翻转路径</p>
                                </div>
                            </div>
                        </div>
                    `
                }
            ]
        }
    };

    /**
     * Public API Extension
     */
    if (window.AdvancedContent) {
        window.AdvancedContent.basicExtended = basicExtendedContent;
    } else {
        window.AdvancedContent = {
            basicExtended: basicExtendedContent
        };
    }

    console.log('📚 Advanced Content Extended Module loaded');
    console.log('Added topics:', Object.keys(basicExtendedContent));

})();
