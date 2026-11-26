<a id="answers-mpr"></a>


# 再论数学准备

<a id="ans-mpr-1"></a>

**1.** [题目](../sec-mpr.md#ex-mpr-1) (a) 在 36 种情形中, $A$ 胜 $B$ 的有 $5+0+5+5+0+5$ 种. $B$ 胜 $C$ 的有 $4+2+4+4+2+4$ 种, $C$ 胜 $A$ 的有 $2+2+2+6+2+6$ 种.

(b) 如果每面不超过六点, 则唯一的解为

<a href="../../../assets/volume4b/figures/mpr-ans-1.svg"><img src="../../../assets/volume4b/figures/mpr-ans-1.svg" alt="A 的点数为 3, 3, 3, 3, 3, 6. B 为 2, 2, 2, 5, 5, 5. C 为 1, 4, 4, 4, 4, 4."></a>

(c) 取 $A=\{F_{m-2}\times1,F_{m-1}\times4\}$, $B=\{F_m\times3\}$, $C=\{F_{m-1}\times2,F_{m-2}\times5\}$, 就有 $\Pr(C>A)=F_{m-2}F_{m+1}/F_m^2$, 而 $F_{m-2}F_{m+1}=F_{m-1}F_m-(-1)^m$. [类似地, 取 $n$ 个面, 令 $A=\{\lfloor n/\phi^2\rfloor\times1,\lceil n/\phi\rceil\times4\}$, 等等, 所得概率为 $1/\phi-O(1/n)$. 见 R. P. Savage, Jr., <em>AMM</em> **101** (1994), 429–436. 关于非传递骰子的其他性质, 见 J. Buhler、R. Graham 和 A. Hales, <em>AMM</em> **125** (2018), 387–399, 以及 M. Purcell, <em>AMM</em> **130** (2023), 421–436.]

<a id="ans-mpr-2"></a>

**2.** [题目](../sec-mpr.md#ex-mpr-2) 令 $\Pr(A>B)=\mathcal A$, $\Pr(B>C)=\mathcal B$, $\Pr(C>A)=\mathcal C$. 可以假定同一个值 $x$ 不会出现在两枚不同的骰子上. 假如出现了, 可以在 $A$ 上用 $x+\epsilon$ 代替它, 在 $C$ 上用 $x-\epsilon$ 代替它 (其中 $\epsilon$ 充分小), 这样不会使 $\mathcal A$、$\mathcal B$ 或 $\mathcal C$ 减小. 因此可以把所有面上的数依非递减次序排列, 再将每个数换成其所属骰子的名称. 例如, 上题答案 (b) 就给出 $\mathit{CBBBAAAAACCCCCBBBA}$. 显然, 在这种形式的最优排列中, 不会有相邻的 $AB$、$BC$ 或 $CA$, 因为把 $AB$ 换成 $BA$ 总是更好.

设序列为 $C^{c_1}B^{b_1}A^{a_1}\ldots C^{c_k}B^{b_k}A^{a_k}$, 其中 $1\leq i\leq k$ 时 $c_i>0$, $1\leq i<k$ 时 $b_i,a_i>0$. 令 $\alpha_i=a_i/(a_1+\cdots+a_k)$, $\beta_i=b_i/(b_1+\cdots+b_k)$, $\gamma_i=c_i/(c_1+\cdots+c_k)$. 那么 $\mathcal A=\alpha_1\beta_1+\alpha_2(\beta_1+\beta_2)+\cdots$, $\mathcal B=\beta_1\gamma_1+\beta_2(\gamma_1+\gamma_2)+\cdots$, $\mathcal C=\gamma_2\alpha_1+\gamma_3(\alpha_1+\alpha_2)+\cdots$. 我们要证明, 当各 $\alpha$、$\beta$、$\gamma$ 为非负实数时, $\min(\mathcal A,\mathcal B,\mathcal C)\leq1/\phi$, 而它们为有理数时, 这个最小值 $<1/\phi$.

<a id="pdf-391"></a><a id="p-371"></a>

关键在于可以假定 $k\leq2$ 且 $\alpha_2=0$. 否则下面的变换会得到更短的数组, 而不使 $\mathcal A$、$\mathcal B$ 或 $\mathcal C$ 减小.

$$
\gamma'_2=\lambda\gamma_2,\quad\gamma'_1=\gamma_1+\gamma_2-\gamma'_2,\quad
\beta'_2=\lambda\beta_2,\quad\beta'_1=\beta_1+\beta_2-\beta'_2,\quad
\alpha'_1=\alpha_1/\lambda,\quad\alpha'_2=\alpha_1+\alpha_2-\alpha'_1.
$$

的确, $\mathcal A'=\mathcal A$, $\mathcal C'=\mathcal C$, 且 $\mathcal B'-\mathcal B=(1-\lambda)(\beta_1-\lambda\beta_2)\gamma_2$. 我们可以如下选取 $\lambda$.

情形 1. $\beta_1\geq\beta_2$. 取 $\lambda=\alpha_1/(\alpha_1+\alpha_2)$, 使 $\alpha'_2=0$.

情形 2. $\beta_1<\beta_2$ 且 $\gamma_1/\gamma_2\leq\beta_1/\beta_2$. 取 $\lambda=1+\gamma_1/\gamma_2$, 使 $\gamma'_1=0$.

情形 3. $\beta_1<\beta_2$ 且 $\gamma_1/\gamma_2>\beta_1/\beta_2$. 取 $\lambda=1+\beta_1/\beta_2$, 使 $\beta'_1=0$.

最后得到 $\mathcal A=\beta_1$, $\mathcal B=1-\beta_1\gamma_2$, $\mathcal C=\gamma_2$. 这三个数不可能全都大于 $1/\phi$.

[类似地, 用 $n$ 枚骰子时, 渐近最优概率 $p_n$ 满足 $p_n=\alpha_2^{(n)}=1-\alpha_1^{(n-1)}\alpha_2^{(n)}=\cdots=1-\alpha_1^{(2)}\alpha_2^{(3)}=\alpha_1^{(2)}$. 可以证明 $f_n(1-p_n)=0$, 其中 $f_{n+1}(x)=f_n(x)-xf_{n-1}(x)$, $f_0(x)=1$, $f_1(x)=1-x$. 那么 $f_n(x^2)$ 可以用切比雪夫多项式表示为 $x^{n+1}U_{n+1}\bigl(\frac1{2x}\bigr)$, 并且有 $p_n=1-1/\bigl(4\cos^2(\pi/(n+2))\bigr)$. 见 Z. Usiskin, <em>Annals of Mathematical Statistics</em> **35** (1964), 857–862. S. Trybuła, <em>Zastosowania Matematyki</em> **8** (1965), 143–156. A. Komisarski, <em>AMM</em> **128** (2021), 423–434.]

<a id="ans-mpr-3"></a>

**3.** [题目](../sec-mpr.md#ex-mpr-3) 用穷举法 (也就是写一个程序) 找到八个解, 其中最简单的是

<a href="../../../assets/volume4b/figures/mpr-ans-3.svg"><img src="../../../assets/volume4b/figures/mpr-ans-3.svg" alt="A 为 3, 3, 3, 3, 3, 5. B 和 C 均为 4, 1, 4, 4, 1, 4."></a>

各概率分别为 $17/27$, $16/27$, $16/27$. [若也允许有七点的面, 则唯一的解

<a href="../../../assets/volume4b/figures/mpr-ans-3-seven.svg"><img src="../../../assets/volume4b/figures/mpr-ans-3-seven.svg" alt="A 的六面均为 6. B 为 7, 1, 7, 7, 1, 7. C 为 4, 4, 4, 7, 7, 7."></a>

具有这样的性质: 每次掷出时, 恰好有一枚骰子的点数低于平均数, 另两枚都高于平均数, 而且 $A,B,C$ 低于平均数的机会均等. 因此三个概率都是 $2/3$. 见 J. Moraleda 和 D. G. Stork, <em>College Mathematics Journal</em> **43** (2012), 152–159.]

<a id="ans-mpr-4"></a>

**4.** [题目](../sec-mpr.md#ex-mpr-4) (a) 排列 $(1\,2\,3\,4)(5\,6)$ 使 $A\to B\to C\to D\to A$. 所以 $B$ 对 $C$ 就像 $A$ 对 $B$, 其余类推. 此外 $\Pr(A\text{ 胜 }C)=\Pr(C\text{ 胜 }A)=\Pr(B\text{ 胜 }D)=\Pr(D\text{ 胜 }B)=288/720$, $\Pr(A\text{ 与 }C\text{ 平局})=\Pr(B\text{ 与 }D\text{ 平局})=144/720$.

(b) 由对称性, 可设三位玩家为 $A,B,C$. 那么喊宾果的人是 $(A,B,C,AB,AC,BC,ABC)$ 的概率分别为 $(168,216,168,48,72,36,12)/720$.

(c) 喊宾果的人为 $(A,AB,AC,ABC,ABCD)$ 时, 概率分别为 $(120,24,48,12,0)/720$.

<a id="ans-mpr-5"></a>

**5.** [题目](../sec-mpr.md#ex-mpr-5) (a) 如果 $A_k$ 以概率 $.99$ 等于 $1001$, 否则 $A_k=0$, 而 $B_k$ 恒为 $1000$, 那么 $P_{1000}=.99^{1000}\approx.000043$. (这个例子给出的 $P_{1000}$ 已是可能的最小值, 因为 $\Pr\bigl((A_1-B_1)+\cdots+(A_n-B_n)>0\bigr)\geq\Pr\bigl([A_1>B_1]\ldots[A_n>B_n]\bigr)=P_1^n$.)

(b) 令 $E=q_0+q_2+q_4+\cdots\approx0.67915$ 为 $B=0$ 的概率. 那么 $\Pr(A>B)=\sum_{k=0}^{\infty}q_{2k}\bigl(E+\sum_{j=0}^{k-1}q_{2j+1}\bigr)\approx.47402$, $\Pr(A<B)=\sum_{k=0}^{\infty}q_{2k+1}\bigl(1-E+\sum_{j=0}^{k}q_{2j}\bigr)\approx.30807$, 而 $\Pr(A=B)=\Pr(A=B=0)=E(1-E)\approx.21790$ 也就是 $AB>0$ 的概率.

(c) 在头 $n_k$ 轮中, 艾丽斯或鲍勃曾有一次得分超过 $m_k$ 的概率至多为 $n_k(q_{k+1}+q_{k+2}+\cdots)=O(2^{-k})$. 而两人都不曾得分恰为 $m_k$ 的概率是 $(1-q_k)^{n_k}<\exp(-q_kn_k)=\exp(-2^k/D)$. 此外, 当 $k>1$ 时 $m_k>n_km_{k-1}$. 因此当 $k\to\infty$ 时, $k$ 为偶数则艾丽斯 “相当必然” 获胜, $k$ 为奇数则她 “相当必然” 落败. [<em>The American Statistician</em> **43** (1989), 277–278.]

<a id="ans-mpr-6"></a>

**6.** [题目](../sec-mpr.md#ex-mpr-6) $X_j=1$ 的概率显然为 $p_1=1/(n-1)$, 因而 $X_j=0$ 的概率为 $p_0=(n-2)/(n-1)$. 当 $i<j$ 时, $X_i=X_j=1$ 的概率为 $p_1^2$. 因此<a id="pdf-392"></a><a id="p-372"></a> (见习题 20), $(X_i,X_j)$ 将以相应的正确概率 $p_0p_1,p_1p_0,p_0p_0$ 分别等于 $(0,1),(1,0),(0,0)$. 可是当 $i<j<k$ 时, $X_i=X_j=X_k=1$ 的概率为 $0$.

对于 3 重独立的情形, 令 $\Pr(X_1\ldots X_n=x_1\ldots x_n)=a_{x_1+\cdots+x_n}/(n-2)^3$, 其中 $a_0=2\binom{n-2}{3}$, $a_1=\binom{n-2}{2}$, $a_3=1$, 其余的 $a_j=0$.

<a id="ans-mpr-7"></a>

**7.** [题目](../sec-mpr.md#ex-mpr-7) 令 $f_m(n)=\sum_{j=0}^m\binom nj(-1)^j(n+1-m)^{m-j}$, 像答案 6 中那样, 用 $a_j=f_{k-j}(n-j)$ 来定义各个概率. (特别地, 有 $f_0(n)=1$, $f_1(n)=0$, $f_2(n)=\binom{n-1}{2}$, $f_3(n)=2\binom{n-2}{3}$, $f_4(n)=3\binom{n-3}{4}+\binom{n-3}{2}^{\!2}$.) 由于恒等式 $\sum_j\binom nj f_{m-j}(n-j)=(n+1-m)^m$, 只要能证明 $n\geq m$ 时 $f_m(n)\geq0$, 这个定义就是有效的.

为了证明这个不等式, Schulte-Geers 指出 (见 <em>CMath</em> (5.19)), $f_m(n)=\sum_{k=0}^m\binom{m-n}{k}(n-m)^{m-k}=\sum_{k=0}^m\binom{n-m-1+k}{k}(-1)^k(n-m)^{m-k}$. 把各项两两配对, 就恰好得到 $\sum_{k=0}^{m-1}k\binom{n-m-1+k}{k+1}(n-m)^{m-k-1}[k\text{ 为偶数}]+\binom{n-1}{m}[m\text{ 为偶数}]$.

<a id="ans-mpr-8"></a>

**8.** [题目](../sec-mpr.md#ex-mpr-8) 如果 $0<k<n$, 那么 $k$ 个分量具有任意一种给定取值的概率是 $1/2^k$, 因为其余分量有偶校验和奇校验的次数相等. 因此有 $(n-1)$ 重独立性, 却没有 $n$ 重独立性.

<a id="ans-mpr-9"></a>

**9.** [题目](../sec-mpr.md#ex-mpr-9) 让 $0\ldots0$ 和 $1\ldots1$ 各以概率 $1/2$ 出现, 其他所有向量的概率都为 $0$.

<a id="ans-mpr-10"></a>

**10.** [题目](../sec-mpr.md#ex-mpr-10) 如果 $n>p$, 有 $X_{p+1}=X_1$, 所以没有独立性. 否则, 如果 $m<n\leq p$, 就有 $m$ 重独立性, 因为任意 $m$ 个向量 $(1,j,\ldots,j^{m-1})$ 模 $p$ 线性无关 (它们是范德蒙德矩阵的列, 见习题 1.2.3–37). 但是各 $X$ 不是 $(m+1)$ 重独立的, 因为次数为 $m$ 的多项式不可能有 $m+1$ 个不同的根. 如果 $m\geq n$ 且 $n\leq p$, 则完全独立.

在这个构造中, 除了作模 $p$ 运算以外, 还可以采用任意有限域.

<a id="ans-mpr-11"></a>

**11.** [题目](../sec-mpr.md#ex-mpr-11) 可以假定 $n=1$, 因为 $(X_1+\cdots+X_n)/n$ 和 $(X_{n+1}+\cdots+X_{2n})/n$ 是相互独立、具有相同离散分布的随机变量. 那么 $\Pr\bigl(|X_1+X_2-2\alpha|\leq2|X_1-\alpha|\bigr)\geq\Pr\bigl(|X_1-\alpha|+|X_2-\alpha|\leq2|X_1-\alpha|\bigr)=\Pr\bigl(|X_2-\alpha|\leq|X_1-\alpha|\bigr)\geq(1+\Pr(X_1=X_2))/2>1/2$. [本题由 T. M. 科弗提出.]

<a id="ans-mpr-12"></a>

**12.** [题目](../sec-mpr.md#ex-mpr-12) 令 $w=\Pr(A\text{ 且 }B)$, $x=\Pr(A\text{ 且 }\overline B)$, $y=\Pr(\overline A\text{ 且 }B)$, $z=\Pr(\overline A\text{ 且 }\overline B)$. 这五个命题全都等价于 $wz>xy$, 或 $\begin{vmatrix}w&x\\y&z\end{vmatrix}>0$, 或 “$A$ 和 $B$ 严格正相关” (见习题 61). [本题由 E. Georgiadis 提出.]

<a id="ans-mpr-13"></a>

**13.** [题目](../sec-mpr.md#ex-mpr-13) 在许多情形下为假. 例如, 取 $\Pr(\overline A\text{ 且 }\overline B\text{ 且 }\overline C)=\Pr(\overline A\text{ 且 }B\text{ 且 }\overline C)=0$, $\Pr(A\text{ 且 }B\text{ 且 }C)=2/7$, 其余联合概率均为 $1/7$.

<a id="ans-mpr-14"></a>

**14.** [题目](../sec-mpr.md#ex-mpr-14) 对 $n$ 作归纳. [<em>Philosophical Transactions</em> **53** (1763), 370–418, 命题 6 的证明.]

<a id="ans-mpr-15"></a>

**15.** [题目](../sec-mpr.md#ex-mpr-15) 若 $\Pr(C)>0$, 这就是以 $C$ 为条件的链式法则. 但若 $\Pr(C)=0$, 依照我们的约定, 除非 $A$ 与 $B$ 独立, 否则命题为假.

<a id="ans-mpr-16"></a>

**16.** [题目](../sec-mpr.md#ex-mpr-16) 当且仅当 $\Pr(\overline A\cap B\cap C)=0\ne\Pr(B)$, 或者 $\Pr(\overline A\cap C)=0$.

<a id="ans-mpr-17"></a>

**17.** [题目](../sec-mpr.md#ex-mpr-17) $4/51$, 因为除 $\mathtt Q\spadesuit$ 以外的牌中有四张 A.

<a id="ans-mpr-18"></a>

**18.** [题目](../sec-mpr.md#ex-mpr-18) 由于 $(M-X)(X-m)\geq0$, 有 $(M\,\mathrm E\,X)-(\mathrm E\,X^2)+(m\,\mathrm E\,X)-mM\geq0$. [推广见 C. Davis 和 R. Bhatia, <em>AMM</em> **107** (2000), 353–357.]

<a id="ans-mpr-19"></a>

**19.** [题目](../sec-mpr.md#ex-mpr-19) (a) 取 $n=0,1,2,\ldots$ 时, $\Pr(X_n=1)=\mathrm E\,X_n$ 的二进制表示依次为 $(.0101010101010101\ldots)_2$, $(.0011001100110011\ldots)_2$, $(.0000111100001111\ldots)_2$, …… . 所以它们就是把 7.1.3–(47) 的 “魔术掩码” 反射后取补所得的结果. 答案因此是 $(2^{2^n}-1)/(2^{2^{n+1}}-1)=1/(2^{2^n}+1)$.

(b) 对魔术掩码作按位与运算和取补, 就能从中 “读出” $\Pr(X_0X_1\ldots X_{n-1}=x_0x_1\ldots x_{n-1})=2^{(\bar x_{n-1}\ldots\bar x_1\bar x_0)_2}/(2^{2^n}-1)$. [有关理论见 E. Lukacs, <em>Characteristic Functions</em> (1960), 119.]

<a id="pdf-393"></a><a id="p-373"></a>

(c) 因为 $\Pr(S=\infty)=0$, 无穷和 $S$ 有定义. 它的期望 $\mathrm E\,S=\sum_{n=0}^\infty1/(2^{2^n}+1)\approx0.59606$, 对应于答案 7.1.3–41(c) 中 $z=1/2$ 的情形. 由独立性, $\operatorname{var}(S)=\sum_{n=0}^{\infty}\operatorname{var}(X_n)=\sum_{n=0}^{\infty}2^{2^n}/(2^{2^n}+1)^2\approx0.44148$.

(d) <em>奇偶数</em> $\mathrm E\,R=(.0110100110010110\ldots)_2$ 的十进制值为

$$
0.41245\,40336\,40107\,59778\,33613\,68258\,45528\,30895{-},
$$

可证它等于 $\frac12-\frac14P$, 其中 $P=\prod_{k=0}^\infty(1-1/2^{2^k})$ [R. W. Gosper 和 R. Schroeppel, MIT AI Laboratory Memo 239 (1972 年 2 月 29 日), Hack 122]. 这是一个超越数 [K. Mahler, <em>Mathematische Annalen</em> **101** (1929), 342–366, **103** (1930), 532]. (此外还有 $1/P-1/2=\sum_{k=0}^\infty1/\prod_{j=0}^{k-1}(2^{2^j}-1)$.) 因为 $R$ 是二元的, $\operatorname{var}(R)=(\mathrm E\,R)(1-\mathrm E\,R)\approx0.242336$.

(e) 为零 (因为 $\pi$ 是无理数, 因此 $p_0+p_1+\cdots=\infty$). 可是, 如果把 $\pi$ 换成欧拉常数 $\gamma$ 来问同样的问题, 谁也不知道答案.

(f) $\mathrm E\,Y_n=2\,\mathrm E\,X_n$. 事实上, 对于<em>任意</em>无穷串 $x_0x_1x_2\ldots$, $\Pr(Y_0Y_1Y_2\ldots=x_0x_1x_2\ldots)$ 等于 $2\Pr(X_0X_1X_2\ldots=x_0x_1x_2\ldots)\bmod1$, 因为我们把二进制表示向左移动一位 (并丢弃进位). 特别地, 当 $m\ne n$ 时, $\mathrm E(Y_mY_n)=2\,\mathrm E(X_mX_n)=\frac12(\mathrm E\,Y_m)(\mathrm E\,Y_n)$. $Y_m$ 和 $Y_n$ 负相关, 因为 $\operatorname{covar}(Y_m,Y_n)=-\frac12(\mathrm E\,Y_m)(\mathrm E\,Y_n)$.

(g) 显然 $\mathrm E\,T=2\,\mathrm E\,S$. 又有 $\mathrm E\,T^2=2\,\mathrm E\,S^2$, 因为对一切 $m$ 和 $n$, 均有 $\mathrm E(Y_mY_n)=2\,\mathrm E(X_mX_n)$. 所以 $\operatorname{var}(T)=2\bigl(\operatorname{var}(S)+(\mathrm E\,S)^2\bigr)-(2\,\mathrm E\,S)^2=2\operatorname{var}(S)-2(\mathrm E\,S)^2\approx0.17237$.

<a id="ans-mpr-20"></a>

**20.** [题目](../sec-mpr.md#ex-mpr-20) 令 $p_j=\mathrm E\,X_j$. 例如, 当 $k\geq4$ 时, 我们须证 $\mathrm E\bigl(X_1(1-X_2)(1-X_3)X_4\bigr)=p_1(1-p_2)(1-p_3)p_4$. 可是左边就是 $\mathrm E(X_1X_4-X_1X_2X_4-X_1X_3X_4+X_1X_2X_3X_4)=p_1p_4-p_1p_2p_4-p_1p_3p_4+p_1p_2p_3p_4$.

<a id="ans-mpr-21"></a>

**21.** [题目](../sec-mpr.md#ex-mpr-21) 从上题可知, 两个变量不能都是二元的. 取二元变量 $X$ 和三元变量 $Y$, 使 $(0,0),(0,2),(1,0),(1,1),(1,2)$ 各以概率 $1/5$ 出现. 则 $\mathrm E(XY)=\mathrm E\,X=3/5$, $\mathrm E\,Y=1$, 而 $\Pr(X=0)\Pr(Y=1)=2/25\ne0$.

<a id="ans-mpr-22"></a>

**22.** [题目](../sec-mpr.md#ex-mpr-22) 由 (8), 有 $\Pr(A_1\cup\cdots\cup A_n)=\mathrm E[A_1\cup\cdots\cup A_n]=\mathrm E\max([A_1],\ldots,[A_n])\leq\mathrm E([A_1]+\cdots+[A_n])=\mathrm E[A_1]+\cdots+\mathrm E[A_n]=\Pr(A_1)+\cdots+\Pr(A_n)$.

<a id="ans-mpr-23"></a>

**23.** [题目](../sec-mpr.md#ex-mpr-23) 提示里问的概率是 $\Pr(X_s=0\text{ 且 }X_1+\cdots+X_{s-1}=s-r)$, 因而等于 $\binom{s-1}{s-r}p^{s-r}(1-p)^r$. 要得到 $B_{m,n}(p)$, 只须取 $r=n-m$, 对 $n-m\leq s\leq n$ 求和. [关于代数证明, 见 <em>CMath</em> 习题 8.17. 这里给出的是概率论和组合学的证明.]

<a id="ans-mpr-24"></a>

**24.** [题目](../sec-mpr.md#ex-mpr-24) (a) $B_{m,n}(x)=\sum_{k=0}^m\binom nkx^k(1-x)^{n-k}$ 的导数为

$$
\begin{aligned}
B'_{m,n}(x)&=\sum_{k=1}^m\binom nk kx^{k-1}(1-x)^{n-k}
-\sum_{k=0}^m\binom nk(n-k)x^k(1-x)^{n-1-k}\\
&=n\biggl(\sum_{k=0}^{m-1}\binom{n-1}{k}x^k(1-x)^{n-1-k}
-\sum_{k=0}^m\binom{n-1}{k}x^k(1-x)^{n-1-k}\biggr)\\
&=-n\binom{n-1}{m}x^m(1-x)^{n-1-m}.
\end{aligned}
$$

[见 Karl Pearson, <em>Biometrika</em> **16** (1924), 202–203.]

(b) 提示中说, 若 $0\leq a\leq b$, 则 $\int_0^{a/(a+b+1)}x^a(1-x)^b\,dx<\int_{a/(a+b+1)}^1x^a(1-x)^b\,dx$. 由此即得 $1-B_{m,n}(m/n)<B_{m,n}(m/n)$. 若 $a>0$, 只须证明 $\int_0^{a/(a+b)}x^a(1-x)^b\,dx\leq\int_{a/(a+b)}^1x^a(1-x)^b\,dx$, 因为 $\int_0^{a/(a+b+1)}<\int_0^{a/(a+b)}\leq\int_{a/(a+b)}^1<\int_{a/(a+b+1)}^1$. 令 $x=(a-\epsilon)/(a+b)$, 注意当 $0\leq\epsilon\leq a$ 时,<a id="pdf-394"></a><a id="p-374"></a> $(a-\epsilon)^a(b+\epsilon)^b\leq(a+\epsilon)^a(b-\epsilon)^b$, 这是因为

$$
\biggl(\frac{a-\epsilon}{a+\epsilon}\biggr)^a
=e^{a(\ln(1-\epsilon/a)-\ln(1+\epsilon/a))}
=\exp\biggl(-2\epsilon\biggl(1+\frac{\epsilon^2}{3a^2}+\frac{\epsilon^4}{5a^4}+\cdots\biggr)\biggr)
$$

随 $a$ 的增大而不减.

(c) 令 $t_k=\binom nk m^k(n-m)^{n-k}$. 当 $m\geq n/2$ 时, 可以证明 $1-B_{m,n}(m/n)=\sum_{k>m}t_k/n^n<B_{m,n}(m/n)=\sum_{k=0}^m t_k/n^n$, 因为对 $1\leq d\leq n-m$ 有 $t_{m+d}<t_{m+1-d}$. 事实上, 置 $r_d=t_{m+d}/t_{m+1-d}$, 则 $r_1=m/(m+1)<1$, 而且

$$
\frac{r_{d+1}}{r_d}=\frac{(n-m+d)(n-m-d)m^2}{(m+1+d)(m+1-d)(n-m)^2}<1,
$$

因为 $\bigl((m+1)^2-d^2\bigr)(n-m)^2-\bigl((n-m)^2-d^2\bigr)m^2=(2m+1)(n-m)^2+(2m-n)nd^2$.

[彼得·诺伊曼在 <em>Wissenschaftliche Zeitschrift der Technischen Universität Dresden</em> **15** (1966), 223–226 中证明了 $m$ 是中位数. (c) 中的论证出自 Nick Lord, <em>The Mathematical Gazette</em> **94** (2010), 331–332. 另见 S. Janson, <em>Statistics and Probability Letters</em> **171** (2021), 109020, 10 页.]

<a id="ans-mpr-25"></a>

**25.** [题目](../sec-mpr.md#ex-mpr-25) (a) $\left(\!\binom nk\!\right)-\left(\!\binom n{k+1}\!\right)$ 为 $\sum p_Iq_J\bigl(q_t/(n-k)-p_t/(k+1)\bigr)$, 其中对把 $\{1,\ldots,n\}$ 划分为互不相交的 $I$、$J$ 和 $\{t\}$ 的一切方式求和, $|I|=k$, $|J|=n-k-1$, $p_I=\prod_{i\in I}p_i$, $q_J=\prod_{j\in J}q_j$. 而 $q_t/(n-k)-p_t/(k+1)\geq0$ 当且仅当 $p_t\leq(k+1)/(n+1)$.

(b) 给定 $p_1,\ldots,p_{n-1}$, 由 (a) 可知, $\left(\!\binom nk\!\right)$ 在 $p_n=p$ 时达到最大值. 由对称性, 同一论证适用于所有下标 $j$.

<a id="ans-mpr-26"></a>

**26.** [题目](../sec-mpr.md#ex-mpr-26) 这个不等式等价于 $r_{n,k}^2\geq r_{n,k-1}r_{n,k+1}$, 牛顿在 <em>Arithmetica Universalis</em> (1707) 第 242–245 页陈述了它而没有证明, 许多年后西尔维斯特终于给出了证明 [<em>Proc. London Math. Soc.</em> **1** (1865), 1–16]. 我们有 $nr_{n,k}=kp_nr_{n-1,k-1}+(n-k)q_nr_{n-1,k}$. 因此 $n^2(r_{n,k}^2-r_{n,k-1}r_{n,k+1})=(p_nr_{n-1,k-1}-q_nr_{n-1,k})^2+(k^2-1)p_n^2A+(k-1)(n-1-k)p_nq_nB+\bigl((n-k)^2-1\bigr)q_n^2C$, 其中 $A=r_{n-1,k-1}^2-r_{n-1,k-2}r_{n-1,k}$, $B=r_{n-1,k-1}r_{n-1,k}-r_{n-1,k-2}r_{n-1,k+1}$, $C=r_{n-1,k}^2-r_{n-1,k-1}r_{n-1,k+1}$ 都非负. 这是对 $n$ 作归纳的结果.

<a id="ans-mpr-27"></a>

**27.** [题目](../sec-mpr.md#ex-mpr-27) $\sum_{k=0}^m\left(\!\binom nk\!\right)=\sum_{k=0}^m\left(\!\binom{n-m-1+k}{k}\!\right)(1-p_{n-m+k})$, 论证同前.

<a id="ans-mpr-28"></a>

**28.** [题目](../sec-mpr.md#ex-mpr-28) (a) $\left(\!\binom nk\!\right)=\left(\!\binom{n-2}k\!\right)A+\left(\!\binom{n-2}{k-1}\!\right)B+\left(\!\binom{n-2}{k-2}\!\right)C$, 且 $\mathrm E\,g(X)=\sum_{k=0}^{n-2}\left(\!\binom{n-2}k\!\right)h_k$, 其中 $A=(1-p_{n-1})(1-p_n)$, $C=p_{n-1}p_n$, $B=1-A-C$, $h_k=Ag(k)+Bg(k+1)+Cg(k+2)$. 若各 $p_j$ 不全相等, 不妨设 $p_{n-1}<p<p_n$. 置 $p'_{n-1}=p_{n-1}+\epsilon$, $p'_n=p_n-\epsilon$, 其中 $\epsilon=\min(p_n-p,p-p_{n-1})$, 就把 $A,B,C$ 变为 $A'=A+\delta$, $B'=B-2\delta$, $C'=C+\delta$, 其中 $\delta=(p_n-p)(p-p_{n-1})$. 因此 $h_k$ 变为 $h'_k=h_k+\delta\bigl(g(k)-2g(k+1)+g(k+2)\bigr)$. 对于凸函数, 在 (19) 中取 $x=k$, $y=k+2$, 即得 $g(k)-2g(k+1)+g(k+2)\geq0$. 所以可以把各 $p$ 重排并重复这个变换, 直到对 $1\leq j\leq n$ 均有 $p_j=p$.

(b) 假定 $\mathrm E\,g(X)$ 已达到最大值, 且各个 $p$ 中有 $r$ 个为 $0$, $s$ 个为 $1$. 令 $a$ 满足 $(n-r-s)a+s=np$, 假定 $0<p_{n-1}<a<p_n<1$. 如同 (a), 对某些系数 $\alpha,\beta,\gamma$ 可写出 $\mathrm E\,g(X)=\alpha A+\beta B+\gamma C$.

若 $\alpha-2\beta+\gamma>0$, 则 (a) 的变换 (以 $a$ 代替 $p$) 将增大 $\mathrm E\,g(X)$. 若 $\alpha-2\beta+\gamma<0$, 取 $\epsilon=-\min(p_{n-1},1-p_n)$, 也可用类似的变换使它增大. 所以 $\alpha-2\beta+\gamma=0$, 我们可以重复 (a) 的变换, 直到每个 $p_j$ 都是 $0$、$1$ 或 $a$.

(c) 当 $s>m$ 时, $\sum_{k=0}^m\left(\!\binom nk\!\right)=0$, 因此可设 $s\leq m$, 从而 $r+s<n$. 对于这里的函数 $g(k)=[0\leq k\leq m]$, 有 $\alpha-2\beta+\gamma=\left(\!\binom{n-2}m\!\right)-\left(\!\binom{n-2}{m-1}\!\right)$. 若 $\{p_1,\ldots,p_n\}$ 的选择最优, 这个差不能为正. 特别地,<a id="pdf-395"></a><a id="p-375"></a> 不可能有 $s=m$. 若 $r>0$, 可以使 $p_{n-1}=0$, $p_n=a$, 于是 $\left(\!\binom{n-2}m\!\right)=\binom{n-r-s-1}{m-s}a^{m-s}(1-a)^{n-r-1-m}$, $\left(\!\binom{n-2}{m-1}\!\right)=\binom{n-r-s-1}{m-1-s}a^{m-1-s}(1-a)^{n-r-m}$. 但这样一来, 比值 $\left(\!\binom{n-2}m\!\right)/\left(\!\binom{n-2}{m-1}\!\right)=(n-r-m)a/\bigl((m-s)(1-a)\bigr)$ 大于 1, 所以 $r=0$.

类似地, 若 $s>0$, 可置 $(p_{n-1},p_n)=(a,1)$, 得到比值 $\left(\!\binom{n-2}m\!\right)/\left(\!\binom{n-2}{m-1}\!\right)=(n-1-m)a/\bigl((m-s+1)(1-a)\bigr)\geq1$. 在这种情形下, $\left(\!\binom{n-2}m\!\right)=\left(\!\binom{n-2}{m-1}\!\right)$ 当且仅当 $np=m+1$. 我们可以继续作变换而不改变 $\mathrm E\,g(X)$, 直到 $s=0$ 且每个 $p_j=p$.

[参考文献: <em>Annals of Mathematical Statistics</em> **27** (1956), 713–721. 系数 $\left(\!\binom nk\!\right)$ 还有许多重要性质, 见习题 7.2.1.5–63, 以及 J. Pitman 的综述, <em>J. Combinatorial Theory</em> **A77** (1997), 279–303.]

<a id="ans-mpr-29"></a>

**29.** [题目](../sec-mpr.md#ex-mpr-29) $m=0$ 或 $m=n$ 时, 结论显然成立. 当 $m=n-1$ 时也有直接的证明: $B_{n-1,n}(p)=1-p^n\geq(1-p)n/\bigl((1-p)n+p\bigr)$, 因为 $p-np^n+(n-1)p^{n+1}=p(1-p)(1+p+\cdots+p^{n-1}-np^{n-1})\geq0$. 当 $p=0$ 或 $p=1$ 时, 结论也是显然的.

若 $p=(m+1)/n$, 有 $R_{m,n}(p)=\bigl((1-p)(m+1)/((1-p)m+1)\bigr)^{n-m}=\bigl((n-m-1)/(n-m)\bigr)^{n-m}$. 于是, 若 $m>0$ 且 $\hat p=m/(n-1)$, 可取 $p_1=\cdots=p_{n-1}=\hat p$, $p_n=1$, 应用习题 28(c) 得

$$
B_{m,n}(p)\geq\sum_{k=0}^m\left(\!\binom nk\!\right)
=\sum_{k=1}^m\binom{n-1}{k-1}\hat p^{k-1}(1-\hat p)^{n-k}
=B_{m-1,n-1}(\hat p).
$$

当 $1\leq m<n-1$ 时, 令 $Q_{m,n}(p)=B_{m,n}(p)-R_{m,n}(p)$. 其导数为

$$
Q'_{m,n}(p)=(n-m)\binom nm(1-p)^{n-m-1}\bigl(A-F(p)\bigr)\big/\bigl((1-p)m+1\bigr)^{n-m+1},
$$

其中 $A=(m+1)^{n-m}/\binom nm>1$, $F(p)=p^m\bigl((1-p)m+1\bigr)^{n-m+1}$. 这个导数在 $p=0$ 时为正, 后来变为负, 但在 $p$ 从左趋近于 $1$ 时又取正值, 到端点时等于 $0$. (注意 $F(0)=0$, $F(p)$ 急剧增大, 直到 $p=(m+1)/(n+1)$, 此后便减小到 $F(1)=1$.) 现在利用 $Q_{m,n}\bigl((m+1)/n\bigr)\geq0=Q_{m,n}(0)=Q_{m,n}(1)$ 便可完成证明, 因为 $Q'_{m,n}(p)$ 在 $[0\mathinner{.\,.}(m+1)/n]$ 中只改变一次符号. [<em>Annals of Mathematical Statistics</em> **36** (1965), 1272–1278.]

<a id="ans-mpr-30"></a>

**30.** [题目](../sec-mpr.md#ex-mpr-30) (a) $\Pr(X_k=0)=n/(n+1)$, 所以 $p=n^n/(n+1)^n>1/e\approx0.368$.

(b) (J. H. 埃尔顿的解.) 令 $p_{km}=\Pr(X_k=m)$. 设对于 $1\leq k<n$, 这些概率已经固定, 再令 $x_m=p_{nm}$. 那么 $x_0=x_2+2x_3+3x_4+\cdots$. 我们要在约束 $\sum_{m=1}^{\infty}m x_m=1$ 下, 对非负变量 $x_1,x_2,\ldots$ 求 $p=\sum_{m=1}^{\infty}(A_m+(m-1)A_0)x_m$ 的最小值, 其中 $A_m=\Pr(X_1+\cdots+X_{n-1}\leq n-m)$. 由于 $p$ 的各个系数非负, 使 $(A_m+(m-1)A_0)/m$ 最小的一个值 $m=m_n$ 保留下来, 其余 $m\geq1$ 的 $x_m$ 全部置零, 就能达到最小值. 而 $m_n\leq n+1$, 因为 $m>n$ 时 $A_m=0$. 类似地也存在 $m_1,\ldots,m_{n-1}$.

(c) (E. Schulte-Geers 的解.) 令 $m_1=\cdots=m_n=t\leq n+1$, 我们要求 $B_{\lfloor n/t\rfloor,n}(1/t)$ 的最小值. 由习题 29 中塞缪尔斯的不等式可推出

$$
B_{m,n}(p)\geq\biggl(1-\frac1{f(m,n,p)+1}\biggr)^n
\quad\text{当 }p\leq\frac{m+1}{n}\text{ 时},\qquad
f(m,n,p)=\frac{(m+1)(1-p)n}{(n-m)p},
$$

因为可以在算术平均与几何平均不等式 $x^{n-m}\leq\bigl((n-m)x+m\bigr)^n/n^n$ 中取 $x=\bigl((1-p)m+1\bigr)/\bigl((1-p)(m+1)\bigr)$. 现在 $1/t\leq(\lfloor n/t\rfloor+1)/(n+1)$, 并且 $f(\lfloor n/t\rfloor,n,1/t)\geq n$, 因而 $B_{\lfloor n/t\rfloor,n}(1/t)\geq n^n/(n+1)^n$.

[彼得·温克勒把它称为 “口香糖售货机问题”, 见 <em>CACM</em> **52**, 第 8 期 (2009 年 8 月), 104–105. J. H. 埃尔顿已经验证, 当 $n\leq20$ 时, (a) 中的联合分布是最优的, 见 arXiv:0908.3528 [math.PR] (2009), 7 页. 这些分布对所有 $n$ 果真都使 $p$ 最小吗? 乌里埃尔·法伊格提出了一个更一般的猜想: 只要 $X_1,\ldots,X_n$ 是独立非负随机变量, 且 $\mathrm E\,X_k\leq1$, 就有 $\Pr\bigl(X_1+\cdots+X_n<n+1/(e-1)\bigr)\geq1/e$. 见 <em>SICOMP</em> **35** (2006), 964–984.]

<a id="pdf-396"></a><a id="p-376"></a>

<a id="ans-mpr-31"></a>

**31.** [题目](../sec-mpr.md#ex-mpr-31) 由于 $\Pr(f([A_1],\ldots,[A_n]))=\mathrm E\,f([A_1],\ldots,[A_n])$, 结论立即得出. 不过, 对习题 32 来说, 一个从更基本的运算出发的详细证明也有好处.

例如, 设 $n=4$. 可靠性多项式是 $f$ 的各小项的可靠性多项式之和, 所以只须证明结论对于 $x_1\wedge\bar x_2\wedge\bar x_3\wedge x_4=x_1(1-x_2)(1-x_3)x_4$ 这样的函数成立. 而显然有 $\Pr(A_1\cap\overline A_2\cap\overline A_3\cap A_4)=\Pr(A_1\cap\overline A_2\cap A_4)-\Pr(A_1\cap\overline A_2\cap A_3\cap A_4)=\pi_{14}-\pi_{124}-\pi_{134}+\pi_{1234}$. (见习题 7.1.1–12, 并回想容斥原理.)

<a id="ans-mpr-32"></a>

**32.** [题目](../sec-mpr.md#ex-mpr-32) 上一答案中 $2^n$ 个小项的概率必须全部非负, 且和为 1. (我们已经规定 $\pi_{\varnothing}=1$, 所以和为 1 的条件自动成立. 习题中对于 $I\subseteq J$ 所述的条件是必要的, 但不充分. 例如, 还必须有 $\pi_{12}\geq\pi_1+\pi_2-1$.)

<a id="ans-mpr-33"></a>

**33.** [题目](../sec-mpr.md#ex-mpr-33) 三个事件 $(X,Y)=(1,0),(0,1),(1,1)$ 发生的概率分别是 $p,q,r$. 在这三种情形下, $\mathrm E(X\mid Y)$ 的值分别是 $1,r/(q+r),r/(q+r)$. 因此答案为 $pz+(q+r)z^{r/(q+r)}$. (这个例子表明了为什么研究 $\mathrm E(X\mid Y)$ 这样的条件随机变量时<em>不用</em>一元生成函数. 不过我们确有一个简单的公式 $\mathrm E(X\mid Y=k)=\bigl([z^k]\frac{\partial G}{\partial w}(1,z)\bigr)/\bigl([z^k]G(1,z)\bigr)$.)

<a id="ans-mpr-34"></a>

**34.** [题目](../sec-mpr.md#ex-mpr-34) 右边是

$$
\begin{aligned}
\sum_\omega\mathrm E(X\mid Y)\Pr(\omega)
&=\sum_\omega\Pr(\omega)\sum_{\omega'}X(\omega')\Pr(\omega')[Y(\omega')=Y(\omega)]/\Pr(Y=Y(\omega))\\
&=\sum_\omega\Pr(\omega)\sum_{\omega'}X(\omega')\Pr(\omega')[Y(\omega')=Y(\omega)]/\Pr(Y=Y(\omega'))\\
&=\sum_{\omega'}X(\omega')\Pr(\omega')\sum_\omega\Pr(\omega)[Y(\omega)=Y(\omega')]/\Pr(Y=Y(\omega')).
\end{aligned}
$$

<a id="ans-mpr-35"></a>

**35.** [题目](../sec-mpr.md#ex-mpr-35) (b) 为假. 例如, 如果 $X$ 和 $Y$ 是独立的随机位, 且 $Z=X$, 则 $\mathrm E(X\mid Y)=\frac12$, 而 $\mathrm E(\frac12\mid Z)=\frac12\ne X=\mathrm E(X\mid Z)$. 可取代 (b) 的正确公式是

$$
\mathrm E\bigl(\mathrm E(X\mid Y,Z)\mid Z\bigr)=\mathrm E(X\mid Z).\tag{*}
$$

这就是 (12) 在以 $Z$ 为条件的概率空间中的形式, 也是习题 91 所依据的关键恒等式. (a) 为真, 因为它是式 (*) 在 $Y=Z$ 时的情形.

<a id="ans-mpr-36"></a>

**36.** [题目](../sec-mpr.md#ex-mpr-36) (a) $f(X)$. (b) $\mathrm E(f(Y)g(X))$, 这是 (12) 的推广. 证明: $\mathrm E\bigl(f(Y)\,\mathrm E(g(X)\mid Y)\bigr)=\sum_y f(y)\,\mathrm E(g(X)\mid Y=y)\Pr(Y=y)=\sum_{x,y}f(y)g(x)\Pr(X=x,Y=y)=\mathrm E(f(Y)g(X))$.

<a id="ans-mpr-37"></a>

**37.** [题目](../sec-mpr.md#ex-mpr-37) 已知 $X_1,\ldots,X_{k-1}$ 的值时, $X_k$ 等可能地取 $\{1,\ldots,n\}\setminus\{X_1,\ldots,X_{k-1}\}$ 中的 $n+1-k$ 个值之一. 因此其平均值为 $(1+\cdots+n-X_1-\cdots-X_{k-1})/(n+1-k)$. 于是 $\mathrm E(X_k\mid X_1,\ldots,X_{k-1})=\bigl(n(n+1)/2-X_1-\cdots-X_{k-1}\bigr)/(n+1-k)$. [顺便一提, 对 $0\leq j<n$ 定义 $Z_j=(n+j)X_1+(n+j-2)X_2+\cdots+(n-j)X_{j+1}-(j+1)n(n+1)/2$, 并对 $j\geq n$ 置 $Z_j=Z_{n-1}$, 那么序列 $Z_0,Z_1,\ldots$ 就是一个鞅.]

<a id="ans-mpr-38"></a>

**38.** [题目](../sec-mpr.md#ex-mpr-38) 令 $t_{m,n}$ 为以 $01\ldots(m-1)$ 开头、长为 $m+n$ 的限制增长串的个数. (这也就是集合 $\{1,\ldots,m+n\}$ 的分划数目, 其中要求 $\{1,\ldots,m\}$ 的每个元素各在不同的块中.) 生成函数 $\sum_{n\geq0}t_{m,n}z^n/n!$ 原来等于 $\exp(e^z-1+mz)$, 因而 $t_{m,n}=\sum_k\varpi_k\binom nk m^{n-k}$.

设 $M=\max(X_1,\ldots,X_{k-1})+1$. 这时, 对 $0\leq j<M$, $\Pr(X_k=j)=t_{M,n-k}/t_{M,n+1-k}$. 对 $j=M$, 概率为 $t_{M+1,n-k}/t_{M,n+1-k}$. 所以 $\mathrm E(X_k\mid X_1,\ldots,X_{k-1})=\bigl(\binom M2 t_{M,n-k}+M t_{M+1,n-k}\bigr)/t_{M,n+1-k}$.

<a id="pdf-397"></a><a id="p-377"></a>

<a id="ans-mpr-39"></a>

**39.** [题目](../sec-mpr.md#ex-mpr-39) (a) 由于 $\mathrm E(K\mid N=n)=pn$, 得 $\mathrm E(K\mid N)=pN$.

(b) 因而 $\mathrm E\,K=\mathrm E\bigl(\mathrm E(K\mid N)\bigr)=\mathrm E(pN)=p\mu$.

(c) 令 $p_{nk}=\Pr(N=n,K=k)=(e^{-\mu}\mu^n/n!)\binom nk p^k(1-p)^{n-k}=(e^{-\mu}\mu^kp^k/k!)f(n-k)$, 其中 $f(n)=(1-p)^n\mu^n/n!$. 那么 $\mathrm E(N\mid K=k)=\sum_n n p_{nk}\big/\sum_n p_{nk}$. 由于 $nf(n-k)=kf(n-k)+(n-k)f(n-k)$, 且 $nf(n)=(1-p)\mu f(n-1)$, 所得结果为 $k+(1-p)\mu$. 因此 $\mathrm E(N\mid K)=K+(1-p)\mu$. [G. Grimmett 和 D. Stirzaker, <em>Probability and Random Processes</em> (Oxford, 1982), §3.7.]

<a id="ans-mpr-40"></a>

**40.** [题目](../sec-mpr.md#ex-mpr-40) 若 $p=\Pr(X>m)$, 显然 $\mathrm E\,X\leq(1-p)m+pM$. [在 (15) 中取 $S=\{x\mid x\leq m\}$, $f(x)=M-x$, $s=M-m$, 也能得到这个结果.]

<a id="ans-mpr-41"></a>

**41.** [题目](../sec-mpr.md#ex-mpr-41) (a) 当 $a\geq1$ 或 $a=0$ 时是凸的, 否则既非凸也非凹. (不过, 如果只考虑 $x$ 为正的情形, $x^a$ 在 $0<a<1$ 时是凹的, 在 $a<0$ 时是凸的.) (b) 当 $n$ 为偶数或 $n=1$ 时是凸的, 否则既非凸也非凹. (由 1.2.11.3–(5), 这个函数是 $\int_0^x t^{n-1}e^{x-t}\,dt/(n-1)!$. 因此, 当 $n\geq3$ 且 $n$ 为奇数时, $f''(x)/x>0$.) (c) 是凸的. (事实上, 只要 $f(z)$ 具有系数非负的幂级数, 且对所有 $z$ 收敛, $f(|x|)$ 就是凸的.) (d) 是凸的, 当然这里要允许定义 (19) 中的 $f$ 取无穷值.

<a id="ans-mpr-42"></a>

**42.** [题目](../sec-mpr.md#ex-mpr-42) 对于 $p_1,\ldots,p_n\geq0$, $p_1+\cdots+p_n=1$, 可以像习题 6.2.2–36 那样, 对 $n$ 作归纳证明 $f(p_1x_1+\cdots+p_nx_n)\leq p_1f(x_1)+\cdots+p_nf(x_n)$. 令 $n\to\infty$, 取极限就得到一般结果. [量 $p_1x_1+\cdots+p_nx_n$ 称为 $\{x_1,\ldots,x_n\}$ 的一个 “凸组合”. 类似地, $\mathrm E\,X$ 是 $X$ 各值的一个凸组合. 延森当初着手研究时, 实际上仅假定了 (19) 中 $p=q=\frac12$ 的情形.]

<a id="ans-mpr-43"></a>

**43.** [题目](../sec-mpr.md#ex-mpr-43) $f(\mathrm E\,X)=f\bigl(\mathrm E(\mathrm E(X\mid Y))\bigr)\leq\mathrm E\bigl(f(\mathrm E(X\mid Y))\bigr)\leq\mathrm E\bigl(\mathrm E(f(X)\mid Y)\bigr)=\mathrm E\,f(X)$. [S. M. Ross, <em>Probability Models for Computer Science</em> (2002), 引理 3.2.1.]

<a id="ans-mpr-44"></a>

**44.** [题目](../sec-mpr.md#ex-mpr-44) 对任意固定的 $x$, 函数 $f(xy)$ 关于 $y$ 是凸的. 因此 $g(y)=\mathrm E\,f(Xy)$ 关于 $y$ 也是凸的, 因为它是凸函数的一个凸组合. 此外, 由 (20), $g(y)\geq f(\mathrm E(Xy))=f(0)=g(0)$. 再由 $g$ 的凸性, $0\leq a\leq b$ 就能推出 $g(0)\leq g(a)\leq g(b)$. [S. Boyd 和 L. Vandenberghe, <em>Convex Optimization</em> (2004), 习题 3.10.]

<a id="ans-mpr-45"></a>

**45.** [题目](../sec-mpr.md#ex-mpr-45) $\Pr(X>0)=\Pr(|X|\geq1)$. 在 (16) 中取 $m=1$.

<a id="ans-mpr-46"></a>

**46.** [题目](../sec-mpr.md#ex-mpr-46) 在<em>任何</em>概率分布中, 由延森不等式都有 $\mathrm E\,X^2\geq(\mathrm E\,X)^2$, 因为平方函数是凸的. 也可以直接证明, 因为 $\mathrm E\,X^2-(\mathrm E\,X)^2=\mathrm E\bigl((X-\mathrm E\,X)^2\bigr)$.

<a id="ans-mpr-47"></a>

**47.** [题目](../sec-mpr.md#ex-mpr-47) 总有 $Y\geq X$ 且 $Y^2\leq X^2$. (因此, 当 $\mathrm E\,X\geq0$ 时, (22) 给出 $\Pr(X>0)=\Pr(Y>0)\geq(\mathrm E\,Y)^2/(\mathrm E\,Y^2)\geq(\mathrm E\,X)^2/(\mathrm E\,X^2)$.)

<a id="ans-mpr-48"></a>

**48.** [题目](../sec-mpr.md#ex-mpr-48) 由习题 47, $\Pr(a-X_1-\cdots-X_n>0)\geq a^2/(a^2+\sigma_1^2+\cdots+\sigma_n^2)$. [这个不等式切比雪夫也知道, 见 <em>J. Math. Pures et Appl.</em> (2) **19** (1874), 157–160. 在 $n=1$ 的特例中, 它等价于 “坎泰利不等式”,

$$
\Pr(X\geq\mathrm E\,X+a)\leq\operatorname{var}(X)\big/\bigl(\operatorname{var}(X)+a^2\bigr),\qquad a\geq0.
$$

见 <em>Atti del Congresso Internazionale dei Matematici</em> **6** (Bologna, 1928), 47–59, §6–§7.]

<a id="ans-mpr-49"></a>

**49.** [题目](../sec-mpr.md#ex-mpr-49) $\Pr(X=0)=1-\Pr(X>0)\leq\bigl(\mathrm E\,X^2-(\mathrm E\,X)^2\bigr)/\mathrm E\,X^2\leq\bigl(\mathrm E\,X^2-(\mathrm E\,X)^2\bigr)/(\mathrm E\,X)^2=(\mathrm E\,X^2)/(\mathrm E\,X)^2-1$. [有些作者把<em>这个</em>不等式称为 “二阶矩原理”, 不过它严格弱于 (22).]

<a id="ans-mpr-50"></a>

**50.** [题目](../sec-mpr.md#ex-mpr-50) (a) 若 $X_j>0$, 令 $Y_j=X_j/X$, 否则置 $Y_j=0$. 则 $Y_1+\cdots+Y_m=[X>0]$. 从而 $\Pr(X>0)=\sum_{j=1}^m\mathrm E\,Y_j$, 且 $\mathrm E\,Y_j=\mathrm E(Y_j\mid X_j>0)\cdot\Pr(X_j>0)$. [这个恒等式只要求 $X_j\geq0$. 它虽然初等, 却是非线性的, 看来因此长期没有被发现. 见 D. Aldous, <em>Discrete Math.</em> **76** (1989), 168.]

<a id="pdf-398"></a><a id="p-378"></a>

(b) 因为 $X_j\in\{0,1\}$, 有 $\Pr(X_j>0)=\mathrm E\,X_j=p_j$, 且 $\mathrm E(X_j/X\mid X_j>0)=\mathrm E(X_j/X\mid X_j=1)=\mathrm E(1/X\mid X_j=1)\geq1/\mathrm E(X\mid X_j=1)$.

(c) $\Pr(X_J=1)=\sum_{j=1}^m\Pr(J=j\text{ 且 }X_j=1)=\sum_{j=1}^m p_j/m=\mathrm E\,X/m$. 因而 $\Pr(J=j\mid X_J=1)=\Pr(J=j\text{ 且 }X_j=1)/\Pr(X_J=1)=(p_j/m)/(\mathrm E\,X/m)=p_j/\mathrm E\,X$.

(d) 由于 $J$ 独立, $t_j=\mathrm E(X\mid J=j\text{ 且 }X_j=1)=\mathrm E(X\mid X_j=1)$.

(e) 右边为 $(\mathrm E\,X)\sum_{j=1}^m(p_j/\mathrm E\,X)/t_j\geq(\mathrm E\,X)\big/\sum_{j=1}^m(p_j/\mathrm E\,X)t_j$.

<a id="ans-mpr-51"></a>

**51.** [题目](../sec-mpr.md#ex-mpr-51) 若 $g(q_1,\ldots,q_m)=1-f(p_1,\ldots,p_m)$ 是 $f$ 的对偶, 其中 $q_j=1-p_j$, 则 $g$ 的一个下界就给出 $f$ 的一个上界. 例如, 当 $f$ 为 $x_1x_2x_3\vee x_2x_3x_4\vee x_4x_5$ 时, $\bar f$ 为 $\bar x_1\bar x_4\vee\bar x_2\bar x_4\vee\bar x_3\bar x_4\vee\bar x_2\bar x_5\vee\bar x_3\bar x_5$. 所以, 不等式 (24) 给出

$$
\begin{aligned}
g(q_1,\ldots,q_5)\geq{}&
\frac{q_1q_4}{1+q_2+q_3+q_2q_5+q_3q_5}
+\frac{q_2q_4}{q_1+1+q_3+q_5+q_3q_5}\\
&+\frac{q_3q_4}{q_1+q_2+1+q_2q_5+q_5}
+\frac{q_2q_5}{q_1q_4+q_4+q_3q_4+1+q_3}\\
&+\frac{q_3q_5}{q_1q_4+q_2q_4+q_4+q_2+1}.
\end{aligned}
$$

特别地, $g(.1,\ldots,.1)>0.039$, $f(.9,\ldots,.9)<0.961$.

<a id="ans-mpr-52"></a>

**52.** [题目](../sec-mpr.md#ex-mpr-52) $\binom nk p^k\big/\sum_{j=0}^k\binom kj\binom{n-k}jp^j$.

<a id="ans-mpr-53"></a>

**53.** [题目](../sec-mpr.md#ex-mpr-53) $f(p_1,\ldots,p_6)\geq p_1p_2(1-p_3)/\bigl(1+p_4p_5(1-p_6)\bigr)+\cdots+p_6p_1(1-p_2)/\bigl(1+p_3p_4(1-p_5)\bigr)$. 应用这个方法时不要求单调性, 蕴涵元也不必是素的. 当各蕴涵元互不相交时, 所得结果就是精确值.

<a id="ans-mpr-54"></a>

**54.** [题目](../sec-mpr.md#ex-mpr-54) (a) $\Pr(X>0)\leq\mathrm E\,X=\binom n3p^3$, 因为对一切 $u<v<w$ 都有 $\mathrm E\,X_{uvw}=p^3$.

(b) $\Pr(X>0)\geq(\mathrm E\,X)^2/(\mathrm E\,X^2)$, 其中分子是 (a) 中那个量的平方, 分母可证为 $\binom n3p^3+12\binom n4p^5+30\binom n5p^6+20\binom n6p^6$. 例如, 对于每组 $u<v<w<w'$, $X^2$ 的展开式中有 12 项形如 $X_{uvw}X_{uvw'}$, 每一项的期望值均为 $p^5$.

<a id="ans-mpr-55"></a>

**55.** [题目](../sec-mpr.md#ex-mpr-55) 对应布尔函数有 $\binom{10}{2}=45$ 个变量, 它的一个 BDD 约有 140 万个结点, 可用来精确计算真实概率 $(1-p)^{45}G(p/(1-p))$, 其中 $G(z)$ 是相应的生成函数 (见习题 7.1.4–25). 结果为 (a) $30/37\approx.811<35165158461687/2^{45}\approx.999<15$, (b) $10/109\approx.092<4180246784470862526910349589019919032987399/(4\times10^{43})\approx.105<.12$.

<a id="ans-mpr-56"></a>

**56.** [题目](../sec-mpr.md#ex-mpr-56) 上界是 $\mu=\lambda^3/6$, 下界则把这个数除以 $1+\mu$. [精确的渐近值可以利用容斥原理及其 “夹逼” 性质求出, 如式 7.2.1.4–(48) 所示. 结果是 $1-e^{-\mu}$. 见 P. Erdős 和 A. Rényi, <em>Magyar Tudományos Akadémia Mat. Kut. Int. Közl.</em> **5** (1960), 17–61, §3.]

<a id="ans-mpr-57"></a>

**57.** [题目](../sec-mpr.md#ex-mpr-57) 为了计算 $\mathrm E(X\mid X_{uvw}=1)$, 对全部 $\binom n3$ 组 $u'<v'<w'$ 求 $\Pr(X_{u'v'w'}\mid X_{uvw}=1)$ 的和. 若 $\{u',v',w'\}\cap\{u,v,w\}$ 中有 $t$ 个元素, 这个概率为 $p^{3-t(t-1)/2}$, 这样的情形共有 $\binom3t\binom{n-3}{3-t}$ 个. 因此得到

$$
\Pr(X>0)\geq\binom n3 p^3\bigg/
\biggl(\binom{n-3}{3}p^3+3\binom{n-3}{2}p^3+3\binom{n-3}{1}p^2+\binom{n-3}{0}p^0\biggr).
$$

[在本题中, 两个不等式得出的下界相同, 不过这里的推导要容易些.]

<a id="ans-mpr-58"></a>

**58.** [题目](../sec-mpr.md#ex-mpr-58) $\Pr(X>0)\leq\binom nk p^{k(k-1)/2}$. 同上一答案一样应用条件期望不等式, 把这个上界除以 $\sum_{t=0}^k\binom kt\binom{n-k}{k-t}p^{k(k-1)/2-t(t-1)/2}$, 就得到下界.

<a id="ans-mpr-59"></a>

**59.** [题目](../sec-mpr.md#ex-mpr-59) (a) 只须证明 $a_0b_1+a_1b_0\leq c_0d_1+c_1d_0$. 关键在于

$$
c_1d_0(c_0d_1+c_1d_0-a_0b_1-a_1b_0)
=(c_1d_0-a_0b_1)(c_1d_0-a_1b_0)+(c_0c_1d_0d_1-a_0a_1b_0b_1).
$$

因此当 $c_1d_0\ne0$ 时结论成立; 若 $c_1d_0=0$, 则 $a_0b_1+a_1b_0=0$.

取 $a_0=b_0=d_0=0$, 其余变量为 1, 四个假设都取等号, 但结论是 $1\leq2$. 反过来, 取 $b_1=c_1=2$, 其余变量为 1, 于是 $a_1b_0<c_1d_0$, 结论却只是 $6\leq6$.

<a id="pdf-399"></a><a id="p-379"></a>

(b) 对于 $l=0,1$, 置 $A_l=\sum\{a_{2j+l}\mid0\leq j<2^{n-1}\}$, 由 $b_{2j+l}$, $c_{2j+l}$, $d_{2j+l}$ 类似地定义 $B_l$, $C_l$, $D_l$. 把假设限制在 $j\bmod2=l$ 和 $k\bmod2=m$ 的情形, 对 $n$ 用归纳法, 得 $A_lB_m\leq C_{l\mathbin{\vert}m}D_{l\mathbin{\&}m}$. 因此, 由 (a) 得到所要的不等式 $(A_0+A_1)(B_0+B_1)\leq(C_0+C_1)(D_0+D_1)$. [这个结果是 R. Ahlswede 和 D. E. Daykin 得出的, 见 <em>Zeitschrift für Wahrscheinlichkeitstheorie und verwandte Gebiete</em> **43** (1978), 183–185; 他们用下一题的语言表述了它.]

(c) 现在令 $A_n=a_0+\cdots+a_{2^n-1}$, 类似地定义 $B_n$, $C_n$, $D_n$. 若 $A_\infty B_\infty>C_\infty D_\infty$, 则对某个 $n$ 必有 $A_nB_n>C_\infty D_\infty$. 可是 $C_\infty D_\infty\geq C_nD_n$, 这与 (b) 矛盾.

[实际上还可以说得更强: 对一切 $n$ 都有 $\sum_{\nu j+\nu k=n}a_jb_k\leq\sum_{\nu j+\nu k=n}c_jd_k$. 见 A. Björner, <em>Combinatorica</em> **31** (2011), 151–164; D. Christofides, arXiv:0909.5137 [math.CO] (2009), 6 页.]

<a id="ans-mpr-60"></a>

**60.** [题目](../sec-mpr.md#ex-mpr-60) (a) 我们可以把每个集合看成非负整数的一个子集. 令 $\bar\alpha(S)=\alpha(S)[S\in\mathcal F]$, $\bar\beta(S)=\beta(S)[S\in\mathcal G]$, $\bar\gamma(S)=\gamma(S)[S\in\mathcal F\sqcup\mathcal G]$, $\bar\delta(S)=\delta(S)[S\in\mathcal F\sqcap\mathcal G]$. 那么 $\bar\alpha(\wp)=\alpha(\mathcal F)$, $\bar\beta(\wp)=\beta(\mathcal G)$, $\bar\gamma(\wp)=\gamma(\mathcal F\sqcup\mathcal G)$, $\bar\delta(\wp)=\delta(\mathcal F\sqcap\mathcal G)$, 其中 $\wp$ 是全体可能子集组成的族. 由于可照例用二进制数 $s=\sum_{j\in S}2^j$ 对非负整数集合 $S$ 编码, 只要令 $a_s=\bar\alpha(S)$, $b_s=\bar\beta(S)$, $c_s=\bar\gamma(S)$, $d_s=\bar\delta(S)$, 所求结果便由四函数定理得出.

(b) 对所有集合 $S$ 取 $\alpha(S)=\beta(S)=\gamma(S)=\delta(S)=1$.

<a id="ans-mpr-61"></a>

**61.** [题目](../sec-mpr.md#ex-mpr-61) (a) 在提示的特殊情形中, 取 $\alpha(S)=f(S)\mu(S)$, $\beta(S)=g(S)\mu(S)$, $\gamma(S)=f(S)g(S)\mu(S)$, $\delta(S)=\mu(S)$, 应用四函数定理即得. 一般情形也随之得证, 因为 $\mathrm E(fg)-(\mathrm E\,f)(\mathrm E\,g)=\mathrm E(\hat f\hat g)-(\mathrm E\,\hat f)(\mathrm E\,\hat g)$, 其中 $\hat f(S)=f(S)-f(\varnothing)$, $\hat g(S)=g(S)-g(\varnothing)$. [见 <em>Commun. Math. Physics</em> **22** (1971), 89–103.]

(b) 把 $f(S)$ 换成 $\theta f(S)$, 把 $g(S)$ 换成 $\phi g(S)$, 就把 $\mathrm E(fg)-(\mathrm E\,f)(\mathrm E\,g)$ 变为 $\theta\phi\bigl(\mathrm E(fg)-(\mathrm E\,f)(\mathrm E\,g)\bigr)$. 这里 $\theta$, $\phi$ 可以是任意实数.

(c) 若 $S$ 和 $T$ 属于支集, 则 $R=S\cap T$ 和 $U=S\cup T$ 也属于支集. 而且可写成 $S=R\cup\{s_1,\ldots,s_k\}$, $T=R\cup\{t_1,\ldots,t_l\}$, 使得对 $0\leq i\leq k$ 和 $0\leq j\leq l$, 集合 $S_i=R\cup\{s_1,\ldots,s_i\}$, $T_j=R\cup\{t_1,\ldots,t_j\}$ 及其并集 $U_{i,j}=S_i\cup T_j$ 均属于支集. 由 (iii), 对 $0\leq i<k$ 和 $0\leq j<l$ 有 $\mu(U_{i+1,j})/\mu(U_{i,j})\leq\mu(U_{i+1,j+1})/\mu(U_{i,j+1})$. 让 $i$ 从 0 取到 $k-1$, 将各不等式相乘, 得 $\mu(U_{k,j})/\mu(U_{0,j})\leq\mu(U_{k,j+1})/\mu(U_{0,j+1})$. 所以 $\mu(S)/\mu(R)=\mu(U_{k,0})/\mu(U_{0,0})\leq\mu(U_{k,l})/\mu(U_{0,l})=\mu(U)/\mu(T)$.

(d) 事实上等号成立, 因为 $[j\in S]+[j\in T]=[j\in S\cup T]+[j\in S\cap T]$. [注: 具有这种分布的随机变量常被称为 “泊松试验”, 容易引起混淆, 因为这个名称与习题 39 中迥然不同的泊松分布相冲突.]

(e) 下列各例中的 $c$ 均取到使 $\sum_S\mu(S)=1$. 各例中属于支集的集合都是 $U=\{1,\ldots,m\}$ 的子集. (i) 令 $\mu(S)=cr_1r_2\ldots r_{|S|}$, 其中 $0<r_1\leq\cdots\leq r_m$. (ii) 当 $S=\{1,\ldots,j\}$ 且 $1\leq j\leq m$ 时, 令 $\mu(S)=cp_j$, 其余情形取 $\mu(S)=0$. (若又有 $p_1=\cdots=p_m$, FKG 不等式就化为习题 1.2.3–31 的切比雪夫单调不等式.) (iii) 令

$$
\mu(S)=c\mu_1(S\cap U_1)\,\mu_2(S\cap U_2)\ldots\mu_k(S\cap U_k),
$$

其中每个 $\mu_j$ 都是 $U_j\subseteq U$ 的子集上满足 $(**)$ 的分布. 这些子域 $U_1,\ldots,U_k$ 不必互不相交. (iv) 令 $\mu(S)=ce^{-f(S)}$, 其中 $f$ 是 $U$ 的属于支集的子集上的次模集函数, 即只要 $f(S)$ 和 $f(T)$ 有定义, 就有 $f(S\cup T)+f(S\cap T)\leq f(S)+f(T)$. (见 §7.6.)

<a id="ans-mpr-62"></a>

**62.** [题目](../sec-mpr.md#ex-mpr-62) 布尔函数实质上是取值 0 或 1 的集函数. 一般说来, 在伯努利分布或任何其他满足习题 61 的条件的分布下, 由 FKG 不等式可知, 任意单调递增的布尔函数<a id="pdf-400"></a><a id="p-380"></a>都与任何其他单调递增的布尔函数正相关, 而与任何单调递减的布尔函数负相关. 本题中, $f$ 单调递增, $g$ 单调递减: 添一条边不会使图失去连通性; 删去一条边不会使一种已有的四色着色失效.

(注意, 若 $f$ 为布尔函数, 则 $\mathrm E\,f$ 就是在给定分布下 $f$ 为真的概率. 此时 $\operatorname{covar}(f,g)\leq0$ 等价于条件概率 $\Pr(f\mid g)\leq\Pr(f)$.)

<a id="ans-mpr-63"></a>

**63.** [题目](../sec-mpr.md#ex-mpr-63) 若 $\omega$ 为事件 “$Z_0=a$ 且 $Z_1=b$”, 则 $Z_0(\omega)=a$, $\mathrm E(Z_1\mid Z_0)(\omega)=(p_{a1}+2p_{a2})/(p_{a0}+p_{a1}+p_{a2})$. 因此 $p_{01}=p_{02}=p_{20}=p_{21}=0$, 且 $p_{10}=p_{12}$. 这些条件是 $\mathrm E(Z_1\mid Z_0)=Z_0$ 的充分必要条件.

<a id="ans-mpr-64"></a>

**64.** [题目](../sec-mpr.md#ex-mpr-64) (a) 否. 考虑一个只有三个样本点的概率空间, $(Z_0,Z_1,Z_2)$ 分别为 $(0,0,-2)$, $(1,0,2)$, $(1,2,2)$, 概率各为 $1/3$. 称它们为 $a$, $b$, $c$. 于是 $\mathrm E(Z_1\mid Z_0)(a)=0=Z_0(a)$, $\mathrm E(Z_1\mid Z_0)(b,c)=\tfrac12(0+2)=Z_0(b,c)$, $\mathrm E(Z_2\mid Z_1)(a,b)=\tfrac12(-2+2)=Z_1(a,b)$, $\mathrm E(Z_2\mid Z_1)(c)=2=Z_1(c)$. 然而 $\mathrm E(Z_2\mid Z_0,Z_1)(a)=-2\ne Z_1(a)$.

(b) 是. 对每组固定的 $(z_0,\ldots,z_n)$, 都有 $\sum_{z_{n+1}}(z_{n+1}-z_n)\Pr(Z_0=z_0,\ldots,Z_{n+1}=z_{n+1})=0$. 将这些式子相加, 得 $\sum_{z_{n+1}}(z_{n+1}-z_n)\Pr(Z_n=z_n,Z_{n+1}=z_{n+1})=0$.

<a id="ans-mpr-65"></a>

**65.** [题目](../sec-mpr.md#ex-mpr-65) 先注意, 只要 $k<n$, 就有 $\mathrm E(Z_{n+1}\mid Z_0,\ldots,Z_k)=\mathrm E\bigl(\mathrm E(Z_{n+1}\mid Z_0,\ldots,Z_n)\mid Z_0,\ldots,Z_k\bigr)=\mathrm E(Z_n\mid Z_0,\ldots,Z_k)$. 因而对一切 $n\geq0$, 有 $\mathrm E(Z_{m(n+1)}\mid Z_0,\ldots,Z_{m(n)})=Z_{m(n)}$. 如同上一题, 这就给出 $\mathrm E(Z_{m(n+1)}\mid Z_{m(0)},\ldots,Z_{m(n)})=Z_{m(n)}$.

<a id="ans-mpr-66"></a>

**66.** [题目](../sec-mpr.md#ex-mpr-66) 我们要确定 $\{Z_0,\ldots,Z_n\}$ 的联合分布, 不难看出只有一个解. 当 $\sigma_1,\ldots,\sigma_n$ 各为 $\pm1$ 时, 令 $p(\sigma_1,\ldots,\sigma_n)=\Pr(Z_1=\sigma_1,\ldots,Z_n=\sigma_n n)$. 鞅的条件给出

$$
\begin{aligned}
p(\sigma_1\ldots\sigma_n1)(n+1)-p(\sigma_1\ldots\sigma_n\bar1)(n+1)
&=\sigma_n p(\sigma_1\ldots\sigma_n)n\\
&=\sigma_n\bigl(p(\sigma_1\ldots\sigma_n1)+p(\sigma_1\ldots\sigma_n\bar1)\bigr)n,
\end{aligned}
$$

因而 $p(\sigma_1\ldots\sigma_{n+1})/p(\sigma_1\ldots\sigma_n)=(1+2n[\sigma_n\sigma_{n+1}>0])/(2n+2)$. 于是

$$
\Pr(Z_1=z_1,\ldots,Z_n=z_n)=
\frac{\prod_{k=1}^{n-1}(1+2k[z_kz_{k+1}>0])}{2^n n!}.
$$

例如, $n=3$ 时, 八种可能情形 $z_1z_2z_3=123,12\bar3,\ldots,\bar1\bar2\bar3$ 各以概率 $(15,3,1,5,5,1,3,15)/48$ 出现.

<a id="ans-mpr-67"></a>

**67.** [题目](../sec-mpr.md#ex-mpr-67) (a) 你 “总能” (以概率 1) 赚到 $2^{n+1}-(1+2+\cdots+2^n)=1$ 美元.

(b) 总支出为 $X=X_0+X_1+\cdots$ 美元, 其中 $X_n$ 以概率 $2^{-n}$ 等于 $2^n$, 否则 $X_n=0$. 所以 $\mathrm E\,X_n=1$, 而 $\mathrm E\,X=\mathrm E\,X_0+\mathrm E\,X_1+\cdots=\infty$.

(c) 设 $\langle T_n\rangle$ 是一列均匀的随机比特, 定义公平序列 $Y_n=(-1)^{T_n}2^nT_0\ldots T_{n-1}$; 若没有这一注, 就有 $Y_n=0$. 若以第一次下注为第 0 注, 则试过 $n$ 次后的收益为 $Z_n=Y_0+\cdots+Y_{n-1}$, $Z_0=0$.

[著名冒险家卡萨诺瓦在 1754 年用这种策略输掉了一大笔钱. 他在自传 <em>Histoire de ma vie</em> 中把它称为 “the martingale”. 尼古拉·伯努利曾提出类似的赌法 (见 P. R. de Montmort, <em>Essay d’Analyse sur les Jeux de Hazard</em>, 第 2 版 (1713), 第 402 页). 他的堂兄弟丹尼尔·伯努利研究了 (a) 和 (b) 中令人困惑之处; 他在 <em>Commentarii Academiæ Scientiarum Imperialis Petropolitanæ</em> **5** (1731), 175–192 上发表的重要论文, 使这个问题以 “圣彼得堡悖论” 闻名.]

<a id="ans-mpr-68"></a>

**68.** [题目](../sec-mpr.md#ex-mpr-68) (a) 现在 $Z_n=Y_1+\cdots+Y_n$, 其中 $Y_n=(-1)^{T_n}[N\geq n]$. 仍然有 $\Pr(Z_N=1)=1$.

(b) 生成函数 $g(z)$ 等于 $z(1+g(z)^2)/2$, 因为第一注若输了, 此后就得赢 2 美元. 所以 $g(z)=(1-\sqrt{1-z^2})/z$, 所求概率为 $[z^n]\,g(z)=C_{(n-1)/2}[n\text{ 为奇数}]/2^n$, 其中 $C_k$ 是卡塔兰数 $\binom{2k}k/(k+1)$.

(c) $\Pr(N\geq n)=[z^n](1-zg(z))/(1-z)=[z^n](1+z)/\sqrt{1-z^2}=\binom{2\lfloor n/2\rfloor}{\lfloor n/2\rfloor}/2^{2\lfloor n/2\rfloor}$.

(d) $\mathrm E\,N=g'(1)=\infty$. (它也等于 $\sum_{n=1}^{\infty}\Pr(N\geq n)$, 其中 $\Pr(N\geq n)\sim\sqrt{2/(\pi n)}$.)

(e) 设 $p_m$ 为对一切 $n\geq0$ 都有 $Z_n\geq-m$ 的概率. 显然 $p_0=1/2$, 而对 $m>0$ 有 $p_m=(1+p_{m-1}p_m)/2$. 这个递推式的解为 $p_m=(m+1)/(m+2)$. 所以答案为 $1/\bigl((m+1)(m+2)\bigr)$, 这又是一个均值无穷大的概率分布.

<a id="pdf-401"></a><a id="p-381"></a>

(f) 取到 $-m$ 的次数的生成函数 $g_m(z)$ 满足 $g_0(z)=z/(2-z)$, 当 $m>0$ 时有 $g_m(z)=(1+g_{m-1}(z)g_m(z))/2$. 所以 $m\geq0$ 时 $g_m(z)=h_m(z)/h_{m+1}(z)$, 其中 $h_m(z)=2m-(2m-1)z$, 而 $g'_m(1)=2$. [这次分布的均值是<em>有限的</em>! 见 W. Feller, <em>An Intro. to Probability Theory</em> **2**, 第 2 版 (1971), XII.2.]

<a id="ans-mpr-69"></a>

**69.** [题目](../sec-mpr.md#ex-mpr-69) 每个 $n$ 元排列都对应罐中 $n+1$ 个球的一种配置. 按方法 1, 相应的 “红球” 数是元素 1 的<em>位置</em>; 按方法 2, 则是位置 1 上的<em>值</em>. 例如, 排列 $3\,1\,2\,4$ 按方法 1 应放入结点 $(2,3)$, 按方法 2 却应放入 $(3,2)$. (事实上, 两种方法所构造的排列互逆.)

<a id="ans-mpr-70"></a>

**70.** [题目](../sec-mpr.md#ex-mpr-70) 从根上的排列 $1\,2\,\ldots\,(c-1)$ 开始, 用上题的方法 1 生成其中这些元素保持原有次序的所有 $n!/(c-1)!$ 个排列. 在一个排列中, 记元素 $j$ 的位置为 $P_j$ ($1\leq j<c$), 并置 $P_0=0$, $P_c=n+1$. 第 $j$ 色球的个数便是 $A_j=P_j-P_{j-1}$ ($1\leq j\leq c$). 例如, 若 $c=3$, 则排列 $3\,1\,4\,2$ 对应于结点 $(2,2,1)$. 所得的多元组 $(A_1,\ldots,A_c)/(n+1)$ 在 $n=c,c+1,\ldots$ 时构成鞅. 对每个 $n$, 球数向量 $(A_1,\ldots,A_c)$ 均匀分布在把 $n+1$ 写成 $c$ 个正整数之和的全部 $\binom n{c-1}$ 个有序分划上.

[若波利亚的双色模型起初有 $r$ 个红球和 $b$ 个黑球, 也可照此办理: 设想有 $r+b$ 种颜色, 再把其中前 $r$ 种都看作红色. D. Blackwell 和 D. Kendall 最早研究了这个模型, 见 <em>J. Applied Probability</em> **1** (1964), 284–296.]

<a id="ans-mpr-71"></a>

**71.** [题目](../sec-mpr.md#ex-mpr-71) 若 $m=r'-r$, $n=b'-b$, 就必须向右走 $m$ 步、向左走 $n$ 步, 共有 $\binom{m+n}n$ 条这样的路径. 各条路径的概率相同, 因为概率乘积的分子都是以某种次序相乘的 $r(r+1)\ldots(r'-1)\,b(b+1)\ldots(b'-1)=r^{\overline m}b^{\overline n}$, 分母都是 $(r+b)(r+b+1)\ldots(r'+b'-1)=(r+b)^{\overline{m+n}}$.

答案为 $\binom{m+n}n r^{\overline m}b^{\overline n}/(r+b)^{\overline{m+n}}$. 当 $r=b=1$ 时, 它化为 $1/(r'+b'-1)$.

<a id="ans-mpr-72"></a>

**72.** [题目](../sec-mpr.md#ex-mpr-72) 由于走到 $(r,b)$ 的各条路径等可能, 这个期望同 $\mathrm E(X_1X_2\ldots X_m)$ 一样, 显然是 $1/(m+1)$. (所以这些 $X$ 的相关性<em>很强</em>. 如果它们相互独立, 期望便是 $1/2^m$. 注意, 例如事件 $(X_2=1,X_5=0,X_6=1)$ 的概率为 $\mathrm E(X_2(1-X_5)X_6)=1/3-1/4$.)

[这种可交换随机变量意义深远, 可参阅 O. Kallenberg 的专著 <em>Probabilistic Symmetries and Invariance Principles</em> (2005).]

<a id="ans-mpr-73"></a>

**73.** [题目](../sec-mpr.md#ex-mpr-73) 由对 $r$ 的归纳得 $f(r,n)=r\binom{n+1}r\sum_k\binom{r-1}k(-1)^kq_{n+1-r+k}$, 其中 $q_k=a_k/(k+1)$.

<a id="ans-mpr-74"></a>

**74.** [题目](../sec-mpr.md#ex-mpr-74) 第 $n$ 层的结点 $(r,n+2-r)$ 以概率 $\left\langle{n+1\atop r-1}\right\rangle/(n+1)!$ 到达, 它与一个欧拉数成正比 (见 §5.1.3). (事实上, 用习题 69 中的方法 1, 可以把 $\{1,\ldots,n+1\}$ 中恰有 $r$ 个上升段的排列对应到这个结点.)

参考文献: <em>Communications on Pure and Applied Mathematics</em> **2** (1949), 59–70.

<a id="ans-mpr-75"></a>

**75.** [题目](../sec-mpr.md#ex-mpr-75) 如前所述, 设 $R_n=X_0+\cdots+X_n$ 为第 $n$ 层的红球个数. 现在有 $\mathrm E(X_{n+1}\mid X_0,\ldots,X_n)=1-R_n/(n+2)$. 因此 $\mathrm E(R_{n+1}\mid R_n)=(n+1)R_n/(n+2)+1$, 自然可以取 $Z_n=(n+1)R_n-(n+2)(n+1)/2$.

<a id="ans-mpr-76"></a>

**76.** [题目](../sec-mpr.md#ex-mpr-76) 否. 例如, 令 $Z_0=X$, $Z'_0=Y$, $Z_1=Z'_1=X+Y$, 其中 $X$ 和 $Y$ 相互独立且 $\mathrm E\,X=\mathrm E\,Y=0$. 于是 $\mathrm E(Z_1\mid Z_0)=Z_0$, $\mathrm E(Z'_1\mid Z'_0)=Z'_0$, 但 $\mathrm E(Z_1+Z'_1\mid Z_0+Z'_0)=2(Z_0+Z'_0)$. (另一方面, 若 $\langle Z_n\rangle$ 和 $\langle Z'_n\rangle$ 都是关于同一个序列 $\langle X_n\rangle$ 的鞅, 那么 $\langle Z_n+Z'_n\rangle$ 也是.)

<a id="ans-mpr-77"></a>

**77.** [题目](../sec-mpr.md#ex-mpr-77) $\mathrm E(Z_{n+1}\mid Z_0,\ldots,Z_n)=\mathrm E\bigl(\mathrm E(Z_{n+1}\mid Z_0,\ldots,Z_n,X_0,\ldots,X_n)\mid Z_0,\ldots,Z_n\bigr)$. 由于 $Z_n$ 是 $X_0,\ldots,X_n$ 的函数, 这个式子等于 $\mathrm E\bigl(\mathrm E(Z_{n+1}\mid X_0,\ldots,X_n)\mid Z_0,\ldots,Z_n\bigr)$,<a id="pdf-402"></a><a id="p-382"></a> 而这又等于 $\mathrm E(Z_n\mid Z_0,\ldots,Z_n)=Z_n$. (此外, 譬如说, $\langle Z_n\rangle$ 也是关于一个常数序列的鞅. 但它并非关于<em>每个</em>序列都是鞅.)

类似的证明表明, 任何关于 $\langle X_n\rangle$ 公平的序列 $\langle Y_n\rangle$ 关于它自身也公平.

<a id="ans-mpr-78"></a>

**78.** [题目](../sec-mpr.md#ex-mpr-78) $\mathrm E(Z_{n+1}\mid V_0,\ldots,V_n)=\mathrm E(Z_nV_{n+1}\mid V_0,\ldots,V_n)=Z_n$.

反过来, 令 $V_0=Z_0$, 当 $n>0$ 时令 $V_n=Z_n/Z_{n-1}$, 就可得到所求的序列, <em>条件是</em> $Z_{n-1}=0$ 蕴涵 $Z_n=0$, 并约定在这种情形取 $V_n=1$.

<a id="ans-mpr-79"></a>

**79.** [题目](../sec-mpr.md#ex-mpr-79) $Z_n=V_0V_1\ldots V_n$, 其中 $V_0=1$, 各 $V_n$ ($n>0$) 相互独立, 以概率 $p$ 取 $q/p$, 以概率 $q$ 取 $p/q$. 由于 $\mathrm E\,V_n=q+p=1$, 序列 $\langle V_n\rangle$ 在乘法意义下公平. [见 A. de Moivre, <em>The Doctrine of Chances</em> (1718), 102–154.]

<a id="ans-mpr-80"></a>

**80.** [题目](../sec-mpr.md#ex-mpr-80) (a) 真; 事实上对任意函数 $f_n$, 都有 $\mathrm E(f_n(Y_0,\ldots,Y_{n-1})Y_n)=0$.

(b) 假. 例如, 若 $Y_3>0$ 则令 $Y_5$ 等可能地取 $\pm1$, 否则令 $Y_5=0$. (因此重新排列一个公平序列, 得到的不一定仍然公平. 不过如果各 $Y$ <em>相互独立</em>且均值为零, 命题便为真.)

(c) 若 $n_1=0$ 且 $m=1$ (或者 $m=0$), 则为假; 其余情形为真. (若序列满足 $\mathrm E\bigl((Y_{n_1}-\mathrm E\,Y_{n_1})\ldots(Y_{n_m}-\mathrm E\,Y_{n_m})\bigr)=\mathrm E(Y_{n_1}-\mathrm E\,Y_{n_1})\ldots\mathrm E(Y_{n_m}-\mathrm E\,Y_{n_m})$, 就称之为<em>完全不相关</em>. 这样的序列即使所有 $\mathrm E\,Y_n=0$, 也不一定公平; 但公平序列总是完全不相关的.)

<a id="ans-mpr-81"></a>

**81.** [题目](../sec-mpr.md#ex-mpr-81) 假定可从 $Z_0,\ldots,Z_n$ 推出 $X_0,\ldots,X_n$. 对 $n\geq1$, 有

$$
\begin{aligned}
a_nX_n+b_nX_{n-1}=Z_n
 &=\mathrm E(Z_{n+1}\mid Z_0,\ldots,Z_n)\\
 &=\mathrm E(a_{n+1}X_{n+1}+b_{n+1}X_n\mid X_0,\ldots,X_n)\\
 &=a_{n+1}(X_n+X_{n-1})+b_{n+1}X_n.
\end{aligned}
$$

所以 $a_{n+1}=b_n$, $b_{n+1}=a_n-a_{n+1}=b_{n-1}-b_n$. 由归纳法得 $a_n=F_{-n-1}$, $b_n=F_{-n-2}$, 也就验证了上述假定.

[见 J. B. MacQueen, <em>Annals of Probability</em> **1** (1973), 263–271.]

<a id="ans-mpr-82"></a>

**82.** [题目](../sec-mpr.md#ex-mpr-82) (a) $Z_n=A_n/C_n$, 其中 $A_n=4-X_1-\cdots-X_n$, $C_n$ 分别为已经见过 $n$ 张牌后余下的 A 张数和牌的总张数. 因此下一步的条件期望为 $(A_n/C_n)(A_n-1)/(C_n-1)+(1-A_n/C_n)A_n/(C_n-1)=A_n/C_n$. (一般地, 在波利亚罐子的第 $n$ 步添入所取颜色的 $k_n$ 个球, 则红球数与球总数之比总是鞅. 即使 $k_n$ 为负也成立, 只要剩余的该色球足够多. 本题相当于 $k_n=-1$.)

(b) 这就是时间有界的鞅的可选停止原理.

(c) $Z_N=A_N/C_N$ 是下一张为 A 的概率. [“现在要 A” 是 R. Connelly 的游戏 “说红” 的一个变种; 见 <em>Pallbearers Review</em> **9** (1974), 702.]

<a id="ans-mpr-83"></a>

**83.** [题目](../sec-mpr.md#ex-mpr-83) $Z_n=\sum_{k=1}^n(X_k-\mathrm E\,X_k)$ 为鞅, 因而对任意 $m$ 均可研究有界的停止规则 $N'_n(x_0,\ldots,x_{n-1})=[n<m]\,N_n(x_0,\ldots,x_{n-1})$. 不过 Svante Janson 建议直接从 $S_N=\sum_{n=1}^{\infty}X_n[N\geq n]$ 算起, 其中 $N$ 可以为 $\infty$. 由于 $[N\geq n]$ 是 $\{X_0,\ldots,X_{n-1}\}$ 的函数, 与 $X_n$ 独立, 有 $\mathrm E(X_n[N\geq n])=(\mathrm E\,X_n)\,\mathrm E[N\geq n]$. 又由于 $X_n\geq0$,

$$
\begin{aligned}
\mathrm E\,S_N&=\sum_{n=1}^{\infty}\mathrm E(X_n[N\geq n])
=\sum_{n=1}^{\infty}(\mathrm E\,X_n)\,\mathrm E[N\geq n]\\
&=\sum_{n=1}^{\infty}\mathrm E\bigl((\mathrm E\,X_n)[N\geq n]\bigr)
=\mathrm E\sum_{n=1}^{\infty}(\mathrm E\,X_n)[N\geq n]
=\mathrm E\sum_{n=1}^N\mathrm E\,X_n.
\end{aligned}
$$

(等式可能是 “$\infty=\infty$”.)

[瓦尔德的原始论文见 <em>Annals of Mathematical Statistics</em> **15** (1944), 283–296; **16** (1945), 287–293. 他处理的问题稍有不同, 所证明的结果也更多.]

<a id="ans-mpr-84"></a>

**84.** [题目](../sec-mpr.md#ex-mpr-84) (a) 由延森不等式, $f(Z_n)=f\bigl(\mathrm E(Z_{n+1}\mid Z_0,\ldots,Z_n)\bigr)\leq\mathrm E(f(Z_{n+1})\mid Z_0,\ldots,Z_n)$. 如答案 77, 再对 $f(Z_0),\ldots,f(Z_n)$ 取条件期望, 即得 $f(Z_n)\leq\mathrm E(f(Z_{n+1})\mid f(Z_0),\ldots,f(Z_n))$. [顺便一提, D. Gilat 已证明, 每个非负下鞅都可表示为某个鞅 $\langle Z_n\rangle$ 的 $\langle|Z_n|\rangle$; 见 <em>Annals of Probability</em> **5** (1977), 475–481.]

(b) 仍得到一个下鞅, <em>条件是</em> $a\leq x\leq y\leq b$ 时还有 $f(x)\leq f(y)$. [J. L. Doob, <em>Stochastic Processes</em> (1953), 295–296.]

<a id="pdf-403"></a><a id="p-383"></a>

<a id="ans-mpr-85"></a>

**85.** [题目](../sec-mpr.md#ex-mpr-85) 由 (27), $\langle B_n/(R_n+B_n)\rangle=\langle1-R_n/(R_n+B_n)\rangle$ 为鞅, 而 $f(x)=1/x$ 在 $x>0$ 上为凸函数. 故由习题 84, $\langle(R_n+B_n)/B_n\rangle=\langle R_n/B_n+1\rangle$ 是下鞅. (也可直接证明.)

<a id="ans-mpr-86"></a>

**86.** [题目](../sec-mpr.md#ex-mpr-86) 规则 $N_{n+1}(Z_0,\ldots,Z_n)=[\max(Z_0,\ldots,Z_n)<x\text{ 且 }n+1<m]$ 是有界的. 用 (31) 定义 $N$. 若 $\max(Z_0,\ldots,Z_{m-1})<x$, 则 $Z_N<x$; 同样, 若 $\max(Z_0,\ldots,Z_{m-1})\geq x$, 则 $Z_N\geq x$. 由马尔可夫不等式, $\Pr(\max(Z_0,\ldots,Z_{m-1})\geq x)\leq(\mathrm E\,Z_N)/x$; 而对下鞅有 $\mathrm E\,Z_N\leq\mathrm E\,Z_{m-1}$.

<a id="ans-mpr-87"></a>

**87.** [题目](../sec-mpr.md#ex-mpr-87) 这是 $Z_n$ 会取到 $3/4$ 的概率, 也就是在所考察的步数内 $\Pr(\max(Z_0,\ldots,Z_n)\geq3/4)$. 但对一切 $n$ 有 $\mathrm E\,Z_n=1/2$, 所以由 (33) 知道, 这个概率至多是 $(1/2)/(3/4)=2/3$.

(精确值可用下题的方法计算. 它等于 $\sum_{k=0}^{\infty}2/\bigl((4k+2)(4k+3)\bigr)=\tfrac12H_{3/4}-\tfrac12H_{1/2}+\tfrac13=\tfrac14\pi-\tfrac12\ln2\approx.439$.)

<a id="ans-mpr-88"></a>

**88.** [题目](../sec-mpr.md#ex-mpr-88) (a) 当且仅当某一时刻红球比黑球多时, 才有 $S>1/2$. 过程为此必经过结点 $(2,1),(3,2),(4,3),\ldots$ 之一. 因而所求概率为 $p_1+p_2+\cdots$, 其中 $p_k$ 是先到达结点 $(k+1,k)$ 而未先到达任何 $(j+1,j)$ ($j<k$) 的概率.

从根到 $(k+1,k)$ 的各条路径等可能, 满足我们限制的路径又等价于 7.2.1.6–(28) 中的路径. 因此可用式 7.2.1.6–(23) 证明 $p_k=1/(2k-1)-1/(2k)$; 而 $1-1/2+1/3-1/4+\cdots=\ln2$.

(b, c) 令 $p_k$ 为过程在任何较早的结点 $((t-1)j+1,j)$ 之前到达 $((t-1)k+1,k)$ 的概率. 用 $t$ 元选票数 $C_{pq}^{(t)}$ 作类似计算, 得 $p_k=(t-1)\bigl(1/(tk-1)-1/(tk)\bigr)$. 于是 $\sum_{k=1}^{\infty}p_k=1-(1-1/t)H_{1-1/t}$ (见附录 A).

<em>注:</em> 由于总有 $S\geq1/2$, 有 $\Pr(S=1/2)=1-\ln2$. 但是, 我们<em>不能</em>说 $\Pr(S\geq2/3)$ 就是所有经过 $(2,1),(4,2),(6,3),\ldots$ 的情形的概率之和, 因为即使从未取到 $2/3$, 上确界仍可能是 $2/3$. 经过这些结点之一的概率为 $\pi/\sqrt{27}$; 因而 $\Pr(S=2/3)\geq2\pi/\sqrt{27}-\ln3\approx.111$. 判定 $\Pr(S=2/3)$ 的精确值超出了本书的范围. 我们只在离散空间上定义概率, 避免了测度论的复杂情形. 按我们的定义, 甚至不能把 $S$ 这样的极限当作随机变量! 但对于任何给定的 $n$ 和 $x$, 我们<em>可以</em>给事件 $\max(Z_0,Z_1,\ldots,Z_n)>x$ 赋予概率, 也可以推论这些概率的极限.

E. Schulte-Geers 和 W. Stadje 用更深的方法证明, 几乎必然在 $n$ 步以内就取到了上确界. 所以 $\Pr(S=2/3)=2\pi/\sqrt{27}-\ln3$; 事实上 $\Pr(S\text{ 为有理数})=1$, 因为实际取到的都是有理数; 而且 $\Pr(S=(t-1)/t)=(2-3/t)H_{1-1/t}-(1-2/t)H_{1-2/t}-(t-2)/(t-1)$. [<em>J. Applied Prob.</em> **52** (2015), 180–190.]

<a id="ans-mpr-89"></a>

**89.** [题目](../sec-mpr.md#ex-mpr-89) 取 $Y_n=c_n(X_n-p_n)$, $a_n=-c_np_n$, $b_n=c_n(1-p_n)$. (顺便一提, 当 $c_1=\cdots=c_n=1$ 时, 习题 1.2.10–22 给出了形式颇为不同的一个上界.)

<a id="ans-mpr-90"></a>

**90.** [题目](../sec-mpr.md#ex-mpr-90) (a) 对 $\Pr(e^{(Y_1+\cdots+Y_n)t}\geq e^{tx})$ 应用马尔可夫不等式.

(b) 函数 $e^{yt}$ 关于 $y$ 是凸的, 所以 $e^{yt}\leq e^{-pt}(q-y)+e^{qt}(y+p)=e^{f(t)}+ye^{g(t)}$.

(c) 有 $f'(t)=-p+pe^t/(q+pe^t)$, $f''(t)=pqe^t/(q+pe^t)^2$, 因而 $f(0)=f'(0)=0$. 又有 $f''(t)\leq1/4$, 因为 $q$ 和 $pe^t$ 的几何平均 $(pqe^t)^{1/2}$ 不超过算术平均 $(q+pe^t)/2$.

(d) 置 $c=b-a$, $p=-a/c$, $q=b/c$, $Y'=Y/c$, $t'=ct$, $h(t)=e^{g(ct)}/c$.

(e) 在 $\mathrm E\bigl((e^{c_1^2t^2/8}+Y_1h_1(t))\ldots(e^{c_n^2t^2/8}+Y_nh_n(t))\bigr)$ 中, 含有 $h_k(t)$ 的项全都消去, 因为 $\langle Y_n\rangle$ 是公平序列. 剩下的常数项就是 $e^{ct^2/4}$.

(f) 取 $t=2x/c$, 就有 $ct^2/4-xt=-x^2/c$.

<a id="ans-mpr-91"></a>

**91.** [题目](../sec-mpr.md#ex-mpr-91) $\mathrm E(Z_{n+1}\mid X_0,\ldots,X_n)=\mathrm E\bigl(\mathrm E(Q\mid X_0,\ldots,X_n,X_{n+1})\mid X_0,\ldots,X_n\bigr)$, 由答案 35 的式 $(*)$, 后者等于 $\mathrm E(Q\mid X_0,\ldots,X_n)$. 再用习题 77 即得.

<a id="pdf-404"></a><a id="p-384"></a>

<a id="ans-mpr-92"></a>

**92.** [题目](../sec-mpr.md#ex-mpr-92) $Q_0=\mathrm E\,X_m=1/2$. 若 $n<m$, 则 $Q_n=\mathrm E(X_m\mid X_0,\ldots,X_n)$, 这同 $\mathrm E(X_{n+1}\mid X_0,\ldots,X_n)$ 相等 (见习题 72), 即 $(1+X_1+\cdots+X_n)/(n+2)$, 也就是 (27) 中的 $Z_n$. 不过当 $n\geq m$ 时, $Q_n=X_m$.

<a id="ans-mpr-93"></a>

**93.** [题目](../sec-mpr.md#ex-mpr-93) 全部推导都照旧, 只需把 $(m-1)^t/m^{t-1}$ 换成推广后的期望 $\sum_{k=1}^m\prod_{n=1}^t(1-p_{nk})$.

<a id="ans-mpr-94"></a>

**94.** [题目](../sec-mpr.md#ex-mpr-94) 若各 $X$ 相互依赖, 杜布鞅仍有定义; 可是将它的公平序列写成 $\Delta(x_1,\ldots,x_t)$ 的平均值时, 就不再有 (40) 那样简洁的公式. 在形如 $\sum_xp_x\bigl(Q(\ldots x_n\ldots)-Q(\ldots x\ldots)\bigr)$ 的 $\Delta$ 公式中, 求和权重的推导要求 $\Pr(X_n=x_n,X_{n+1}=x_{n+1},\ldots)/\bigl(\Pr(X_n=x_n)\Pr(X_{n+1}=x_{n+1},\ldots)\bigr)=\sum_xp_x$, 因而它必须与 $x_n$ 无关. 所以 (41) 不能照用.

<a id="ans-mpr-95"></a>

**95.** [题目](../sec-mpr.md#ex-mpr-95) 假. 第 $n$ 层只有一个红球的概率是 $1/(n+1)=\Omega(n^{-1})$. 不过红球数<em>几乎必然</em>会超过 100, 因为发生的概率为 $(n-99)/(n+1)$.

<a id="ans-mpr-96"></a>

**96.** [题目](../sec-mpr.md#ex-mpr-96) 在习题 1.2.10–21 中, 取 $\epsilon n$ 为 $|X-n/2|$ 的界, 就知道 (i) 相当必然, 而 (i)、(ii)、(iii) 均几乎必然. 要证明 (iv) 并非几乎必然, 可以用斯特林近似: 当 $\sqrt n\leq k\leq2\sqrt n$ 时, $\binom n{n/2\pm k}/2^n=\Theta(n^{-1/2})$ (取使下标为整数的 $k$). 因此 $\Pr(|X-n/2|\geq\sqrt n)=\Theta(1)$. 类似计算表明 (ii) 并非相当必然.

<a id="ans-mpr-97"></a>

**97.** [题目](../sec-mpr.md#ex-mpr-97) 只须证明<em>单独一个</em>箱子相当必然收到这么多对象. 进入某个指定箱子的对象数 $H$ 的概率生成函数为 $G(z)=((n-1+z)/n)^N$, 其中 $N=\lfloor n^{1+\delta}\rfloor$. 取 $r=\tfrac12n^\delta$, 由 1.2.10–(24) 得

$$
\Pr(H\leq r)\leq(1/2)^{-r}G(1/2)
=2^r\left(1-\frac1{2n}\right)^{\lfloor2nr\rfloor}
\leq2^r\left(1-\frac1{2n}\right)^{2nr-1}\leq2^{r+1}e^{-r}.
$$

若 $r=2n^\delta$, 则由 1.2.10–(25) 得

$$
\Pr(H\geq r)\leq2^{-r}G(2)=2^{-r}(1+1/n)^{\lfloor nr/2\rfloor}
\leq2^{-r}(1+1/n)^{nr/2}\leq2^{-r}e^{r/2}.
$$

两个界都指数小. [见 Knuth、Motwani 和 Pittel, <em>Random Structures & Algorithms</em> **1** (1990), 1–14, 引理 1.]

<a id="ans-mpr-98"></a>

**98.** [题目](../sec-mpr.md#ex-mpr-98) 设 $E_n=\mathrm E\,R$, 其中 $R$ 为减少 $X$ 所需的步数. 又设 $F(n)$ 以概率 $p_k$ 等于 $k$, 其中 $\sum_{k=1}^n p_k=1$, $\sum_{k=1}^nkp_k=g\geq g_n$. (一般说来, 每次计算 $F(n)$ 时, $p_1,\ldots,p_n$ 和 $g$ 的值都可以不同.)

令 $\Sigma_a^b=\sum_{j=a}^b1/g_j$. 显然 $E_0=0$. 若 $n>0$, 由归纳法有

$$
\begin{aligned}
E_n&=1+\sum_{k=1}^n p_kE_{n-k}
\leq1+\sum_{k=1}^n p_k\Sigma_1^{n-k}
=1+\sum_{k=1}^n p_k(\Sigma_1^n-\Sigma_{n-k+1}^n)\\
&=\Sigma_1^n+1-\sum_{k=1}^n p_k\Sigma_{n-k+1}^n
\leq\Sigma_1^n+1-\sum_{k=1}^np_k\,k/g_n\leq\Sigma_1^n.
\end{aligned}
$$

[见 R. M. Karp、E. Upfal 和 A. Wigderson, <em>J. Comp. and Syst. Sci.</em> **36** (1988), 252.]

<a id="ans-mpr-99"></a>

**99.** [题目](../sec-mpr.md#ex-mpr-99) 若能为归纳法找到依据, 把求和范围改为从 $k=-\infty$ 到 $n$, 并在 $a>b$ 时定义 $\Sigma_a^b=-\sum_{j=b+1}^{a-1}1/g_j$, 就仍可采用上面的证明. (例如, 由此得 $-\Sigma_{n+3}^n=1/g_{n+1}+1/g_{n+2}\leq2/g_n$.)

事实上, 对 $m$ 用归纳法, 这样做确实能证明对所有 $m,n\geq0$, 都有 $E_{m,n}\leq\Sigma_1^n$, 其中 $E_{m,n}=\mathrm E\min(m,R)$. 的确, $E_{0,n}=E_{m+1,0}=0$, 而当 $n>0$ 时 $E_{m+1,n}=1+\sum_{k=-\infty}^n p_kE_{m,n-k}$. [本题是 Motwani 和 Raghavan 的 <em>Randomized Algorithms</em> (1995) 的习题 1.6. Svante Janson 指出, 设 $X_m$ 是第 $m$ 次迭代后 $X$ 的值, 则上述证明还表明随机变量 $Z_m=\Sigma_1^{X_m}+\min(m,R)$ 构成一个上鞅.]

<a id="pdf-405"></a><a id="p-385"></a>

<a id="ans-mpr-100"></a>

**100.** [题目](../sec-mpr.md#ex-mpr-100) (a) $\sum_{k=1}^m kp_k\leq\mathrm E\min(m,T)=p_1+2p_2+\cdots+mp_m+mp_{m+1}+\cdots+mp_\infty\leq\mathrm E\,T$.

(b) 对所有 $m$ 都有 $\mathrm E\min(m,T)\geq mp_\infty$. (这里约定 $\infty\cdot p=(p>0\mathbin{?}\infty\mathbin{:}0)$.)

<a id="ans-mpr-101"></a>

**101.** [题目](../sec-mpr.md#ex-mpr-101) (Svante Janson 解.) 若 $0<t<\min(p_1,\ldots,p_m)=p$, 则 $\mathrm E\,e^{tX}=\prod_{k=1}^m\mathrm E\,e^{tX_k}=\prod_{k=1}^mp_k/(e^{-t}-1+p_k)<\prod_{k=1}^mp_k/(p_k-t)$, 因为 $e^{-t}-1>-t$. 置 $t=\theta/\mu$. 注意到 $p_k\ln(1-t/p_k)\geq p\ln(1-t/p)\geq\mu^{-1}\ln(1-t\mu)=(t/\theta)\ln(1-\theta)$. 因此, 由 1.2.10–(25),

$$
\begin{aligned}
\Pr(X\geq r\mu)&\leq e^{-rt\mu}\prod_{k=1}^mp_k/(p_k-t)
=\exp\left(-r\theta-\sum_{k=1}^m\ln(1-t/p_k)\right)\\
&\leq\exp\left(-r\theta-\sum_{k=1}^m(t/p_k)\ln(1-\theta)/\theta\right)
=\exp\bigl(-r\theta-\ln(1-\theta)\bigr).
\end{aligned}
$$

取 $\theta=(r-1)/r$ 就得到所求的界 $re^{1-r}$. (当 $m=1$ 且 $p$ 很小时, 这个界相当紧, 因为 $\Pr(X\geq r/p)=(1-p)^{\lceil r/p\rceil-1}\approx e^{-r}$.)

<a id="ans-mpr-102"></a>

**102.** [题目](../sec-mpr.md#ex-mpr-102) 在习题 101 中取 $\mu\leq s_1+\cdots+s_m$, $r=\ln n$, 所得 $(s_1+\cdots+s_m)r$ 次尝试仍嫌不足的概率为 $O(n^{-1}\log n)$. 若 $r=f(n)\ln n$, 其中 $f(n)$ 是 $n\to\infty$ 时无界的任意递增函数, 则尝试 $s_kr$ 次仍得不到第 $k$ 张优惠券的概率超多项式地小. 在多项式那么多次可能的失败中发生任何一次的概率也同样小.

<a id="ans-mpr-103"></a>

**103.** [题目](../sec-mpr.md#ex-mpr-103) (a) 递推式 $p_{0ij}=[i=j]$, $p_{(n+1)ij}=\sum_{k=0}^2p_{nik}\bigl([f_0(k)=j]+[f_1(k)=j]\bigr)/2$ 给出生成函数 $g_{ij}=\sum_{n=0}^{\infty}p_{nij}z^n$, 它们满足 $g_{i0}=[i=0]+(g_{i0}+g_{i1})z/2$, $g_{i1}=[i=1]+(g_{i0}+g_{i2})z/2$, $g_{i2}=[i=2]+(g_{i1}+g_{i2})z/2$. 解为 $g_{i0}=A+B+C$, $g_{i1}=A-2B$, $g_{i2}=A+B-C$, 其中 $A=\tfrac13/(1-z)$, $B=\tfrac16(1-3[i=1])/(1+z/2)$, $C=\tfrac12([i=0]-[i=2])/(1-z/2)$. 因而所求概率是 $\tfrac13+O(2^{-n})$; 事实上, 它总是 $\lfloor2^n/3\rfloor/2^n$ 和 $\lceil2^n/3\rceil/2^n$ 中的一个. 当且仅当 $i\ne j$ 且 $n$ 为偶数, 或 $i+j=2$ 且 $n$ 为奇数时, 取前者.

(b) 置 $g_{012}=\tfrac z2(g_{001}+g_{112})$, $g_{001}=\tfrac z2([j=0]+g_{011})$ 等, 得到生成函数 $g_{012}=([j\ne1]+[j=1]z)z^2/(4-z^2)$. 故各 $j$ 出现的概率均为 $1/3$, $N$ 的生成函数为 $z^2/(2-z)$, 均值为 3, 方差为 2.

(c) 现在有 $g_{001}=\tfrac z2([j=0]+g_{112})$ 等. 输出决不为 1, 0 和 2 等可能; $N$ 与先前同分布.

(d) 函数的复合不满足交换律, 因而停止条件也有所不同: 在第二种情形中, 除非上一步是 000 或 222, 否则不会出现 111. 关键区别在于, 如果不停下来, 过程 (b) 在三值合并后就<em>固定</em>下来; 而过程 (c) 随着 $n$ 的增大还会<em>改变</em> $a_0a_1a_2$ (虽然三者仍然相等).

(e) 若 $T$ 为偶数, $\operatorname{sub}(T)$ 返回 $(-1,0,1,2)$ 的概率分别为 $\bigl(2,(2^T-1)/3,(2^T-4)/3,(2^T-1)/3\bigr)/2^T$. 因此这个自以为可以代替 (b) 的算法以概率 $\tfrac14+\tfrac5{32}+\tfrac{85}{4096}+\cdots=\tfrac13\sum_{k=1}^{\infty}2^{k+1}(2^{2^k}-1)/2^{2^{k+1}}\approx.427$ 输出 0, 并非 $1/3$.

(f) 改写 $\operatorname{sub}(T)$, 让它使用前后一致的比特 $X_T,X_{T-1},\ldots,X_1$, 每次引用同一个 $X_j$ 时都取同一个值, 这样就忠实地模拟了方法 (b). (可以在适当时刻小心地重置一个合适的随机数发生器的种子, 借以保持所需的一致性.)

[在单调蒙特卡罗模拟中, (f) 的技术称为 “从过去开始耦合”. 它可以用来生成许多重要类型的均匀随机对象. 当可能的状态有成千上万乃至数百万个时, 它比方法 (b) 快得多. 见 J. G. Propp 和 D. B. Wilson, <em>Random Structures & Algorithms</em> **9** (1996), 223–252.]

<a id="ans-mpr-104"></a>

**104.** [题目](../sec-mpr.md#ex-mpr-104) 令 $q=1-p$. 在 (b) 中, 输出 $(0,1,2)$ 的概率向量为 $(q^2,pq,p^2)/(1-pq)$; 在 (c) 中, 它是 $\bigl(q^2(1+p),0,p^2(1+q)\bigr)/(1-pq)$. 两种情形的 $N$ 都有生成函数 $(1-pq(2-z))z^2/(1-pqz^2)$, 均值为 $3/(1-pq)-1$, 方差为 $(5-2pq)pq/(1-pq)^2$.

<a id="ans-mpr-105"></a>

**105.** [题目](../sec-mpr.md#ex-mpr-105) 有 $g_0=1$, 当 $0<a<n/2$ 时有 $g_a=z(g_{a-1}+g_{a+1})/2$.

<a id="pdf-406"></a><a id="p-386"></a>

若 $n=2m$ 为偶数, 对 $0\leq a\leq m$ 令 $g_a=z^at_{m-a}/t_m$. 由 $t_0=t_1=1$, $t_{k+1}=2t_k-z^2t_{k-1}$ 定义的多项式 $t_k$ 正合要求, 因为它们给出 $g_m=zg_{m-1}$. 生成函数 $T(w)=\sum_{m=0}^{\infty}t_mw^m=(1-w)/(1-2w+w^2z^2)$. 对 $z$ 求导可得 $t'_m(1)=-m(m-1)$, $t''_m(1)=(m^2-5m+3)m(m-1)/3$. 因而 $t''_m(1)+t'_m(1)-t'_m(1)^2=\tfrac23(m^2-m^4)$. 所以给定 $a$ 时的均值和方差分别为 $a-(m-a)(m-a-1)+m(m-1)=a(n-a)$ 和 $\tfrac23\bigl((m-a)^2-(m-a)^4-m^2+m^4\bigr)=\tfrac13\bigl((n-a)^2+a^2-2\bigr)a(n-a)$.

若 $n=2m-1$, 可对 $0\leq a\leq m$ 写成 $g_a=z^au_{m-a}/u_m$, 其中 $u_{m+1}=2u_m-z^2u_{m-1}$. 这次需取 $u_0=1$, $u_1=z$, 使 $g_m=g_{m-1}$. 由 $U(w)=\sum_{m=0}^{\infty}u_mw^m=\bigl(1+(z-2)w\bigr)/(1-2w+w^2z^2)$ 得 $u'_m(1)=-m(m-2)$, $u''_m(1)=m(m-1)(m^2-7m+7)/3$. 因此, 这一次的平均步数仍为 $a(n-a)$, 方差也仍为 $\tfrac13\bigl((n-a)^2+a^2-2\bigr)a(n-a)$.

[这里的多项式 $t_m$ 和 $u_m$ 同经典切比雪夫多项式有亲缘关系, 只是换了一副面貌. 后者由 $T_m(\cos\theta)=\cos m\theta$, $U_m(\cos\theta)=\sin((m+1)\theta)/\sin\theta$ 定义. 再写 $V_m(\cos\theta)=\cos((m-\tfrac12)\theta)/\cos(\tfrac12\theta)$, 则 $V_m(x)=(2-1/x)T_m(x)+(1/x-1)U_m(x)$; 而 $t_m=z^mT_m(1/z)$, $u_m=z^mV_m(1/z)$.]

<a id="ans-mpr-106"></a>

**106.** [题目](../sec-mpr.md#ex-mpr-106) 在三值合并这件事的推广中, 合并以前数组 $a_0a_1\ldots a_{d-1}$ 的形式总是 $a^r(a+1)\ldots(b-1)b^s$, 其中 $0\leq a<b<d$, $r,s>0$, 且 $r+s+b-a=d+1$. 最初 $a=0$, $b=d-1$, $r=s=1$. 算法在保持 $r+s=t$ 的这段时间里的行为, 如同上一题中从 $a=1$ 开始在 $t$ 元环上的随机游动. 设 $G_t$ 是那个问题的生成函数, 相应的均值为 $t-1$, 方差为 $2\binom t3$. 本题的生成函数便是 $G_2G_3\ldots G_d$, 因而均值为 $\sum_{k=2}^d(k-1)=\binom d2$, 方差为 $\sum_{k=2}^d2\binom k3=2\binom{d+1}4$.

<a id="ans-mpr-107"></a>

**107.** [题目](../sec-mpr.md#ex-mpr-107) (a) 若能重新给各概率编号, 使 $p_1\leq q_1$, $p_2\leq q_2$, 则 $\Omega$ 中五个事件可分别取概率 $p_1,p_2,q_1-p_1,q_2-p_2,q_3$, 因为 $p_3=(q_1-p_1)+(q_2-p_2)+q_3$. 若不能如此编号, 交换两边的角色或调整编号后可设 $p_1<q_1\leq q_2\leq q_3<p_2\leq p_3$. 于是 $p_1,q_1-p_1,p_1+p_2-q_1,p_3-q_3,q_3$ 都非负.

(b) 给 $\Omega$ 的四个事件分别赋予概率 $\tfrac1{12},\tfrac2{12},\tfrac3{12},\tfrac6{12}$.

(c) 例如令 $p_1=\tfrac19$, $p_2=p_3=\tfrac49$, $q_1=q_2=q_3=\tfrac13$.

<a id="ans-mpr-108"></a>

**108.** [题目](../sec-mpr.md#ex-mpr-108) 置 $p_k=\Pr'(X=k)$, $q_k=\Pr''(Y=k)$. 集合 $\bigcup_n\bigl\{\sum_{k\leq n}p_k,\sum_{k\leq n}q_k\bigr\}$ 把单位区间 $[0\mathinner{.\,.}1)$ 分成可数多个子区间, 取它们为 $\Omega$ 中的基本事件 $\omega$. 当且仅当 $\omega\subseteq\bigl[\sum_{k<n}p_k\mathinner{.\,.}\sum_{k\leq n}p_k\bigr)$ 时, 令 $X(\omega)=n$; $Y(\omega)$ 的定义类似. 于是对一切 $\omega$ 均有 $X(\omega)\leq Y(\omega)$.

<a id="ans-mpr-109"></a>

**109.** [题目](../sec-mpr.md#ex-mpr-109) (a) 已知 $p_1+p_3\leq q_1+q_3$, $p_2+p_3\leq q_2+q_3$, $p_3\leq q_3$. (此外还有 $0\leq0$ 及 $p_1+p_2+p_3\leq q_1+q_2+q_3$, 不过它们总是成立.) 由于 $1\npreceq2$, $2\npreceq1$, $3\npreceq1$, $3\npreceq2$, 要求的耦合必须满足 $p_{12}=p_{21}=p_{31}=p_{32}=0$. 在上一题中, 已知 $p_2+p_3\leq q_2+q_3$ 和 $p_3\leq q_3$, 而我们只须使 $p_{21}=p_{31}=p_{32}=0$.

(b) 令 $A^\uparrow=\{x\mid x\succeq a\text{ 对某个 }a\in A\}$, $B^\downarrow=\{x\mid x\preceq b\text{ 对某个 }b\in B\}$. 已知对所有 $A$ 都有 $\Pr'(X\in A^\uparrow)\leq\Pr''(Y\in A^\uparrow)$. 取 $A=\{1,\ldots,n\}\setminus B^\downarrow$, 则 $\Pr'(X\in B^\downarrow)=1-\Pr'(X\in A)$. 由于 $A=A^\uparrow$, 结论得证.

(c) 当 $i\npreceq j$ 时, 从网络中删去弧 $x_i\to y_j$. 于是任何截断全部路径的 $(I,J)$ 都满足: 若 $i\preceq j$, 则 $i\in I$ 或 $j\in J$. 取 $A=\{x\mid x\preceq a\text{ 对某个 }a\notin J\}$, $B=\{1,\ldots,n\}\setminus A$. 则 $A\subseteq I$, $B\subseteq J$, 且 $B=B^\uparrow$. 因此

$$
\sum_{i\in I}p_i+\sum_{j\in J}q_j\geq
\sum_{i\in A}p_i+\sum_{j\in B}q_j\geq
\sum_{i\in A}p_i+\sum_{j\in B}p_j=1.
$$

[见 K. Nawrotzki, <em>Mathematische Nachrichten</em> **24** (1962), 193–200; V. Strassen, <em>Annals of Mathematical Statistics</em> **36** (1965), 423–439.]

<a id="pdf-407"></a><a id="p-387"></a>

<a id="ans-mpr-110"></a>

**110.** [题目](../sec-mpr.md#ex-mpr-110) (a) 若 $r=1$, 结论显然. 否则考虑概率分布 $p'_k=(p_k-r_k)/(1-r)$ 和 $q'_k=(q_k-r_k)/(1-r)$, 取耦合 $p_{ij}=(1-r)p'_iq'_j+r_j[i=j]$. [见 W. Doeblin, <em>Revue mathématique de l’Union Interbalkanique</em> **2** (1938), 77–105; R. L. Dobrushin, <em>Teoriya Veroyatnosteĭ i ee Primeneniia</em> **15** (1970), 469–497.]

(b) 可以, 因为 $(p',q')$ 分布也满足上题的假设.

<a id="ans-mpr-111"></a>

**111.** [题目](../sec-mpr.md#ex-mpr-111) (a) 下面是 60 个三元组 $1\pi\,3\pi\,4\pi$, 最小值用黑体表示:

<table id="mpr-minwise-triples">
<tbody>
<tr><td style="padding:.12em .18em"><strong>1</strong>34</td><td style="padding:.12em .18em"><strong>1</strong>63</td><td style="padding:.12em .18em"><strong>1</strong>23</td><td style="padding:.12em .18em"><strong>1</strong>26</td><td style="padding:.12em .18em"><strong>1</strong>42</td><td style="padding:.12em .18em"><strong>1</strong>42</td><td style="padding:.12em .18em"><strong>1</strong>53</td><td style="padding:.12em .18em"><strong>1</strong>45</td><td style="padding:.12em .18em"><strong>1</strong>63</td><td style="padding:.12em .18em"><strong>1</strong>54</td><td style="padding:.12em .18em"><strong>2</strong>45</td><td style="padding:.12em .18em"><strong>2</strong>34</td><td style="padding:.12em .18em">5<strong>3</strong>4</td><td style="padding:.12em .18em">56<strong>3</strong></td><td style="padding:.12em .18em">6<strong>2</strong>3</td><td style="padding:.12em .18em">5<strong>2</strong>6</td><td style="padding:.12em .18em">63<strong>2</strong></td><td style="padding:.12em .18em">65<strong>2</strong></td><td style="padding:.12em .18em">5<strong>3</strong>4</td><td style="padding:.12em .18em">64<strong>3</strong></td></tr>
<tr><td style="padding:.12em .18em"><strong>3</strong>56</td><td style="padding:.12em .18em">6<strong>4</strong>5</td><td style="padding:.12em .18em"><strong>2</strong>46</td><td style="padding:.12em .18em"><strong>2</strong>34</td><td style="padding:.12em .18em">4<strong>3</strong>5</td><td style="padding:.12em .18em">46<strong>3</strong></td><td style="padding:.12em .18em">5<strong>2</strong>4</td><td style="padding:.12em .18em">4<strong>2</strong>3</td><td style="padding:.12em .18em">64<strong>2</strong></td><td style="padding:.12em .18em">53<strong>2</strong></td><td style="padding:.12em .18em">46<strong>1</strong></td><td style="padding:.12em .18em">35<strong>1</strong></td><td style="padding:.12em .18em">36<strong>1</strong></td><td style="padding:.12em .18em">64<strong>1</strong></td><td style="padding:.12em .18em">25<strong>1</strong></td><td style="padding:.12em .18em">23<strong>1</strong></td><td style="padding:.12em .18em">34<strong>1</strong></td><td style="padding:.12em .18em">53<strong>1</strong></td><td style="padding:.12em .18em">32<strong>1</strong></td><td style="padding:.12em .18em">42<strong>1</strong></td></tr>
<tr><td style="padding:.12em .18em">5<strong>1</strong>2</td><td style="padding:.12em .18em">4<strong>1</strong>2</td><td style="padding:.12em .18em">4<strong>1</strong>5</td><td style="padding:.12em .18em">3<strong>1</strong>5</td><td style="padding:.12em .18em">3<strong>1</strong>6</td><td style="padding:.12em .18em">6<strong>1</strong>5</td><td style="padding:.12em .18em">2<strong>1</strong>6</td><td style="padding:.12em .18em">2<strong>1</strong>6</td><td style="padding:.12em .18em">4<strong>1</strong>5</td><td style="padding:.12em .18em">3<strong>1</strong>6</td><td style="padding:.12em .18em">6<strong>2</strong>3</td><td style="padding:.12em .18em">5<strong>2</strong>6</td><td style="padding:.12em .18em">65<strong>2</strong></td><td style="padding:.12em .18em">45<strong>2</strong></td><td style="padding:.12em .18em">56<strong>4</strong></td><td style="padding:.12em .18em"><strong>3</strong>54</td><td style="padding:.12em .18em"><strong>4</strong>65</td><td style="padding:.12em .18em"><strong>3</strong>64</td><td style="padding:.12em .18em"><strong>2</strong>56</td><td style="padding:.12em .18em"><strong>2</strong>65</td></tr>
</tbody>
</table>

(b) $S_A$ 和 $S_B$ 所比较的元素都出自 $A\cup B$. $A\cup B$ 的各个元素有相同的机会使 $a\pi$ 取到最小值; 恰有 $|A\cap B|$ 个元素会使这个值同时成为两集合的草图.

(c) $|A\cap B\cap C|/|A\cup B\cup C|$.

<em>注:</em> 比值 $|A\cap B|/|A\cup B|$ 是度量相似性的一个有用指标, 称为 “雅卡尔指数”. Paul Jaccard 曾用它比较瑞士各地的生态环境, 所依据的是每地观察到的植物物种集合 [<em>Bulletin de la Société Vaudoise des Sciences Naturelles</em> **37** (1901), 249]. 今日人们常根据各网页所含的某一组词来给网页的相似性排序.

Andrei Broder 在 1997 年为此引入最小值独立性, 取 $n=2^{64}$, 并设法为一个典型网页确定约 1000 个词组成的集合 $A$. 例如, 为各页计算相互独立的草图 $S_1(A),\ldots,S_{100}(A)$, 那么使 $S_j(A)=S_j(B)$ 的下标 $j$ 的数目, 就能快速给出雅卡尔指数的可靠估计 (除以 100 即得比例). 当 $n$ 极大时, 实际上不可能列出严格最小值独立的族, 不过有关理论导出了实际效果很好的近似算法 “minhash”. 见 A. Z. Broder、M. Charikar、A. M. Frieze 和 M. Mitzenmacher, <em>J. Computer and System Sciences</em> **60** (2000), 630–659. 另见 K. Mulmuley 与此相关的独立工作, <em>Algorithmica</em> **16** (1996), 450–463.

<a id="ans-mpr-112"></a>

**112.** [题目](../sec-mpr.md#ex-mpr-112) (a) 只要 $\infty$ 的位置集为 $B$ 的排列 $\pi$ 的数目是 $n-m$ 的倍数, 这样的规则就能恰当地打破平局. 不同的 $B$ 可各用各的规则.

(b) 事实上, 如习题 111 那样, 可从 $N/n=d$ 个 “种子” 排列出发, 经循环移位得到整个族. 从 $m=1$ 开始, 列出 $N=\operatorname{lcm}(1,2,\ldots,n)$ 个不完整的排列. 对 $1\leq i\leq N$, $1\leq j\leq n$, 先将表项 $\pi_{ij}$ 留空, 只有 $(j-1)d<i\leq jd$ 时令 $\pi_{ij}=1$. 例如, 当 $n=4$ 时初始表为

```text
1␣␣␣ 1␣␣␣ 1␣␣␣ ␣1␣␣ ␣1␣␣ ␣1␣␣ ␣␣1␣ ␣␣1␣ ␣␣1␣ ␣␣␣1 ␣␣␣1 ␣␣␣1
```

它表示 $m=1$ 的 $N=12$ 个截断排列. 下面要添入一些 2.

设 $A$ 是某个 $\pi$ 中包含 $n-m$ 个空位的位置集. 各 $A$ 出现的次数相同 (如同 §6.4 中的均匀探查), 因此这种 $\pi$ 有 $N/\binom n{n-m}$ 个. 幸好这个数是 $n-m$ 的倍数, 因为习题 1.2.6–48 告诉我们, $N/\bigl((n-m)\binom n{n-m}\bigr)=N\sum_{k=0}^m(-1)^k\binom mk/(n-m+k)$.

每次取 $n-m$ 个这样的 $\pi$, 分别在不同位置填入 $m+1$. 再找另一个这样的 $A$, 重复进行, 直到没有大小为 $n-m$ 的空位集为止. 随后令 $m\gets m+1$, 如此继续, 直到 $m=n$.

不难看出, 填数时总能使 $\pi_j,\pi_{d+j},\ldots,\pi_{(n-1)d+j}$ 互为循环移位. 当 $n=4$ 时, 2 的位置实际上已经确定:

```text
12␣␣ 1␣2␣ 1␣␣2 ␣12␣ ␣1␣2 21␣␣ ␣␣12 2␣1␣ ␣21␣ 2␣␣1 ␣2␣1 ␣␣21
```

<a id="pdf-408"></a><a id="p-388"></a>

不过此后 $A=\{3,4\}$ 的两个情形有两种填法:

```text
123␣ 1␣2␣ 13␣2 ␣123 ␣1␣2 21␣3 3␣12 2␣1␣ ␣213 23␣1 ␣2␣1 3␣21
12␣3 1␣2␣ 13␣2 312␣ ␣1␣2 213␣ ␣312 2␣1␣ ␣213 2␣31 ␣2␣1 3␣21
```

若选第一种, 则 $A=\{2,4\}$ 又有两种填法:

```text
123␣ 132␣ 13␣2 ␣123 ␣132 21␣3 3␣12 2␣13 ␣213 23␣1 32␣1 3␣21
123␣ 1␣23 13␣2 ␣123 31␣2 21␣3 3␣12 231␣ ␣213 23␣1 ␣231 3␣21
```

这里 $A$ 的一个循环移位就是它自身, 不过总能把数安放得前后一致.

[见 Yoshinori Takei、Toshiya Itoh 和 Takahiro Shinozaki, <em>IEICE Transactions on Fundamentals</em> **E83-A** (2000), 646–655, 747–755.]

<a id="ans-mpr-113"></a>

**113.** [题目](../sec-mpr.md#ex-mpr-113) (a) 若 $l\geq k$ 或 $r>n-k$, 概率为零. 对于其余情形, 只须证明 $l=k-1$, $r=n-k$ 的 “完整” 情形, 因为给未受限制的各个元素分别指定 $<k$ 或 $>k$, 所有相应完整情形的概率之和就是所求概率.

为证明完整情形, 不妨设 $a_i=i$, $b=k$, $c_j=k+j$, 其中 $1\leq i\leq l=k-1$, $1\leq j\leq r=n-k$. 可以用容斥原理计算概率. 因为只要 $A=\{k,\ldots,n\}\cup B$, 而 $B$ 由 $t$ 个小于 $k$ 的元素组成, 就知道 $\Pr(\min_{a\in A}a\pi=k\pi)=1/(n-k+t+1)=P_B$. 例如当 $k=4$ 时, $4\pi=4$ 且 $\{1\pi,2\pi,3\pi\}=\{1,2,3\}$ 的概率是 $P_{\varnothing}-P_{\{1\}}-P_{\{2\}}-P_{\{3\}}+P_{\{1,2\}}+P_{\{1,3\}}+P_{\{2,3\}}-P_{\{1,2,3\}}$; 真正随机的 $\pi$ 的这些概率也各有同样的值.

(b) 这个事件是若干个 (a) 型完整事件的不交并. [见 A. Z. Broder 和 M. Mitzenmacher, <em>Random Structures & Algorithms</em> **18** (2001), 18–30.]

<em>注:</em> 函数 $\psi(n)=\ln(\operatorname{lcm}(1,2,\ldots,n))=\sum_{p^k\leq n}[p\text{ 为素数}]\ln p$ 是 P. L. Chebyshev 引入的 [见 <em>J. de mathématiques pures et appliquées</em> **17** (1852), 366–390], 他证明了它是 $\Theta(n)$ 的. Ch.-J. de la Vallée Poussin 的进一步研究 [<em>Annales de la Société Scientifique de Bruxelles</em> **20** (1896), 183–256] 表明, 事实上对某个正常数 $C$, 有 $\psi(n)=n+O(ne^{-C\sqrt{\log n}})$. 因此 $\operatorname{lcm}(1,2,\ldots,n)$ 大致按 $e^n$ 增长, 当 $n$ 很大时, 不可能指望把最小值独立排列逐个列出. 仅 $19\leq n\leq22$ 时, 这样的表就已经长达 232,792,560 项了.

<a id="ans-mpr-114"></a>

**114.** [题目](../sec-mpr.md#ex-mpr-114) 先设对所有 $j$ 均有 $|S_j|=d_j+1$, 令 $g_j(x)=\prod_{s\in S_j}(x-s)$. 当 $x_j\in S_j$ 时, 用 $x_j^{d_j+1}-g_j(x_j)$ 代替 $x_j^{d_j+1}$ 并不改变 $f(x_1,\ldots,x_n)$ 的值. 反复这样做, 直至 $f$ 的每一项关于各 $x_j$ 的次数均 $\leq d_j$. 由习题 4.6.1–16, 所得的多项式在 $S_1\times\cdots\times S_n$ 中至少有一个非零点. [见 N. Alon, <em>Combinatorics, Probab. and Comput.</em> **8** (1999), 7–29.]

现在考虑一般情形. 若非零点至多有 $|S_1|+\cdots+|S_n|-(d_1+\cdots+d_n+n)$ 个, 我们每次可以从任一满足 $|S_j|>d_j+1$ 的 $S_j$ 中删去一个适当的元素, 从而消去一个 (或多个) 非零点. 由此得到矛盾.

(当各集合 $S_j$ 很大时, 这个不等式还能给出更强的下界. 例如, 若 $d_1=\cdots=d_n=d$, 各 $|S_j|\geq s$, 其中 $s=d+1+\lceil d/(n-1)\rceil$, 就可以将各 $|S_j|$ 减至 $s$ 来提高右端的值. 进一步的渐近改进见 Béla Bollobás, <em>Extremal Graph Theory</em> (1978), §6.2 和 §6.3.)

<a id="ans-mpr-115"></a>

**115.** [题目](../sec-mpr.md#ex-mpr-115) 用 $(x,y)$ 表示第 $x$ 行第 $y$ 列的顶点. 如果所有点都能被覆盖, 那么对某些 $a_j,b_j,c_j,d_j$ 以及所有 $1\leq x\leq m$, $1\leq y\leq n$, 都有 $f(x,y)=\prod_{j=1}^p(x-a_j)\prod_{j=1}^q(y-b_j)\prod_{j=1}^r(x+y+c_j)(x-y+d_j)=0$. 可是 $f$ 的次数为 $p+q+2r=m+n-2$, 而 $x^{m-1}y^{n-1}$ 的系数是 $\pm\binom r{\lfloor r/2\rfloor}\ne0$.

<a id="pdf-409"></a><a id="p-389"></a>

<a id="ans-mpr-116"></a>

**116.** [题目](../sec-mpr.md#ex-mpr-116) 对每个顶点 $v$, 令 $g_v=\sum\{x_e\mid v\in e\}$; 若 $e$ 是 $v$ 到自身的环, 则 $x_e$ 计入两次. 取 $f=\prod_v(1-g_v^{p-1})-\prod_e(1-x_e)$, 各 $S_j=\{0,1\}$, 用模 $p$ 算术应用零点定理. 这个多项式的次数等于边数也即变量数 $m$, 因为第一个乘积的次数为 $(p-1)n<m$, 而 $\prod_e x_e$ 的系数为 $(-1)^{m+1}\ne0$. 所以存在一个使 $f(x)$ 非零的解 $x$. 取此解中 $x_e=1$ 的全体边所成的子图, 它非空且满足要求, 因为对每个 $v$ 都有 $g_v(x)\bmod p=0$.

(若约定环对度只贡献 1, 这个证明也成立. 见 N. Alon、S. Friedland 和 G. Kalai, <em>J. Combinatorial Theory</em> **B37** (1984), 79–91.)

<a id="ans-mpr-117"></a>

**117.** [题目](../sec-mpr.md#ex-mpr-117) 若 $\omega=e^{2\pi i/m}$, 有 $\mathrm E\,\omega^{jX}=\sum_{k=0}^n\binom nk p^k(1-p)^{n-k}\omega^{jk}=(\omega^jp+1-p)^n$. 又有 $|\omega^jp+1-p|^2=p^2+(1-p)^2+p(1-p)(\omega^j+\omega^{-j})=1-4p(1-p)\sin^2(\pi j/m)$. 现在, $0\leq t\leq1/2$ 时 $\sin\pi t\geq2t$. 因而若 $0\leq j\leq m/2$, 有 $|\omega^jp+1-p|^2\leq1-16p(1-p)j^2/m^2\leq\exp(-16p(1-p)j^2/m^2)$; 若 $m/2\leq j\leq m$, 则 $\sin(\pi j/m)=\sin(\pi(m-j)/m)$. 所以 $\sum_{j=1}^{m-1}|\mathrm E\,\omega^{jX}|\leq2\sum_{j=1}^{m-1}\exp(-8p(1-p)j^2n/m^2)$.

由于 $\Pr(X\bmod m=r)=\tfrac1m\sum_{j=0}^{m-1}\omega^{-jr}\,\mathrm E\,\omega^{jX}$, 原式得证. [S. Janson 和 D. E. Knuth, <em>Random Structures & Algorithms</em> **10** (1997), 130–131.]

<a id="ans-mpr-118"></a>

**118.** [题目](../sec-mpr.md#ex-mpr-118) 事实上, 在 (22) 中取 $Y=X-x$, 并用习题 47, 可以得到<em>更多</em>结果:

$$
\begin{aligned}
\Pr(X\geq x)\geq\Pr(X>x)&\geq\frac{(\mathrm E\,X-x)^2}{\mathrm E\bigl((X-x)^2\bigr)}
=\frac{(\mathrm E\,X-x)^2}{\mathrm E\,X^2-x(2\mathrm E\,X-x)}\\
&\geq\frac{(\mathrm E\,X-x)^2}{\mathrm E\,X^2-x\mathrm E\,X}
\geq\frac{(\mathrm E\,X-x)^2}{\mathrm E\,X^2-x^2}.
\end{aligned}
$$

(把这个结果归于 Paley 和 Zygmund, 多少有些可疑. 不过他们确实写过一系列重要论文 [<em>Proc. Cambridge Philosophical Society</em> **26** (1930), 337–357, 458–474; **28** (1932), 190–205], 其中在引理 19 的证明中出现过一个相关的不等式.)

<a id="ans-mpr-119"></a>

**119.** [题目](../sec-mpr.md#ex-mpr-119) 令 $f(x,t)=\Pr(U\leq V\leq W\text{ 且 }V\leq(1-t)U+tW)$, $g(x,t)=\Pr(U\leq W\leq V\text{ 且 }W\leq(1-t)U+tV)$, $h(x,t)=\Pr(W\leq U\leq V\text{ 且 }U\leq(1-t)W+tV)$. 我们要证 $f(x,t)+g(x,t)+h(x,t)=t$. 注意, 若 $\overline U=1-U$, $\overline V=1-V$, $\overline W=1-W$, 则 $\Pr(W\leq U\leq V\text{ 且 }U\geq(1-t)W+tV)=\Pr(\overline V\leq\overline U\leq\overline W\text{ 且 }\overline U\leq t\overline V+(1-t)\overline W)$. 所以 $x/2-h(x,t)=f(1-x,1-t)$, 可以假设 $t\leq x$.

显然, $g(x,t)=\int_0^x(du/x)\int_x^1\bigl(dv/(1-x)\bigr)t(v-u)=t/2$. 由 $t\leq x$ 还有

$$
\begin{aligned}
f(x,t)&=\int_{(x-t)/(1-t)}^x\frac{du}{x}
\int_x^{(1-t)u+t}\frac{dv}{1-x}\left(1-\frac{v-(1-t)u}{t}\right)
=\frac{t^2(1-x)^2}{6(1-t)x},\\
h(x,t)&=\int_x^1\frac{dv}{1-x}\left(\int_0^{vt}\frac{du}{x}\,u+
\int_{vt}^x\frac{du}{x}\,\frac{t}{1-t}(v-u)\right)=\frac t2-f(x,t).
\end{aligned}
$$

与这番繁复的计算相比, Tamás Terpai 找到了一个简单得多的证明. 令 $A=\min(U,V,W)$, $M=\langle UVW\rangle$, $Z=\max(U,V,W)$. 给定 $A$ 和 $Z$ 时, $M$ 的条件分布是三个分布的混合: 或者 $A=U$, $Z=V$, $M$ 在 $[A\mathinner{.\,.}Z]$ 上均匀分布; 或者 $A=U$, $Z=W$, $M$ 在 $[x\mathinner{.\,.}Z]$ 上均匀分布; 或者 $A=W$, $Z=V$, $M$ 在 $[A\mathinner{.\,.}x]$ 上均匀分布. (三个情形的概率分别为 $(Z-A,Z-x,x-A)/(2Z-2A)$, 其实用不着知道这一细节.) 因此, 合并这些均匀条件分布得到的中位数, 在给定的两个端点之间也是均匀的.

[见 S. Volkov, <em>Random Struct. & Algorithms</em> **43** (2013), 115–130, 定理 5.]

<a id="ans-mpr-120"></a>

**120.** [题目](../sec-mpr.md#ex-mpr-120) 见 J. Jabbour-Hattab, <em>Random Structures & Algorithms</em> **19** (2001), 112–127.

<a id="pdf-410"></a><a id="p-390"></a>

<a id="ans-mpr-121"></a>

**121.** [题目](../sec-mpr.md#ex-mpr-121) (a) $D(y\mathbin{\Vert}x)=\tfrac15\lg\tfrac65+\tfrac2{15}\lg\tfrac45\approx.0097$; $D(x\mathbin{\Vert}y)=\tfrac16\lg\tfrac56+\tfrac16\lg\tfrac54\approx.0098$.

(b) 由延森不等式 (20), $\mathrm E\bigl(\rho(X)\lg\rho(X)\bigr)\geq(\mathrm E\,\rho(X))\lg(\mathrm E\,\rho(X))$. 而 $\mathrm E\,\rho(X)=\sum_ty(t)=1$, 因此对数为 0. (若某个 $y(t)>0$ 而 $x(t)=0$, 散度便是无穷大.)

本题较难的是判断何时等于零. 需注意 $f(x)=x\lg x$ 是<em>严格</em>凸的, 即 (19) 中只有当 $x=y$ 时才取等号 (权重取在两端点之间). 所以对于正随机变量 $Z$, 只有当 $Z$ 为常数时, 才有 $(\mathrm E\,Z)\lg(\mathrm E\,Z)=\mathrm E(Z\lg Z)$. 因而 $D(y\mathbin{\Vert}x)=0$ 当且仅当对每个 $t$ 均有 $x(t)=y(t)$.

(c) 令 $\hat x(t)=x(t)/p$, $\hat y(t)=y(t)/q$ 为 $X$ 和 $Y$ 在 $T$ 中的条件分布. 那么 $0\leq D(\hat y\mathbin{\Vert}\hat x)=\sum_{t\in T}\hat y(t)\lg\bigl(\hat y(t)/\hat x(t)\bigr)=\mathrm E(\lg\rho(Y)\mid Y\in T)+\lg(p/q)$.

(d) $D(y\mathbin{\Vert}x)=\lg m-H_Y$. (因此由 (b) 可知, 这样的随机变量 $Y$ 的熵至多是 $\lg m$, 而且只有均匀分布能取到这个值. 直观地说, $H_Y$ 表示获知 $Y$ 的值时获得的信息比特数.)

(e) $I_{X,Y}=-H_Z-\sum_{u,v}z(u,v)\bigl(\lg x(u)+\lg y(v)\bigr)=-H_Z+\sum_ux(u)\lg(1/x(u))+\sum_vy(v)\lg(1/y(v))$, 因为 $\sum_v z(u,v)=x(u)$, $\sum_u z(u,v)=y(v)$.

(f) 在 $I_{X,Z}=H_X+H_Z-H_{X,Z}$ 中以 $Y$ 为条件, 得 $0\leq I_{(X,Z)\mid Y}=H_{X\mid Y}+H_{Z\mid Y}-H_{(X,Z)\mid Y}=H_{X\mid Y}+(H_{Y,Z}-H_Y)-(H_{X,Y,Z}-H_Y)$.

<a id="ans-mpr-122"></a>

**122.** [题目](../sec-mpr.md#ex-mpr-122) (a) $D(y\mathbin{\Vert}x)=\sum_{t=0}^{\infty}(3^t/4^{t+1})\lg(3^t/2^{t+1})=\lg\tfrac{27}{16}\approx0.755$; $D(x\mathbin{\Vert}y)=\lg\tfrac43\approx0.415$.

(b) 令 $q=1-p$, $t=pn+u\sqrt n$. 则有

$$
\begin{aligned}
y(t)&=\frac{e^{-u^2/(2pq)}}{\sqrt{2\pi pqn}}\exp\left(
 \left(\frac{u}{2q}-\frac{u}{2p}+\frac{u^3}{6p^2}-\frac{u^3}{6q^2}\right)
 \frac1{\sqrt n}+O\left(\frac1n\right)\right),\\
\ln\rho(t)&=-\frac{u^2}{2q}-\tfrac12\ln q+
\left(\frac{u}{2q}-\frac{u^3}{6q^2}\right)\frac1{\sqrt n}
+O\left(\frac1n\right).
\end{aligned}
$$

把 $u$ 限制在 $|u|\leq n^\epsilon$, 再替换尾部 (见 7.2.1.5–(20)), 得

$$
\begin{aligned}
D(y\mathbin{\Vert}x)&=\frac1{\sqrt{2\pi pqn}}\int_{-\infty}^{\infty}
 e^{-u^2/(2pq)}\left(-\frac{u^2}{2q\ln2}-\tfrac12\lg q\right)\sqrt n\,du+O(1/n)\\
 &=\frac1{2\ln2}\left(\ln\frac1{1-p}-p\right)+O(1/n).
\end{aligned}
$$

此处 $D(x\mathbin{\Vert}y)$ 显然为 $\infty$, 因为 $x(n+1)>0$, 而 $y(n+1)=0$.

<a id="ans-mpr-123"></a>

**123.** [题目](../sec-mpr.md#ex-mpr-123) 由于 $p_{k+1}=p_k y(t)/z_k(t)$, 有 $\rho(t)=(1-p_k)p_{k+1}/\bigl(p_k(1-p_{k+1})\bigr)$. [正是这个关系最初促使 S. Kullback 和 R. A. Leibler 定义了 $D(y\mathbin{\Vert}x)$, 见 <em>Annals of Mathematical Statistics</em> **22** (1951), 79–86.]

<a id="ans-mpr-124"></a>

**124.** [题目](../sec-mpr.md#ex-mpr-124) 令 $m=c^2 2^{D(y\mathbin{\Vert}x)}$, $g(t)=f(t)[\rho(t)\leq m]$. 因而在 $Y$ 的分布下, 除去概率为 $\Delta_c$ 的情形, $g(t)=f(t)$. 由三角不等式,

$$
\mathrm E\,|E(f)-E_n(f)|\leq
 |E(f)-E(g)|+\mathrm E\,|E(g)-E_n(g)|+\mathrm E\,|E_n(f)-E_n(g)|.
$$

因为 $f(t)-g(t)=f(t)[\rho(t)>m]$, 由柯西–施瓦茨不等式 (习题 1.2.3–30), 第一项和末项均以 $\|f\|\sqrt{\Delta_c}$ 为界.

又有 $\operatorname{var}(\rho(X)g(X))\leq\mathrm E(\rho(X)^2g(X)^2)\leq m\mathrm E(\rho(X)f(X)^2)=m\mathrm E(f(Y)^2)=m\|f\|^2$. 所以 $\mathrm E\bigl((E(g)-E_n(g))^2\bigr)=\operatorname{var}E_n(g)=\operatorname{var}(\rho(X)g(X))/n\leq\|f\|^2/c^2$.

现在考虑 $c<1$ 的情形. 由马尔可夫不等式, $\Pr(\rho(X)>m)\leq(\mathrm E\,\rho(X))/m=1/m$. 而且 $\mathrm E\bigl(\rho(X)[\rho(X)\leq m]\bigr)=\mathrm E[\rho(Y)\leq m]=1-\Delta_c$. 因而

$$
\begin{aligned}
\Pr(E_n(1)\geq a)
 &\leq\Pr\left(\max_{1\leq k\leq n}\rho(X_k)>m\right)
 +\Pr\left(\sum_{k=1}^n\rho(X_k)[\rho(X_k)\leq m]\geq na\right)\\
 &\leq n/m+\mathrm E\left(\sum_{k=1}^n\rho(X_k)[\rho(X_k)\leq m]\right)/(na)
 =c^2+(1-\Delta_c)/a.
\end{aligned}
$$

[S. Chatterjee 和 P. Diaconis, <em>Annals of Applied Prob.</em> **28** (2018), 1099–1135.]

<a id="pdf-411"></a><a id="p-391"></a>

<a id="ans-mpr-125"></a>

**125.** [题目](../sec-mpr.md#ex-mpr-125) (a) 由 $a_n^2=a_{n-1}a_{n+1}$ 推出, 对某些 $c\geq0$, $x\geq0$ 有 $a_n=cx^n$.

(b) 仍为对数凸的充要条件是 $ca_1\geq a_0^2$; 仍为对数凹的充要条件是 $ca_1\leq a_0^2$. (在 $c=0$ 这个重要情形中, 后一条件总是成立.)

(c) 若 $a_{m-1}a_{n+1}>0$, 则由于中间不夹零, 有 $a_m/a_{m-1}\geq a_{m+1}/a_m\geq\cdots\geq a_{n+1}/a_n$. (对数凸性也有相应的结果.)

(d) 若 $xz\geq y^2$, $XZ\geq Y^2$, 且 $x,y,z,X,Y,Z>0$, 则 $(x+X)(z+Z)-(y+Y)^2\geq(x+X)(y^2/x+Y^2/X)-(y+Y)^2=(x/X)(Y-Xy/x)^2\geq0$. [L. L. Liu 和 Y. Wang, <em>Advances in Applied Mathematics</em> **39** (2007), 455.]

(e) 令 $c_n=\sum_k\binom nk a_kb_{n-k}$. 显然 $c_1^2\leq c_0c_2$. 又因 $c_n=\sum_k\binom{n-1}k a_{n-1-k}b_{k+1}+\sum_k\binom{n-1}k a_{k+1}b_{n-1-k}$, 对移位后的序列应用 (d), 再对 $n$ 用归纳法即得. [H. Davenport 和 G. Pólya, <em>Canadian Journal of Mathematics</em> **1** (1949), 2–3.]

(f) 是. 当 $k<0$ 时令 $a_k=b_k=0$, 又令 $c_n=\sum_ka_kb_{n-k}$. 于是

$$
c_n^2-c_{n-1}c_{n+1}=
\sum_{0\leq j\leq k}(a_ja_k-a_{j-1}a_{k+1})
(b_{n-j}b_{n-k}-b_{n+1-j}b_{n-1-k}).
$$

这是 $m=2$ 时的比内–柯西恒等式 (习题 1.2.3–46) 的一个特例.

(g) 是, 不过看来需要较复杂的证明. 有 $c_n=t_{00}$, $c_{n+1}=t_{01}+t_{10}$, $c_{n+2}=t_{02}+2t_{11}+t_{20}$, 其中 $t_{ij}=\sum_k\binom nk a_{k+i}b_{n-k+j}$. 因而 $c_{n+1}^2-c_nc_{n+2}=(t_{01}^2-t_{00}t_{02})+(t_{10}^2-t_{00}t_{20})+2(t_{01}t_{10}-t_{00}t_{11})$. 我们将证明括号里的三项都非负.

令 $b'_j=\binom nj b_j$. 则序列 $\langle b'_j\rangle$ 是对数凹的, 而 $t_{i0}$ 是卷积序列 $\bigl\langle\sum_k a_k b'_{h-k}\bigr\rangle_h$ 的第 $n+i$ 项. 由 (f), 这个序列为对数凹. 所以 $t_{10}^2\geq t_{00}t_{20}$. 类似地可证 $t_{01}^2\geq t_{00}t_{02}$. 最后由比内–柯西恒等式, 对矩阵乘积 $T=AXB$, 其中 $A_{ij}=a_{i+j}$, $X_{ij}=\binom nj[i+j=n]$, $B_{ij}=b_{i+j}$, 有

$$
t_{01}t_{10}-t_{00}t_{11}=
\sum_{p<q}\binom np\binom nq
(a_{p+1}a_q-a_pa_{q+1})(b_{n-p}b_{n-q+1}-b_{n-p+1}b_{n-q}).
$$

[D. W. Walkup, <em>Journal of Applied Probability</em> **13** (1976), 79–80.]

<a id="ans-mpr-126"></a>

**126.** [题目](../sec-mpr.md#ex-mpr-126) 所求概率为 $p_m=\binom nm m^m(n-m)^{n-m}/n^n$. 有 $p_m/p_{m+1}=f_m/f_{n-m-1}$, 其中 $f_m=(m/(m+1))^m$. 因为 $f_0>f_1>\cdots$, 最小值在 $m=\lfloor n/2\rfloor$ 处取得. 而由习题 1.2.11.2–9, $p_{\lfloor n/2\rfloor}=(1+O(1/n))/\sqrt{\pi n/2}$.

<a id="ans-mpr-127"></a>

**127.** [题目](../sec-mpr.md#ex-mpr-127) (a) 由尾不等式 1.2.10–(24), 对随机二元向量及 $0<x\leq1$, 有 $\Pr(X_1+\cdots+X_n\leq\theta n)\leq x^{-\theta n}((1+x)/2)^n$. 取 $x=\theta/(1-\theta)$, 再乘 $2^n$.

(b) 由 1.2.11.2–(18), 令 $\theta_n=\lfloor\theta n\rfloor/n$, 有 $\lg\binom n{\lfloor\theta n\rfloor}=H(\theta_n)n-\lg\sqrt{2\pi\theta_n(1-\theta_n)n}+O(1/n)$. 固定 $\theta$ 时, 用 $\theta$ 代替 $\theta_n$ 只使右端改变 $O(1)$.

(c) 令 $p_{m'm''}=\Pr(x\oplus X'\oplus X''\text{ 稀疏且 }\nu X'=m',\,\nu X''=m'')$. 我们分几步来证每个 $p_{m'm''}$ 都指数小.

首先令 $\epsilon=\theta(1-2\theta)/3$. 可以假设 $(\theta-\epsilon)n<m',m''\leq\theta n$, 因为 $\Pr(\nu X'\leq(\theta-\epsilon)n)=O\bigl(\sqrt n\,2^{(H(\theta-\epsilon)-H(\theta))n}\bigr)$ 指数小.

其次, 令 $Y'$ 和 $Y''$ 为随机二元向量, 它们的各比特彼此独立, 取 1 的概率分别是 $m'/n$ 和 $m''/n$. 若 $x$ 的某比特为 0, 则 $x\oplus Y'\oplus Y''$ 的相应比特为 1 的概率是 $(m'/n)(1-m''/n)+(1-m'/n)m''/n\geq2(\theta-\epsilon)(1-\theta)\geq\theta+\epsilon$; 若为 1, 概率是 $(m'/n)(m''/n)+(1-m'/n)(1-m''/n)\geq(\theta-\epsilon)^2+(1-\theta)^2\geq\theta+\epsilon$. 因此由尾不等式, $\Pr(x\oplus Y'\oplus Y''\text{ 稀疏})\leq\alpha^n$, 其中 $\alpha=(1+\epsilon/\theta)^\theta(1-\epsilon/(1-\theta))^{1-\theta}$. 由于 $\alpha<1$, 这个概率指数小.

最后, 令 $Z'$ 和 $Z''$ 为独立的均匀随机位向量, 分别有 $m'$ 和 $m''$ 个 1. 那么 $p_{m'm''}=\bigl(\binom n{m'}\binom n{m''}/S(n,\theta)^2\bigr)P_{m'm''}$, 其中 $P_{m'm''}$ 为<a id="pdf-412"></a><a id="p-392"></a> $x\oplus Z'\oplus Z''$ 稀疏的概率. 于是 $\Pr(x\oplus Y'\oplus Y''\text{ 稀疏})\geq\Pr(x\oplus Y'\oplus Y''\text{ 稀疏且 }\nu Y'=m',\,\nu Y''=m'')=\Omega(P_{m'm''}/n)$, 最后一步由习题 126 得出. (请仔细体会!)

[V. Guruswami、J. Håstad 和 S. Kopparty, <em>IEEE Trans.</em> **IT-57** (2011), 718–725, 用这个结果证明了存在可以高效列表译码的线性码.]

<a id="ans-mpr-128"></a>

**128.** [题目](../sec-mpr.md#ex-mpr-128) (a) $\Pr(k\text{ 个请求})=\binom nk(1/n)^k(1-1/n)^{n-k}$ 为二项分布, 所以 $\Pr(1\text{ 个请求})=(1-1/n)^{n-1}$.

(b) 它等待 $T$ 轮, 其中 $\Pr(T=k)=(1-p)^{k-1}p$ 是参数 $p=\tfrac1n(1-1/n)^{n-1}$ 的几何分布. 例如由习题 3.4.1–17, 有 $\mathrm E\,T=1/p=n^n/(n-1)^{n-1}=(n-1)\exp\bigl(n\ln(1/(1-1/n))\bigr)=en-\tfrac12e+O(1/n)$. (标准差为 $en-\tfrac12e-\tfrac12+O(1/n)$, 与均值差不多.)

(c) 提示引导我们研究 “集券者分布”: 每盒麦片中随机放入 $n$ 种优惠券之一, 要买多少盒才能集齐? 该分布的生成函数为

$$
C(z)=\frac{nz}{n}\frac{(n-1)z}{n-z}\cdots\frac z{n-(n-1)z}
=\frac n{n/z-0}\frac{n-1}{n/z-1}\cdots\frac1{n/z-(n-1)}
=\binom{n/z}n^{-1}.
$$

因为已经有 $k$ 种优惠券后, 得到下一种所需时间是几何分布, 生成函数为 $(n-k)z/(n-kz)$.

设 $B$ 为买下的盒数. 由上尾不等式 1.2.10–(25),

$$
\Pr(B\geq(1+\epsilon)n\ln n)\leq\bigl(n/(n-1/2)\bigr)^{-(1+\epsilon)n\ln n} C\bigl(n/(n-1/2)\bigr).
$$

由习题 1.2.6–47, 右端等于

$$
\frac{e^{(1+\epsilon)n\ln n\,\ln(1-1/(2n))}}{\binom{n-1/2}n}
=\frac{e^{-(1+\epsilon)\ln n/2+O((\log n)/n)}4^n}{\binom{2n}n}
=\sqrt\pi\,n^{-\epsilon/2}\bigl(1+O((\log n)/n)\bigr).
$$

因此 $B$ 几乎必然小于 $(1+\epsilon)n\ln n$.

现在令 $S$ 为 $r=\lfloor(1+\epsilon)en\ln n\rfloor$ 轮中成功访问的次数. $S$ 相当于抛掷一枚有偏硬币 $r$ 次的成功次数, 由 (a), 它的成功概率为 $p=(1-1/n)^{n-1}=1/e+O(1/n)$. 因此 $S$ 服从二项分布. 固定 $0<\epsilon<1$, 习题 1.2.10–22(b) 给出 $\Pr(S\leq(1-\epsilon/2)rp)\leq e^{-\epsilon^2rp/8}$. 所以 $S$ 相当必然大于 $(1-\epsilon/2)rp=(1+\epsilon/2-\epsilon^2/2)n\ln n+O(\log n)$ (更大的 $\epsilon$ 由单调性即得).

因而经过 $S$ 次收集优惠券的尝试, 几乎必然成功.

(d) 可用同 (c) 类似的论证, 以 $-\epsilon$ 代替 $\epsilon$, 以 $n+1/2$ 代替 $n-1/2$.

[本题基于 Jon Kleinberg 和 Éva Tardos 在 <em>Algorithm Design</em> (Addison–Wesley, 2006), §13.1 中分析的一种协议. 关于一个相关模型中的最优竞争消解, 见 Uriel Feige 和 Jan Vondrák, <em>Theory of Computing</em> **6** (2010), 247–290, §3.1.]

<a id="ans-mpr-129"></a>

**129.** [题目](../sec-mpr.md#ex-mpr-129) 提示成立, 因为在积分路径上 $|\cot\pi z|\leq(e^\pi+1)/(e^\pi-1)$ 且 $|r(z)|=O(1/M^2)$. 函数 $\pi\cot\pi z$ 除了在所有整数 $k$ 处有一阶极点外, 没有其他有限奇点. 而且在每个极点处的留数都是 1. 所以 $\sum_{k=-\infty}^{\infty}r(k)+\sum_{j=1}^t\operatorname*{Res}_{z=z_j}\bigl(r(z)\pi\cot\pi z\bigr)=\lim_{M\to\infty}O(1/M)=0$.

设四个和分别为 $S_1,S_2,S_3,S_4$. 有 $S_1=\pi^2/4$, 因为 $(\cot\pi z)/(2z-1)^2$ 在 $1/2$ 处的留数为 $-\pi/4$. 又有 $S_2=\pi\coth\pi$, 因为 $(\cot\pi z)/(z^2+1)$ 在 $\pm i$ 处的留数均为 $-(\coth\pi)/2$. 同理, $(\cot\pi z)/(z^2+z+1)$ 在 $(-1\pm i\sqrt3)/2$ 处的留数是 $-\alpha$, 其中 $\alpha=\tanh(\sqrt3\pi/2)/\sqrt3$. 所以 $S_3=2\pi\alpha$. 最后, $(\cot\pi z)/((z^2+z+1)(2z-1))$ 在各极点处的留数为 $\tfrac27\alpha(1\pm i\sqrt3/2)$ 和 0, 因而 $S_4=-\tfrac27 S_3$. (回头来看, 这个 “巧合” 可以这样解释: $7/((k^2+k+1)(2k-1))=4/(2k-1)-(2k+3)/(k^2+k+1)$, 且 $\sum_{k=-n}^{n+1}1/(2k-1)=\sum_{k=-n}^{n-1}(2k+1)/(k^2+k+1)=0$.)

<a id="pdf-413"></a><a id="p-393"></a>

<a id="ans-mpr-130"></a>

**130.** [题目](../sec-mpr.md#ex-mpr-130) (a) 显然 $\mathrm E\,X^2=\tfrac1\pi\int_{-\infty}^{\infty}t^2\,dt/(1+t^2)=\infty$, 因为当 $|t|>1$ 时被积函数 $t^2/(1+t^2)>1/2$. 但是 $\mathrm E\,X=\tfrac1\pi\int_{-\infty}^{\infty}t\,dt/(1+t^2)$, 用原函数 $\tfrac1{2\pi}\ln(1+t^2)$ 分别考察两端, 得到没有定义的 $\infty-\infty$. 所以 $X$ 没有均值 (不过它确有中位数 0).

(b) $1/2$, $2/3$, $5/6$, 因为当 $x\geq0$ 时, $\Pr(|X|\leq x)=\tfrac1\pi\int_{-x}^xdt/(1+t^2)=\tfrac2\pi\arctan x$.

(c) 这直接由 $\Pr(X\leq x)=(\arctan x)/\pi+1/2$ 得出.

(d) 在算法 3.4.1P 的步骤 P4 中, $V_1/V_2$ 是一个随机角的正切, 因此是柯西随机数. 此外, 由该算法所依据的理论, $V_1/V_2$ 是两个独立标准正态随机数的比; 因而只要 $X,Y$ 是独立的标准正态随机数, $Z\gets X/Y$ 就服从柯西分布. 柯西分布也是自由度为 1 的Student $t$ 分布, 而 §3.4.1 生成该分布的方法就是计算 $Z\gets X/|Y|$.

(e) 有 $z\leq Z\leq z+dz$ 当且仅当 $(z-qY)/p\leq X\leq(z+dz-qY)/p$. 所以

$$
\Pr(z\leq Z\leq z+dz\text{ 且 }y\leq Y\leq y+dy)
=\frac1\pi\frac{dz}{p}\frac1{1+((z-qy)/p)^2}\frac1\pi\frac{dy}{1+y^2},
$$

需对此式在 $-\infty<y<\infty$ 上积分. 被积函数在 $y=\pm i$ 和 $y=(z\pm ip)/q$ 处有极点, 且当 $|y|=M$ 时为 $O(1/M^4)$. 因而可以沿半圆路径积分, 先走 $y=t$, $-M\leq t\leq M$, 再走 $y=Me^{it}$, $0\leq t\leq\pi$, 得

$$
\int_{-\infty}^{\infty}\frac{dy}{(p^2+(z-qy)^2)(1+y^2)}
=2\pi i\left(\text{在 }i\text{ 的留数}+\text{在 }(z+pi)/q\text{ 的留数}\right)
=\frac{\pi}{p(1+z^2)}.
$$

所以 $\Pr(z\leq Z\leq z+dz)=\tfrac1\pi\,dz/(1+z^2)$, 如所求.

由归纳法 (见答案 42), <em>独立的柯西随机数的任何凸组合仍是一个柯西随机数</em>. 特别地, $n$ 个独立柯西随机数的平均值并不比一个随机数更为集中; “大数定律” 并非总是成立. [S. D. Poisson 已在 <em>Connaissance des Tems pour l’an 1827</em> (1824), 273–302 中证明了这个特例. 该分布取名于 A. L. Cauchy, 而没有取名于 Poisson, 是因为 Cauchy 连续发表七篇札记澄清了这一问题, 每周一篇! 见 <em>Comptes Rendus Acad. Sci.</em> **37** (Paris, 1853), 64–68, …, 381–385.]

(f) 由 (e), $c\cdot X$ 等于一个柯西随机数乘 $|c_1|+\cdots+|c_n|=\|c\|_1$. [这个事实在降维和数据流方面有重要应用; 见 P. Indyk, <em>JACM</em> **53** (2006), 307–323.]

(g) 当 $t\geq0$ 时, 取 $e^{itz}/(1+z^2)$ 在 $z=i$ 处的留数, 并用 (e) 中的半圆路径, 得 $e^{-t}$, 因为在 $|z|=M$ 的该半圆上被积函数为 $O(1/M^2)$. 当 $t\leq0$ 时可向相反方向积分, 得 $e^t$. 因此答案为 $e^{-|t|}$.

<a id="ans-mpr-131"></a>

**131.** [题目](../sec-mpr.md#ex-mpr-131) (a) 由习题 129, $c=1/(\pi\coth\pi)$. [注意 $\coth\pi\approx1.0037$, 非常接近 1.]

(b) 当 $n\ne0$ 时, 有些出人意料, 习题 129 的方法给出 $\sum_{k=-\infty}^{\infty}1/\bigl((1+k^2)(1+(n-k)^2)\bigr)=(2\pi\coth\pi)/(n^2+4)$. 从而 $\Pr(X+Y=n)=2c/(n^2+4)$. 当 $n$ 为偶数时, 它恰好是 $\tfrac12\Pr(2Z=n)$.

当 $n=0$ 时, 有一个二阶极点, 计算较为麻烦. 比较容易的办法是先算 $\Pr(X+Y\ne0)=\sum_{n=1}^{\infty}4c/(n^2+4)=c(\pi\coth2\pi-\tfrac12)\approx.837717$. 因此 $\Pr(X+Y=0)\approx.162283$.

<a id="ans-mpr-132"></a>

**132.** [题目](../sec-mpr.md#ex-mpr-132) (a) $\binom Kk\binom{N-K}{n-k}/\binom Nn$. [因而概率生成函数 $g(z)=\sum_kp_kz^k$ 是超几何函数 $\binom{N-K}n\,F\bigl({-K,-n\atop N-K-n+1}\bigm|z\bigr)/\binom Nn$; 见式 1.2.6–(39).]

(b) 均值为 $g'(1)=nK/N$; 众数为 $\{\lfloor((n+1)(K+1)-1)/(N+2)\rfloor,\lfloor(n+1)(K+1)/(N+2)\rfloor\}$; 方差为 $nK(N-n)(N-K)/(N^3-N^2)$. (注意 $g''(1)=n(n-1)K(K-1)/(N(N-1))$.)

(c) 令 $Q=X_1+\cdots+X_n$, $Z_m=\mathrm E(Q\mid X_1,\ldots,X_m)$. 则 $Z_m=(K-X_1-\cdots-X_m)(n-m)/(N-m)+X_1+\cdots+X_m$. 相应的公平序列为 $Y_m=Z_m-Z_{m-1}=\Delta_m(X_1+\cdots+X_{m-1}-K)+c_mX_m$, $1\leq m\leq n$, 其中<a id="pdf-414"></a><a id="p-394"></a> $c_m=(N-n)/(N-m)$, $\Delta_m=c_m-c_{m-1}$. 给定 $\{X_1,\ldots,X_{m-1}\}$ 后, 随着 $X_m$ 取值的不同, $Y_m$ 至多变化 $c_m$. 由 (37),

$$
\Pr(Q\geq nK/N+x)=\Pr(Z_n-Z_0\geq x)=\Pr(Y_1+\cdots+Y_n\geq x)
\leq e^{-2x^2/(c_1^2+\cdots+c_n^2)}\leq e^{-2x^2/n}.
$$

<a id="ans-mpr-133"></a>

**133.** [题目](../sec-mpr.md#ex-mpr-133) (a) 对 $m$ 用归纳法. 设 $m>1$, 且没有 $t$ 行被打散. 去掉重复的列, 并设留下的列中有 $2b$ 列各有一个 “伙伴”, 它只在最下面一行的比特与自己互补, 另有 $a$ 列没有伙伴. 由归纳假设, 前 $m-1$ 行含有 $a+b\leq f(m-1,t)$ 个不同的列; 又有 $b\leq f(m-1,t-1)$. 故不同的列共有 $a+2b\leq f(m-1,t)+f(m-1,t-1)=f(m,t)$ 个.

(b) 例如, 取所有至多含 $t-1$ 个 1 的 $m$ 位向量作列.

[N. Sauer, <em>Journal of Combinatorial Theory</em> **A13** (1972), 145–147.]

<a id="ans-mpr-134"></a>

**134.** [题目](../sec-mpr.md#ex-mpr-134) (a) 应用切比雪夫不等式 (18), 因为示性变量的方差为 $p_j(1-p_j)\leq1/4$.

(b) 考察把同一批 $2m$ 个基本事件分配给两个样本 $(\mathcal X,\mathcal X')$ 的 $\binom{2m}m$ 种等可能方法. 给定 $A_j$ 共出现 $K=M_j(\mathcal X)+M_j(\mathcal X')$ 次, 两个样本中它的出现次数分别为 $k$ 和 $K-k$. 由习题 132 的两侧尾界,

$$
\Pr(\widehat E_j(\mathcal X,\mathcal X')>\epsilon\mid K)
=\sum_{|k-K/2|>\epsilon m/2}\binom Kk\binom{2m-K}{m-k}\bigg/\binom{2m}m
\leq2e^{-2(\epsilon m/2)^2/m}.
$$

(c) 若 $E(\mathcal X)>\epsilon$, 令 $j$ 为在 $\mathcal X$ 上取得最大误差的一个下标. 由 (a), 对这个已选定的 $j$, 独立样本 $\mathcal X'$ 满足 $E_j(\mathcal X')\leq\epsilon/2$ 的条件概率至少为 $1/2$. 此时 $\widehat E_j(\mathcal X,\mathcal X')>\epsilon/2$. 另一方面, 给定合并样本, 至多有 $\Delta_{2m}(\mathcal A)$ 种不同的列; 由 (b), 其中任一列在两半样本上的频率之差超过 $\epsilon/2$ 的概率至多为 $2e^{-\epsilon^2m/8}$. 将这些界相加就得到所求的不等式.

[<em>Teoriya Veroyatnosteĭ i ee Primeneniia</em> **16** (1971), 264–279.]

<a id="ans-mpr-135"></a>

**135.** [题目](../sec-mpr.md#ex-mpr-135) (注意, 最小的非巴克斯特排列是 3142 及其逆排列 2413.)

若 $P$ 为巴克斯特排列, 则 $P^R=p_n\ldots p_1$ 和 $P^C=\bar p_1\ldots\bar p_n$ 也是, 其中 $\bar x=n+1-x$. 删去 $n$ 得到的排列 $P\setminus n$ 也是. 若 $x=p_n$ 或 $x=1$ 或 $x=p_1$, 则删去 $x$ 并把每个大于 $x$ 的元素减 1 得到的 $P\setminus x$ 也是. (例如可以考虑从 $P^-$ 中删去 $n$.)

考察将 $n+1$ <em>插入</em>一个 $n$ 元巴克斯特排列所得到的 $n+1$ 个排列. 例如, 若 $n=8$, $P=21836745$, 九种扩展为 $921836745$, $291836745$, $219836745$, $218936745$, $218396745$, $218369745$, $218367945$, $218367495$, $218367459$. 其中只有 $291836745$, $218396745$, $218369745$, $218367495$ 四个不具备巴克斯特性质. 我们很快就会发现一般规律: <em>要使插入后的排列仍为巴克斯特排列, 当且仅当把 $n+1$ 插在某个从左到右的极大元之前, 或插在某个从右到左的极大元之后.</em> (上例中, 从左到右的极大元为 2 和 8; 从右到左的极大元为 5、7 和 8.)

令 $B_n(i,j,k)$ 为 $(n+1)$ 元巴克斯特排列的数目, 限定其中恰有 $i+1$ 个从左到右的极大元、$j+1$ 个从左到右的极小元、$k$ 个上升和 $n-k$ 个下降. 这些排列对应于有 $n+1$ 个房间的平面布局, 其中 $i+1$ 个房间与底边接触, $j+1$ 个房间与左边接触, 有 $k+2$ 条竖直边界及 $n-k+2$ 条水平边界 (见习题 7.2.2.1–372). 上面的推理给出一个有趣的递推式, 适用于非负的 $i,j,k,n$:

$$
\begin{aligned}
B_0(i,j,k)&=[i=j=k=0],\\
B_{n+1}(i+1,j+1,k)&=\sum_{i'>i}B_n(i',j,k)+\sum_{j'>j}B_n(i,j',k-1).
\end{aligned}
$$

当 $i+j\leq n$ 时, 解可用二项系数的行列式表示:

$$
B_n(i,j,k)=
\begin{vmatrix}
\binom{n-j-1}{k-1}&\binom n{k-1}&\binom{n-i-1}{n-k+1}\\
\binom{n-j-1}k&\binom nk&\binom{n-i-1}{n-k}\\
\binom{n-j-1}{k+1}&\binom n{k+1}&\binom{n-i-1}{n-k-1}
\end{vmatrix},
$$

其中 $i=0,\ j=n$ 或 $i=n,\ j=0$ 的边界情形除外. 对 $i$ 和 $j$ 求和得到较简单的公式

$$
b_n(k)=t_{n+1}(k+1)/t_{n+1}(1),\qquad t_n(k)=\binom n{k-1}\binom nk\binom n{k+1},
$$

它给出恰有 $k$ 个上升的 $n$ 元巴克斯特排列的数目.

<a id="pdf-415"></a><a id="p-395"></a>

在 $b_n=\sum_kb_n(k)$ 中, $k\approx n/2$ 的项占主导地位, 因而得到 A. M. Odlyzko 给出的渐近值

$$
b_n=\frac{8^{n+2}}{\sqrt{12}\,\pi n^4}\left(1-\frac{22}{3n}+O(n^{-2})\right).
$$

[见 G. Baxter, <em>Proc. American Math. Soc.</em> **15** (1964), 851–855; F. R. K. Chung、R. L. Graham、V. E. Hoggatt, Jr. 和 M. Kleiman, <em>Journal of Combinatorial Theory</em> **A24** (1978), 382–394; W. M. Boyce, <em>Houston J. Math.</em> **7** (1981), 175–189; S. Dulucq 和 O. Guibert, <em>Discrete Math.</em> **180** (1998), 143–156.] R. L. Ollerton 求得递推式 $(n+2)(n+3)b_n=(7n^2+7n-2)b_{n-1}+8(n-1)(n-2)b_{n-2}$, 其中 $b_0=1$, 以及闭式 $b_n=F\bigl({1-n,-n,-1-n\atop 2,3}\bigm|-1\bigr)$. 开头几项为 $(b_0,b_1,\ldots)=(1,1,2,6,22,92,422,2074,10754,58202,\ldots)$.

<a id="ans-mpr-136"></a>

**136.** [题目](../sec-mpr.md#ex-mpr-136) 若 $y\leq x+\tfrac12$, 则命题为真, 因为当 $x$ 从 0 增至 $1-t$ 时, $f(x+t)-f(x)$ 从 $f(t)$ 增至 $-f(1-t)$. 然而取 $0<x<\tfrac12$, $y=1$ 就不成立.

<a id="ans-mpr-137"></a>

**137.** [题目](../sec-mpr.md#ex-mpr-137) (a) 集合 $U=\{x\mid\Pr(X\leq x)\geq\tfrac12\}$ 和 $L=\{x\mid\Pr(X<x)\leq\tfrac12\}$ 都是区间. 令 $\underline m=\inf U$, $\overline m=\sup L$, 则 $U\cap L=[\underline m\mathinner{.\,.}\overline m]$. 由于分布函数 $\Pr(X\leq x)$ 右连续, $\underline m\in U$. 同样, 因为 $\Pr(X<x)$ 左连续, $\overline m\in L$. 而且 $\underline m\leq\overline m$, 因为若 $\overline m<x<\underline m$, 则 $\Pr(X\leq x)<\tfrac12<\Pr(X<x)$.

(b) 若 $\underline m<\overline m$, 则 $\Pr(X\leq\underline m)\leq\Pr(X<\overline m)=1-\Pr(X\geq\overline m)\leq\tfrac12\leq\Pr(X\leq\underline m)$.

(c) 由 $\Pr(X\leq y)\geq\tfrac12$ 得 $y\geq\underline m$; 由 $\Pr(X<x)\leq\tfrac12$ 得 $x\leq\overline m$. 因此若 $\underline m=\overline m$, 命题为真; 可是也可能有 $x>\underline m$ 或 $y<\overline m$.

(d) 设 $m\in\operatorname{med}X$, $c<m$. ($c>m$ 时的论证类似.) 令 $\Delta x=|x-c|-|x-m|$. 若 $x\geq m$, 则 $\Delta x=m-c$. 若 $x<m$, 则 $\Delta x=c-m+2\max(x-c,0)$, 因而 $\mathrm E(\Delta X\mid X<m)\geq c-m$. 所以 $\mathrm E(\Delta X)\geq(c-m)\Pr(X<m)+(m-c)\Pr(X\geq m)=(m-c)(2\Pr(X\geq m)-1)\geq0$. 当且仅当 $\Pr(X\geq m)=\tfrac12$ 且 $\Pr(c<X<m)=0$ 才取等号; 后一条件等价于 $\Pr(X\leq c)=\Pr(X<m)$. [见 M. Mitzenmacher 和 E. Upfal, <em>Probability and Computing</em> (2017), 定理 3.9.]

(e) 真, 由坎泰利不等式 (答案 48). 若 $m\geq\mu$, 则 $\tfrac12\leq\Pr(X\geq m)\leq\sigma^2/(\sigma^2+(m-\mu)^2)$. 若 $m\leq\mu$, 则 $\tfrac12\leq\Pr(-X\geq-m)\leq\sigma^2/(\sigma^2+(\mu-m)^2)$.

(f) 若一切 $t$ 的 $I_t=\{x\mid f(x)\leq t\}$ 均为连通闭集, 就称 $f$ 为 “C 函数”. 每个凸函数 $f$ 都是 C 函数, 因为若 $a,b\in I_t$, 则对 $0\leq p\leq1$, 有 $pa+(1-p)b\in I_t$. 此外 $f$ 连续, 所以 $I_t$ 闭. (也有一些相当奇特的 C 函数, 如 $f(x)=(x<0\mathbin{?}3\mathbin{:}x<1\mathbin{?}2-x\mathbin{:}x\leq2\mathbin{?}x-1\mathbin{:}x\leq3\mathbin{?}\sqrt x\mathbin{:}x)$.)

给定 C 函数 $f$ 和随机变量 $X$, 令 $\operatorname{med}X=[\underline m\mathinner{.\,.}\overline m]$, $\operatorname{med}f(X)=[\underline M\mathinner{.\,.}\overline M]$. 若 $\underline M\leq M\leq\overline M$, 则 $I_M$ 是闭区间, 且 $\Pr(X\in I_M)=\Pr(f(X)\leq M)\geq\tfrac12$. 因此由 (c) 及 (b), 或者 $f(\underline m)\leq M$, 或者 $f(\overline m)\leq M$. (例如 $f(x)=-x$ 时, $\underline m=-\overline M$, $\overline m=-\underline M$.) [见 M. Merkle, <em>Statistics & Probability Letters</em> **71** (2005), 277–281.]

<a id="ans-mpr-138"></a>

**138.** [题目](../sec-mpr.md#ex-mpr-138) 在概率空间中 $Y$ 不变的各个部分上计算. 按定义 $\operatorname{var}(X\mid Y)=\mathrm E(X^2\mid Y)-(\mathrm E(X\mid Y))^2$, 而 $\operatorname{var}(\mathrm E(X\mid Y))=\mathrm E\bigl((\mathrm E(X\mid Y))^2\bigr)-\bigl(\mathrm E(\mathrm E(X\mid Y))\bigr)^2$. 因此 $\mathrm E(\operatorname{var}(X\mid Y))=\mathrm E(\mathrm E(X^2\mid Y))-\mathrm E\bigl((\mathrm E(X\mid Y))^2\bigr)$. 巧的是, 看起来挺复杂的项 $\mathrm E\bigl((\mathrm E(X\mid Y))^2\bigr)$ 恰好消去, 于是 $\operatorname{var}(\mathrm E(X\mid Y))+\mathrm E(\operatorname{var}(X\mid Y))=\mathrm E(\mathrm E(X^2\mid Y))-\bigl(\mathrm E(\mathrm E(X\mid Y))\bigr)^2=\mathrm E\,X^2-(\mathrm E\,X)^2$. [见 <em>CMath</em>, 423–425 页.]

<a id="ans-mpr-139"></a>

**139.** [题目](../sec-mpr.md#ex-mpr-139) 令 $x(z)=\sum_k\Pr(X_n=k)z^k$, $g_n(w,z)=\sum_{j,k}\Pr(R_n=j,S_n=k)w^jz^k$, $h_n(w,z)=\sum_{j,k}\Pr(S_n^+=j,S_n=k)w^jz^k$. 这些生成函数含有负的 $k$ 值, 因此把它们看作 “形式级数”. 我们将证明 $g=h$, 其中

$$
g=\sum_{n=0}^{\infty}g_n(w,z)t^n,\qquad
h=\exp\left(\sum_{n=1}^{\infty}h_n(w,z)\frac{t^n}{n}\right);
$$

<a id="pdf-416"></a><a id="p-396"></a>

这就足够了, 因为 $g_n(w,z)=r_n(wz,z^{-1})$, $h_n(w,z)=s_n^+(wz)+s_n^-(z^{-1})-1$.

令 $X$ 表示把形式级数乘以 $x(z)$ 的运算, $P$ 表示把 $w^jz^k$ 换成 $w^{\max(j,k)}z^k$ 的运算. 注意 $h_n(w,z)=P(x(z)^n)$; 又有 $g_0(w,z)=1$, 对 $n>0$ 则有 $g_n(w,z)=PXg_{n-1}$. 所以 $g$ 是满足 $g=1+tPXg$ 的唯一形式级数. 最后,

$$
(1-tX)h=\exp\bigl((1-P)\ln(1-tx(z))\bigr)
=1+\sum_{n=1}^{\infty}\bigl((1-P)\ln(1-tx(z))\bigr)^n/n!,
$$

因此 $h-tPXh=P((1-tX)h)=1$. [J. G. Wendel, <em>Proc. Amer. Math. Soc.</em> **9** (1958), 905–908.]

<a id="ans-mpr-140"></a>

**140.** [题目](../sec-mpr.md#ex-mpr-140) (a) 令 $q=1-p$. 根据定理 1.2.7A, 带标记且仍为从左到右极大元的元素数的期望为 $\sum_k\binom nk p^kq^{n-k}H_k=H_n+\ln p+O(q^n/n)$. 还须加上 $\sum_{m=1}^nt_m$, 其中

$$
t_m=\Pr(x_m\text{ 无标记且仍为极大元})
=\sum_{j,k}\binom{m-1}j\binom{n-m}k p^{j+k}q^{n-j-k}\bigg/\binom{j+k}j .
$$

(例如, $t_1=q$, $t_2=q^2+(q-q^n)/(n-1)$, $t_m=t_{n+1-m}$.) 由恒等式

$$
\sum_k\binom nk p^kq^{n-k}\bigg/\binom{k+j}j
=\left(1-\sum_{k=0}^{j-1}\binom{n+j}kp^kq^{n+j-k}\right)
 \bigg/\left(p^j\binom{n+j}j\right)
$$

可得: 对固定的 $m$, $t_m=\sum_{j=0}^{m-1}q^{m-j}(m-1)^{\underline j}/(n-m+j)^{\underline j}+O(q^n/n)$. 对 $m$ 求和并处理尾部, 当 $p$ 固定时有 $t_1+\cdots+t_n=2q/p+O(1/n)$. [这个结果以及 (b)、(c) 的结果, 见 C. Banderier、R. Beier 和 K. Mehlhorn, <em>LNCS</em> **2747** (2003), 198–207.]

(b) 设 $m=\lfloor\sqrt n\rfloor$. 若前 $m$ 个元素中有 $a$ 个带标记, 后 $n-m$ 个元素中有 $b$ 个带标记, 则这 $a$ 个全都离开前 $m$ 个位置的概率为 $q=b^{\underline a}/(a+b)^{\underline a}>((b-a)/b)^a$. 在此情形下 $\lambda(X)\geq m-a$. 相当必然有 $a\leq\tfrac34m$ 和 $b\geq\tfrac14n+m$, 因而 $q\geq\exp(a\ln(1-a/b))\geq\exp(-a^2/(b-a))\geq\exp(-9/4)$, 从而 $\mathrm E\,\lambda(X)=\Omega(\sqrt n)$.

(c) 令 $m=\lfloor\sqrt{8(n/p)\ln n}\rfloor$, 略去所有 $k\leq m$ 或 $x_k\geq n-m$ 的 $x_k$, 这样至多略去了 $2m$ 个极大元. 带标记的元素中, 成为极大元的个数的期望至多约为 $\ln(pn)$. 如果 $x_k$ 既未被略去, 也未被标记, 则它是极大元的概率为 $O(1/n)$. 原因是相当必然带标记的元素至多有 $2pn$ 个, 其中在 $x_k$ 前面的和比 $x_k$ 大的各至少有 $pm/2$ 个.

(d) 若 $\bar x_k>\bar x_{k+1}$, 对换 $\bar x_k\leftrightarrow\bar x_{k+1}$ 同时对换 $\delta_k\leftrightarrow\delta_{k+1}$, 不会减少 $\mathrm E\,\lambda(X)$.

(e) 令 $m=\lfloor\sqrt{\epsilon n}\rfloor$, $\Delta_k=\bar x_k-\bar x_{k-m}$, 其中在序列左端以外取 $\bar x_k=0$. 若 $x_k$ 为极大元, 则或者 $(*)$ $\epsilon<\Delta_k+\delta_k$, 或者 $(**)$ $\epsilon\geq\Delta_k+\delta_k>\max\{\delta_{k-1},\ldots,\delta_{k-m}\}$. 第一种情形的概率至多为 $\Delta_k/(2\epsilon)$, 第二种情形在 $\Delta_k+\delta_k\leq\epsilon$ 上积分, 概率至多为 $1/(m+1)$ (左端不足 $m$ 个前项时用 $1/k$). 因而 $\Pr(x_k\text{ 为极大元})\leq\Delta_k/(2\epsilon)+1/(m+1)+1/k$. 对 $k$ 求和.

见 V. Damerow、B. Manthey、F. Meyer auf der Heide、H. Räcke、C. Scheideler、C. Sohler 和 T. Tantau, <em>ACM Transactions on Algorithms</em> **8** (2012), 30:1–30:28, 该文还证明了相应的下界. 类似地, 若每个 $\delta_k$ 为标准差 $\sigma$ 的正态随机数, 他们证明了 $\mathrm E\,\lambda(X)=O\bigl(\log n(1+\sigma^{-1}\sqrt{\log n})\bigr)$.

<a id="ans-mpr-141"></a>

**141.** [题目](../sec-mpr.md#ex-mpr-141) 不妨设 $p_1+\cdots+p_n=1$. 于是有 $e^{\ln(\mathrm E\,X)}\geq e^{\mathrm E\ln X}$ (因为 $\ln$ 是凹函数).

<a id="ans-mpr-142"></a>

**142.** [题目](../sec-mpr.md#ex-mpr-142) (a) 令 $p_j=\Pr(|X|=x_j)$. 差值

$$
M_qM_t-M_rM_s=\sum_{j<k}p_jp_kx_j^qx_k^q
(x_k^{s-q}-x_j^{s-q})(x_k^{r-q}-x_j^{r-q})
$$

的每一项均非负, 因而 $M_qM_t\geq M_rM_s$.

(b) 按提示得 $(M_s/M_r)^{M_r/(s-r)}\geq x_1^{p_1x_1^r}\ldots x_n^{p_nx_n^r}$. 类似地, 因为 $q<r$ 要反转不等号, 得 $(M_q/M_r)^{M_r/(q-r)}\leq x_1^{p_1x_1^r}\ldots x_n^{p_nx_n^r}$. 两边开 $M_r$ 次方根.

(c) 所用的 “事实” 是 (b) 在 $(q,r,s)=(0,1/p,1)$ 时的情形. 令 $c=1/\sum b_k^q$, 置 $p_k=cb_k^q$, $x_k=a_k^p/b_k^q$, 则 $M_{1/p}=c\sum a_kb_k$, $M_1=c\sum a_k^p$. (当 $0<p<1$, $q<0$ 时, 同样的关系成立, 不过要把 $\leq$ 换成 $\geq$, 并排除 $b_k=0$.)

(d) $|\mathrm E\,XY|\leq\mathrm E(|X|\,|Y|)=\sum_{i,j}p_{ij}^{1/p+1/q}x_iy_j\leq(\mathrm E\,|X|^p)^{1/p}(\mathrm E\,|Y|^q)^{1/q}$, 其中 $p_{ij}=\Pr(|X|=x_i\text{ 且 }|Y|=y_j)$ 是 $|X|$, $|Y|$ 的联合分布.

<em>历史注记:</em> 这个不等式与延森不等式是一起发展起来的. $0<r<1$ 时有 $\mathrm E\,|X|^r\leq(\mathrm E\,|X|)^r$, 而其余 $r$ 值满足 $\mathrm E\,|X|^r\geq(\mathrm E\,|X|)^r$, 这一事实已经隐含在 Reynaud 和 Duhamel 的 <em>Problèmes et développemens</em> (Paris, 1823) 第 155 页上. Rogers 在 <em>Messenger of Math.</em> **17** (1887), 145–150 上发表了他的贡献 (其中有几个排印错误). 这启发 O. Hölder [<em>Göttinger Nachrichten</em> (1889), 38–47] 对满足 $f''(x)\geq0$ 的一切 $f$ 证明了 (20), 从而把 Rogers 的<a id="pdf-417"></a><a id="p-397"></a>恒等式作为推论得到. Hardy、Littlewood 和 Pólya 的 <em>Inequalities</em> (1934) 第 2 章详述了许多有关的结果. 例如, 给定 $p_j,a_{ij}\geq0$, $1\leq i\leq m$, $1\leq j\leq n$, 其中 $\sum_jp_j=1$, 他们的定理 11 指出

$$
\sum_{i=1}^m\left(\prod_{j=1}^na_{ij}^{p_j}\right)
\leq\prod_{j=1}^n\left(\sum_{i=1}^ma_{ij}\right)^{p_j}.
$$

[(c) 就是 $n=2$, $p_1=1/p$, $p_2=1/q$ 的情形.]

<a id="ans-mpr-143"></a>

**143.** [题目](../sec-mpr.md#ex-mpr-143) 令 $M=\bigl(\mathrm E((|X|+|Y|)^p)\bigr)^{1/p}=\bigl(\sum_{i,j}p_{ij}(x_i+y_j)^p\bigr)^{1/p}$, 其中 $p_{ij}$ 如答案 142(d). 于是 $M=\Sigma(x)+\Sigma(y)$, 而

$$
\begin{aligned}
\Sigma(x)&=\sum_{i,j}p_{ij}x_i(x_i+y_j)^{p-1}/M^{p-1}\\
&=\sum_{i,j}(p_{ij}^{1/p}x_i)(p_{ij}^{1/q}(x_i+y_j)^{p-1})/M^{p-1}\\
&\leq\left(\sum_{i,j}p_{ij}x_i^p\right)^{1/p}
       \left(\sum_{i,j}p_{ij}(x_i+y_j)^p\right)^{1/q}/M^{p-1}
=(\mathrm E\,|X|^p)^{1/p}.
\end{aligned}
$$

再加上 $\Sigma(y)$. [H. Minkowski, <em>Geometrie der Zahlen</em> (Leipzig, 1896), §40(I).]

<a id="ans-mpr-144"></a>

**144.** [题目](../sec-mpr.md#ex-mpr-144) (a) 由凸性, 对任意 $x$ 有 $|x|^p=|\mathrm E(x+Y)|^p\leq\mathrm E\,|x+Y|^p$. 对两边取期望.

(b) 由 (a), $\mathrm E\,|X|^p=\mathrm E\,|X^+|^p\leq\mathrm E\,|X^+-X^-|^p$.

(c) 提示成立, 因为对 $0\leq x\leq1$ 有 $(1+x)^p+(1-x)^p-2x^p\geq2$. 因而若 $\mathrm E\,|X+Y|^p=\mathrm E\,|X-Y|^p$, 则 $\mathrm E\,|X|^p+\mathrm E\,|Y|^p\leq\mathrm E\,|X+Y|^p$. 再对 $n$ 用归纳法. [见 J. A. Clarkson, <em>Trans. Amer. Math. Soc.</em> **40** (1936), 396–414.]

(d) $\mathrm E\,|X_1|^p+\cdots+\mathrm E\,|X_n|^p\leq\mathrm E\,|X_1^{\rm sym}|^p+\cdots+\mathrm E\,|X_n^{\rm sym}|^p\leq\mathrm E\,|X_1^{\rm sym}+\cdots+X_n^{\rm sym}|^p=\mathrm E\,|(X_1^++\cdots+X_n^+)-(X_1^-+\cdots+X_n^-)|^p\leq\mathrm E(2^{p-1}|X_1^++\cdots+X_n^+|^p)+\mathrm E(2^{p-1}|-(X_1^-+\cdots+X_n^-)|^p)=2^p\mathrm E\,|X_1+\cdots+X_n|^p$. [见 A. Gut, <em>Probability: A Graduate Course</em> (Springer, 2013), 定理 3.6.1. 这里用了 $|x+y|^p\leq2^{p-1}(|x|^p+|y|^p)$, 对 $p\geq1$ 这总是成立, 因为映射 $x\mapsto|x|^p$ 是凸的.]

<a id="ans-mpr-145"></a>

**145.** [题目](../sec-mpr.md#ex-mpr-145) 由多项式定理 1.2.6–(42), $(a_1^2+\cdots+a_n^2)^m=\sum_{k_1,\ldots,k_n}c(k_1,\ldots,k_n)a_1^{2k_1}\ldots a_n^{2k_n}$, 其中 $c(k_1,\ldots,k_n)=\binom m{k_1,\ldots,k_n}$. 又有 $\mathrm E\bigl((a_1X_1+\cdots+a_nX_n)^{2m}\bigr)=\sum_{k_1,\ldots,k_n}c'(k_1,\ldots,k_n)a_1^{k_1}\ldots a_n^{k_n}$. 若每个 $k_j$ 均为偶数, 则 $c'(k_1,\ldots,k_n)=\binom{2m}{k_1,\ldots,k_n}$, 否则 $c'(k_1,\ldots,k_n)=0$. 而 $c'(2k_1,\ldots,2k_n)/c(k_1,\ldots,k_n)=(2m-1)!!/\prod_{j=1}^n(2k_j-1)!!$. [A. Khintchine, <em>Math. Zeitschrift</em> **18** (1923), 109–116. 更一般地, 对所有 $p\geq2$ 有

$$
(a_1^2+\cdots+a_n^2)^{p/2}\leq\mathrm E\,|a_1X_1+\cdots+a_nX_n|^p
\leq2^{p/2}\pi^{-1/2}\Gamma\bigl((p+1)/2\bigr)(a_1^2+\cdots+a_n^2)^{p/2}.
$$

见 U. Haagerup, <em>Studia Mathematica</em> **70** (1981–1982), 231–283.]

<a id="ans-mpr-146"></a>

**146.** [题目](../sec-mpr.md#ex-mpr-146) 对于每个二元向量 $t=t_1\ldots t_n$, 令 $T_n(t)=\sum_{k=1}^n(-1)^{t_k}X_k$. 又令 $S_n=\sum_{k=1}^n X_k$, $S_n^{\rm sym}=\sum_{k=1}^nX_k^{\rm sym}$, $T_n^{\rm sym}(t)=\sum_{k=1}^n(-1)^{t_k}X_k^{\rm sym}$. 由习题 144, 对一切 $t$ 有

$$
\begin{aligned}
2^{-2m}\,\mathrm E\,T_n(t)^{2m}
&\leq2^{-2m}\,\mathrm E\,T_n^{\rm sym}(t)^{2m}
=2^{-2m}\,\mathrm E(S_n^{\rm sym})^{2m}
\leq\mathrm E\,S_n^{2m}\\
&\leq\mathrm E(S_n^{\rm sym})^{2m}
=\mathrm E\,T_n^{\rm sym}(t)^{2m}
\leq2^{2m}\,\mathrm E\,T_n(t)^{2m},
\end{aligned}
$$

因为 $S_n^{\rm sym}$ 与 $T_n^{\rm sym}(t)$ 同分布. 据习题 145, 对任意一组具体值 $x_1\ldots x_n$ 有

$$
\left(\sum_{k=1}^n x_k^2\right)^m\leq
\frac1{2^n}\sum_t\left(\sum_{k=1}^n(-1)^{t_k}x_k\right)^{2m}
\leq(2m-1)!!\left(\sum_{k=1}^nx_k^2\right)^m,
$$

所以取期望即得结论. [<em>Fundamenta Mathematicæ</em> **29** (1937), 60–90; <em>Studia Mathematica</em> **7** (1938), 104–120.]

<a id="ans-mpr-147"></a>

**147.** [题目](../sec-mpr.md#ex-mpr-147) 这是前几题的一个应用; 见 A. Gut, <em>Probability</em> (2013), 定理 3.9.1. [H. P. Rosenthal, <em>Israel J. Mathematics</em> **8** (1970), 273–303.]

> 至于卷 4 嘛, 我确实在往前走, 只不过这一卷是全套中最难啃的.
>
> ——唐纳德·E. 高德纳, 致 Michael F. Yoder 的信 (1973 年 11 月 19 日)
