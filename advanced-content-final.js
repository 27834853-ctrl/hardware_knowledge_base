/**
 * Advanced Content - Final Module
 * Hardware Engineer Knowledge Base
 * 高级篇完整内容：PCB叠层设计、时钟架构、电源完整性
 */

(function() {
    'use strict';

    /**
     * 高级篇 - PCB叠层设计
     */
    const pcbStackupDesign = {
        title: 'PCB叠层设计与信号完整性',
        icon: '📐',
        description: '多层PCB叠层设计原则、信号层规划、阻抗控制',
        sections: [
            {
                heading: '1. PCB叠层基础理论',
                content: `
                    <h6>1.1 叠层设计目标</h6>
                    <ul>
                        <li><strong>信号完整性</strong>：控制阻抗，减少反射和串扰</li>
                        <li><strong>电源完整性</strong>：降低电源阻抗，减少噪声</li>
                        <li><strong>EMC性能</strong>：提供返回路径，减少辐射</li>
                        <li><strong>热管理</strong>：优化散热路径</li>
                        <li><strong>成本控制</strong>：平衡性能与成本</li>
                    </ul>

                    <h6>1.2 叠层类型</h6>
                    <div class="comparison-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>层数</th>
                                    <th>典型叠层</th>
                                    <th>应用场景</th>
                                    <th>阻抗控制</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>4层</td>
                                    <td>Sig-GND-PWR-Sig</td>
                                    <td>简单数字电路</td>
                                    <td>单端：50Ω，差分：100Ω</td>
                                </tr>
                                <tr>
                                    <td>6层</td>
                                    <td>Sig-GND-Sig-PWR-GND-Sig</td>
                                    <td>中等复杂度，混合信号</td>
                                    <td>更好的阻抗控制</td>
                                </tr>
                                <tr>
                                    <td>8层</td>
                                    <td>Sig-GND-Sig-PWR-PWR-Sig-GND-Sig</td>
                                    <td>高速数字，多电源域</td>
                                    <td>最佳SI/PI性能</td>
                                </tr>
                                <tr>
                                    <td>10+层</td>
                                    <td>多信号/电源/地层组合</td>
                                    <td>服务器，高性能计算</td>
                                    <td>极致性能</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h6>1.3 关键设计参数</h6>
                    <div class="formula-box">
                        <div class="formula-title">微带线（Microstrip）特性阻抗</div>
                        $Z_0 = \\frac{87}{\\sqrt{\\varepsilon_r + 1.41}} \\ln\\left(\\frac{5.98h}{0.8w + t}\\right)$

                        <p class="formula-desc">
                            参数说明：<br>
                            • εr：介质相对介电常数<br>
                            • h：介质厚度（mil或mm）<br>
                            • w：走线宽度<br>
                            • t：铜厚
                        </p>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">带状线（Stripline）特性阻抗</div>
                        $Z_0 = \\frac{60}{\\sqrt{\\varepsilon_r}} \\ln\\left(\\frac{4h}{0.67\\pi(0.8w + t)}\\right)$

                        <p class="formula-desc">
                            带状线位于两个参考平面之间，提供更好的EMI性能
                        </p>
                    </div>

                    <div class="calculation-example">
                        <h7>阻抗计算实例：6层板微带线</h7>
                        <p><strong>设计目标</strong>：50Ω单端阻抗</p>
                        <p><strong>叠层参数</strong>：</p>
                        <ul>
                            <li>介质：FR4，εr = 4.2</li>
                            <li>介质厚度：h = 5mil (0.127mm)</li>
                            <li>铜厚：t = 1.4mil (35μm, 1oz)</li>
                        </ul>

                        <p><strong>计算步骤</strong>：</p>
                        <div class="code-block">
Z₀ = 50Ω (目标)
εr = 4.2
h = 5mil
t = 1.4mil

反向求解w：
50 = 87/√(4.2+1.41) × ln(5.98×5/(0.8w+1.4))
50 = 36.7 × ln(29.9/(0.8w+1.4))

ln(29.9/(0.8w+1.4)) = 1.363
29.9/(0.8w+1.4) = 3.91
0.8w + 1.4 = 7.65
w = 7.81mil ≈ 8mil (0.2mm)
                        </div>

                        <p><strong>设计结果</strong>：走线宽度 w = 8mil (0.2mm)</p>
                        <p><strong>验证</strong>：使用阻抗计算工具（Polar Si9000）精确验证</p>
                    </div>
                `
            },
            {
                heading: '2. 差分信号设计',
                content: `
                    <h6>2.1 差分对阻抗</h6>
                    <div class="formula-box">
                        <div class="formula-title">差分阻抗</div>
                        $Z_{diff} = 2 \\times Z_0 \\times \\left(1 - \\frac{S^{0.48}}{10 \\times h^{0.96}}\\right)^{-1}$

                        <p class="formula-desc">
                            其中：<br>
                            • Z₀：单端阻抗<br>
                            • S：线间距<br>
                            • h：介质厚度<br>
                            <br>
                            常见差分阻抗：<br>
                            • USB 2.0: 90Ω ±10%<br>
                            • USB 3.0: 90Ω ±10%<br>
                            • PCIe: 85Ω ±15%<br>
                            • HDMI: 100Ω ±10%<br>
                            • LVDS: 100Ω ±10%
                        </p>
                    </div>

                    <h6>2.2 差分对设计规则</h6>
                    <div class="design-guidelines">
                        <h7>关键设计要点</h7>
                        <ul>
                            <li><strong>间距控制</strong>：
                                <ul>
                                    <li>线间距 S = 2～3倍线宽</li>
                                    <li>过小：制造困难，阻抗偏低</li>
                                    <li>过大：共模抑制变差</li>
                                </ul>
                            </li>
                            <li><strong>长度匹配</strong>：
                                <ul>
                                    <li>组内匹配：±5mil (0.127mm)</li>
                                    <li>高速接口（>1Gbps）：±1mil</li>
                                    <li>匹配方式：蛇形走线，避免直角</li>
                                </ul>
                            </li>
                            <li><strong>耦合长度</strong>：
                                <ul>
                                    <li>紧耦合区域 ≥ 80%总长度</li>
                                    <li>分离区域 < 500mil</li>
                                </ul>
                            </li>
                            <li><strong>过孔使用</strong>：
                                <ul>
                                    <li>成对打孔，对称布局</li>
                                    <li>反焊盘直径：20～30mil</li>
                                    <li>GND via距离：10～15mil</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div class="calculation-example">
                        <h7>USB 3.0差分对设计实例</h7>
                        <p><strong>规格要求</strong>：</p>
                        <ul>
                            <li>差分阻抗：90Ω ±10%</li>
                            <li>速率：5Gbps (500ps上升时间)</li>
                            <li>长度匹配：±1mil</li>
                        </ul>

                        <p><strong>6层板叠层</strong>：</p>
                        <div class="code-block">
L1: Signal (Top)        ← USB差分对走这层
L2: GND                 ← 参考平面
L3: Signal (Inner)
L4: Power
L5: GND
L6: Signal (Bottom)

介质：FR4, εr=4.2
L1-L2间距：5mil
铜厚：1oz (1.4mil)
                        </div>

                        <p><strong>阻抗设计</strong>：</p>
                        <div class="code-block">
目标：Zdiff = 90Ω
单端阻抗：Z0 ≈ 50Ω
走线宽度：w = 5mil (0.127mm)
线间距：s = 5mil (0.127mm)

实际差分阻抗：
Zdiff = 2×50×(1-5^0.48/(10×5^0.96))^-1
      = 100×(1-0.254)^-1
      = 100×1.34
      = 89.5Ω ✓ (在90Ω±10%范围内)
                        </div>

                        <p><strong>布线策略</strong>：</p>
                        <ul>
                            <li>总长度：< 6英寸（152mm）</li>
                            <li>等长误差：±0.5mil</li>
                            <li>弧形走线：R ≥ 3倍线宽 = 15mil</li>
                            <li>换层：使用GND via包地</li>
                        </ul>
                    </div>
                `
            },
            {
                heading: '3. 电源平面设计',
                content: `
                    <h6>3.1 电源/地平面阻抗</h6>
                    <div class="formula-box">
                        <div class="formula-title">平行板电容</div>
                        $C = \\frac{\\varepsilon_0 \\varepsilon_r A}{d}$

                        <p class="formula-desc">
                            其中：<br>
                            • ε₀ = 8.854×10⁻¹² F/m（真空介电常数）<br>
                            • εr：相对介电常数（FR4约4.2）<br>
                            • A：平面面积 (m²)<br>
                            • d：平面间距 (m)
                        </p>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">平面自谐振频率</div>
                        $f_0 = \\frac{c}{2\\sqrt{\\varepsilon_r}\\sqrt{L^2 + W^2}}$

                        <p class="formula-desc">
                            • c：光速（3×10⁸ m/s）<br>
                            • L, W：板长、宽<br>
                            • 典型值：100～500MHz
                        </p>
                    </div>

                    <div class="calculation-example">
                        <h7>电源平面电容计算</h7>
                        <p><strong>条件</strong>：</p>
                        <ul>
                            <li>板尺寸：100mm × 100mm</li>
                            <li>平面间距：d = 100μm (4mil)</li>
                            <li>介质：FR4, εr = 4.2</li>
                        </ul>

                        <p><strong>计算</strong>：</p>
                        <div class="code-block">
A = 0.1m × 0.1m = 0.01 m²
d = 100×10⁻⁶ m
εr = 4.2
ε₀ = 8.854×10⁻¹² F/m

C = (8.854×10⁻¹² × 4.2 × 0.01) / (100×10⁻⁶)
  = 3.72×10⁻⁹ F
  = 3.72 nF
                        </div>

                        <p><strong>自谐振频率</strong>：</p>
                        <div class="code-block">
f₀ = 3×10⁸/(2×√4.2×√(0.1²+0.1²))
   = 3×10⁸/(2×2.05×0.141)
   = 5.18×10⁸ Hz
   = 518 MHz
                        </div>

                        <p><strong>结论</strong>：</p>
                        <ul>
                            <li>平面电容：3.72nF（等效去耦电容）</li>
                            <li>有效频率范围：DC～500MHz</li>
                            <li>高频段需要额外陶瓷电容</li>
                        </ul>
                    </div>

                    <h6>3.2 去耦电容设计</h6>
                    <div class="design-guidelines">
                        <h7>去耦电容选择策略</h7>
                        <table>
                            <thead>
                                <tr>
                                    <th>频率范围</th>
                                    <th>电容值</th>
                                    <th>类型</th>
                                    <th>数量</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>DC ~ 100kHz</td>
                                    <td>10～100μF</td>
                                    <td>钽电容/电解电容</td>
                                    <td>每电源域1～2个</td>
                                </tr>
                                <tr>
                                    <td>100kHz ~ 10MHz</td>
                                    <td>1～10μF</td>
                                    <td>陶瓷电容(X5R/X7R)</td>
                                    <td>每电源域2～4个</td>
                                </tr>
                                <tr>
                                    <td>10MHz ~ 100MHz</td>
                                    <td>100nF (0.1μF)</td>
                                    <td>MLCC (0603/0805)</td>
                                    <td>每IC 1～2个</td>
                                </tr>
                                <tr>
                                    <td>100MHz ~ 1GHz</td>
                                    <td>10nF (0.01μF)</td>
                                    <td>MLCC (0402/0603)</td>
                                    <td>高速IC每电源引脚</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">去耦电容自谐振频率</div>
                        $f_{res} = \\frac{1}{2\\pi\\sqrt{LC}}$

                        <p class="formula-desc">
                            寄生电感影响：<br>
                            • 0402封装：L ≈ 0.4nH<br>
                            • 0603封装：L ≈ 0.6nH<br>
                            • 0805封装：L ≈ 1.0nH<br>
                            <br>
                            0.1μF/0603电容：<br>
                            f_res = 1/(2π√(0.6nH × 100nF)) = 65MHz
                        </p>
                    </div>
                `
            }
        ]
    };

    /**
     * 高级篇 - 时钟架构设计
     */
    const clockArchitecture = {
        title: '高速时钟架构与抖动分析',
        icon: '⏱️',
        description: '时钟树设计、抖动类型、相位噪声、时钟分配网络',
        sections: [
            {
                heading: '1. 时钟抖动理论',
                content: `
                    <h6>1.1 抖动分类</h6>
                    <div class="concept-box">
                        <h7>时钟抖动（Jitter）</h7>
                        <p>时钟边沿相对于理想位置的时间偏差</p>

                        <ul>
                            <li><strong>周期抖动（Period Jitter）</strong>：
                                <p>相邻周期的时间变化</p>
                                $J_{period} = T_{measured} - T_{ideal}$
                            </li>
                            <li><strong>周期间抖动（Cycle-to-Cycle Jitter）</strong>：
                                <p>连续两个周期之间的差异</p>
                                $J_{c2c} = |T_n - T_{n-1}|$
                            </li>
                            <li><strong>长期抖动（Long-term Jitter / N-cycle Jitter）</strong>：
                                <p>N个周期累积的抖动</p>
                                $J_{N} = T_{N-cycles} - N \\times T_{ideal}$
                            </li>
                        </ul>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">RMS抖动与峰峰值抖动</div>
                        $J_{RMS} = \\sqrt{\\frac{1}{N}\\sum_{i=1}^{N}(T_i - T_{avg})^2}$
                        <br><br>
                        $J_{pp} \\approx 14 \\times J_{RMS}$ <span style="color: #666;">(对于高斯分布)</span>

                        <p class="formula-desc">
                            工程经验：<br>
                            • RMS抖动：统计特性，用于链路预算<br>
                            • 峰峰值：最坏情况，用于时序验证<br>
                            • BER = 10⁻¹²时，J_pp ≈ 14×J_RMS
                        </p>
                    </div>

                    <h6>1.2 抖动来源</h6>
                    <div class="comparison-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>抖动类型</th>
                                    <th>原因</th>
                                    <th>典型值</th>
                                    <th>缓解方法</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>随机抖动(RJ)</td>
                                    <td>热噪声、散粒噪声</td>
                                    <td>0.1～1ps RMS</td>
                                    <td>低噪声设计、滤波</td>
                                </tr>
                                <tr>
                                    <td>确定性抖动(DJ)</td>
                                    <td>串扰、ISI、EMI</td>
                                    <td>5～50ps pk-pk</td>
                                    <td>SI优化、屏蔽</td>
                                </tr>
                                <tr>
                                    <td>周期性抖动(PJ)</td>
                                    <td>电源噪声、开关干扰</td>
                                    <td>10～100ps</td>
                                    <td>电源滤波、去耦</td>
                                </tr>
                                <tr>
                                    <td>占空比失真(DCD)</td>
                                    <td>上升/下降时间不匹配</td>
                                    <td>1～5%</td>
                                    <td>驱动强度平衡</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="calculation-example">
                        <h7>DDR4时钟抖动分析</h7>
                        <p><strong>DDR4-3200 时序要求</strong>：</p>
                        <ul>
                            <li>时钟频率：1600MHz</li>
                            <li>周期：T = 625ps</li>
                            <li>抖动预算：±25ps (UI的±4%)</li>
                        </ul>

                        <p><strong>实测抖动数据</strong>：</p>
                        <div class="code-block">
测量条件：1000个周期采样
RMS抖动：J_RMS = 2.5ps
周期间抖动：J_c2c = 8ps (max)

计算峰峰值抖动：
J_pp = 14 × J_RMS = 14 × 2.5ps = 35ps

抖动余量分析：
预算：±25ps → 50ps范围
实测：35ps
余量：50 - 35 = 15ps (30%余量) ✓
                        </div>

                        <p><strong>结论</strong>：</p>
                        <ul>
                            <li>时钟抖动满足DDR4-3200规范</li>
                            <li>有30%设计余量</li>
                            <li>可通过眼图验证时序裕量</li>
                        </ul>
                    </div>

                    <h6>1.3 相位噪声</h6>
                    <div class="formula-box">
                        <div class="formula-title">相位噪声定义</div>
                        $\\mathcal{L}(f_m) = 10\\log\\left(\\frac{P_{sideband}(f_0 \\pm f_m, 1Hz)}{P_{carrier}}\\right)$ <span style="color: #666;">dBc/Hz</span>

                        <p class="formula-desc">
                            其中：<br>
                            • f₀：载波频率<br>
                            • f_m：偏移频率<br>
                            • 单位：dBc/Hz（相对载波的dB值，1Hz带宽）
                        </p>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">相位噪声与抖动转换</div>
                        $J_{RMS} = \\frac{1}{2\\pi f_0}\\sqrt{2\\int_{f_1}^{f_2}10^{\\mathcal{L}(f)/10}df}$

                        <p class="formula-desc">
                            积分范围：<br>
                            • f₁：下限频率（通常10kHz）<br>
                            • f₂：上限频率（通常Nyquist频率）
                        </p>
                    </div>

                    <div class="calculation-example">
                        <h7>100MHz时钟相位噪声计算</h7>
                        <p><strong>相位噪声曲线</strong>：</p>
                        <div class="code-block">
频率偏移    相位噪声
10kHz      -90 dBc/Hz
100kHz     -110 dBc/Hz
1MHz       -130 dBc/Hz
10MHz      -150 dBc/Hz
                        </div>

                        <p><strong>简化积分计算</strong>（分段近似）：</p>
                        <div class="code-block">
段1: 10kHz～100kHz, avg -100dBc/Hz
    P₁ = 10^(-100/10) × 90kHz = 9×10⁻¹⁵

段2: 100kHz～1MHz, avg -120dBc/Hz
    P₂ = 10^(-120/10) × 900kHz = 9×10⁻¹⁶

段3: 1MHz～10MHz, avg -140dBc/Hz
    P₃ = 10^(-140/10) × 9MHz = 9×10⁻¹⁷

总功率: P_total = P₁ + P₂ + P₃ ≈ 1×10⁻¹⁴

RMS抖动:
J_RMS = 1/(2π×100MHz) × √(2×10⁻¹⁴)
      = 1.59×10⁻⁹ × 4.47×10⁻⁷
      = 0.71ps
                        </div>

                        <p><strong>结论</strong>：该100MHz时钟源RMS抖动约0.7ps</p>
                    </div>
                `
            },
            {
                heading: '2. 时钟分配网络',
                content: `
                    <h6>2.1 时钟树拓扑</h6>
                    <div class="comparison-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>拓扑类型</th>
                                    <th>结构</th>
                                    <th>优点</th>
                                    <th>缺点</th>
                                    <th>应用</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>星型(Star)</td>
                                    <td>一对多扇出</td>
                                    <td>延迟可控，skew最小</td>
                                    <td>布线面积大</td>
                                    <td>少量负载（<8）</td>
                                </tr>
                                <tr>
                                    <td>H树(H-tree)</td>
                                    <td>对称二叉树</td>
                                    <td>延迟平衡，skew小</td>
                                    <td>布线复杂</td>
                                    <td>FPGA/ASIC片内</td>
                                </tr>
                                <tr>
                                    <td>菊花链(Daisy Chain)</td>
                                    <td>串行级联</td>
                                    <td>布线简单</td>
                                    <td>延迟累积，skew大</td>
                                    <td>DDR内存（fly-by）</td>
                                </tr>
                                <tr>
                                    <td>缓冲树(Buffered Tree)</td>
                                    <td>多级buffer</td>
                                    <td>大扇出，可调延迟</td>
                                    <td>抖动累积，功耗高</td>
                                    <td>板级时钟分配</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h6>2.2 时钟偏斜（Clock Skew）</h6>
                    <div class="formula-box">
                        <div class="formula-title">时钟偏斜定义</div>
                        $Skew = |T_{arrival,max} - T_{arrival,min}|$

                        <p class="formula-desc">
                            同一时钟信号到达不同负载的时间差
                        </p>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">时序余量计算</div>
                        $T_{setup} = T_{clock} - T_{logic} - T_{skew} - T_{jitter} - T_{margin}$

                        <p class="formula-desc">
                            时序约束：<br>
                            • T_setup > 0（建立时间满足）<br>
                            • T_hold > T_skew（保持时间满足）
                        </p>
                    </div>

                    <div class="calculation-example">
                        <h7>DDR4 Fly-by拓扑Skew分析</h7>
                        <p><strong>拓扑结构</strong>：</p>
                        <div class="code-block">
Controller → DRAM1 → DRAM2 → DRAM3 → DRAM4
            (30mm)  (30mm)  (30mm)  (30mm)
                        </div>

                        <p><strong>传播延迟计算</strong>：</p>
                        <div class="code-block">
PCB传播速度：v = c/√εeff
εeff ≈ 3.3 (微带线)
v = 3×10⁸/√3.3 = 1.65×10⁸ m/s
延迟：t_d = 6ps/mm

各DRAM到达时间：
DRAM1: 30mm × 6ps/mm = 180ps
DRAM2: 60mm × 6ps/mm = 360ps
DRAM3: 90mm × 6ps/mm = 540ps
DRAM4: 120mm × 6ps/mm = 720ps

时钟偏斜：
Skew = 720 - 180 = 540ps
                        </div>

                        <p><strong>写均衡（Write Leveling）</strong>：</p>
                        <div class="code-block">
Controller通过调整各DRAM的DQS延迟补偿skew：
DRAM1: +540ps
DRAM2: +360ps
DRAM3: +180ps
DRAM4: 0ps (reference)

补偿后skew < 50ps ✓
                        </div>
                    </div>

                    <h6>2.3 时钟质量指标</h6>
                    <div class="design-guidelines">
                        <h7>行业标准时钟质量要求</h7>
                        <table>
                            <thead>
                                <tr>
                                    <th>应用</th>
                                    <th>频率</th>
                                    <th>RMS抖动</th>
                                    <th>相位噪声@10kHz</th>
                                    <th>时钟源</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>DDR4-3200</td>
                                    <td>1600MHz</td>
                                    <td>&lt;2ps</td>
                                    <td>&lt;-95dBc/Hz</td>
                                    <td>晶振+PLL</td>
                                </tr>
                                <tr>
                                    <td>PCIe Gen3</td>
                                    <td>125MHz</td>
                                    <td>&lt;1ps</td>
                                    <td>&lt;-110dBc/Hz</td>
                                    <td>低抖动晶振</td>
                                </tr>
                                <tr>
                                    <td>10G Ethernet</td>
                                    <td>156.25MHz</td>
                                    <td>&lt;0.5ps</td>
                                    <td>&lt;-120dBc/Hz</td>
                                    <td>TCXO/OCXO</td>
                                </tr>
                                <tr>
                                    <td>USB 3.0</td>
                                    <td>125MHz</td>
                                    <td>&lt;3ps</td>
                                    <td>&lt;-90dBc/Hz</td>
                                    <td>晶振</td>
                                </tr>
                                <tr>
                                    <td>ADC采样时钟</td>
                                    <td>100MHz</td>
                                    <td>&lt;0.1ps</td>
                                    <td>&lt;-140dBc/Hz</td>
                                    <td>专用时钟IC</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `
            },
            {
                heading: '3. PLL设计基础',
                content: `
                    <h6>3.1 PLL基本原理</h6>
                    <div class="concept-box">
                        <h7>锁相环（Phase-Locked Loop）</h7>
                        <p>通过反馈控制使输出频率与输入参考频率保持固定相位关系</p>

                        <p><strong>基本组成</strong>：</p>
                        <ul>
                            <li><strong>鉴相器（PFD）</strong>：比较参考与反馈相位</li>
                            <li><strong>电荷泵（CP）</strong>：将相位差转换为电流</li>
                            <li><strong>环路滤波器（LPF）</strong>：积分滤波，控制电压</li>
                            <li><strong>压控振荡器（VCO）</strong>：电压控制频率</li>
                            <li><strong>分频器</strong>：反馈分频，倍频输出</li>
                        </ul>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">PLL输出频率</div>
                        $f_{out} = f_{ref} \\times \\frac{N}{M}$

                        <p class="formula-desc">
                            其中：<br>
                            • f_ref：参考时钟频率<br>
                            • N：反馈分频比<br>
                            • M：参考分频比<br>
                            <br>
                            鉴相频率：f_PFD = f_ref / M
                        </p>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">环路带宽与阻尼系数</div>
                        $\\omega_n = \\sqrt{\\frac{K_{PFD} \\cdot K_{VCO}}{N}}$ <span style="color: #666;">(自然频率)</span>
                        <br><br>
                        $\\zeta = \\frac{R}{2}\\sqrt{\\frac{K_{PFD} \\cdot K_{VCO} \\cdot C}{N}}$ <span style="color: #666;">(阻尼系数)</span>

                        <p class="formula-desc">
                            设计准则：<br>
                            • ζ = 0.707（临界阻尼）：最快稳定<br>
                            • ωn = BW/10：环路带宽约为自然频率的1/10<br>
                            • BW &lt; f_PFD/10：避免参考杂散
                        </p>
                    </div>

                    <div class="calculation-example">
                        <h7>PLL设计实例：100MHz → 2GHz</h7>
                        <p><strong>设计要求</strong>：</p>
                        <ul>
                            <li>输入：100MHz参考时钟</li>
                            <li>输出：2GHz</li>
                            <li>抖动：&lt;1ps RMS</li>
                        </ul>

                        <p><strong>参数选择</strong>：</p>
                        <div class="code-block">
倍频比：N = 2000/100 = 20
参考分频：M = 1 (不分频)
鉴相频率：f_PFD = 100MHz

VCO参数：
K_VCO = 500MHz/V
调谐范围：1.8～2.2GHz

环路滤波器设计：
目标带宽：BW = 1MHz (f_PFD/100)
阻尼系数：ζ = 0.707

计算自然频率：
ωn = 2π × BW/10 = 6.28×10⁵ rad/s

电荷泵电流：
I_CP = 1mA

环路滤波器参数：
C = I_CP/(2π × BW × K_VCO × N)
  = 10⁻³/(6.28×10⁶ × 5×10⁸ × 20)
  = 159pF

R = 2ζ/(ωn × C)
  = 2×0.707/(6.28×10⁵ × 159×10⁻¹²)
  = 14.1kΩ
                        </div>

                        <p><strong>性能预测</strong>：</p>
                        <div class="code-block">
锁定时间：t_lock ≈ 500/BW = 500μs
输出抖动：J_out ≈ J_VCO/(√(2×BW×T))
                 ≈ 10ps/(√(2×10⁶×1)) = 0.7ps ✓
                        </div>
                    </div>

                    <h6>3.2 PLL抖动传递函数</h6>
                    <div class="formula-box">
                        <div class="formula-title">抖动传递特性</div>
                        <p><strong>低频抖动</strong>（f &lt; 环路带宽）：</p>
                        $J_{out,LF} = J_{ref} \\times \\frac{N}{M}$ <span style="color: #666;">(跟随参考)</span>

                        <p><strong>高频抖动</strong>（f &gt; 环路带宽）：</p>
                        $J_{out,HF} = J_{VCO}$ <span style="color: #666;">(由VCO决定)</span>

                        <p class="formula-desc">
                            设计要点：<br>
                            • 参考时钟要求低频相位噪声优异<br>
                            • VCO要求高频相位噪声优异<br>
                            • 环路带宽是关键设计参数
                        </p>
                    </div>
                `
            }
        ]
    };

    /**
     * 高级篇 - 电源完整性
     */
    const powerIntegrity = {
        title: '电源完整性设计（PI）',
        icon: '⚡',
        description: '目标阻抗、PDN设计、电源噪声分析',
        sections: [
            {
                heading: '1. 目标阻抗理论',
                content: `
                    <h6>1.1 目标阻抗计算</h6>
                    <div class="formula-box">
                        <div class="formula-title">目标阻抗定义</div>
                        $Z_{target} = \\frac{V_{ripple}}{I_{transient}} = \\frac{V_{ripple}}{\\frac{dI}{dt} \\times t_{response}}$

                        <p class="formula-desc">
                            其中：<br>
                            • V_ripple：允许的电源纹波电压<br>
                            • I_transient：瞬态电流变化<br>
                            • dI/dt：电流变化率<br>
                            • t_response：响应时间
                        </p>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">简化计算公式</div>
                        $Z_{target} = \\frac{V_{ripple\\_\\%} \\times V_{DD}}{I_{max}}$

                        <p class="formula-desc">
                            典型值：<br>
                            • V_ripple = 5% V_DD（数字电路）<br>
                            • V_ripple = 2% V_DD（模拟/射频）<br>
                            • V_ripple = 1% V_DD（高速ADC/DAC）
                        </p>
                    </div>

                    <div class="calculation-example">
                        <h7>FPGA电源目标阻抗计算</h7>
                        <p><strong>FPGA参数</strong>：</p>
                        <ul>
                            <li>核心电压：V_DD = 1.0V</li>
                            <li>最大电流：I_max = 20A</li>
                            <li>电流变化：ΔI = 10A</li>
                            <li>边沿时间：t_edge = 1ns</li>
                            <li>纹波要求：5% V_DD = 50mV</li>
                        </ul>

                        <p><strong>目标阻抗计算</strong>：</p>
                        <div class="code-block">
方法1：稳态计算
Z_target = V_ripple / I_max
         = 0.05V / 20A
         = 2.5mΩ

方法2：瞬态计算
dI/dt = 10A / 1ns = 10⁹ A/s
L_max = V_ripple / (dI/dt)
      = 0.05V / 10⁹
      = 50pH

对应阻抗(100MHz):
Z = 2πfL = 6.28 × 100MHz × 50pH = 31.4mΩ

取严格值：Z_target = 2.5mΩ (DC~10MHz)
                        </div>

                        <p><strong>去耦电容需求</strong>：</p>
                        <div class="code-block">
在100MHz时：
C_required = 1/(2πf × Z_target)
           = 1/(6.28 × 100MHz × 2.5mΩ)
           = 636μF (等效电容)

实际配置：
• 10μF × 20 = 200μF (bulk, 1MHz~10MHz)
• 1μF × 50 = 50μF (10MHz~50MHz)
• 100nF × 100 = 10μF等效 (50MHz~200MHz)
• 平面电容 ≈ 5nF (200MHz+)
                        </div>
                    </div>

                    <h6>1.2 PDN阻抗曲线</h6>
                    <div class="concept-box">
                        <h7>电源分配网络（PDN）频率响应</h7>
                        <p>PDN阻抗随频率变化的特性曲线</p>

                        <p><strong>典型PDN阻抗曲线特征</strong>：</p>
                        <ul>
                            <li><strong>低频区（DC～1MHz）</strong>：
                                <p>由VRM输出阻抗和bulk电容决定</p>
                                <p>Z ≈ R_VRM + R_PCB</p>
                            </li>
                            <li><strong>中频区（1MHz～50MHz）</strong>：
                                <p>bulk/ceramic电容主导</p>
                                <p>Z = 1/(2πfC) - ESR</p>
                            </li>
                            <li><strong>谐振区（50MHz～200MHz）</strong>：
                                <p>电容ESL引起的反谐振峰</p>
                                <p>Z_peak = ESL/ESR</p>
                            </li>
                            <li><strong>高频区（200MHz+）</strong>：
                                <p>平面电容和高频陶瓷电容</p>
                                <p>目标：Z &lt; Z_target</p>
                            </li>
                        </ul>
                    </div>

                    <div class="design-guidelines">
                        <h7>PDN设计目标</h7>
                        <ul>
                            <li>全频段阻抗低于目标阻抗</li>
                            <li>谐振峰不超过目标阻抗2倍</li>
                            <li>避免反谐振点在关键频率</li>
                            <li>使用SPICE/ADS仿真验证</li>
                        </ul>
                    </div>
                `
            },
            {
                heading: '2. 同步开关噪声（SSN）',
                content: `
                    <h6>2.1 SSN原理</h6>
                    <div class="formula-box">
                        <div class="formula-title">地弹（Ground Bounce）</div>
                        $V_{bounce} = L_{ground} \\times \\frac{dI}{dt}$

                        <p class="formula-desc">
                            当多个I/O同时开关时，共用地线电感产生瞬态压降
                        </p>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">电源下垂（Power Droop）</div>
                        $V_{droop} = L_{power} \\times \\frac{dI}{dt} + I_{peak} \\times R_{PDN}$

                        <p class="formula-desc">
                            包含感性成分（瞬态）和阻性成分（稳态）
                        </p>
                    </div>

                    <div class="calculation-example">
                        <h7>SSN计算实例</h7>
                        <p><strong>场景</strong>：32位总线同时翻转</p>
                        <div class="code-block">
参数：
• 每个I/O驱动电流：I_o = 8mA
• 边沿时间：t_r = 1ns
• 封装地线电感：L_gnd = 1nH
• PCB走线电感：L_trace = 0.5nH/cm
• 走线长度：5cm

计算：
总电流变化：ΔI = 32 × 8mA = 256mA
电流变化率：dI/dt = 256mA/1ns = 2.56×10⁸ A/s

总电感：L_total = L_pkg + L_trace
                 = 1nH + 0.5nH/cm × 5cm
                 = 3.5nH

地弹电压：
V_bounce = L × dI/dt
         = 3.5nH × 2.56×10⁸
         = 896mV ⚠️ (接近1V!)
                        </div>

                        <p><strong>缓解措施</strong>：</p>
                        <ul>
                            <li>减小同时开关I/O数量（分组）</li>
                            <li>减缓输出边沿（Slew Rate控制）</li>
                            <li>增加去耦电容（降低高频阻抗）</li>
                            <li>使用多个电源/地引脚（降低电感）</li>
                        </ul>
                    </div>

                    <h6>2.2 Dk/dt噪声</h6>
                    <div class="formula-box">
                        <div class="formula-title">位移电流噪声</div>
                        $I_{displacement} = C_{load} \\times \\frac{dV}{dt}$

                        <p class="formula-desc">
                            高速信号切换时，通过寄生电容的位移电流
                        </p>
                    </div>

                    <div class="calculation-example">
                        <h7>DDR4总线Dk/dt噪声</h7>
                        <div class="code-block">
DDR4-3200数据总线：
• 数据位宽：64位
• 单端电压摆幅：ΔV = 1.2V
• 边沿时间：t_r = 200ps
• 每bit负载电容：C_load = 2pF

单bit位移电流：
I_bit = C × dV/dt
      = 2pF × (1.2V/200ps)
      = 12mA

64位同时开关：
I_total = 64 × 12mA = 768mA

对应地弹（假设L_gnd=2nH）：
V_bounce = 2nH × (768mA/200ps)
         = 2nH × 3.84×10⁹ A/s
         = 7.68mV (可接受)
                        </div>
                    </div>
                `
            },
            {
                heading: '3. VRM设计',
                content: `
                    <h6>3.1 DC-DC转换器拓扑</h6>
                    <div class="comparison-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>拓扑</th>
                                    <th>输出电流</th>
                                    <th>效率</th>
                                    <th>瞬态响应</th>
                                    <th>应用</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Buck (降压)</td>
                                    <td>1～100A+</td>
                                    <td>85～95%</td>
                                    <td>10～50μs</td>
                                    <td>板级主电源</td>
                                </tr>
                                <tr>
                                    <td>Multiphase Buck</td>
                                    <td>50～500A</td>
                                    <td>90～95%</td>
                                    <td>&lt;10μs</td>
                                    <td>CPU/GPU/FPGA</td>
                                </tr>
                                <tr>
                                    <td>LDO</td>
                                    <td>0.1～5A</td>
                                    <td>60～90%</td>
                                    <td>&lt;1μs</td>
                                    <td>低噪声模拟电源</td>
                                </tr>
                                <tr>
                                    <td>Boost (升压)</td>
                                    <td>0.1～10A</td>
                                    <td>85～92%</td>
                                    <td>20～100μs</td>
                                    <td>背光，USB升压</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="formula-box">
                        <div class="formula-title">Buck转换器输出纹波</div>
                        $V_{ripple} = \\frac{V_{out} \\times (V_{in} - V_{out})}{8 \\times L \\times C \\times f_{sw}^2 \\times V_{in}}$

                        <p class="formula-desc">
                            设计变量：<br>
                            • L：输出电感<br>
                            • C：输出电容<br>
                            • f_sw：开关频率
                        </p>
                    </div>

                    <div class="calculation-example">
                        <h7>多相Buck VRM设计</h7>
                        <p><strong>设计要求</strong>：</p>
                        <ul>
                            <li>输入：12V</li>
                            <li>输出：1.0V @ 100A</li>
                            <li>纹波：&lt;10mV</li>
                            <li>效率：>90%</li>
                        </ul>

                        <p><strong>相数选择</strong>：</p>
                        <div class="code-block">
单相最大电流：20～30A
选择4相设计：100A/4 = 25A/相 ✓

相位交错：360°/4 = 90°
输出纹波频率：4 × f_sw
                        </div>

                        <p><strong>元件选择</strong>：</p>
                        <div class="code-block">
开关频率：f_sw = 500kHz
输出纹波频率：4×500kHz = 2MHz

电感值：
L = (V_in - V_out) × D / (ΔI_L × f_sw)
D = V_out/V_in = 1/12 = 0.083
ΔI_L = 0.3 × I_phase = 0.3 × 25A = 7.5A

L = (12-1) × 0.083 / (7.5 × 500kHz)
  = 0.244μH
选择：L = 220nH (每相)

输出电容：
C = ΔI_L / (8 × f_eff × ΔV)
  = 7.5 / (8 × 2MHz × 0.01V)
  = 47μF
选择：22μF × 4 (MLCC, X5R/X7R)

输出阻抗：
Z_out = ESR + 1/(2πfC)
      ≈ 5mΩ + 1/(2π×2MHz×88μF)
      ≈ 5mΩ + 0.9mΩ
      = 5.9mΩ

验证纹波：
V_ripple = I_ripple × Z_out
         = 7.5A × 5.9mΩ
         = 44mV

需要增加输出电容至200μF总量
                        </div>
                    </div>
                `
            }
        ]
    };

    /**
     * 公开API - 添加高级内容到主内容对象
     */
    window.advancedContentFinal = {
        pcbStackup: pcbStackupDesign,
        clockArchitecture: clockArchitecture,
        powerIntegrity: powerIntegrity
    };

    console.log('📚 Advanced Content Final Module loaded');

})();
