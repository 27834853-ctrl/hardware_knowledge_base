/**
 * Intermediate Advanced Content Module
 * Hardware Engineer Knowledge Base
 * Deep intermediate and advanced level content
 */

(function() {
    'use strict';

    /**
     * 中级篇深度内容 - 射频与通信接口
     */
    const intermediateDeepContent = {
        // 射频电路设计
        rfDesign: {
            title: '射频电路设计基础',
            difficulty: '中级',
            readTime: '60分钟',
            sections: [
                {
                    heading: '1. 射频基本概念',
                    content: `
                        <div class="content-block">
                            <h5>S参数（散射参数）</h5>

                            <div class="s-parameter-intro">
                                <p><strong>定义：</strong>在射频频率下，用入射波和反射波描述网络特性比电压电流更方便</p>

                                <div class="formula-box">
                                    <div class="formula-title">2端口网络S参数定义</div>
                                    <div class="formula-content">
                                        $$\\begin{bmatrix} b_1 \\\\ b_2 \\end{bmatrix} = \\begin{bmatrix} S_{11} & S_{12} \\\\ S_{21} & S_{22} \\end{bmatrix} \\begin{bmatrix} a_1 \\\\ a_2 \\end{bmatrix}$$

                                        <p class="formula-desc">
                                            a<sub>i</sub>: 入射波幅度<br>
                                            b<sub>i</sub>: 反射波幅度<br>
                                            S<sub>11</sub>: 输入反射系数（端口2匹配时）<br>
                                            S<sub>21</sub>: 正向传输系数<br>
                                            S<sub>12</sub>: 反向传输系数<br>
                                            S<sub>22</sub>: 输出反射系数（端口1匹配时）
                                        </p>

                                        <div class="s-param-meaning">
                                            <h7>物理意义：</h7>
                                            <ul>
                                                <li>S<sub>11</sub> = b<sub>1</sub>/a<sub>1</sub>|<sub>a₂=0</sub> → 输入端口VSWR，反射损耗</li>
                                                <li>S<sub>21</sub> = b<sub>2</sub>/a<sub>1</sub>|<sub>a₂=0</sub> → 插入增益/损耗</li>
                                                <li>S<sub>12</sub> = b<sub>1</sub>/a<sub>2</sub>|<sub>a₁=0</sub> → 反向隔离</li>
                                                <li>S<sub>22</sub> = b<sub>2</sub>/a<sub>2</sub>|<sub>a₁=0</sub> → 输出端口VSWR</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="s-param-conversions">
                                    <h6>S参数与其他参数的转换</h6>

                                    <p><strong>回波损耗（Return Loss）：</strong></p>
                                    <div class="formula-inline">
                                        $$RL = -20\\log_{10}|S_{11}| \\quad (dB)$$
                                    </div>
                                    <p>RL越大，匹配越好。典型要求：RL > 10dB</p>

                                    <p><strong>驻波比（VSWR）：</strong></p>
                                    <div class="formula-inline">
                                        $$VSWR = \\frac{1 + |S_{11}|}{1 - |S_{11}|}$$
                                    </div>

                                    <table class="conversion-table">
                                        <thead>
                                            <tr>
                                                <th>|S<sub>11</sub>|</th>
                                                <th>VSWR</th>
                                                <th>RL (dB)</th>
                                                <th>反射功率</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>0</td>
                                                <td>1.00</td>
                                                <td>∞</td>
                                                <td>0%</td>
                                            </tr>
                                            <tr>
                                                <td>0.1</td>
                                                <td>1.22</td>
                                                <td>20.0</td>
                                                <td>1%</td>
                                            </tr>
                                            <tr>
                                                <td>0.316</td>
                                                <td>1.93</td>
                                                <td>10.0</td>
                                                <td>10%</td>
                                            </tr>
                                            <tr>
                                                <td>0.5</td>
                                                <td>3.00</td>
                                                <td>6.0</td>
                                                <td>25%</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p><strong>插入损耗（Insertion Loss）：</strong></p>
                                    <div class="formula-inline">
                                        $$IL = -20\\log_{10}|S_{21}| \\quad (dB)$$
                                    </div>

                                    <p><strong>隔离度（Isolation）：</strong></p>
                                    <div class="formula-inline">
                                        $$Isolation = -20\\log_{10}|S_{12}| \\quad (dB)$$
                                    </div>
                                </div>
                            </div>

                            <h5>Smith圆图</h5>

                            <div class="smith-chart-theory">
                                <p><strong>核心思想：</strong>将复阻抗平面映射到圆图上</p>

                                <div class="formula-box">
                                    <div class="formula-title">归一化阻抗与反射系数</div>
                                    <div class="formula-content">
                                        $$z = r + jx = \\frac{Z}{Z_0}$$
                                        $$\\Gamma = \\frac{Z - Z_0}{Z + Z_0} = \\frac{z - 1}{z + 1}$$

                                        <p class="formula-desc">
                                            z: 归一化阻抗<br>
                                            Γ: 反射系数（复数）<br>
                                            |Γ|: 反射系数幅度（0~1）<br>
                                            ∠Γ: 反射系数相位
                                        </p>

                                        <div class="smith-properties">
                                            <h7>Smith圆图特性</h7>
                                            <ul>
                                                <li>圆图中心：z=1（完美匹配，Γ=0）</li>
                                                <li>圆图边缘：|Γ|=1（全反射）</li>
                                                <li>实轴：纯电阻</li>
                                                <li>上半圆：感性（+jX）</li>
                                                <li>下半圆：容性（-jX）</li>
                                                <li>顺时针旋转：向负载方向</li>
                                                <li>逆时针旋转：向源方向</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="impedance-matching">
                                    <h6>阻抗匹配技术</h6>

                                    <div class="matching-method">
                                        <h7>1. L型匹配网络</h7>
                                        <p>用两个元件（LC）实现匹配</p>
                                        <p><strong>设计步骤：</strong></p>
                                        <ol>
                                            <li>确定源阻抗Z<sub>S</sub>和负载阻抗Z<sub>L</sub></li>
                                            <li>计算品质因数Q = √(R<sub>high</sub>/R<sub>low</sub> - 1)</li>
                                            <li>串联元件：X<sub>series</sub> = Q × R<sub>low</sub></li>
                                            <li>并联元件：X<sub>parallel</sub> = R<sub>high</sub> / Q</li>
                                        </ol>

                                        <div class="matching-example">
                                            <h8><i class="fas fa-calculator"></i> 匹配实例</h8>
                                            <p><strong>问题：</strong>将10Ω源阻抗匹配到50Ω（900MHz）</p>
                                            <p><strong>解：</strong></p>
                                            <div class="calculation-steps">
                                                <p>1. Q = √(50/10 - 1) = 2</p>
                                                <p>2. X<sub>series</sub> = 2 × 10 = 20Ω（电感）</p>
                                                <p>   L = X<sub>L</sub>/(2πf) = 20/(2π×900MHz) = 3.5nH</p>
                                                <p>3. X<sub>parallel</sub> = 50/2 = 25Ω（电容）</p>
                                                <p>   C = 1/(2πf×X<sub>C</sub>) = 1/(2π×900MHz×25) = 7.1pF</p>
                                            </div>
                                            <p><strong>方案：</strong>3.5nH电感串联 + 7.1pF电容并联</p>
                                        </div>
                                    </div>

                                    <div class="matching-method">
                                        <h7>2. π型匹配网络</h7>
                                        <p>3个元件，提供额外自由度</p>
                                        <p><strong>优点：</strong></p>
                                        <ul>
                                            <li>可独立控制源端和负载端Q值</li>
                                            <li>可实现带通滤波功能</li>
                                            <li>更好的谐波抑制</li>
                                        </ul>
                                    </div>

                                    <div class="matching-method">
                                        <h7>3. 微带线匹配</h7>
                                        <p>利用传输线的阻抗变换特性</p>
                                        <ul>
                                            <li><strong>λ/4变换器：</strong>Z<sub>0</sub> = √(Z<sub>S</sub>×Z<sub>L</sub>)</li>
                                            <li><strong>短截线：</strong>并联或串联短路/开路短截线</li>
                                            <li><strong>双短截线：</strong>两段短截线实现宽带匹配</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <h5>射频放大器设计</h5>

                            <div class="rf-amplifier-design">
                                <h6>LNA（低噪声放大器）设计</h6>

                                <p><strong>关键指标：</strong></p>
                                <ol>
                                    <li><strong>噪声系数（NF）：</strong>越低越好，典型<2dB</li>
                                    <li><strong>增益：</strong>15~25dB</li>
                                    <li><strong>IIP3：</strong>三阶交调截点，典型-5~+10dBm</li>
                                    <li><strong>S<sub>11</sub>：</strong>输入匹配，<-10dB</li>
                                </ol>

                                <div class="formula-box">
                                    <div class="formula-title">Friis公式（级联噪声）</div>
                                    <div class="formula-content">
                                        $$F_{total} = F_1 + \\frac{F_2 - 1}{G_1} + \\frac{F_3 - 1}{G_1 G_2} + ...$$

                                        <p class="formula-desc">
                                            F<sub>i</sub>: 第i级噪声因子（= 10<sup>NF/10</sup>）<br>
                                            G<sub>i</sub>: 第i级功率增益（线性值）<br>
                                            <strong>结论：</strong>首级LNA的噪声性能决定系统噪声
                                        </p>
                                    </div>
                                </div>

                                <div class="design-example">
                                    <h7><i class="fas fa-pencil-ruler"></i> 2.4GHz LNA设计</h7>
                                    <p><strong>指标：</strong>NF<1.5dB, G=20dB, IIP3>0dBm, 50Ω匹配</p>

                                    <p><strong>设计步骤：</strong></p>
                                    <ol>
                                        <li><strong>晶体管选择：</strong>
                                            <ul>
                                                <li>选择低噪声MOSFET或BJT</li>
                                                <li>f<sub>T</sub> >> 2.4GHz，选择f<sub>T</sub> > 20GHz</li>
                                                <li>推荐：ATF-54143 (GaAs MESFET, NF=0.5dB@2GHz)</li>
                                            </ul>
                                        </li>
                                        <li><strong>偏置设计：</strong>
                                            <ul>
                                                <li>工作电流：通常5~20mA</li>
                                                <li>工作在最小噪声点（通过S参数优化）</li>
                                                <li>V<sub>DS</sub> = 2~3V（MOSFET）</li>
                                            </ul>
                                        </li>
                                        <li><strong>输入匹配：</strong>
                                            <ul>
                                                <li>噪声匹配 vs 功率匹配的权衡</li>
                                                <li>通常选择噪声匹配（牺牲少量增益）</li>
                                                <li>源极电感实现噪声匹配</li>
                                            </ul>
                                        </li>
                                        <li><strong>输出匹配：</strong>
                                            <ul>
                                                <li>实现50Ω匹配，最大化功率传输</li>
                                                <li>LC匹配网络</li>
                                            </ul>
                                        </li>
                                        <li><strong>稳定性：</strong>
                                            <ul>
                                                <li>K因子 > 1（Rollet稳定性因子）</li>
                                                <li>|Δ| < 1</li>
                                                <li>必要时加电阻/铁氧体抑制</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>

                                <div class="stability-factor">
                                    <h6>Rollet稳定性因子</h6>
                                    <div class="formula-box">
                                        <div class="formula-content">
                                            $$K = \\frac{1 - |S_{11}|^2 - |S_{22}|^2 + |\\Delta|^2}{2|S_{12}||S_{21}|}$$
                                            $$\\Delta = S_{11}S_{22} - S_{12}S_{21}$$

                                            <p class="formula-desc">
                                                稳定条件：K > 1 <strong>且</strong> |Δ| < 1<br>
                                                无条件稳定：所有源和负载阻抗下都稳定
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>非线性失真</h5>

                            <div class="nonlinearity-analysis">
                                <h6>交调失真（IMD）</h6>
                                <p>两个信号f<sub>1</sub>和f<sub>2</sub>通过非线性器件时，产生交调产物：</p>
                                <p><strong>二阶交调：</strong>f<sub>1</sub>±f<sub>2</sub></p>
                                <p><strong>三阶交调：</strong>2f<sub>1</sub>±f<sub>2</sub>, 2f<sub>2</sub>±f<sub>1</sub></p>

                                <div class="formula-box">
                                    <div class="formula-title">三阶截点（IP3）</div>
                                    <div class="formula-content">
                                        $$IIP3(dBm) = P_{in}(dBm) + \\frac{IMD3(dBc)}{2}$$
                                        $$OIP3 = IIP3 + Gain$$

                                        <p class="formula-desc">
                                            IIP3: 输入三阶截点<br>
                                            OIP3: 输出三阶截点<br>
                                            IMD3: 三阶交调产物电平（dBc，相对载波）<br>
                                            <strong>规律：</strong>基波每增加1dB，IMD3增加3dB
                                        </p>
                                    </div>
                                </div>

                                <div class="ip3-example">
                                    <h7><i class="fas fa-calculator"></i> IP3计算实例</h7>
                                    <p><strong>测量条件：</strong></p>
                                    <ul>
                                        <li>输入功率：P<sub>in</sub> = -30dBm（双音，每音）</li>
                                        <li>输出基波：P<sub>out</sub> = -10dBm</li>
                                        <li>三阶交调：P<sub>IMD3</sub> = -70dBm</li>
                                    </ul>
                                    <p><strong>计算：</strong></p>
                                    <div class="calculation-steps">
                                        <p>1. 增益：G = -10 - (-30) = 20dB</p>
                                        <p>2. IMD3相对电平：IMD3 = -70 - (-10) = -60dBc</p>
                                        <p>3. IIP3 = -30 + (-60)/2 = -30 + (-30) = 0dBm</p>
                                        <p>4. OIP3 = IIP3 + G = 0 + 20 = <strong>+20dBm</strong></p>
                                    </div>
                                </div>

                                <div class="linearity-table">
                                    <h7>典型射频器件线性度</h7>
                                    <table class="performance-table">
                                        <thead>
                                            <tr>
                                                <th>器件类型</th>
                                                <th>IIP3 (dBm)</th>
                                                <th>应用</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>LNA</td>
                                                <td>-5 ~ +10</td>
                                                <td>接收前端</td>
                                            </tr>
                                            <tr>
                                                <td>混频器（无源）</td>
                                                <td>+10 ~ +20</td>
                                                <td>频率变换</td>
                                            </tr>
                                            <tr>
                                                <td>混频器（有源）</td>
                                                <td>0 ~ +15</td>
                                                <td>带增益变换</td>
                                            </tr>
                                            <tr>
                                                <td>功率放大器</td>
                                                <td>+20 ~ +40</td>
                                                <td>发射末级</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    heading: '2. 高速通信接口设计',
                    content: `
                        <div class="content-block">
                            <h5>差分信号接口</h5>

                            <div class="differential-interfaces">
                                <h6>LVDS (Low Voltage Differential Signaling)</h6>

                                <div class="lvds-specs">
                                    <p><strong>电气特性：</strong></p>
                                    <table class="interface-table">
                                        <tr>
                                            <td><strong>差分电压</strong></td>
                                            <td>V<sub>OD</sub> = 350mV ± 50mV</td>
                                        </tr>
                                        <tr>
                                            <td><strong>共模电压</strong></td>
                                            <td>V<sub>CM</sub> = 1.2V ± 100mV</td>
                                        </tr>
                                        <tr>
                                            <td><strong>终端电阻</strong></td>
                                            <td>R<sub>T</sub> = 100Ω ± 5%</td>
                                        </tr>
                                        <tr>
                                            <td><strong>驱动电流</strong></td>
                                            <td>I = 3.5mA（恒流源）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>最大速率</strong></td>
                                            <td>1~2Gbps</td>
                                        </tr>
                                    </table>

                                    <div class="formula-box">
                                        <div class="formula-title">功耗优势</div>
                                        <div class="formula-content">
                                            $$P = V_{OD} \\times I = 0.35V \\times 3.5mA = 1.2mW$$

                                            <p class="formula-desc">
                                                相比CMOS：P = C×V²×f，LVDS在高速时功耗更低<br>
                                                3.3V CMOS @500MHz: P ≈ 10pF × (3.3V)² × 500MHz = 54mW
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <h6>USB 3.0/3.1 SuperSpeed</h6>

                                <div class="usb3-specs">
                                    <p><strong>物理层规范：</strong></p>
                                    <table class="protocol-table">
                                        <tr>
                                            <td><strong>数据速率</strong></td>
                                            <td>USB 3.0: 5Gbps<br>USB 3.1: 10Gbps</td>
                                        </tr>
                                        <tr>
                                            <td><strong>编码</strong></td>
                                            <td>8b/10b（3.0）<br>128b/132b（3.1）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>差分阻抗</strong></td>
                                            <td>90Ω ± 7Ω</td>
                                        </tr>
                                        <tr>
                                            <td><strong>差分电压</strong></td>
                                            <td>800~1200mVpp</td>
                                        </tr>
                                        <tr>
                                            <td><strong>共模电压</strong></td>
                                            <td>0V（AC耦合）</td>
                                        </tr>
                                    </table>

                                    <div class="usb3-design">
                                        <h7>PCB设计要求</h7>
                                        <ul>
                                            <li><strong>差分对走线：</strong>
                                                <ul>
                                                    <li>差分阻抗90Ω（通常线宽0.15mm，间距0.15mm）</li>
                                                    <li>长度匹配：±5mil（127μm）</li>
                                                    <li>对内走线长度差：<5mil</li>
                                                </ul>
                                            </li>
                                            <li><strong>过孔控制：</strong>
                                                <ul>
                                                    <li>最小化过孔数量</li>
                                                    <li>差分对过孔对称放置</li>
                                                    <li>过孔残桩需背钻（>3GHz）</li>
                                                </ul>
                                            </li>
                                            <li><strong>参考平面：</strong>
                                                <ul>
                                                    <li>完整的参考地平面</li>
                                                    <li>不跨越分割</li>
                                                    <li>同层优先，减少换层</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <h6>PCIe (PCI Express)</h6>

                                <div class="pcie-architecture">
                                    <p><strong>分层架构：</strong></p>
                                    <ol>
                                        <li><strong>物理层：</strong>差分信号传输</li>
                                        <li><strong>数据链路层：</strong>可靠性保证</li>
                                        <li><strong>事务层：</strong>数据包处理</li>
                                    </ol>

                                    <table class="pcie-generations">
                                        <thead>
                                            <tr>
                                                <th>版本</th>
                                                <th>编码</th>
                                                <th>速率/Lane</th>
                                                <th>x16带宽</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>PCIe 1.0</td>
                                                <td>8b/10b</td>
                                                <td>2.5GT/s (2Gb/s)</td>
                                                <td>4GB/s</td>
                                            </tr>
                                            <tr>
                                                <td>PCIe 2.0</td>
                                                <td>8b/10b</td>
                                                <td>5GT/s (4Gb/s)</td>
                                                <td>8GB/s</td>
                                            </tr>
                                            <tr>
                                                <td>PCIe 3.0</td>
                                                <td>128b/130b</td>
                                                <td>8GT/s (7.877Gb/s)</td>
                                                <td>15.75GB/s</td>
                                            </tr>
                                            <tr>
                                                <td>PCIe 4.0</td>
                                                <td>128b/130b</td>
                                                <td>16GT/s</td>
                                                <td>31.5GB/s</td>
                                            </tr>
                                            <tr>
                                                <td>PCIe 5.0</td>
                                                <td>128b/130b</td>
                                                <td>32GT/s</td>
                                                <td>63GB/s</td>
                                            </tr>
                                            <tr>
                                                <td>PCIe 6.0</td>
                                                <td>FLIT (242B)</td>
                                                <td>64GT/s (PAM4)</td>
                                                <td>128GB/s</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="pcie-design">
                                        <h7>PCIe Gen3/4 设计要点</h7>
                                        <ol>
                                            <li><strong>差分阻抗：</strong>85Ω ± 7Ω</li>
                                            <li><strong>长度匹配：</strong>
                                                <ul>
                                                    <li>对内：±5mil (Gen3), ±3mil (Gen4)</li>
                                                    <li>Lane间：±500mil (Gen3), ±300mil (Gen4)</li>
                                                </ul>
                                            </li>
                                            <li><strong>插入损耗：</strong>
                                                <ul>
                                                    <li>Gen3 @ 4GHz: <-20dB</li>
                                                    <li>Gen4 @ 8GHz: <-28dB</li>
                                                </ul>
                                            </li>
                                            <li><strong>回波损耗：</strong>>-10dB @ Nyquist频率</li>
                                            <li><strong>串扰：</strong>NEXT<-40dB, FEXT<-30dB</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <h5>均衡技术</h5>

                            <div class="equalization">
                                <h6>信道均衡原理</h6>
                                <p>高速信号经过PCB传输后，高频分量衰减严重，导致码间干扰（ISI）</p>

                                <div class="eq-types">
                                    <p><strong>1. 发送端均衡（Pre-emphasis/De-emphasis）</strong></p>
                                    <ul>
                                        <li>预先增强高频分量</li>
                                        <li>补偿信道高频损耗</li>
                                        <li>典型：3-tap FIR滤波器</li>
                                        <li>系数：C<sub>-1</sub>, C<sub>0</sub>, C<sub>+1</sub>（C<sub>0</sub>最大）</li>
                                    </ul>

                                    <p><strong>2. 接收端均衡（CTLE + DFE）</strong></p>

                                    <div class="ctle-section">
                                        <h7>CTLE（连续时间线性均衡）</h7>
                                        <p>高通特性补偿低通信道</p>
                                        <div class="formula-box">
                                            $$H(s) = \\frac{1 + s/\\omega_{z}}{1 + s/\\omega_{p}}$$
                                            <p class="formula-desc">
                                                零点ω<sub>z</sub> < 极点ω<sub>p</sub><br>
                                                提升高频，补偿信道损耗
                                            </p>
                                        </div>
                                    </div>

                                    <div class="dfe-section">
                                        <h7>DFE（判决反馈均衡）</h7>
                                        <p>利用已判决符号消除后续ISI</p>
                                        <div class="formula-box">
                                            $$y[n] = x[n] - \\sum_{k=1}^{N} c_k \\cdot \\hat{x}[n-k]$$
                                            <p class="formula-desc">
                                                x[n]: 输入信号<br>
                                                ŷ[n-k]: 已判决的符号<br>
                                                c<sub>k</sub>: 反馈系数<br>
                                                典型tap数：3~7
                                            </p>
                                        </div>
                                        <p><strong>优点：</strong>不放大噪声</p>
                                        <p><strong>缺点：</strong>错误传播</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }
            ]
        },

        // 热设计深度
        thermalDesignDeep: {
            title: '热设计与管理',
            difficulty: '中级',
            readTime: '40分钟',
            sections: [
                {
                    heading: '1. 热传导理论',
                    content: `
                        <div class="content-block">
                            <h5>傅里叶热传导定律</h5>

                            <div class="formula-box">
                                <div class="formula-title">热流密度</div>
                                <div class="formula-content">
                                    $$q = -k \\frac{dT}{dx}$$
                                    $$Q = -kA \\frac{\\Delta T}{\\Delta x}$$

                                    <p class="formula-desc">
                                        q: 热流密度 (W/m²)<br>
                                        Q: 热流量 (W)<br>
                                        k: 热导率 (W/m·K)<br>
                                        A: 截面积 (m²)<br>
                                        负号表示热量从高温流向低温
                                    </p>
                                </div>
                            </div>

                            <div class="thermal-resistance">
                                <h6>热阻概念</h6>
                                <p>类比欧姆定律：V = I × R ↔ ΔT = P × θ</p>

                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$\\theta = \\frac{\\Delta T}{P} = \\frac{L}{kA}$$

                                        <p class="formula-desc">
                                            θ: 热阻 (°C/W 或 K/W)<br>
                                            L: 热传导路径长度<br>
                                            k: 材料热导率<br>
                                            A: 截面积
                                        </p>
                                    </div>
                                </div>

                                <div class="material-properties">
                                    <h7>常见材料热导率</h7>
                                    <table class="thermal-table">
                                        <thead>
                                            <tr>
                                                <th>材料</th>
                                                <th>热导率 k (W/m·K)</th>
                                                <th>应用</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>铜 (Cu)</td>
                                                <td>385~401</td>
                                                <td>散热器、PCB</td>
                                            </tr>
                                            <tr>
                                                <td>铝 (Al)</td>
                                                <td>205~237</td>
                                                <td>散热器、外壳</td>
                                            </tr>
                                            <tr>
                                                <td>硅 (Si)</td>
                                                <td>148</td>
                                                <td>芯片衬底</td>
                                            </tr>
                                            <tr>
                                                <td>氧化铝 (Al₂O₃)</td>
                                                <td>24~28</td>
                                                <td>陶瓷基板</td>
                                            </tr>
                                            <tr>
                                                <td>氮化铝 (AlN)</td>
                                                <td>170~200</td>
                                                <td>高导热基板</td>
                                            </tr>
                                            <tr>
                                                <td>FR4</td>
                                                <td>0.3~0.4</td>
                                                <td>标准PCB</td>
                                            </tr>
                                            <tr>
                                                <td>导热硅脂</td>
                                                <td>1~5</td>
                                                <td>接触界面</td>
                                            </tr>
                                            <tr>
                                                <td>导热硅胶垫</td>
                                                <td>3~8</td>
                                                <td>间隙填充</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <h5>热阻网络分析</h5>

                            <div class="thermal-network">
                                <h6>串联热阻</h6>
                                <p>芯片到环境的热路径：</p>
                                <div class="formula-box">
                                    $$\\theta_{JA} = \\theta_{JC} + \\theta_{CS} + \\theta_{SA}$$
                                    <p class="formula-desc">
                                        θ<sub>JC</sub>: 结到外壳（器件内部）<br>
                                        θ<sub>CS</sub>: 外壳到散热器（界面）<br>
                                        θ<sub>SA</sub>: 散热器到环境（散热器）<br>
                                        <strong>结温：</strong>T<sub>J</sub> = T<sub>A</sub> + P × θ<sub>JA</sub>
                                    </p>
                                </div>

                                <h6>并联热阻</h6>
                                <p>多条散热路径：</p>
                                <div class="formula-inline">
                                    $$\\frac{1}{\\theta_{total}} = \\frac{1}{\\theta_1} + \\frac{1}{\\theta_2} + ...$$
                                </div>

                                <div class="thermal-example">
                                    <h7><i class="fas fa-calculator"></i> 热设计计算实例</h7>
                                    <p><strong>问题：</strong>功率MOSFET散热器设计</p>
                                    <ul>
                                        <li>器件：IRFP250N (200V, 33A, θ<sub>JC</sub>=0.75°C/W)</li>
                                        <li>工作条件：P<sub>D</sub>=25W，T<sub>A</sub>=50°C</li>
                                        <li>最大结温：T<sub>J(max)</sub>=150°C</li>
                                    </ul>

                                    <p><strong>设计步骤：</strong></p>
                                    <div class="calculation-steps">
                                        <p>1. 允许θ<sub>JA</sub> = (T<sub>J(max)</sub> - T<sub>A</sub>) / P</p>
                                        <p>   = (150 - 50) / 25 = 4°C/W</p>

                                        <p>2. θ<sub>CS</sub> ≈ 0.5°C/W（导热硅脂，TO-247封装）</p>

                                        <p>3. 要求θ<sub>SA</sub> = θ<sub>JA</sub> - θ<sub>JC</sub> - θ<sub>CS</sub></p>
                                        <p>   = 4 - 0.75 - 0.5 = <strong>2.75°C/W</strong></p>

                                        <p>4. 查散热器手册，选择：</p>
                                        <p>   - 自然对流：需要θ<sub>SA</sub><2.75°C/W，尺寸较大</p>
                                        <p>   - 强制对流（风扇）：可选更小散热器</p>
                                    </div>

                                    <div class="verification">
                                        <h7>验证设计</h7>
                                        <p>选择散热器θ<sub>SA</sub>=2.2°C/W（含风扇）</p>
                                        <p>T<sub>J</sub> = 50 + 25×(0.75+0.5+2.2) = 50 + 86.25 = <strong>136.25°C</strong> ✓</p>
                                        <p>裕量：150 - 136.25 = 13.75°C（约9%裕量）</p>
                                    </div>
                                </div>
                            </div>

                            <h5>热瞬态分析</h5>

                            <div class="transient-thermal">
                                <h6>热容与热时间常数</h6>

                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$C_{th} = m \\cdot c_p$$
                                        $$\\tau = R_{th} \\cdot C_{th}$$

                                        <p class="formula-desc">
                                            C<sub>th</sub>: 热容 (J/K)<br>
                                            m: 质量 (kg)<br>
                                            c<sub>p</sub>: 比热容 (J/kg·K)<br>
                                            τ: 热时间常数 (s)
                                        </p>
                                    </div>
                                </div>

                                <p><strong>瞬态温升方程：</strong></p>
                                <div class="formula-box">
                                    <div class="formula-content">
                                        $$T_J(t) = T_A + P \\cdot \\theta_{JA}\\left(1 - e^{-t/\\tau}\\right)$$

                                        <p class="formula-desc">
                                            指数上升，时间常数τ后达到63.2%<br>
                                            5τ后基本达到稳态（99.3%）
                                        </p>
                                    </div>
                                </div>

                                <div class="pulse-operation">
                                    <h7>脉冲工作分析</h7>
                                    <p><strong>占空比D下的平均功耗：</strong></p>
                                    <div class="formula-inline">
                                        $$P_{avg} = P_{pk} \\times D$$
                                    </div>

                                    <p>如果脉冲周期 << 热时间常数τ，芯片"看到"的是平均功耗</p>

                                    <div class="example-box">
                                        <p><strong>示例：</strong>雷达发射机</p>
                                        <ul>
                                            <li>峰值功率：100W</li>
                                            <li>脉冲宽度：1ms</li>
                                            <li>脉冲周期：100ms（占空比1%）</li>
                                            <li>平均功耗：100W × 0.01 = 1W</li>
                                        </ul>
                                        <p>如果热时间常数τ=10s >> 100ms，可按1W设计散热</p>
                                    </div>
                                </div>
                            </div>

                            <div class="pcb-thermal">
                                <h5>PCB热管理</h5>

                                <div class="thermal-via">
                                    <h6>热过孔设计</h6>
                                    <p><strong>热阻计算：</strong></p>
                                    <div class="formula-box">
                                        $$\\theta_{via} = \\frac{L}{k_{Cu} \\cdot A} = \\frac{L}{k_{Cu} \\cdot \\pi (d/2)^2}$$

                                        <p class="formula-desc">
                                            L: 板厚 (mm)<br>
                                            d: 过孔直径 (mm)<br>
                                            k<sub>Cu</sub>: 铜热导率 ≈ 400 W/m·K
                                        </p>
                                    </div>

                                    <p><strong>示例计算：</strong></p>
                                    <div class="calculation-steps">
                                        <p>过孔：d=0.3mm, L=1.6mm</p>
                                        <p>A = π×(0.15mm)² = 7.07×10<sup>-8</sup> m²</p>
                                        <p>θ<sub>via</sub> = 0.0016 / (400 × 7.07×10<sup>-8</sup>)</p>
                                        <p>= <strong>56.6°C/W</strong>（单个过孔热阻很高！）</p>
                                    </div>

                                    <div class="via-array">
                                        <h7>过孔阵列</h7>
                                        <p>并联N个过孔：θ<sub>total</sub> = θ<sub>via</sub> / N</p>
                                        <p><strong>推荐：</strong></p>
                                        <ul>
                                            <li>大功率器件下方：9~16个过孔阵列（3×3或4×4）</li>
                                            <li>过孔间距：1~2mm</li>
                                            <li>连接到内层铜平面（2oz或更厚）</li>
                                            <li>背面可加强制散热（风扇/金属板）</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="copper-spreading">
                                    <h6>铜箔散热</h6>
                                    <p><strong>热扩散角度：</strong></p>
                                    <p>热量从热源向外扩散，有效散热面积增大</p>
                                    <div class="formula-inline">
                                        $$A_{eff} = A_0 + 2\\pi Lt\\tan(\\alpha)$$
                                    </div>
                                    <p>α: 扩散角（典型45°），L: 距离，t: 铜厚</p>

                                    <div class="copper-comparison">
                                        <h7>铜厚对比</h7>
                                        <table class="copper-table">
                                            <tr>
                                                <th>铜厚</th>
                                                <th>厚度 (μm)</th>
                                                <th>热阻 (°C/W·cm²)</th>
                                            </tr>
                                            <tr>
                                                <td>0.5oz</td>
                                                <td>17.5</td>
                                                <td>14.3</td>
                                            </tr>
                                            <tr>
                                                <td>1oz</td>
                                                <td>35</td>
                                                <td>7.1</td>
                                            </tr>
                                            <tr>
                                                <td>2oz</td>
                                                <td>70</td>
                                                <td>3.6</td>
                                            </tr>
                                            <tr>
                                                <td>3oz</td>
                                                <td>105</td>
                                                <td>2.4</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="thermal-design-guidelines">
                                <h5><i class="fas fa-clipboard-check"></i> 热设计准则</h5>

                                <ol>
                                    <li><strong>功耗评估：</strong>
                                        <ul>
                                            <li>静态功耗：I<sub>Q</sub> × V<sub>DD</sub></li>
                                            <li>动态功耗：C<sub>L</sub>V<sub>DD</sub>²f（数字电路）</li>
                                            <li>导通损耗：I²R<sub>DS(on)</sub>（开关）</li>
                                            <li>开关损耗：½V·I·(t<sub>r</sub>+t<sub>f</sub>)·f</li>
                                        </ul>
                                    </li>
                                    <li><strong>热路径优化：</strong>
                                        <ul>
                                            <li>缩短路径长度</li>
                                            <li>增大截面积</li>
                                            <li>使用高导热材料</li>
                                            <li>减少接触热阻</li>
                                        </ul>
                                    </li>
                                    <li><strong>布局考虑：</strong>
                                        <ul>
                                            <li>发热器件分散布置</li>
                                            <li>避免热耦合（间距>1cm）</li>
                                            <li>气流路径通畅</li>
                                            <li>热敏器件远离热源</li>
                                        </ul>
                                    </li>
                                    <li><strong>降额设计：</strong>
                                        <ul>
                                            <li>温度降额：T<sub>J</sub> < 0.8×T<sub>J(max)</sub></li>
                                            <li>功率降额：P < 0.7×P<sub>D(max)</sub></li>
                                            <li>考虑最恶劣工况（高温环境）</li>
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
     * 高级篇深度内容
     */
    const advancedDeepContent = {
        // EMC设计深度
        emcDesign: {
            title: 'EMC电磁兼容工程',
            difficulty: '高级',
            readTime: '90分钟',
            sections: [
                {
                    heading: '1. EMC理论基础',
                    content: `
                        <div class="content-block">
                            <h5>麦克斯韦方程组</h5>

                            <div class="maxwell-equations">
                                <p>电磁场的完整描述：</p>

                                <div class="formula-box">
                                    <div class="formula-title">微分形式</div>
                                    <div class="formula-content">
                                        $$\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}$$
                                        <p class="formula-desc">法拉第电磁感应定律</p>

                                        $$\\nabla \\times \\mathbf{H} = \\mathbf{J} + \\frac{\\partial \\mathbf{D}}{\\partial t}$$
                                        <p class="formula-desc">安培环路定律（含位移电流）</p>

                                        $$\\nabla \\cdot \\mathbf{D} = \\rho$$
                                        <p class="formula-desc">高斯电场定律</p>

                                        $$\\nabla \\cdot \\mathbf{B} = 0$$
                                        <p class="formula-desc">高斯磁场定律（无磁单极子）</p>
                                    </div>
                                </div>

                                <div class="constitutive-relations">
                                    <h6>本构关系</h6>
                                    <p>材料特性：</p>
                                    <ul>
                                        <li><strong>D</strong> = εE （介电常数）</li>
                                        <li><strong>B</strong> = μH （磁导率）</li>
                                        <li><strong>J</strong> = σE （电导率）</li>
                                    </ul>
                                </div>
                            </div>

                            <h5>电磁辐射机理</h5>

                            <div class="radiation-theory">
                                <h6>偶极子辐射</h6>

                                <div class="formula-box">
                                    <div class="formula-title">电偶极子辐射功率</div>
                                    <div class="formula-content">
                                        $$P_{rad} = \\frac{\\eta_0}{12\\pi}\\left(\\frac{dl}{\\lambda}\\right)^2 I_0^2$$

                                        <p class="formula-desc">
                                            η₀: 自由空间波阻抗 = 377Ω<br>
                                            dl: 偶极子长度<br>
                                            λ: 波长<br>
                                            I₀: 电流幅度<br>
                                            <strong>关键：</strong>辐射功率 ∝ (l/λ)²
                                        </p>
                                    </div>
                                </div>

                                <p><strong>推论：</strong></p>
                                <ul>
                                    <li>l << λ/10：辐射很弱（λ/10准则）</li>
                                    <li>l ≈ λ/2：谐振，辐射最强</li>
                                    <li>降低辐射：缩短天线长度，降低电流</li>
                                </ul>

                                <div class="frequency-wavelength">
                                    <h7>频率与波长对应</h7>
                                    <table class="freq-table">
                                        <thead>
                                            <tr>
                                                <th>频率</th>
                                                <th>波长λ</th>
                                                <th>λ/10</th>
                                                <th>λ/20</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>30MHz</td>
                                                <td>10m</td>
                                                <td>1m</td>
                                                <td>0.5m</td>
                                            </tr>
                                            <tr>
                                                <td>100MHz</td>
                                                <td>3m</td>
                                                <td>30cm</td>
                                                <td>15cm</td>
                                            </tr>
                                            <tr>
                                                <td>500MHz</td>
                                                <td>60cm</td>
                                                <td>6cm</td>
                                                <td>3cm</td>
                                            </tr>
                                            <tr>
                                                <td>1GHz</td>
                                                <td>30cm</td>
                                                <td>3cm</td>
                                                <td>1.5cm</td>
                                            </tr>
                                            <tr>
                                                <td>2.4GHz</td>
                                                <td>12.5cm</td>
                                                <td>1.25cm</td>
                                                <td>6mm</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p><strong>设计含义：</strong>PCB走线长度>λ/20就可能成为天线！</p>
                                </div>
                            </div>

                            <h5>EMI测试标准</h5>

                            <div class="emi-standards">
                                <h6>主要标准</h6>

                                <table class="standards-table">
                                    <thead>
                                        <tr>
                                            <th>标准</th>
                                            <th>适用对象</th>
                                            <th>频率范围</th>
                                            <th>限值</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>FCC Part 15 Class A</td>
                                            <td>商用设备</td>
                                            <td>30MHz~1GHz</td>
                                            <td>RE: 40dBμV/m @10m<br>CE: 60dBμV</td>
                                        </tr>
                                        <tr>
                                            <td>FCC Part 15 Class B</td>
                                            <td>民用设备</td>
                                            <td>30MHz~1GHz</td>
                                            <td>RE: 40dBμV/m @3m<br>CE: 48dBμV</td>
                                        </tr>
                                        <tr>
                                            <td>CISPR 22 Class A</td>
                                            <td>商用ITE</td>
                                            <td>30MHz~6GHz</td>
                                            <td>RE: 40dBμV/m @10m</td>
                                        </tr>
                                        <tr>
                                            <td>CISPR 22 Class B</td>
                                            <td>民用ITE</td>
                                            <td>30MHz~6GHz</td>
                                            <td>RE: 30dBμV/m @10m</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="note-box">
                                    <i class="fas fa-info-circle"></i>
                                    <p>Class B限值比Class A严格10dB（3.16倍场强）</p>
                                </div>
                            </div>

                            <h5>EMI抑制技术</h5>

                            <div class="emi-suppression">
                                <div class="technique-card">
                                    <h6>1. 屏蔽设计</h6>

                                    <p><strong>屏蔽效能（SE）：</strong></p>
                                    <div class="formula-box">
                                        $$SE(dB) = A + R + M$$
                                        <p class="formula-desc">
                                            A: 吸收损耗<br>
                                            R: 反射损耗<br>
                                            M: 多次反射修正（通常可忽略）
                                        </p>
                                    </div>

                                    <p><strong>吸收损耗：</strong></p>
                                    <div class="formula-box">
                                        $$A(dB) = 131.4 \\times t \\times \\sqrt{f \\cdot \\mu_r \\cdot \\sigma_r}$$
                                        <p class="formula-desc">
                                            t: 屏蔽层厚度 (mm)<br>
                                            f: 频率 (MHz)<br>
                                            μ<sub>r</sub>: 相对磁导率<br>
                                            σ<sub>r</sub>: 相对电导率（Cu为1）
                                        </p>
                                    </div>

                                    <p><strong>反射损耗（平面波）：</strong></p>
                                    <div class="formula-box">
                                        $$R(dB) = 168 - 10\\log(f \\cdot \\mu_r / \\sigma_r)$$
                                    </div>

                                    <div class="shielding-example">
                                        <h7>计算实例：铜屏蔽罩</h7>
                                        <p>条件：t=0.3mm，f=1GHz，铜材料</p>
                                        <p>A = 131.4 × 0.3 × √(1000 × 1 × 1) = 1247dB（极大！）</p>
                                        <p>R = 168 - 10log(1000 × 1 / 1) = 138dB</p>
                                        <p>SE ≈ <strong>100+dB</strong>（实际受孔缝限制）</p>
                                    </div>

                                    <div class="aperture-leakage">
                                        <h7>孔缝泄漏</h7>
                                        <p>屏蔽体上的孔洞严重降低SE：</p>
                                        <div class="formula-inline">
                                            $$SE_{aperture}(dB) ≈ 20\\log\\left(\\frac{\\lambda}{2L_{max}}\\right)$$
                                        </div>
                                        <p>L<sub>max</sub>: 最大孔洞尺寸</p>
                                        <p><strong>设计准则：</strong>孔洞尺寸 < λ/20</p>
                                    </div>
                                </div>

                                <div class="technique-card">
                                    <h6>2. 滤波设计</h6>

                                    <div class="filter-types">
                                        <h7>共模滤波</h7>
                                        <p>抑制共模噪声，使用共模电感</p>
                                        <div class="formula-box">
                                            $$Z_{CM} = j\\omega L_{CM}$$
                                            $$Z_{DM} = j\\omega L_{leak}$$
                                            <p class="formula-desc">
                                                L<sub>CM</sub>: 共模电感（mH级）<br>
                                                L<sub>leak</sub>: 漏感（μH级）<br>
                                                对差模信号影响小，对共模阻抗大
                                            </p>
                                        </div>

                                        <h7>差模滤波</h7>
                                        <p>LC低通滤波器</p>
                                        <div class="formula-inline">
                                            $$f_c = \\frac{1}{2\\pi\\sqrt{LC}}$$
                                        </div>

                                        <div class="filter-design-example">
                                            <h8>电源端口滤波设计</h8>
                                            <p><strong>要求：</strong>抑制150kHz~30MHz传导EMI</p>
                                            <p><strong>方案：</strong></p>
                                            <ol>
                                                <li>差模电容：C<sub>X</sub> = 0.1~1μF（跨线，X电容）</li>
                                                <li>共模电感：L<sub>CM</sub> = 1~10mH</li>
                                                <li>共模电容：C<sub>Y</sub> = 1~10nF（到地，Y电容）</li>
                                                <li>额外差模电感：L<sub>DM</sub> = 10~100μH</li>
                                            </ol>
                                            <p><strong>插入损耗：</strong>150kHz处 >40dB</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="technique-card">
                                    <h6>3. 接地设计</h6>

                                    <div class="grounding-methods">
                                        <h7>接地方法对比</h7>

                                        <table class="grounding-table">
                                            <tr>
                                                <th>方法</th>
                                                <th>优点</th>
                                                <th>缺点</th>
                                                <th>适用</th>
                                            </tr>
                                            <tr>
                                                <td><strong>单点接地</strong></td>
                                                <td>无地回路<br>低频噪声小</td>
                                                <td>高频阻抗大<br>布线复杂</td>
                                                <td><1MHz</td>
                                            </tr>
                                            <tr>
                                                <td><strong>多点接地</strong></td>
                                                <td>高频阻抗低<br>简单实用</td>
                                                <td>可能形成地回路</td>
                                                <td>>10MHz</td>
                                            </tr>
                                            <tr>
                                                <td><strong>混合接地</strong></td>
                                                <td>结合两者优点</td>
                                                <td>需要精心设计</td>
                                                <td>宽频系统</td>
                                            </tr>
                                            <tr>
                                                <td><strong>地平面</strong></td>
                                                <td>低阻抗<br>屏蔽效果好</td>
                                                <td>成本略高<br>多层板</td>
                                                <td>>100MHz<br>推荐！</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="ground-impedance">
                                        <h7>地线阻抗</h7>
                                        <p>地线不是零阻抗：</p>
                                        <div class="formula-box">
                                            $$Z_{ground} = R + j\\omega L$$
                                            $$L ≈ 20nH/inch \\text{ (导线)}$$
                                            $$L ≈ 1nH/inch \\text{ (PCB地平面)}$$
                                        </div>

                                        <div class="calculation-example">
                                            <p><strong>示例：</strong>10cm地线，100MHz</p>
                                            <p>L ≈ 20nH/inch × 4inch = 80nH</p>
                                            <p>X<sub>L</sub> = 2π × 100MHz × 80nH = 50Ω</p>
                                            <p><strong>结论：</strong>地线阻抗不可忽略！</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>PCB层叠设计</h5>

                            <div class="stackup-design">
                                <h6>4层板标准叠层</h6>

                                <div class="stackup-option">
                                    <p><strong>方案1：经典叠层</strong></p>
                                    <ul>
                                        <li><strong>Layer 1 (Top)：</strong>信号层（主要高速信号）</li>
                                        <li><strong>Layer 2 (GND)：</strong>地平面（完整）</li>
                                        <li><strong>Layer 3 (Power)：</strong>电源平面</li>
                                        <li><strong>Layer 4 (Bottom)：</strong>信号层（低速信号）</li>
                                    </ul>
                                    <p><strong>优点：</strong>高速信号紧邻地平面，阻抗控制好</p>
                                </div>

                                <div class="stackup-option">
                                    <p><strong>方案2：对称叠层</strong></p>
                                    <ul>
                                        <li><strong>Layer 1：</strong>信号层</li>
                                        <li><strong>Layer 2：</strong>地平面</li>
                                        <li><strong>Layer 3：</strong>地平面</li>
                                        <li><strong>Layer 4：</strong>信号层</li>
                                    </ul>
                                    <p><strong>优点：</strong>最佳EMC性能，对称结构减少翘曲</p>
                                </div>

                                <h6>6层板高性能叠层</h6>
                                <div class="stackup-6layer">
                                    <ul>
                                        <li><strong>L1：</strong>高速信号（DDR, PCIe）</li>
                                        <li><strong>L2：</strong>GND（完整）</li>
                                        <li><strong>L3：</strong>低速信号</li>
                                        <li><strong>L4：</strong>低速信号</li>
                                        <li><strong>L5：</strong>Power（分区）+ GND</li>
                                        <li><strong>L6：</strong>低速信号 + 电源布线</li>
                                    </ul>
                                    <p><strong>关键：</strong>每层高速信号都紧邻参考平面</p>
                                </div>

                                <div class="dielectric-thickness">
                                    <h7>介质厚度设计</h7>
                                    <p><strong>信号层到参考平面距离（H）：</strong></p>
                                    <ul>
                                        <li>高速信号：H = 4~8mil（0.1~0.2mm）</li>
                                        <li>低速信号：H = 10~20mil（0.25~0.5mm）</li>
                                        <li>电源平面间距：H > 20mil（平面电容效应）</li>
                                    </ul>

                                    <div class="plane-capacitance">
                                        <h8>平面间电容</h8>
                                        <div class="formula-box">
                                            $$C = \\frac{\\varepsilon_r \\varepsilon_0 A}{h}$$
                                            <p class="formula-desc">
                                                100×100mm板，h=0.5mm，ε<sub>r</sub>=4.4<br>
                                                C ≈ 0.78nF（提供高频去耦）
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="esd-protection">
                                <h5>ESD防护设计</h5>

                                <h6>ESD模型</h6>

                                <div class="esd-models">
                                    <p><strong>1. HBM (Human Body Model)</strong></p>
                                    <ul>
                                        <li>模型：100pF电容 + 1.5kΩ电阻</li>
                                        <li>典型等级：2kV (Class 2), 4kV (Class 3)</li>
                                        <li>峰值电流：约(V/1.5kΩ)</li>
                                    </ul>

                                    <p><strong>2. MM (Machine Model)</strong></p>
                                    <ul>
                                        <li>模型：200pF电容 + 0Ω电阻（更严酷）</li>
                                        <li>峰值电流：>20A（200V测试）</li>
                                    </ul>

                                    <p><strong>3. CDM (Charged Device Model)</strong></p>
                                    <ul>
                                        <li>器件自身带电后通过pin放电</li>
                                        <li>最难防护，峰值电流>10A</li>
                                    </ul>
                                </div>

                                <div class="esd-protection-circuits">
                                    <h6>ESD保护电路</h6>

                                    <div class="protection-method">
                                        <h7>1. TVS二极管</h7>
                                        <p><strong>参数选择：</strong></p>
                                        <ul>
                                            <li>V<sub>RWM</sub> (工作电压) > 信号最大值</li>
                                            <li>V<sub>BR</sub> (击穿电压) ≈ 1.2×V<sub>RWM</sub></li>
                                            <li>V<sub>C</sub> (箝位电压) < IC最大耐压</li>
                                            <li>C<sub>J</sub> (结电容) < 信号线容性负载要求</li>
                                        </ul>

                                        <div class="tvs-example">
                                            <p><strong>示例：</strong>5V信号线保护</p>
                                            <ul>
                                                <li>选择V<sub>RWM</sub>=6V的TVS</li>
                                                <li>V<sub>BR</sub>≈7V, V<sub>C</sub>≈12V</li>
                                                <li>验证IC耐压>12V ✓</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="protection-method">
                                        <h7>2. ESD保护二极管</h7>
                                        <p>上拉+下拉双二极管：</p>
                                        <ul>
                                            <li>正向ESD：下拉二极管导通到GND</li>
                                            <li>负向ESD：上拉二极管导通到VDD</li>
                                            <li>箝位电压：V<sub>DD</sub> + 0.7V 或 -0.7V</li>
                                        </ul>
                                    </div>

                                    <div class="protection-method">
                                        <h7>3. 多级保护</h7>
                                        <p>外部TVS + 内部ESD二极管：</p>
                                        <ol>
                                            <li>TVS泄放大部分能量</li>
                                            <li>串联电阻（10~100Ω）限流</li>
                                            <li>内部二极管最终保护</li>
                                        </ol>
                                        <p><strong>优势：</strong>可靠性最高，成本略增</p>
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
     * Public API Extension
     */
    if (window.AdvancedContent) {
        Object.assign(window.AdvancedContent, {
            intermediateDeep: intermediateDeepContent,
            advancedDeep: advancedDeepContent
        });
    } else {
        window.AdvancedContent = {
            intermediateDeep: intermediateDeepContent,
            advancedDeep: advancedDeepContent
        };
    }

    console.log('📚 Intermediate & Advanced Deep Content loaded');
    console.log('Intermediate topics:', Object.keys(intermediateDeepContent));
    console.log('Advanced topics:', Object.keys(advancedDeepContent));

})();
