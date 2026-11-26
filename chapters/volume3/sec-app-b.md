
<a id="pdf-601"></a>
<a id="p-595"></a>

<a id="sec-app-b"></a>

## 附录 B 记号索引

在下列公式中, 未另作说明的字母有如下含义.

| 字母 | 含义 |
| ---: | :--- |
| $j,k$ | 整数值算术表达式 |
| $m,n$ | 非负整数值算术表达式 |
| $x,y$ | 实数值算术表达式 |
| $z$ | 复数值算术表达式 |
| $f$ | 实值或复值函数 |
| $\mathtt P$ | 指针值表达式 ($\Lambda$ 或计算机地址) |
| $S,T$ | 集合或多重集 |
| $\alpha,\beta$ | 符号串 |

<a id="tab-app-b"></a>

| 形式符号 | 含义 | 定义位置 |
| ---: | :--- | :--- |
| $V\leftarrow E$ | 将表达式 $E$ 的值赋给变量 $V$ | 1.1 |
| $U\leftrightarrow V$ | 交换变量 $U$ 与 $V$ 的值 | 1.1 |
| $A_n$ 或 $A[n]$ | 线性数组 $A$ 的第 $n$ 个元素 | 1.1 |
| $A_{mn}$ 或 $A[m,n]$ | 矩形数组 $A$ 的第 $m$ 行第 $n$ 列元素 | 1.1 |
| $\mathtt{NODE(P)}$ | 地址为 $\mathtt P$ 的结点 (各变量用字段名识别), 假设 $\mathtt P\ne\Lambda$ | 2.1 |
| $\mathtt{F(P)}$ | $\mathtt{NODE(P)}$ 中字段名为 F 的变量 | 2.1 |
| $\mathtt{CONTENTS(P)}$ | 地址为 $\mathtt P$ 的计算机字的内容 | 2.1 |
| $\mathtt{LOC(V)}$ | 计算机内变量 $\mathtt V$ 的地址 | 2.1 |
| $\mathtt P\Leftarrow\mathtt{AVAIL}$ | 将指针变量 $\mathtt P$ 置为一个新结点的地址 | 2.2.3 |
| $\mathtt{AVAIL}\Leftarrow\mathtt P$ | 将 $\mathtt{NODE(P)}$ 归还可用存储. 它的所有字段不再有效 | 2.2.3 |
| $\operatorname{top}(\mathtt S)$ | 非空栈 $\mathtt S$ 顶部的结点 | 2.2.1 |
| $X\Leftarrow\mathtt S$ | 从栈 $\mathtt S$ 向上弹出到 $X$. 置 $X\leftarrow\operatorname{top}(\mathtt S)$, 再从非空栈 $\mathtt S$ 删除 $\operatorname{top}(\mathtt S)$ | 2.2.1 |
| $\mathtt S\Leftarrow X$ | 将 $X$ 推入栈 $\mathtt S$, 作为新的栈顶条目 | 2.2.1 |
| $(R\mathbin? a:b)$ | 条件表达式. 关系 $R$ 为真时取 $a$, 为假时取 $b$ | |
| $[R]$ | 关系 $R$ 的特征函数, $(R\mathbin?1:0)$ | 1.2.3 |
| $\delta_{kj}$ | 克罗内克 $\delta$, $[j=k]$ | 1.2.3 |
| $[z^n]g(z)$ | 幂级数 $g(z)$ 中 $z^n$ 的系数 | 1.2.9 |
| $\displaystyle\sum_{R(k)}f(k)$ | 对所有使关系 $R(k)$ 为真的整数 $k$ 求 $f(k)$ 之和 | 1.2.3 |
| $\displaystyle\prod_{R(k)}f(k)$ | 对所有使关系 $R(k)$ 为真的整数 $k$ 求 $f(k)$ 之积 | 1.2.3 |
| $\displaystyle\min_{R(k)}f(k)$ | 使关系 $R(k)$ 为真的整数 $k$ 所对应的 $f(k)$ 的最小值 | 1.2.3 |
| $\displaystyle\max_{R(k)}f(k)$ | 使关系 $R(k)$ 为真的整数 $k$ 所对应的 $f(k)$ 的最大值 | 1.2.3 |
| $j\backslash k$ | $j$ 整除 $k$, 即 $k\bmod j=0$ 且 $j>0$ | 1.2.4 |
| $S\setminus T$ | 集合差, $\{a\mid a\in S\text{ 且 }a\notin T\}$ | |

<a id="pdf-602"></a>
<a id="p-596"></a>

| 形式符号 | 含义 | 定义位置 |
| ---: | :--- | :--- |
| $\gcd(j,k)$ | $j$ 和 $k$ 的最大公因子, $\left(j=k=0\mathbin?0:\max_{d\backslash j,\,d\backslash k}d\right)$ | 1.1 |
| $j\perp k$ | $j$ 与 $k$ 互素, $\gcd(j,k)=1$ | 1.2.4 |
| $A^{\mathsf T}$ | 矩形数组 $A$ 的转置, $A^{\mathsf T}[j,k]=A[k,j]$ | |
| $\alpha^R$ | $\alpha$ 的左右反转 | |
| $x^y$ | $x$ 的 $y$ 次方 ($x$ 为正) | 1.2.2 |
| $x^k$ | $x$ 的 $k$ 次方, $\left(k\ge0\mathbin?\displaystyle\prod_{0\le j<k} x:1/x^{-k}\right)$ | 1.2.2 |
| $x^{\overline k}$ | $x$ 的 $k$ 次升幂, $\Gamma(x+k)/\Gamma(x)=\left(k\ge0\mathbin?\displaystyle\prod_{0\le j<k}(x+j):1/(x+k)^{\overline{-k}}\right)$ | 1.2.5 |
| $x^{\underline k}$ | $x$ 的 $k$ 次降幂, $x!/(x-k)!=\left(k\ge0\mathbin?\displaystyle\prod_{0\le j<k}(x-j):1/(x-k)^{\underline{-k}}\right)$ | 1.2.5 |
| $n!$ | $n$ 的阶乘, $\Gamma(n+1)=n^{\underline n}$ | 1.2.5 |
| $\displaystyle\binom xk$ | 二项式系数, $(k<0\mathbin?0:x^{\underline k}/k!)$ | 1.2.6 |
| $\displaystyle\binom n{n_1,n_2,\ldots,n_m}$ | 多项式系数 (仅在 $n=n_1+n_2+\cdots+n_m$ 时定义) | 1.2.6 |
| $\displaystyle\genfrac{[}{]}{0pt}{}{n}{m}$ | 第一类斯特林数, $\displaystyle\sum_{0<k_1<k_2<\cdots<k_{n-m}<n}k_1k_2\cdots k_{n-m}$ | 1.2.6 |
| $\displaystyle\genfrac{\{}{\}}{0pt}{}{n}{m}$ | 第二类斯特林数, $\displaystyle\sum_{1\le k_1\le k_2\le\cdots\le k_{n-m}\le m}k_1k_2\cdots k_{n-m}$ | 1.2.6 |
| $\{a\mid R(a)\}$ | 使关系 $R(a)$ 为真的所有 $a$ 的集合 | |
| $\{a_1,\ldots,a_n\}$ | 集合或多重集 $\{a_k\mid1\le k\le n\}$ | |
| $\{x\}$ | 小数部分 (用于表示实值的场合), $x-\lfloor x\rfloor$ | 1.2.11.2 |
| $a_1+a_2+\cdots+a_n$ | $n$ 项和, $\sum_{j=1}^n a_j$ | 1.2.3 |
| $[a\mathinner{..}b]$ | 闭区间, $\{x\mid a\le x\le b\}$ | 1.2.2 |
| $(a\mathinner{..}b)$ | 开区间, $\{x\mid a<x<b\}$ | 1.2.2 |
| $[a\mathinner{..}b)$ | 半开区间, $\{x\mid a\le x<b\}$ | 1.2.2 |
| $(a\mathinner{..}b]$ | 半闭区间, $\{x\mid a<x\le b\}$ | 1.2.2 |
| $\lvert S\rvert$ | 基数, 集合 $S$ 的元素个数 | |
| $\lvert x\rvert$ | $x$ 的绝对值, $(x\ge0\mathbin?x:-x)$ | |
| $\lvert\alpha\rvert$ | $\alpha$ 的长度 | |
| $\lfloor x\rfloor$ | $x$ 的下整, 最大整数函数, $\max_{k\le x}k$ | 1.2.4 |
| $\lceil x\rceil$ | $x$ 的上整, 最小整数函数, $\min_{k\ge x}k$ | 1.2.4 |
| $x\bmod y$ | 模函数, $(y=0\mathbin?x:x-y\lfloor x/y\rfloor)$ | 1.2.4 |
| $x\equiv x'\pmod y$ | 同余关系, $x\bmod y=x'\bmod y$ | 1.2.4 |
| $O(f(n))$ | $n\to\infty$ 时 $f(n)$ 的大 $O$ | 1.2.11.1 |
| $O(f(z))$ | $z\to0$ 时 $f(z)$ 的大 $O$ | 1.2.11.1 |
| $\Omega(f(n))$ | $n\to\infty$ 时 $f(n)$ 的大 $\Omega$ | 1.2.11.1 |
| $\Theta(f(n))$ | $n\to\infty$ 时 $f(n)$ 的大 $\Theta$ | 1.2.11.1 |

<a id="pdf-603"></a>
<a id="p-597"></a>

| 形式符号 | 含义 | 定义位置 |
| ---: | :--- | :--- |
| $\log_b x$ | $x$ 的以 $b$ 为底的对数, 满足 $x=b^y$ 的 $y$($x>0$、$b>0$、$b\ne1$) | 1.2.2 |
| $\ln x$ | 自然对数, $\log_e x$ | 1.2.2 |
| $\lg x$ | 以 2 为底的对数, $\log_2x$ | 1.2.2 |
| $\exp x$ | $x$ 的指数, $e^x$ | 1.2.9 |
| $\langle X_n\rangle$ | 无穷序列 $X_0,X_1,X_2,\ldots$ (这里 $n$ 是记号的一部分) | 1.2.9 |
| $f'(x)$ | $f$ 在 $x$ 处的导数 | 1.2.9 |
| $f''(x)$ | $f$ 在 $x$ 处的二阶导数 | 1.2.10 |
| $f^{(n)}(x)$ | $n$ 阶导数, $(n=0\mathbin?f(x):g'(x))$, 其中 $g(x)=f^{(n-1)}(x)$ | 1.2.11.2 |
| $H_n^{(x)}$ | $x$ 阶调和数, $\displaystyle\sum_{1\le k\le n}1/k^x$ | 1.2.7 |
| $H_n$ | 调和数, $H_n^{(1)}$ | 1.2.7 |
| $F_n$ | 斐波那契数, $(n\le1\mathbin?n:F_{n-1}+F_{n-2})$ | 1.2.8 |
| $B_n$ | 伯努利数, $n![z^n]\,z/(e^z-1)$ | 1.2.11.2 |
| $\det(A)$ | 方阵 $A$ 的行列式 | 1.2.3 |
| $\operatorname{sign}(x)$ | $x$ 的符号, $[x>0]-[x<0]$ | |
| $\zeta(x)$ | $\zeta$ 函数, $\lim_{n\to\infty}H_n^{(x)}$ (当 $x>1$ 时) | 1.2.7 |
| $\Gamma(x)$ | $\Gamma$ 函数, $(x-1)!=\gamma(x,\infty)$ | 1.2.5 |
| $\gamma(x,y)$ | 不完全 $\Gamma$ 函数, $\int_0^y e^{-t}t^{x-1}dt$ | 1.2.11.3 |
| $\gamma$ | 欧拉常数, $\lim_{n\to\infty}(H_n-\ln n)$ | 1.2.7 |
| $e$ | 自然对数的底, $\sum_{n\ge0}1/n!$ | 1.2.2 |
| $\pi$ | 圆周率, $4\sum_{n\ge0}(-1)^n/(2n+1)$ | 1.2.2 |
| $\infty$ | 无穷, 大于任何数 | |
| $\Lambda$ | 空链接 (不指向地址的指针) | 2.1 |
| $\epsilon$ | 空串 (长度为 0 的字符串) | |
| $\emptyset$ | 空集 (无元素的集合) | |
| $\phi$ | 黄金分割比, $\tfrac12(1+\sqrt5)$ | 1.2.8 |
| $\varphi(n)$ | 欧拉 $\varphi$ 函数, $\displaystyle\sum_{0\le k<n}[k\perp n]$ | 1.2.4 |
| $x\approx y$ | $x$ 近似等于 $y$ | 1.2.5, 4.2.2 |
| $\Pr(S(X))$ | 对 $X$ 的随机取值, 命题 $S(X)$ 为真的概率 | 1.2.10 |
| $\mathrm EX$ | $X$ 的期望值, $\sum_x x\Pr(X=x)$ | 1.2.10 |
| $\operatorname{mean}(g)$ | 由生成函数 $g$ 表示的概率分布的均值, $g'(1)$ | 1.2.10 |
| $\operatorname{var}(g)$ | 由生成函数 $g$ 表示的概率分布的方差, $g''(1)+g'(1)-g'(1)^2$ | 1.2.10 |
| $(\min x_1,\operatorname{ave}x_2,\max x_3,\operatorname{dev}x_4)$ | 最小值为 $x_1$、平均 (期望) 值为 $x_2$、最大值为 $x_3$、标准差为 $x_4$ 的随机变量 | 1.2.10 |
| $\Re z$ | $z$ 的实部 | 1.2.2 |
| $\Im z$ | $z$ 的虚部 | 1.2.2 |
| $\overline z$ | 复共轭, $\Re z-i\Im z$ | 1.2.2 |
| $(\ldots a_1a_0.a_{-1}\ldots)_b$ | 基数为 $b$ 的位值表示, $\sum_k a_kb^k$ | 4.1 |
| $\mathord{//}x_1,x_2,\ldots,x_n\mathord{//}$ | 连分数, $1/(x_1+1/(x_2+1/(\cdots+1/(x_n)\cdots)))$ | 4.5.3 |
| $\alpha\mathbin{\top}\beta$ | 插入积 | [5.1.2](./sec-5-1-2.md#sec-5-1-2) |
| $S\uplus T$ | 多重集之和. 例如 $\{a,b\}\uplus\{a,c\}=\{a,a,b,c\}$ | 4.6.3 |
| $\left.f(x)\right\vert_a^b$ | 函数的增量, $f(b)-f(a)$ | |

<a id="pdf-604"></a>
<a id="p-598"></a>

| 形式符号 | 含义 | 定义位置 |
| ---: | :--- | :--- |
| ▮ | 算法、程序或证明的结束标志 | 1.1 |
| $\sqcup$ | 一个空格 | 1.3.1 |
| $\mathtt{rA}$ | MIX 的寄存器 A (累加器) | 1.3.1 |
| $\mathtt{rX}$ | MIX 的寄存器 X (扩展) | 1.3.1 |
| $\mathtt{rI1},\ldots,\mathtt{rI6}$ | MIX 的变址寄存器 I1、……、I6 | 1.3.1 |
| $\mathtt{rJ}$ | MIX 的转址寄存器 J | 1.3.1 |
| $\mathtt{(L:R)}$ | MIX 字的部分字段, $0\le L\le R\le5$ | 1.3.1 |
| $\mathtt{OP\ ADDRESS,I(F)}$ | MIX 指令的记号 | 1.3.1, 1.3.2 |
| $u$ | MIX 的时间单位 | 1.3.1 |
| $\mathtt{*}$ | MIXAL 中的 “self” (当前位置) | 1.3.2 |
| $\mathtt{0F},\mathtt{1F},\mathtt{2F},\ldots,\mathtt{9F}$ | MIXAL 中 “forward” (向前) 局部符号 | 1.3.2 |
| $\mathtt{0B},\mathtt{1B},\mathtt{2B},\ldots,\mathtt{9B}$ | MIXAL 中 “backward” (向后) 局部符号 | 1.3.2 |
| $\mathtt{0H},\mathtt{1H},\mathtt{2H},\ldots,\mathtt{9H}$ | MIXAL 中 “here” (此处) 局部符号 | 1.3.2 |
