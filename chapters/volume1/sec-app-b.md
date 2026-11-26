<a id="pdf-515"></a><a id="p-498"></a>

<a id="sec-app-b"></a>

# 附录 B　记号索引

在下列公式中, 未作说明的字母的意义如下:

| 字母 | 意义 |
| :--- | :--- |
| $j,k$ | 整数值的算术表达式 |
| $m,n$ | 非负整数值的算术表达式 |
| $x,y$ | 实数值的算术表达式 |
| $f$ | 实数值或复数值的函数 |
| `P` | 指针值表达式 (要么是 $\Lambda$, 要么是计算机地址) |
| $S,T$ | 集合或多重集合 |
| $\alpha$ | 符号串 |

| 形式符号 | 含义 | 定义位置 |
| :--- | :--- | :--- |
| $V\leftarrow E$ | 将表达式 $E$ 的值赋给变量 $V$ | [1.1](./sec-1.md#p-1) |
| $U\leftrightarrow V$ | 交换变量 $U$ 和 $V$ 的值 | [1.1](./sec-1.md#p-1) |
| $A_n$ 或 $A[n]$ | 线性数组 $A$ 的第 $n$ 个元素 | [1.1](./sec-1.md#p-1) |
| $A_{mn}$ 或 $A[m,n]$ | 矩形数组 $A$ 的第 $m$ 行 $n$ 列元素 | [1.1](./sec-1.md#p-1) |
| `NODE(P)` | 地址为 `P` 的结点 (由字段名独立识别的变量组), 假定 $\mathtt{P}\ne\Lambda$ | [2.1](./sec-2.md#p-187) |
| `F(P)` | 字段名是 `F` 的 `NODE(P)` 中的变量 | [2.1](./sec-2.md#p-187) |
| `CONTENTS(P)` | 地址是 `P` 的计算机字的内容 | [2.1](./sec-2.md#p-187) |
| `LOC(V)` | 计算机内变量 `V` 的地址 | [2.1](./sec-2.md#p-187) |
| $\mathtt{P}\Leftarrow\mathtt{AVAIL}$ | 将指针变量 `P` 置为一个新结点的地址 | [2.2.3](./sec-2-2-3.md#p-203) |
| $\mathtt{AVAIL}\Leftarrow\mathtt{P}$ | 将 `NODE(P)` 恢复成自由存储; 其所有字段都失去了身份 | [2.2.3](./sec-2-2-3.md#p-203) |
| $\operatorname{top}(\mathtt{S})$ | 非空栈 `S` 顶上的结点 | [2.2.1](./sec-2-2.md#p-191) |
| $X\Leftarrow\mathtt{S}$ | 从 `S` 向上弹出到 $X$: 置 $X\leftarrow\operatorname{top}(\mathtt{S})$, 然后从非空栈 `S` 删除 $\operatorname{top}(\mathtt{S})$ | [2.2.1](./sec-2-2.md#p-191) |
| $\mathtt{S}\Leftarrow X$ | 将 $X$ 向下推入 `S`: 插入值 $X$, 作为栈 `S` 顶上的新条目 | [2.2.1](./sec-2-2.md#p-191) |
| $(B\Rightarrow E;\ E')$ | 条件表达式: 如果 $B$ 为真, 表示 $E$; 如果 $B$ 为假, 表示 $E'$ |  |
| $[B]$ | 条件 $B$ 的特征函数: $(B\Rightarrow 1;\ 0)$ | [1.2.3](./sec-1-2-2.md#p-21) |
| $\delta_{kj}$ | 克罗内克 $\delta$: $[j=k]$ | [1.2.3](./sec-1-2-2.md#p-21) |
| $[z^n]g(z)$ | 幂级数 $g(z)$ 中 $z^n$ 的系数 | [1.2.9](./sec-1-2-8.md#p-69) |
| $\displaystyle\sum_{R(k)}f(k)$ | 使得变量 $k$ 为整数且关系 $R(k)$ 为真的所有 $f(k)$ 之和 | [1.2.3](./sec-1-2-2.md#p-21) |
| $\displaystyle\prod_{R(k)}f(k)$ | 使得变量 $k$ 为整数且关系 $R(k)$ 为真的所有 $f(k)$ 之积 | [1.2.3](./sec-1-2-2.md#p-21) |
| <a id="pdf-516"></a><a id="p-499"></a>$\displaystyle\min_{R(k)}f(k)$ | 使得变量 $k$ 为整数且关系 $R(k)$ 为真的所有 $f(k)$ 之极小值 | [1.2.3](./sec-1-2-2.md#p-21) |
| $\displaystyle\max_{R(k)}f(k)$ | 使得变量 $k$ 为整数且关系 $R(k)$ 为真的所有 $f(k)$ 之极大值 | [1.2.3](./sec-1-2-2.md#p-21) |
| $j\backslash k$ | $j$ 整除 $k$: $k\bmod j=0$ 且 $j>0$ | [1.2.4](./sec-1-2-3.md#p-30) |
| $S\setminus T$ | 集合差: $\{a\mid a\text{ 在 }S\text{ 中且 }a\text{ 不在 }T\text{ 中}\}$ |  |
| $\gcd(j,k)$ | $j$ 和 $k$ 的最大公因子: $\left(j=k=0\Rightarrow 0;\ \displaystyle\max_{d\backslash j,\,d\backslash k}d\right)$ | [1.1](./sec-1.md#p-1) |
| $j\perp k$ | $j$ 与 $k$ 互素: $\gcd(j,k)=1$ | [1.2.4](./sec-1-2-3.md#p-30) |
| $A^T$ | 矩形数组 $A$ 的转置: $A^T[j,k]=A[k,j]$ |  |
| $\alpha^R$ | $\alpha$ 的左右反转 |  |
| $x^y$ | $x$ 的 $y$ 次方 ($x$ 为正) | [1.2.2](./sec-1-2-1.md#p-16) |
| $x^k$ | $x$ 的 $k$ 次方: $\left(k\ge0\Rightarrow\displaystyle\prod_{0\le j<k}x;\ 1/x^{-k}\right)$ | [1.2.2](./sec-1-2-1.md#p-16) |
| $x^{\overline{k}}$ | $x$ 的 $k$ 次升幂: $\Gamma(x+k)/\Gamma(x)=\left(k\ge0\Rightarrow\displaystyle\prod_{0\le j<k}(x+j);\ 1/(x+k)^{\overline{-k}}\right)$ | [1.2.5](./sec-1-2-4.md#p-35) |
| $x^{\underline{k}}$ | $x$ 的 $k$ 次降幂: $x!/(x-k)!=\left(k\ge0\Rightarrow\displaystyle\prod_{0\le j<k}(x-j);\ 1/(x-k)^{\underline{-k}}\right)$ | [1.2.5](./sec-1-2-4.md#p-35) |
| $n!$ | $n$ 的阶乘: $\Gamma(n+1)=n^{\underline{n}}$ | [1.2.5](./sec-1-2-4.md#p-35) |
| $\displaystyle\binom{x}{k}$ | 二项式系数: $\left(k<0\Rightarrow0;\ x^{\underline{k}}/k!\right)$ | [1.2.6](./sec-1-2-5.md#p-41) |
| $\displaystyle\binom{n}{n_1,n_2,\ldots,n_m}$ | 多项式系数 (仅当 $n=n_1+n_2+\cdots+n_m$ 时) | [1.2.6](./sec-1-2-5.md#p-41) |
| $\displaystyle\left[\begin{matrix}n\\m\end{matrix}\right]$ | 第一类斯特林数: $\displaystyle\sum_{0<k_1<k_2<\cdots<k_{n-m}<n}k_1k_2\cdots k_{n-m}$ | [1.2.6](./sec-1-2-5.md#p-41) |
| $\displaystyle\left\{\begin{matrix}n\\m\end{matrix}\right\}$ | 第二类斯特林数: $\displaystyle\sum_{1\le k_1\le k_2\le\cdots\le k_{n-m}\le m}k_1k_2\cdots k_{n-m}$ | [1.2.6](./sec-1-2-5.md#p-41) |
| $\{a\mid R(a)\}$ | 使得关系 $R(a)$ 为真的所有 $a$ 的集合 |  |
| $\{a_1,\ldots,a_n\}$ | 集合或多重集合 $\{a_k\mid 1\le k\le n\}$ |  |
| $\{x\}$ | 小数部分 (用于蕴涵实数值而非集合的范畴): $x-\lfloor x\rfloor$ | [1.2.11.2](./sec-1-2-11-1.md#p-88) |
| <a id="pdf-517"></a><a id="p-500"></a>$a_1+a_2+\cdots+a_n$ | $n$ 重和: $\sum_{j=1}^n a_j$ | [1.2.3](./sec-1-2-2.md#p-21) |
| $[a\mathbin{..}b]$ | 闭区间: $\{x\mid a\le x\le b\}$ | [1.2.2](./sec-1-2-1.md#p-16) |
| $(a\mathbin{..}b)$ | 开区间: $\{x\mid a<x<b\}$ | [1.2.2](./sec-1-2-1.md#p-16) |
| $[a\mathbin{..}b)$ | 半开区间: $\{x\mid a\le x<b\}$ | [1.2.2](./sec-1-2-1.md#p-16) |
| $(a\mathbin{..}b]$ | 半闭区间: $\{x\mid a<x\le b\}$ | [1.2.2](./sec-1-2-1.md#p-16) |
| $\lvert S\rvert$ | 基数: 集合 $S$ 的元素个数 |  |
| $\lvert x\rvert$ | $x$ 的绝对值: $(x\ge0\Rightarrow x;\ -x)$ |  |
| $\lvert\alpha\rvert$ | $\alpha$ 的长度 |  |
| $\lfloor x\rfloor$ | $x$ 的下整, 最大整数函数: $\max_{k\le x}k$ | [1.2.4](./sec-1-2-3.md#p-30) |
| $\lceil x\rceil$ | $x$ 的上整, 最小整数函数: $\min_{k\ge x}k$ | [1.2.4](./sec-1-2-3.md#p-30) |
| $x\bmod y$ | $\operatorname{mod}$ 函数: $(y=0\Rightarrow x;\ x-y\lfloor x/y\rfloor)$ | [1.2.4](./sec-1-2-3.md#p-30) |
| $x\equiv x'(\operatorname{modulo}\ y)$ | 同余关系: $x\bmod y=x'\bmod y$ | [1.2.4](./sec-1-2-3.md#p-30) |
| $O(f(n))$ | 当变量 $n\to\infty$, $f(n)$ 的大 $O$ | [1.2.11.1](./sec-1-2-10.md#p-85) |
| $O(f(z))$ | 当变量 $z\to0$, $f(z)$ 的大 $O$ | [1.2.11.1](./sec-1-2-10.md#p-85) |
| $\Omega(f(n))$ | 当变量 $n\to\infty$, $f(n)$ 的大 *omega* | [1.2.11.1](./sec-1-2-10.md#p-85) |
| $\Theta(f(n))$ | 当变量 $n\to\infty$, $f(n)$ 的大 *theta* | [1.2.11.1](./sec-1-2-10.md#p-85) |
| $\log_b x$ | $x$ 的以 $b$ 为底的对数 (当 $x>0$, $b>0$, 且 $b\ne1$): 使得 $x=b^y$ 的 $y$ | [1.2.2](./sec-1-2-1.md#p-16) |
| $\ln x$ | 自然对数: $\log_e x$ | [1.2.2](./sec-1-2-1.md#p-16) |
| $\lg x$ | 以 2 为底的对数: $\log_2 x$ | [1.2.2](./sec-1-2-1.md#p-16) |
| $\exp x$ | $x$ 的指数: $e^x$ | [1.2.9](./sec-1-2-8.md#p-69) |
| $\langle X_n\rangle$ | 无穷序列 $X_0,X_1,X_2,\ldots$ (这里的字母 $n$ 是符号的一部分) | [1.2.9](./sec-1-2-8.md#p-69) |
| $f'(x)$ | $f$ 在 $x$ 处的导数 | [1.2.9](./sec-1-2-8.md#p-69) |
| $f''(x)$ | $f$ 在 $x$ 处的二次导数 | [1.2.10](./sec-1-2-9.md#p-76) |
| $f^{(n)}(x)$ | 第 $n$ 次求导: $(n=0\Rightarrow f(x);\ g'(x))$, 其中 $g(x)=f^{(n-1)}(x)$ | [1.2.11.2](./sec-1-2-11-1.md#p-88) |
| $H_n^{(x)}$ | $x$ 阶调和数: $\displaystyle\sum_{1\le k\le n}1/k^x$ | [1.2.7](./sec-1-2-6.md#p-59) |
| $H_n$ | 调和数: $H_n^{(1)}$ | [1.2.7](./sec-1-2-6.md#p-59) |
| $F_n$ | 斐波那契数: $(n\le1\Rightarrow n;\ F_{n-1}+F_{n-2})$ | [1.2.8](./sec-1-2-7.md#p-62) |
| $B_n$ | 伯努利数: $n!\,[z^n]\,z/(e^z-1)$ | [1.2.11.2](./sec-1-2-11-1.md#p-88) |
| $\det(A)$ | 方阵 $A$ 的行列式 | [1.2.3](./sec-1-2-2.md#p-21) |
| $\operatorname{sign}(x)$ | $x$ 的符号: $[x>0]-[x<0]$ |  |
| $\zeta(x)$ | $\zeta$ 函数: $\lim_{n\to\infty}H_n^{(x)}$ (当 $x>1$) | [1.2.7](./sec-1-2-6.md#p-59) |
| $\Gamma(x)$ | $\Gamma$ 函数: $(x-1)!=\gamma(x,\infty)$ | [1.2.5](./sec-1-2-4.md#p-35) |
| $\gamma(x,y)$ | 不完全 $\Gamma$ 函数: $\displaystyle\int_0^y e^{-t}t^{x-1}\,dt$ | [1.2.11.3](./sec-1-2-11-2.md#p-92) |
| <a id="pdf-518"></a><a id="p-501"></a>$\gamma$ | 欧拉常数: $\lim_{n\to\infty}(H_n-\ln n)$ | [1.2.7](./sec-1-2-6.md#p-59) |
| $e$ | 自然对数的底: $\sum_{n\ge0}1/n!$ | [1.2.2](./sec-1-2-1.md#p-16) |
| $\pi$ | 圆周率: $4\sum_{n\ge0}(-1)^n/(2n+1)$ | [1.2.2](./sec-1-2-1.md#p-16) |
| $\infty$ | 无穷: 大于任何数 |  |
| $\Lambda$ | 空链 (不指向地址的指针) | [2.1](./sec-2.md#p-187) |
| $\epsilon$ | 空串 (长度为 0 的字符串) |  |
| $\emptyset$ | 空集 (无元素的集合) |  |
| $\phi$ | 黄金分割比: $\tfrac12(1+\sqrt5)$ | [1.2.8](./sec-1-2-7.md#p-62) |
| $\varphi(n)$ | 欧拉 $\varphi$ 函数: $\displaystyle\sum_{0\le k<n}[k\perp n]$ | [1.2.4](./sec-1-2-3.md#p-30) |
| $x\approx y$ | $x$ 近似等于 $y$ | [1.2.5](./sec-1-2-4.md#p-35), 4.2.2 |
| $\Pr(S(X))$ | 对于 $X$ 的随机值, 命题 $S(X)$ 为真的概率 | [1.2.10](./sec-1-2-9.md#p-76) |
| $\mathrm{E}\,X$ | $X$ 的期望值: $\sum_x x\Pr(X=x)$ | [1.2.10](./sec-1-2-9.md#p-76) |
| $\operatorname{mean}(g)$ | 用生成函数 $g$ 表示的概率分布的均值: $g'(1)$ | [1.2.10](./sec-1-2-9.md#p-76) |
| $\operatorname{var}(g)$ | 用生成函数 $g$ 表示的概率分布的方差: $g''(1)+g'(1)-g'(1)^2$ | [1.2.10](./sec-1-2-9.md#p-76) |
| $(\min x_1,\operatorname{ave}x_2,\max x_3,\operatorname{dev}x_4)$ | 具有极小值 $x_1$、平均 (期望) 值 $x_2$、极大值 $x_3$、标准差 $x_4$ 的随机变量 | [1.2.10](./sec-1-2-9.md#p-76) |
| `P*` | 二叉树或树中 `NODE(P)` 的先序后续的地址 | [2.3.1](./sec-2-3-1.md#p-253), [2.3.2](./sec-2-3-1.md#p-265) |
| `P$` | 二叉树中 `NODE(P)` 的中序后续的地址, 树的后序后续 | [2.3.1](./sec-2-3-1.md#p-253), [2.3.2](./sec-2-3-1.md#p-265) |
| `P♯` | 二叉树中 `NODE(P)` 的后序后续的地址 | [2.3.1](./sec-2-3-1.md#p-253) |
| `*P` | 二叉树或树中 `NODE(P)` 的先序前驱的地址 | [2.3.1](./sec-2-3-1.md#p-253), [2.3.2](./sec-2-3-1.md#p-265) |
| `$P` | 二叉树中 `NODE(P)` 的中序前驱的地址, 树的后序前驱 | [2.3.1](./sec-2-3-1.md#p-253), [2.3.2](./sec-2-3-1.md#p-265) |
| `♯P` | 二叉树中 `NODE(P)` 的后序前驱的地址 | [2.3.1](./sec-2-3-1.md#p-253) |
| ▮ | 算法、程序、证明的结束标志 | [1.1](./sec-1.md#p-1) |
| ␣ | 一个空格 | [1.3.1](./sec-1-3.md#p-99) |
| `rA` | MIX 的寄存器 A (累加器) | [1.3.1](./sec-1-3.md#p-99) |
| `rX` | MIX 的寄存器 X (扩展) | [1.3.1](./sec-1-3.md#p-99) |
| `rI1`, …, `rI6` | MIX 的 (变址) 寄存器 I1, …, I6 | [1.3.1](./sec-1-3.md#p-99) |
| `rJ` | MIX 的 (转址) 寄存器 J | [1.3.1](./sec-1-3.md#p-99) |
| `(L:R)` | MIX 字的部分字段, $0\le\mathtt L\le\mathtt R\le5$ | [1.3.1](./sec-1-3.md#p-99) |
| `OP ADDRESS,I(F)` | MIX 指令的记号 | [1.3.1](./sec-1-3.md#p-99), [1.3.2](./sec-1-3-1.md#p-116) |
| $u$ | MIX 中的时间单位 | [1.3.1](./sec-1-3.md#p-99) |
| `*` | MIXAL 中的 “self” | [1.3.2](./sec-1-3-1.md#p-116) |
| `0F, 1F, 2F, …, 9F` | MIXAL 中的 “forward” 局部符号 | [1.3.2](./sec-1-3-1.md#p-116) |
| `0B, 1B, 2B, …, 9B` | MIXAL 中的 “backward” 局部符号 | [1.3.2](./sec-1-3-1.md#p-116) |
| `0H, 1H, 2H, …, 9H` | MIXAL 中的 “here” 局部符号 | [1.3.2](./sec-1-3-1.md#p-116) |
