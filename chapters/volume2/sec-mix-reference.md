
<a id="pdf-615"></a><a id="pdf-616"></a>

<a id="sec-mix-reference"></a>

## MIX 指令参考表

字符代码:

<table data-mix="characters"><thead><tr><th>代码</th><th>字符</th></tr></thead><tbody>
<tr><td>00</td><td>$\sqcup$</td></tr>
<tr><td>01</td><td>A</td></tr>
<tr><td>02</td><td>B</td></tr>
<tr><td>03</td><td>C</td></tr>
<tr><td>04</td><td>D</td></tr>
<tr><td>05</td><td>E</td></tr>
<tr><td>06</td><td>F</td></tr>
<tr><td>07</td><td>G</td></tr>
<tr><td>08</td><td>H</td></tr>
<tr><td>09</td><td>I</td></tr>
<tr><td>10</td><td>Δ</td></tr>
<tr><td>11</td><td>J</td></tr>
<tr><td>12</td><td>K</td></tr>
<tr><td>13</td><td>L</td></tr>
<tr><td>14</td><td>M</td></tr>
<tr><td>15</td><td>N</td></tr>
<tr><td>16</td><td>O</td></tr>
<tr><td>17</td><td>P</td></tr>
<tr><td>18</td><td>Q</td></tr>
<tr><td>19</td><td>R</td></tr>
<tr><td>20</td><td>Σ</td></tr>
<tr><td>21</td><td>Π</td></tr>
<tr><td>22</td><td>S</td></tr>
<tr><td>23</td><td>T</td></tr>
<tr><td>24</td><td>U</td></tr>
<tr><td>25</td><td>V</td></tr>
<tr><td>26</td><td>W</td></tr>
<tr><td>27</td><td>X</td></tr>
<tr><td>28</td><td>Y</td></tr>
<tr><td>29</td><td>Z</td></tr>
<tr><td>30</td><td>0</td></tr>
<tr><td>31</td><td>1</td></tr>
<tr><td>32</td><td>2</td></tr>
<tr><td>33</td><td>3</td></tr>
<tr><td>34</td><td>4</td></tr>
<tr><td>35</td><td>5</td></tr>
<tr><td>36</td><td>6</td></tr>
<tr><td>37</td><td>7</td></tr>
<tr><td>38</td><td>8</td></tr>
<tr><td>39</td><td>9</td></tr>
<tr><td>40</td><td>.</td></tr>
<tr><td>41</td><td>,</td></tr>
<tr><td>42</td><td>(</td></tr>
<tr><td>43</td><td>)</td></tr>
<tr><td>44</td><td>+</td></tr>
<tr><td>45</td><td>-</td></tr>
<tr><td>46</td><td>*</td></tr>
<tr><td>47</td><td>/</td></tr>
<tr><td>48</td><td>=</td></tr>
<tr><td>49</td><td>$</td></tr>
<tr><td>50</td><td>&lt;</td></tr>
<tr><td>51</td><td>&gt;</td></tr>
<tr><td>52</td><td>@</td></tr>
<tr><td>53</td><td>;</td></tr>
<tr><td>54</td><td>:</td></tr>
<tr><td>55</td><td>&#x27;</td></tr>
</tbody></table>

<table data-mix="instructions"><thead><tr><th>$C$</th><th>$t$</th><th>描述</th><th>OP(F)</th></tr></thead><tbody>
<tr><td>00</td><td>$1$</td><td>无操作</td><td style="white-space:nowrap"><code>NOP(0)</code></td></tr>
<tr><td>01</td><td>$2$</td><td>$\mathrm{rA}\leftarrow \mathrm{rA}+V$</td><td style="white-space:nowrap"><code>ADD(0:5)</code><br><code>FADD(6)</code></td></tr>
<tr><td>02</td><td>$2$</td><td>$\mathrm{rA}\leftarrow \mathrm{rA}-V$</td><td style="white-space:nowrap"><code>SUB(0:5)</code><br><code>FSUB(6)</code></td></tr>
<tr><td>03</td><td>$10$</td><td>$\mathrm{rAX}\leftarrow \mathrm{rA}\times V$</td><td style="white-space:nowrap"><code>MUL(0:5)</code><br><code>FMUL(6)</code></td></tr>
<tr><td>04</td><td>$12$</td><td>$\mathrm{rA}\leftarrow \mathrm{rAX}/V$; $\mathrm{rX}\leftarrow\text{余数}$</td><td style="white-space:nowrap"><code>DIV(0:5)</code><br><code>FDIV(6)</code></td></tr>
<tr><td>05</td><td>$10$</td><td>特殊</td><td style="white-space:nowrap"><code>NUM(0)</code><br><code>CHAR(1)</code><br><code>HLT(2)</code></td></tr>
<tr><td>06</td><td>$2$</td><td>移位 $M$ 字节</td><td style="white-space:nowrap"><code>SLA(0)</code><br><code>SRA(1)</code><br><code>SLAX(2)</code><br><code>SRAX(3)</code><br><code>SLC(4)</code><br><code>SRC(5)</code></td></tr>
<tr><td>07</td><td>$1+2F$</td><td>从 $M$ 到 $\mathrm{rI1}$ 移动 $F$ 字</td><td style="white-space:nowrap"><code>MOVE(1)</code></td></tr>
<tr><td>08</td><td>$2$</td><td>$\mathrm{rA}\leftarrow V$</td><td style="white-space:nowrap"><code>LDA(0:5)</code></td></tr>
<tr><td>09</td><td>$2$</td><td>$\mathrm{rI1}\leftarrow V$</td><td style="white-space:nowrap"><code>LD1(0:5)</code></td></tr>
<tr><td>10</td><td>$2$</td><td>$\mathrm{rI2}\leftarrow V$</td><td style="white-space:nowrap"><code>LD2(0:5)</code></td></tr>
<tr><td>11</td><td>$2$</td><td>$\mathrm{rI3}\leftarrow V$</td><td style="white-space:nowrap"><code>LD3(0:5)</code></td></tr>
<tr><td>12</td><td>$2$</td><td>$\mathrm{rI4}\leftarrow V$</td><td style="white-space:nowrap"><code>LD4(0:5)</code></td></tr>
<tr><td>13</td><td>$2$</td><td>$\mathrm{rI5}\leftarrow V$</td><td style="white-space:nowrap"><code>LD5(0:5)</code></td></tr>
<tr><td>14</td><td>$2$</td><td>$\mathrm{rI6}\leftarrow V$</td><td style="white-space:nowrap"><code>LD6(0:5)</code></td></tr>
<tr><td>15</td><td>$2$</td><td>$\mathrm{rX}\leftarrow V$</td><td style="white-space:nowrap"><code>LDX(0:5)</code></td></tr>
<tr><td>16</td><td>$2$</td><td>$\mathrm{rA}\leftarrow -V$</td><td style="white-space:nowrap"><code>LDAN(0:5)</code></td></tr>
<tr><td>17</td><td>$2$</td><td>$\mathrm{rI1}\leftarrow -V$</td><td style="white-space:nowrap"><code>LD1N(0:5)</code></td></tr>
<tr><td>18</td><td>$2$</td><td>$\mathrm{rI2}\leftarrow -V$</td><td style="white-space:nowrap"><code>LD2N(0:5)</code></td></tr>
<tr><td>19</td><td>$2$</td><td>$\mathrm{rI3}\leftarrow -V$</td><td style="white-space:nowrap"><code>LD3N(0:5)</code></td></tr>
<tr><td>20</td><td>$2$</td><td>$\mathrm{rI4}\leftarrow -V$</td><td style="white-space:nowrap"><code>LD4N(0:5)</code></td></tr>
<tr><td>21</td><td>$2$</td><td>$\mathrm{rI5}\leftarrow -V$</td><td style="white-space:nowrap"><code>LD5N(0:5)</code></td></tr>
<tr><td>22</td><td>$2$</td><td>$\mathrm{rI6}\leftarrow -V$</td><td style="white-space:nowrap"><code>LD6N(0:5)</code></td></tr>
<tr><td>23</td><td>$2$</td><td>$\mathrm{rX}\leftarrow -V$</td><td style="white-space:nowrap"><code>LDXN(0:5)</code></td></tr>
<tr><td>24</td><td>$2$</td><td>$M(F)\leftarrow \mathrm{rA}$</td><td style="white-space:nowrap"><code>STA(0:5)</code></td></tr>
<tr><td>25</td><td>$2$</td><td>$M(F)\leftarrow \mathrm{rI1}$</td><td style="white-space:nowrap"><code>ST1(0:5)</code></td></tr>
<tr><td>26</td><td>$2$</td><td>$M(F)\leftarrow \mathrm{rI2}$</td><td style="white-space:nowrap"><code>ST2(0:5)</code></td></tr>
<tr><td>27</td><td>$2$</td><td>$M(F)\leftarrow \mathrm{rI3}$</td><td style="white-space:nowrap"><code>ST3(0:5)</code></td></tr>
<tr><td>28</td><td>$2$</td><td>$M(F)\leftarrow \mathrm{rI4}$</td><td style="white-space:nowrap"><code>ST4(0:5)</code></td></tr>
<tr><td>29</td><td>$2$</td><td>$M(F)\leftarrow \mathrm{rI5}$</td><td style="white-space:nowrap"><code>ST5(0:5)</code></td></tr>
<tr><td>30</td><td>$2$</td><td>$M(F)\leftarrow \mathrm{rI6}$</td><td style="white-space:nowrap"><code>ST6(0:5)</code></td></tr>
<tr><td>31</td><td>$2$</td><td>$M(F)\leftarrow \mathrm{rX}$</td><td style="white-space:nowrap"><code>STX(0:5)</code></td></tr>
<tr><td>32</td><td>$2$</td><td>$M(F)\leftarrow \mathrm{rJ}$</td><td style="white-space:nowrap"><code>STJ(0:2)</code></td></tr>
<tr><td>33</td><td>$2$</td><td>$M(F)\leftarrow 0$</td><td style="white-space:nowrap"><code>STZ(0:5)</code></td></tr>
<tr><td>34</td><td>$1$</td><td>设备 $F$ 忙吗? </td><td style="white-space:nowrap"><code>JBUS(0)</code></td></tr>
<tr><td>35</td><td>$1+T$</td><td>控制, 设备 $F$</td><td style="white-space:nowrap"><code>IOC(0)</code></td></tr>
<tr><td>36</td><td>$1+T$</td><td>输入, 设备 $F$</td><td style="white-space:nowrap"><code>IN(0)</code></td></tr>
<tr><td>37</td><td>$1+T$</td><td>输出, 设备 $F$</td><td style="white-space:nowrap"><code>OUT(0)</code></td></tr>
<tr><td>38</td><td>$1$</td><td>设备 $F$ 就绪? </td><td style="white-space:nowrap"><code>JRED(0)</code></td></tr>
<tr><td>39</td><td>$1$</td><td>转移; 还有下面的 <code>[*]</code></td><td style="white-space:nowrap"><code>JMP(0)</code><br><code>JSJ(1)</code><br><code>JOV(2)</code><br><code>JNOV(3)</code></td></tr>
<tr><td>40</td><td>$1$</td><td>$\mathrm{rA}:0$, 转移</td><td style="white-space:nowrap"><code>JA[+]</code></td></tr>
<tr><td>41</td><td>$1$</td><td>$\mathrm{rI1}:0$, 转移</td><td style="white-space:nowrap"><code>J1[+]</code></td></tr>
<tr><td>42</td><td>$1$</td><td>$\mathrm{rI2}:0$, 转移</td><td style="white-space:nowrap"><code>J2[+]</code></td></tr>
<tr><td>43</td><td>$1$</td><td>$\mathrm{rI3}:0$, 转移</td><td style="white-space:nowrap"><code>J3[+]</code></td></tr>
<tr><td>44</td><td>$1$</td><td>$\mathrm{rI4}:0$, 转移</td><td style="white-space:nowrap"><code>J4[+]</code></td></tr>
<tr><td>45</td><td>$1$</td><td>$\mathrm{rI5}:0$, 转移</td><td style="white-space:nowrap"><code>J5[+]</code></td></tr>
<tr><td>46</td><td>$1$</td><td>$\mathrm{rI6}:0$, 转移</td><td style="white-space:nowrap"><code>J6[+]</code></td></tr>
<tr><td>47</td><td>$1$</td><td>$\mathrm{rX}:0$, 转移</td><td style="white-space:nowrap"><code>JX[+]</code></td></tr>
<tr><td>48</td><td>$1$</td><td>$\mathrm{rA}\leftarrow [\mathrm{rA}]?\pm M$</td><td style="white-space:nowrap"><code>INCA(0)</code><br><code>DECA(1)</code><br><code>ENTA(2)</code><br><code>ENNA(3)</code></td></tr>
<tr><td>49</td><td>$1$</td><td>$\mathrm{rI1}\leftarrow [\mathrm{rI1}]?\pm M$</td><td style="white-space:nowrap"><code>INC1(0)</code><br><code>DEC1(1)</code><br><code>ENT1(2)</code><br><code>ENN1(3)</code></td></tr>
<tr><td>50</td><td>$1$</td><td>$\mathrm{rI2}\leftarrow [\mathrm{rI2}]?\pm M$</td><td style="white-space:nowrap"><code>INC2(0)</code><br><code>DEC2(1)</code><br><code>ENT2(2)</code><br><code>ENN2(3)</code></td></tr>
<tr><td>51</td><td>$1$</td><td>$\mathrm{rI3}\leftarrow [\mathrm{rI3}]?\pm M$</td><td style="white-space:nowrap"><code>INC3(0)</code><br><code>DEC3(1)</code><br><code>ENT3(2)</code><br><code>ENN3(3)</code></td></tr>
<tr><td>52</td><td>$1$</td><td>$\mathrm{rI4}\leftarrow [\mathrm{rI4}]?\pm M$</td><td style="white-space:nowrap"><code>INC4(0)</code><br><code>DEC4(1)</code><br><code>ENT4(2)</code><br><code>ENN4(3)</code></td></tr>
<tr><td>53</td><td>$1$</td><td>$\mathrm{rI5}\leftarrow [\mathrm{rI5}]?\pm M$</td><td style="white-space:nowrap"><code>INC5(0)</code><br><code>DEC5(1)</code><br><code>ENT5(2)</code><br><code>ENN5(3)</code></td></tr>
<tr><td>54</td><td>$1$</td><td>$\mathrm{rI6}\leftarrow [\mathrm{rI6}]?\pm M$</td><td style="white-space:nowrap"><code>INC6(0)</code><br><code>DEC6(1)</code><br><code>ENT6(2)</code><br><code>ENN6(3)</code></td></tr>
<tr><td>55</td><td>$1$</td><td>$\mathrm{rX}\leftarrow [\mathrm{rX}]?\pm M$</td><td style="white-space:nowrap"><code>INCX(0)</code><br><code>DECX(1)</code><br><code>ENTX(2)</code><br><code>ENNX(3)</code></td></tr>
<tr><td>56</td><td>$2$</td><td>$\mathrm{CI}\leftarrow \mathrm{rA}(F):V$</td><td style="white-space:nowrap"><code>CMPA(0:5)</code><br><code>FCMP(6)</code></td></tr>
<tr><td>57</td><td>$2$</td><td>$\mathrm{CI}\leftarrow \mathrm{rI1}(F):V$</td><td style="white-space:nowrap"><code>CMP1(0:5)</code></td></tr>
<tr><td>58</td><td>$2$</td><td>$\mathrm{CI}\leftarrow \mathrm{rI2}(F):V$</td><td style="white-space:nowrap"><code>CMP2(0:5)</code></td></tr>
<tr><td>59</td><td>$2$</td><td>$\mathrm{CI}\leftarrow \mathrm{rI3}(F):V$</td><td style="white-space:nowrap"><code>CMP3(0:5)</code></td></tr>
<tr><td>60</td><td>$2$</td><td>$\mathrm{CI}\leftarrow \mathrm{rI4}(F):V$</td><td style="white-space:nowrap"><code>CMP4(0:5)</code></td></tr>
<tr><td>61</td><td>$2$</td><td>$\mathrm{CI}\leftarrow \mathrm{rI5}(F):V$</td><td style="white-space:nowrap"><code>CMP5(0:5)</code></td></tr>
<tr><td>62</td><td>$2$</td><td>$\mathrm{CI}\leftarrow \mathrm{rI6}(F):V$</td><td style="white-space:nowrap"><code>CMP6(0:5)</code></td></tr>
<tr><td>63</td><td>$2$</td><td>$\mathrm{CI}\leftarrow \mathrm{rX}(F):V$</td><td style="white-space:nowrap"><code>CMPX(0:5)</code></td></tr>
</tbody></table>

一般形式:

| $C$ | $t$ |
|---|---|
| 描述 | |
| `OP(F)` | |

$C$ = 操作码, 指令的 $(5:5)$ 字段

$F$ = 操作码的变形, 指令的 $(4:4)$ 字段

$M$ = 变址后的指令地址

$V=M(F)$ = 位置 $M$ 的字段 $F$ 的内容

`OP` = 操作的符号名

`(F)` = 标准 $F$ 设置

$t$ = 执行时间, $T$ = 互锁时间

$\mathrm{rA}$ = 寄存器 A

$\mathrm{rX}$ = 寄存器 X

$\mathrm{rAX}$ = 寄存器 A 和 X 视作一个

$\mathrm{rI}i$ = 变址寄存器 $i$, $1\le i\le6$

$\mathrm{rJ}$ = 寄存器 J

$\mathrm{CI}$ = 比较指示器

| `[*]` |  | `[+]` |
|---|---|---|
| `JL(4)` | $<$ | `N(0)` |
| `JE(5)` | $=$ | `Z(1)` |
| `JG(6)` | $>$ | `P(2)` |
| `JGE(7)` | $\ge$ | `NN(3)` |
| `JNE(8)` | $\ne$ | `NZ(4)` |
| `JLE(9)` | $\le$ | `NP(5)` |



<a id="pdf-617"></a><a id="pdf-618"></a>

<!-- archive-footnote: v2-3-4-1-table-1 -->

<!-- archive-footnote: v2-3-4-1-marsaglia -->

<!-- archive-footnote: v2-p134-1 -->

<!-- archive-footnote: v2-p145-1 -->

<!-- archive-footnote: v2-p154-1 -->

<!-- archive-footnote: v2-p163-1 -->

<!-- archive-footnote: v2-p170-1 -->

<!-- archive-footnote: v2-p182-1 -->

<!-- archive-footnote: v2-p215-1 -->

<!-- archive-footnote: v2-p220-1 -->

<!-- archive-footnote: v2-p220-2 -->

<!-- archive-footnote: v2-p251-1 -->

<!-- archive-footnote: v2-p262-1 -->

<!-- archive-footnote: v2-p280-1 -->

<!-- archive-footnote: v2-p300-1 -->

<!-- archive-footnote: v2-p304-1 -->

<!-- archive-footnote: v2-p313-1 -->

<!-- archive-footnote: v2-p316-1 -->

<!-- archive-footnote: v2-p316-2 -->

<!-- archive-footnote: v2-p323-1 -->

<!-- archive-footnote: v2-p419-series -->
