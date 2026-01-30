/**
 * Advanced Content Module
 * Hardware Engineer Knowledge Base
 * Deep technical content for all levels
 */

(function() {
    'use strict';

    /**
     * 初级篇深度内容
     */
    const basicAdvancedContent = {
        // 半导体物理基础
        semiconductorPhysics: {
            title: '半导体物理基础',
            difficulty: '入门进阶',
            readTime: '30分钟',
            sections: [
                {
                    heading: '1. PN结原理',
                    content: `
                        <div class="content-block">
                            <p><strong>能带理论：</strong></p>
                            <ul>
                                <li><strong>导带（Conduction Band）：</strong>电子可自由移动的能级</li>
                                <li><strong>价带（Valence Band）：</strong>束缚态电子的能级</li>
                                <li><strong>禁带（Band Gap）：</strong>导带与价带之间的能量差</li>
                            </ul>

                            <div class="formula-box">
                                <div class="formula-title">载流子浓度</div>
                                <div class="formula-content">
                                    $$n_i = \\sqrt{N_c N_v} \\exp\\left(-\\frac{E_g}{2kT}\\right)$$
                                    <p class="formula-desc">
                                        n<sub>i</sub>: 本征载流子浓度<br>
                                        E<sub>g</sub>: 禁带宽度<br>
                                        k: 玻尔兹曼常数 (1.38×10<sup>-23</sup> J/K)<br>
                                        T: 绝对温度 (K)
                                    </p>
                                </div>
                            </div>

                            <div class="info-card">
                                <h5>常见半导体材料的禁带宽度</h5>
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>材料</th>
                                            <th>禁带宽度 (eV)</th>
                                            <th>应用场景</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Si（硅）</td>
                                            <td>1.12</td>
                                            <td>通用集成电路</td>
                                        </tr>
                                        <tr>
                                            <td>Ge（锗）</td>
                                            <td>0.66</td>
                                            <td>红外探测器</td>
                                        </tr>
                                        <tr>
                                            <td>GaAs（砷化镓）</td>
                                            <td>1.42</td>
                                            <td>高频器件、光电器件</td>
                                        </tr>
                                        <tr>
                                            <td>GaN（氮化镓）</td>
                                            <td>3.4</td>
                                            <td>功率器件、LED</td>
                                        </tr>
                                        <tr>
                                            <td>SiC（碳化硅）</td>
                                            <td>3.26</td>
                                            <td>高温高压功率器件</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h5>PN结的形成</h5>
                            <p>当P型和N型半导体接触时：</p>
                            <ol>
                                <li><strong>扩散运动：</strong>N区电子向P区扩散，P区空穴向N区扩散</li>
                                <li><strong>空间电荷区：</strong>形成耗尽层，阻止进一步扩散</li>
                                <li><strong>内建电场：</strong>方向从N指向P</li>
                                <li><strong>动态平衡：</strong>扩散电流 = 漂移电流</li>
                            </ol>

                            <div class="formula-box">
                                <div class="formula-title">内建电位</div>
                                <div class="formula-content">
                                    $$V_{bi} = \\frac{kT}{q} \\ln\\left(\\frac{N_A N_D}{n_i^2}\\right)$$
                                    <p class="formula-desc">
                                        N<sub>A</sub>: 受主浓度<br>
                                        N<sub>D</sub>: 施主浓度<br>
                                        q: 电子电荷 (1.6×10<sup>-19</sup> C)
                                    </p>
                                </div>
                            </div>

                            <div class="practical-example">
                                <h5><i class="fas fa-lightbulb"></i> 实战计算</h5>
                                <p><strong>问题：</strong>计算室温下（T=300K）硅PN结的内建电位</p>
                                <p><strong>已知：</strong>N<sub>A</sub> = 10<sup>16</sup> cm<sup>-3</sup>,
                                   N<sub>D</sub> = 10<sup>17</sup> cm<sup>-3</sup>,
                                   n<sub>i</sub> = 1.5×10<sup>10</sup> cm<sup>-3</sup></p>
                                <p><strong>解：</strong></p>
                                <div class="calculation-steps">
                                    <p>V<sub>bi</sub> = (kT/q) × ln(N<sub>A</sub>N<sub>D</sub>/n<sub>i</sub><sup>2</sup>)</p>
                                    <p>= 0.026V × ln(10<sup>23</sup> / 2.25×10<sup>20</sup>)</p>
                                    <p>= 0.026V × ln(444.4)</p>
                                    <p>= 0.026V × 6.1</p>
                                    <p><strong>≈ 0.76V</strong></p>
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    heading: '2. 二极管特性深度解析',
                    content: `
                        <div class="content-block">
                            <h5>肖克利方程（Shockley Equation）</h5>
                            <div class="formula-box">
                                <div class="formula-content">
                                    $$I = I_S \\left(e^{\\frac{qV}{nkT}} - 1\\right)$$
                                    <p class="formula-desc">
                                        I<sub>S</sub>: 反向饱和电流（典型值 10<sup>-12</sup>~10<sup>-15</sup>A）<br>
                                        n: 理想因子（理想二极管 n=1，实际 1~2）<br>
                                        q/kT: 室温下约 38.6 V<sup>-1</sup>
                                    </p>
                                </div>
                            </div>

                            <div class="info-card">
                                <h5>温度对二极管的影响</h5>
                                <ul>
                                    <li><strong>正向压降：</strong>温度每升高1°C，V<sub>F</sub>下降约2mV</li>
                                    <li><strong>反向电流：</strong>温度每升高10°C，I<sub>R</sub>增加约1倍</li>
                                    <li><strong>击穿电压：</strong>正温度系数，约+0.1%/°C</li>
                                </ul>
                            </div>

                            <h5>二极管寄生参数</h5>
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>参数</th>
                                        <th>典型值</th>
                                        <th>影响</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>结电容 C<sub>j</sub></td>
                                        <td>5~50pF</td>
                                        <td>限制开关速度</td>
                                    </tr>
                                    <tr>
                                        <td>扩散电容 C<sub>d</sub></td>
                                        <td>与电流成正比</td>
                                        <td>正向导通时产生</td>
                                    </tr>
                                    <tr>
                                        <td>体电阻 R<sub>s</sub></td>
                                        <td>0.1~10Ω</td>
                                        <td>大电流时压降增大</td>
                                    </tr>
                                    <tr>
                                        <td>反向恢复时间 t<sub>rr</sub></td>
                                        <td>快恢复: <50ns<br>超快恢复: <35ns</td>
                                        <td>高频整流效率</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="design-guideline">
                                <h5><i class="fas fa-tools"></i> 设计指南</h5>
                                <p><strong>二极管选型考虑因素：</strong></p>
                                <ol>
                                    <li><strong>最大正向电流：</strong>I<sub>F(avg)</sub>应大于实际峰值电流的1.5~2倍</li>
                                    <li><strong>反向耐压：</strong>V<sub>RRM</sub>应为最大反向电压的2倍以上</li>
                                    <li><strong>功耗计算：</strong>P<sub>D</sub> = V<sub>F</sub> × I<sub>F</sub> + V<sub>R</sub> × I<sub>R</sub></li>
                                    <li><strong>热阻考虑：</strong>θ<sub>JA</sub>（结到环境）或θ<sub>JC</sub>（结到外壳）</li>
                                </ol>

                                <div class="warning-box">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <strong>注意：</strong>整流电路中，二极管承受的峰值电压可能是交流输入电压的√2倍，
                                    加上可能的浪涌电压，需要充分的安全裕量。
                                </div>
                            </div>

                            <div class="case-study">
                                <h5><i class="fas fa-microscope"></i> 案例分析：整流二极管发热</h5>
                                <p><strong>问题描述：</strong>5V/3A开关电源输出整流二极管（SS34）工作温度过高</p>
                                <p><strong>分析过程：</strong></p>
                                <ol>
                                    <li><strong>功耗计算：</strong>
                                        <ul>
                                            <li>正向压降：V<sub>F</sub> ≈ 0.5V @ 3A</li>
                                            <li>平均电流：I<sub>avg</sub> ≈ 3A</li>
                                            <li>导通损耗：P<sub>cond</sub> = 0.5V × 3A = 1.5W</li>
                                            <li>开关损耗：P<sub>sw</sub> ≈ 0.3W（100kHz）</li>
                                            <li>总功耗：P<sub>total</sub> ≈ 1.8W</li>
                                        </ul>
                                    </li>
                                    <li><strong>温升计算：</strong>
                                        <ul>
                                            <li>SS34热阻：θ<sub>JA</sub> = 50°C/W（无散热器）</li>
                                            <li>温升：ΔT = 1.8W × 50°C/W = 90°C</li>
                                            <li>结温：T<sub>J</sub> = 25°C + 90°C = 115°C（超过最大125°C）</li>
                                        </ul>
                                    </li>
                                    <li><strong>解决方案：</strong>
                                        <ul>
                                            <li>方案1：增加散热器，降低热阻至20°C/W → T<sub>J</sub> = 61°C ✓</li>
                                            <li>方案2：更换为同步整流MOSFET → 导通损耗降至0.3W ✓✓</li>
                                            <li>方案3：并联两个SS34 → 每个功耗降至0.9W ✓</li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    `
                }
            ]
        },

        // 三极管深度原理
        transistorDeep: {
            title: '三极管工作原理深度解析',
            difficulty: '入门进阶',
            readTime: '40分钟',
            sections: [
                {
                    heading: '1. BJT内部载流子传输',
                    content: `
                        <div class="content-block">
                            <h5>共射放大器的详细分析</h5>

                            <div class="formula-box">
                                <div class="formula-title">Ebers-Moll模型</div>
                                <div class="formula-content">
                                    $$I_C = \\alpha_F I_E - I_{CBO}(e^{\\frac{V_{BC}}{V_T}} - 1)$$
                                    $$I_E = \\frac{I_C}{\\alpha_F} + I_{EBO}(e^{\\frac{V_{BE}}{V_T}} - 1)$$
                                    <p class="formula-desc">
                                        α<sub>F</sub>: 正向共基极电流增益（典型0.95~0.99）<br>
                                        V<sub>T</sub>: 热电压 ≈ 26mV @ 25°C
                                    </p>
                                </div>
                            </div>

                            <div class="advanced-topic">
                                <h5>Early效应（基区宽度调制）</h5>
                                <p>实际三极管的输出特性曲线在饱和区有一定斜率，这是由于：</p>
                                <ol>
                                    <li>V<sub>CE</sub>增大 → V<sub>CB</sub>增大（V<sub>BE</sub>不变）</li>
                                    <li>集电结空间电荷区变宽</li>
                                    <li>有效基区宽度W<sub>B</sub>减小</li>
                                    <li>少数载流子浓度梯度增大 → I<sub>C</sub>增大</li>
                                </ol>

                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$I_C = I_{C0}(1 + \\frac{V_{CE}}{V_A})$$
                                        <p class="formula-desc">
                                            V<sub>A</sub>: Early电压（典型50~200V）<br>
                                            输出电阻：r<sub>o</sub> = V<sub>A</sub> / I<sub>C</sub>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="parameter-table">
                                <h5>小信号参数</h5>
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>参数</th>
                                            <th>表达式</th>
                                            <th>典型值</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>输入电阻 r<sub>π</sub></td>
                                            <td>β × V<sub>T</sub> / I<sub>C</sub></td>
                                            <td>1kΩ~10kΩ</td>
                                        </tr>
                                        <tr>
                                            <td>输出电阻 r<sub>o</sub></td>
                                            <td>V<sub>A</sub> / I<sub>C</sub></td>
                                            <td>50kΩ~200kΩ</td>
                                        </tr>
                                        <tr>
                                            <td>跨导 g<sub>m</sub></td>
                                            <td>I<sub>C</sub> / V<sub>T</sub></td>
                                            <td>40mS @ 1mA</td>
                                        </tr>
                                        <tr>
                                            <td>电流增益 β</td>
                                            <td>α / (1 - α)</td>
                                            <td>100~400</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="frequency-analysis">
                                <h5>频率特性</h5>
                                <p><strong>特征频率f<sub>T</sub>：</strong>电流增益下降到1时的频率</p>
                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$f_T = \\frac{g_m}{2\\pi(C_{je} + C_{jc})}$$
                                        <p class="formula-desc">
                                            C<sub>je</sub>: 发射结电容<br>
                                            C<sub>jc</sub>: 集电结电容
                                        </p>
                                    </div>
                                </div>

                                <p><strong>Miller效应：</strong></p>
                                <p>共射放大器中，C<sub>jc</sub>受Miller效应影响，等效输入电容增大：</p>
                                <div class="formula-inline">
                                    $$C_{in} = C_{je} + C_{jc}(1 + A_v)$$
                                </div>
                                <p>其中A<sub>v</sub>为电压增益，这显著降低了高频性能。</p>
                            </div>

                            <div class="design-example">
                                <h5><i class="fas fa-pencil-ruler"></i> 设计实例：宽频带放大器</h5>
                                <p><strong>要求：</strong>设计一个增益为40dB，带宽1MHz的放大器</p>
                                <p><strong>设计思路：</strong></p>
                                <ol>
                                    <li><strong>级联设计：</strong>单级增益降低，多级级联
                                        <ul>
                                            <li>40dB = 100倍电压增益</li>
                                            <li>采用3级，每级增益 = ∛100 ≈ 4.64倍 ≈ 13dB</li>
                                            <li>每级带宽要求：BW > 1MHz × √(2<sup>1/3</sup> - 1) ≈ 1.6MHz</li>
                                        </ul>
                                    </li>
                                    <li><strong>三极管选择：</strong>
                                        <ul>
                                            <li>f<sub>T</sub> > 10 × BW = 16MHz</li>
                                            <li>选择2N3904（f<sub>T</sub> = 300MHz）</li>
                                        </ul>
                                    </li>
                                    <li><strong>偏置设计：</strong>
                                        <ul>
                                            <li>I<sub>C</sub> = 2mA（折衷功耗和性能）</li>
                                            <li>V<sub>CE</sub> = 6V（保证线性区）</li>
                                            <li>R<sub>C</sub> = (12V - 6V) / 2mA = 3kΩ</li>
                                        </ul>
                                    </li>
                                    <li><strong>频率补偿：</strong>
                                        <ul>
                                            <li>Miller电容补偿</li>
                                            <li>发射极退化以提高稳定性</li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    `
                }
            ]
        }
    };

    /**
     * 中级篇深度内容
     */
    const intermediateAdvancedContent = {
        // 电源管理深度
        powerManagementDeep: {
            title: '电源管理IC深度解析',
            difficulty: '中级进阶',
            readTime: '45分钟',
            sections: [
                {
                    heading: '1. DC-DC变换器拓扑深度分析',
                    content: `
                        <div class="content-block">
                            <h5>Buck变换器的连续与断续模式</h5>

                            <div class="mode-comparison">
                                <h6>CCM（连续导通模式）</h6>
                                <p>电感电流全周期不为零</p>
                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$D = \\frac{V_{out}}{V_{in}}$$
                                        $$\\Delta I_L = \\frac{V_{out}(1-D)}{L \\cdot f_{sw}}$$
                                        $$L_{crit} = \\frac{(V_{in} - V_{out}) \\cdot V_{out}}{2 \\cdot V_{in} \\cdot f_{sw} \\cdot I_{out(min)}}$$
                                    </div>
                                </div>

                                <h6>DCM（断续导通模式）</h6>
                                <p>电感电流周期内归零</p>
                                <ul>
                                    <li>输出电压对负载变化敏感</li>
                                    <li>开关损耗降低（零电流开关）</li>
                                    <li>EMI特性改善</li>
                                    <li>轻载效率可能更高</li>
                                </ul>
                            </div>

                            <div class="advanced-design">
                                <h5>同步整流 vs. 肖特基整流</h5>
                                <table class="comparison-table">
                                    <thead>
                                        <tr>
                                            <th>特性</th>
                                            <th>肖特基二极管</th>
                                            <th>同步MOSFET</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>导通损耗</td>
                                            <td>V<sub>F</sub> × I = 0.5V × 3A = 1.5W</td>
                                            <td>I² × R<sub>DS(on)</sub> = 9A² × 0.01Ω = 0.09W</td>
                                        </tr>
                                        <tr>
                                            <td>反向恢复</td>
                                            <td>Q<sub>rr</sub> = 50nC典型</td>
                                            <td>体二极管Q<sub>rr</sub>，但可优化</td>
                                        </tr>
                                        <tr>
                                            <td>驱动损耗</td>
                                            <td>无</td>
                                            <td>Q<sub>g</sub> × V<sub>gs</sub> × f</td>
                                        </tr>
                                        <tr>
                                            <td>成本</td>
                                            <td>低</td>
                                            <td>中（需要驱动电路）</td>
                                        </tr>
                                        <tr>
                                            <td>效率</td>
                                            <td>85-90%</td>
                                            <td>92-96%</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="calculation-example">
                                    <h6><i class="fas fa-calculator"></i> 损耗对比计算</h6>
                                    <p><strong>条件：</strong>12V→5V，3A，500kHz</p>
                                    <p><strong>肖特基方案（SS34）：</strong></p>
                                    <ul>
                                        <li>导通损耗：0.5V × 3A × (1-D) = 0.5 × 3 × 0.58 = 0.87W</li>
                                        <li>反向恢复损耗：≈ 0.15W</li>
                                        <li>总损耗：≈ 1.02W</li>
                                    </ul>
                                    <p><strong>同步整流方案（Si7850）：</strong></p>
                                    <ul>
                                        <li>导通损耗：(3A)² × 0.010Ω × (1-D) = 9 × 0.01 × 0.58 = 0.052W</li>
                                        <li>驱动损耗：30nC × 5V × 500kHz = 0.075W</li>
                                        <li>体二极管损耗：≈ 0.03W（死区时间短）</li>
                                        <li>总损耗：≈ 0.157W</li>
                                    </ul>
                                    <p><strong>结论：</strong>同步整流损耗降低 <span class="highlight">84.6%</span></p>
                                </div>
                            </div>

                            <div class="compensation-design">
                                <h5>环路补偿设计</h5>
                                <p>Buck变换器的传递函数包含：</p>
                                <ol>
                                    <li><strong>LC双极点：</strong>f<sub>LC</sub> = 1 / (2π√(LC))</li>
                                    <li><strong>ESR零点：</strong>f<sub>ESR</sub> = 1 / (2πC × ESR)</li>
                                    <li><strong>右半平面零点：</strong>仅Boost和Buck-Boost有</li>
                                </ol>

                                <div class="formula-box">
                                    <div class="formula-title">Type-II补偿器</div>
                                    <div class="formula-content">
                                        $$H(s) = \\frac{1 + s\\omega_{z1}}{s(1 + s\\omega_{p1})}$$
                                        <p class="formula-desc">
                                            零点f<sub>z1</sub>: 补偿LC谐振<br>
                                            极点f<sub>p1</sub>: 抑制高频噪声
                                        </p>
                                    </div>
                                </div>

                                <div class="design-steps">
                                    <h6>补偿器设计步骤</h6>
                                    <ol>
                                        <li><strong>确定交越频率：</strong>通常为f<sub>sw</sub>/10</li>
                                        <li><strong>计算LC极点：</strong>f<sub>LC</sub> = 1/(2π√(LC))</li>
                                        <li><strong>放置补偿零点：</strong>f<sub>z</sub> = f<sub>LC</sub>/2</li>
                                        <li><strong>放置补偿极点：</strong>f<sub>p</sub> = f<sub>ESR</sub> × 2</li>
                                        <li><strong>验证相位裕度：</strong>PM > 45°</li>
                                        <li><strong>验证增益裕度：</strong>GM > 10dB</li>
                                    </ol>
                                </div>
                            </div>

                            <div class="emi-design">
                                <h5>EMI设计考虑</h5>
                                <p><strong>传导EMI源：</strong></p>
                                <ul>
                                    <li><strong>差模噪声：</strong>开关电流的di/dt</li>
                                    <li><strong>共模噪声：</strong>寄生电容耦合</li>
                                </ul>

                                <div class="emi-mitigation">
                                    <h6>抑制措施</h6>
                                    <table class="technique-table">
                                        <tr>
                                            <td><strong>输入滤波：</strong></td>
                                            <td>π型LC滤波器，转折频率 < f<sub>sw</sub>/10</td>
                                        </tr>
                                        <tr>
                                            <td><strong>布局优化：</strong></td>
                                            <td>最小化热回路面积（<0.5cm²）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>缓冲电路：</strong></td>
                                            <td>RC snubber减缓di/dt和dv/dt</td>
                                        </tr>
                                        <tr>
                                            <td><strong>屏蔽措施：</strong></td>
                                            <td>磁屏蔽电感，地平面完整</td>
                                        </tr>
                                        <tr>
                                            <td><strong>频率扩频：</strong></td>
                                            <td>降低峰值辐射（±5~10%调制）</td>
                                        </tr>
                                    </table>
                                </div>

                                <div class="warning-box">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <strong>重要：</strong>输入滤波器可能与电源阻抗相互作用导致不稳定，
                                    需要进行阻尼处理或输入电容ESR优化。
                                </div>
                            </div>
                        </div>
                    `
                }
            ]
        },

        // ADC/DAC深度
        dataConverterDeep: {
            title: 'ADC/DAC架构与性能优化',
            difficulty: '中级进阶',
            readTime: '50分钟',
            sections: [
                {
                    heading: '1. ADC架构详解',
                    content: `
                        <div class="content-block">
                            <h5>逐次逼近型ADC（SAR ADC）</h5>

                            <div class="architecture-analysis">
                                <p><strong>工作原理：</strong></p>
                                <ol>
                                    <li>采样保持电路采集输入信号</li>
                                    <li>DAC产生参考电压V<sub>ref</sub>/2</li>
                                    <li>比较器比较V<sub>in</sub>和V<sub>ref</sub>/2</li>
                                    <li>SAR逻辑根据比较结果调整下一位</li>
                                    <li>重复N次（N位ADC）</li>
                                </ol>

                                <div class="formula-box">
                                    <div class="formula-title">转换时间</div>
                                    <div class="formula-content">
                                        $$T_{conv} = N \\times T_{comp} + T_{acq}$$
                                        <p class="formula-desc">
                                            N: 分辨率位数<br>
                                            T<sub>comp</sub>: 单次比较时间（典型20~100ns）<br>
                                            T<sub>acq</sub>: 采样时间
                                        </p>
                                    </div>
                                </div>

                                <div class="performance-specs">
                                    <h6>关键性能指标</h6>
                                    <table class="specs-table">
                                        <tr>
                                            <td><strong>DNL</strong><br>(Differential Nonlinearity)</td>
                                            <td>微分非线性<br>理想：±0.5 LSB<br>典型：±0.3 LSB</td>
                                        </tr>
                                        <tr>
                                            <td><strong>INL</strong><br>(Integral Nonlinearity)</td>
                                            <td>积分非线性<br>理想：±1 LSB<br>典型：±0.5 LSB</td>
                                        </tr>
                                        <tr>
                                            <td><strong>SNR</strong><br>(Signal-to-Noise Ratio)</td>
                                            <td>信噪比<br>理论最大：6.02N + 1.76 dB</td>
                                        </tr>
                                        <tr>
                                            <td><strong>SINAD</strong><br>(Signal-to-Noise and Distortion)</td>
                                            <td>信号与噪声+失真比<br>ENOB = (SINAD - 1.76) / 6.02</td>
                                        </tr>
                                        <tr>
                                            <td><strong>THD</strong><br>(Total Harmonic Distortion)</td>
                                            <td>总谐波失真<br>典型：-80dB @ 100kHz</td>
                                        </tr>
                                        <tr>
                                            <td><strong>SFDR</strong><br>(Spurious-Free Dynamic Range)</td>
                                            <td>无杂散动态范围<br>高性能：>90dBc</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="sigma-delta">
                                <h5>Σ-Δ ADC（过采样型）</h5>
                                <p><strong>核心思想：</strong>用时间分辨率换幅度分辨率</p>

                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$SNR = 6.02N + 1.76 + 10\\log_{10}(OSR) + 10\\log_{10}\\left(\\frac{2L+1}{\\pi^{2L}}\\right)$$
                                        <p class="formula-desc">
                                            OSR: 过采样率（通常64~256）<br>
                                            L: 调制器阶数（1~5阶）<br>
                                            N: 量化器位数
                                        </p>
                                    </div>
                                </div>

                                <div class="comparison-chart">
                                    <h6>ADC架构对比</h6>
                                    <table class="architecture-comparison">
                                        <thead>
                                            <tr>
                                                <th>架构</th>
                                                <th>速度</th>
                                                <th>分辨率</th>
                                                <th>功耗</th>
                                                <th>应用</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Flash</td>
                                                <td>极快<br>(&gt;1GSPS)</td>
                                                <td>低<br>(6~8 bit)</td>
                                                <td>很高</td>
                                                <td>示波器、视频</td>
                                            </tr>
                                            <tr>
                                                <td>SAR</td>
                                                <td>快<br>(10kSPS~10MSPS)</td>
                                                <td>中<br>(12~18 bit)</td>
                                                <td>低</td>
                                                <td>通用测量</td>
                                            </tr>
                                            <tr>
                                                <td>Σ-Δ</td>
                                                <td>慢<br>(10SPS~1MSPS)</td>
                                                <td>高<br>(16~32 bit)</td>
                                                <td>低</td>
                                                <td>精密测量、音频</td>
                                            </tr>
                                            <tr>
                                                <td>Pipeline</td>
                                                <td>很快<br>(10MSPS~500MSPS)</td>
                                                <td>中高<br>(10~16 bit)</td>
                                                <td>中</td>
                                                <td>通信、成像</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="design-guidelines">
                                <h5><i class="fas fa-clipboard-check"></i> ADC设计指南</h5>

                                <div class="guideline-section">
                                    <h6>1. 前端抗混叠滤波器</h6>
                                    <p><strong>目的：</strong>防止高于f<sub>s</sub>/2的信号折叠到基带</p>
                                    <div class="formula-inline">
                                        $$f_{cutoff} = (0.4 \\sim 0.45) \\times f_s$$
                                    </div>
                                    <p><strong>滤波器类型选择：</strong></p>
                                    <ul>
                                        <li><strong>Butterworth：</strong>平坦通带，适中滚降</li>
                                        <li><strong>Chebyshev：</strong>陡峭滚降，通带纹波</li>
                                        <li><strong>Bessel：</strong>线性相位，最佳瞬态响应</li>
                                    </ul>
                                </div>

                                <div class="guideline-section">
                                    <h6>2. 参考电压设计</h6>
                                    <p><strong>要求：</strong></p>
                                    <ul>
                                        <li>稳定性：温度系数 &lt; 5ppm/°C</li>
                                        <li>噪声：&lt; 0.5 LSB RMS</li>
                                        <li>负载调整率：&lt; 1mV/mA</li>
                                        <li>去耦：10μF钽电容 + 0.1μF陶瓷电容</li>
                                    </ul>
                                    <div class="formula-box">
                                        <div class="formula-content">
                                            $$LSB = \\frac{V_{ref}}{2^N}$$
                                            $$\\text{SNR受限于：} SNR_{ref} > SNR_{ADC} + 6dB$$
                                        </div>
                                    </div>
                                </div>

                                <div class="guideline-section">
                                    <h6>3. 时钟质量</h6>
                                    <p>时钟抖动直接影响SNR：</p>
                                    <div class="formula-box">
                                        <div class="formula-content">
                                            $$SNR_{jitter} = -20\\log_{10}(2\\pi f_{in} t_{jitter})$$
                                            <p class="formula-desc">
                                                要求：t<sub>jitter</sub> &lt; LSB / (2π × f<sub>in</sub>)
                                            </p>
                                        </div>
                                    </div>
                                    <p><strong>示例：</strong>16位ADC，1MHz输入信号</p>
                                    <p>允许抖动：t<sub>j</sub> &lt; 24ps（要求极高！）</p>
                                </div>

                                <div class="guideline-section">
                                    <h6>4. PCB布局关键</h6>
                                    <ul>
                                        <li><strong>电源隔离：</strong>AVDD和DVDD分离，磁珠隔离</li>
                                        <li><strong>地平面分割：</strong>模拟地和数字地单点连接</li>
                                        <li><strong>保护环：</strong>敏感模拟信号用地保护环包围</li>
                                        <li><strong>时钟走线：</strong>差分走线，远离敏感节点</li>
                                        <li><strong>去耦电容：</strong>紧靠电源引脚，多种容值并联</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="troubleshooting">
                                <h5><i class="fas fa-wrench"></i> 常见问题排查</h5>

                                <div class="issue-card">
                                    <h6>问题：FFT频谱出现明显谐波</h6>
                                    <p><strong>可能原因：</strong></p>
                                    <ol>
                                        <li>输入信号过大导致削波 → 降低输入幅度至0.8×V<sub>ref</sub></li>
                                        <li>参考电压噪声 → 改善V<sub>ref</sub>去耦</li>
                                        <li>PCB布线串扰 → 检查时钟和数据线走线</li>
                                        <li>电源噪声耦合 → 加强电源滤波</li>
                                    </ol>
                                </div>

                                <div class="issue-card">
                                    <h6>问题：ENOB远低于理论值</h6>
                                    <p><strong>可能原因：</strong></p>
                                    <ol>
                                        <li>时钟抖动过大 → 使用低抖动晶振/TCXO</li>
                                        <li>模拟输入带宽不足 → 检查前端放大器带宽</li>
                                        <li>基准电压噪声 → 增加基准去耦，使用LDO供电</li>
                                        <li>采样时间不足 → 增加采样保持时间</li>
                                    </ol>
                                </div>

                                <div class="issue-card">
                                    <h6>问题：温度漂移严重</h6>
                                    <p><strong>解决方案：</strong></p>
                                    <ol>
                                        <li>使用温度系数&lt;5ppm/°C的参考电压源</li>
                                        <li>软件温度补偿算法</li>
                                        <li>恒温控制（高精度应用）</li>
                                        <li>多点校准（存储不同温度下的校准值）</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    `
                }
            ]
        }
    };

    /**
     * 高级篇深度内容
     */
    const advancedContent = {
        // 高速信号完整性
        signalIntegrityAdvanced: {
            title: '高速信号完整性工程',
            difficulty: '高级',
            readTime: '60分钟',
            sections: [
                {
                    heading: '1. 传输线理论与实践',
                    content: `
                        <div class="content-block">
                            <h5>传输线基本方程</h5>

                            <div class="theory-section">
                                <div class="formula-box">
                                    <div class="formula-title">Telegrapher方程</div>
                                    <div class="formula-content">
                                        $$\\frac{\\partial V}{\\partial x} = -L\\frac{\\partial I}{\\partial t} - RI$$
                                        $$\\frac{\\partial I}{\\partial x} = -C\\frac{\\partial V}{\\partial t} - GV$$
                                        <p class="formula-desc">
                                            L: 单位长度电感 (nH/inch)<br>
                                            C: 单位长度电容 (pF/inch)<br>
                                            R: 单位长度电阻 (Ω/inch)<br>
                                            G: 单位长度电导 (S/inch)
                                        </p>
                                    </div>
                                </div>

                                <p><strong>特征阻抗：</strong></p>
                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$Z_0 = \\sqrt{\\frac{L}{C}} \\quad \\text{(无损线)}$$
                                        $$Z_0 = \\sqrt{\\frac{R + j\\omega L}{G + j\\omega C}} \\quad \\text{(有损线)}$$
                                    </div>
                                </div>

                                <p><strong>传播速度：</strong></p>
                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$v_p = \\frac{1}{\\sqrt{LC}} = \\frac{c}{\\sqrt{\\varepsilon_{eff}}}$$
                                        <p class="formula-desc">
                                            c: 光速 (3×10<sup>8</sup> m/s)<br>
                                            ε<sub>eff</sub>: 有效介电常数
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="practical-calculations">
                                <h5>微带线设计实例</h5>
                                <p><strong>目标：</strong>在FR4板上设计50Ω微带线（1.6mm板厚，1oz铜）</p>

                                <div class="calculation-steps">
                                    <p><strong>Step 1: 计算有效介电常数</strong></p>
                                    <div class="formula-inline">
                                        $$\\varepsilon_{eff} = \\frac{\\varepsilon_r + 1}{2} + \\frac{\\varepsilon_r - 1}{2}\\frac{1}{\\sqrt{1 + 12h/W}}$$
                                    </div>
                                    <p>FR4: ε<sub>r</sub> = 4.4, h = 1.6mm</p>
                                    <p>假设W/h = 2, 则 ε<sub>eff</sub> ≈ 3.6</p>

                                    <p><strong>Step 2: 计算线宽</strong></p>
                                    <div class="formula-inline">
                                        $$Z_0 = \\frac{87}{\\sqrt{\\varepsilon_r + 1.41}}\\ln\\left(\\frac{5.98h}{0.8W + t}\\right)$$
                                    </div>
                                    <p>代入Z<sub>0</sub>=50Ω, 解得 W ≈ 3.0mm</p>

                                    <p><strong>Step 3: 验证传播延迟</strong></p>
                                    <div class="formula-inline">
                                        $$t_d = \\frac{\\sqrt{\\varepsilon_{eff}}}{c} \\approx 180 ps/inch$$
                                    </div>
                                </div>

                                <div class="design-table">
                                    <h6>常见PCB特征阻抗参考</h6>
                                    <table class="impedance-table">
                                        <thead>
                                            <tr>
                                                <th>结构</th>
                                                <th>板厚</th>
                                                <th>50Ω线宽</th>
                                                <th>100Ω差分间距</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>微带线 (1oz)</td>
                                                <td>1.6mm</td>
                                                <td>3.0mm</td>
                                                <td>W=0.2mm, S=0.2mm</td>
                                            </tr>
                                            <tr>
                                                <td>带状线 (1oz)</td>
                                                <td>0.8mm (介质)</td>
                                                <td>0.8mm</td>
                                                <td>W=0.15mm, S=0.15mm</td>
                                            </tr>
                                            <tr>
                                                <td>微带线 (0.5oz)</td>
                                                <td>1.6mm</td>
                                                <td>3.2mm</td>
                                                <td>W=0.22mm, S=0.18mm</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="reflection-analysis">
                                <h5>反射与端接</h5>

                                <p><strong>反射系数：</strong></p>
                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$\\Gamma = \\frac{Z_L - Z_0}{Z_L + Z_0}$$
                                        $$V_{反射} = \\Gamma \\times V_{入射}$$
                                    </div>
                                </div>

                                <div class="termination-methods">
                                    <h6>端接方法对比</h6>

                                    <div class="method-card">
                                        <h7>1. 串联端接（源端匹配）</h7>
                                        <ul>
                                            <li><strong>原理：</strong>R<sub>s</sub> + R<sub>out</sub> = Z<sub>0</sub></li>
                                            <li><strong>优点：</strong>功耗低，单端点负载最佳</li>
                                            <li><strong>缺点：</strong>不适合多负载</li>
                                            <li><strong>应用：</strong>点对点高速总线（DDR, PCIe）</li>
                                        </ul>
                                    </div>

                                    <div class="method-card">
                                        <h7>2. 并联端接（负载端匹配）</h7>
                                        <ul>
                                            <li><strong>原理：</strong>R<sub>term</sub> = Z<sub>0</sub></li>
                                            <li><strong>优点：</strong>反射最小，波形最佳</li>
                                            <li><strong>缺点：</strong>功耗大（DC通路）</li>
                                            <li><strong>应用：</strong>背板，长距离传输</li>
                                        </ul>
                                    </div>

                                    <div class="method-card">
                                        <h7>3. Thevenin端接</h7>
                                        <ul>
                                            <li><strong>原理：</strong>R1||R2 = Z<sub>0</sub>, 中心电压可调</li>
                                            <li><strong>优点：</strong>可设置直流偏置</li>
                                            <li><strong>缺点：</strong>仍有DC功耗</li>
                                            <li><strong>应用：</strong>ECL, PECL逻辑</li>
                                        </ul>
                                    </div>

                                    <div class="method-card">
                                        <h7>4. AC端接</h7>
                                        <ul>
                                            <li><strong>原理：</strong>R + C串联，C隔直流</li>
                                            <li><strong>优点：</strong>无DC功耗</li>
                                            <li><strong>缺点：</strong>RC时间常数需匹配</li>
                                            <li><strong>应用：</strong>LVDS, CML差分信号</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="crosstalk-analysis">
                                <h5>串扰分析与控制</h5>

                                <p><strong>近端串扰（NEXT）：</strong></p>
                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$V_{NEXT} = \\frac{K_{mutual} \\cdot L \\cdot t_r}{4 \\cdot Z_0}$$
                                        <p class="formula-desc">
                                            K<sub>mutual</sub>: 互感耦合系数<br>
                                            L: 耦合长度<br>
                                            t<sub>r</sub>: 上升时间
                                        </p>
                                    </div>
                                </div>

                                <p><strong>远端串扰（FEXT）：</strong></p>
                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$V_{FEXT} = K_{mutual} \\cdot L \\cdot \\frac{\\Delta V}{Z_0} \\cdot \\frac{1}{2}$$
                                    </div>
                                </div>

                                <div class="crosstalk-control">
                                    <h6>串扰抑制技术</h6>
                                    <table class="control-table">
                                        <tr>
                                            <td><strong>3W规则：</strong></td>
                                            <td>线间距≥3倍线宽，串扰降低70%</td>
                                        </tr>
                                        <tr>
                                            <td><strong>5W规则：</strong></td>
                                            <td>线间距≥5倍线宽，串扰降低90%</td>
                                        </tr>
                                        <tr>
                                            <td><strong>保护地线：</strong></td>
                                            <td>敏感信号两侧走接地线</td>
                                        </tr>
                                        <tr>
                                            <td><strong>差分对：</strong></td>
                                            <td>紧耦合差分，共模噪声抑制</td>
                                        </tr>
                                        <tr>
                                            <td><strong>层间隔离：</strong></td>
                                            <td>正交布线，减少层间耦合</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <div class="eye-diagram">
                                <h5>眼图与抖动分析</h5>

                                <p><strong>眼图关键参数：</strong></p>
                                <ul>
                                    <li><strong>眼高（Eye Height）：</strong>噪声裕量，典型要求>30% UI</li>
                                    <li><strong>眼宽（Eye Width）：</strong>定时裕量，典型要求>60% UI</li>
                                    <li><strong>眼交叉点（Crossing Percentage）：</strong>理想50%</li>
                                </ul>

                                <p><strong>抖动分类：</strong></p>
                                <div class="jitter-types">
                                    <div class="jitter-card">
                                        <h7>随机抖动（RJ）</h7>
                                        <ul>
                                            <li>高斯分布，无界</li>
                                            <li>来源：热噪声、散粒噪声</li>
                                            <li>表示：RMS值（典型1~5ps）</li>
                                        </ul>
                                    </div>

                                    <div class="jitter-card">
                                        <h7>确定性抖动（DJ）</h7>
                                        <ul>
                                            <li>有界，峰峰值</li>
                                            <li>来源：ISI、串扰、EMI</li>
                                            <li>可通过设计消除</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="formula-box">
                                    <div class="formula-title">总抖动计算</div>
                                    <div class="formula-content">
                                        $$TJ = DJ + RJ \\times Q(BER)$$
                                        <p class="formula-desc">
                                            BER=10<sup>-12</sup>时，Q(BER)≈14<br>
                                            BER=10<sup>-15</sup>时，Q(BER)≈18
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }
            ]
        }
    };

    /**
     * Public API - 加载深度内容
     */
    window.AdvancedContent = {
        basic: basicAdvancedContent,
        intermediate: intermediateAdvancedContent,
        advanced: advancedContent,

        /**
         * 动态插入内容到页面
         */
        loadContent: function(level, topic) {
            let content;
            switch(level) {
                case 'basic':
                    content = basicAdvancedContent[topic];
                    break;
                case 'intermediate':
                    content = intermediateAdvancedContent[topic];
                    break;
                case 'advanced':
                    content = advancedContent[topic];
                    break;
                default:
                    console.error('Unknown level:', level);
                    return;
            }

            if (!content) {
                console.error('Content not found:', topic);
                return;
            }

            return content;
        },

        /**
         * 获取所有可用主题
         */
        getTopics: function(level) {
            switch(level) {
                case 'basic':
                    return Object.keys(basicAdvancedContent);
                case 'intermediate':
                    return Object.keys(intermediateAdvancedContent);
                case 'advanced':
                    return Object.keys(advancedContent);
                default:
                    return [];
            }
        }
    };

    console.log('📚 Advanced Content Module loaded');
    console.log('Available topics:');
    console.log('- Basic:', Object.keys(basicAdvancedContent));
    console.log('- Intermediate:', Object.keys(intermediateAdvancedContent));
    console.log('- Advanced:', Object.keys(advancedContent));

})();
