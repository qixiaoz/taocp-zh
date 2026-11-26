<a id="pdf-007"></a>
<a id="p-1"></a>
<a id="sec-5"></a>

# 第5章　排序

> 没有什么比率先建立事物的新秩序更难把握、更担风险、更成败莫测的了. <br>——尼可罗·马基亚维利, 《君主论》(1513)

> “但你不可能及时查对所有这些驾照号码,” 德雷克反驳说, “我们不需要这样做, 保罗. 我们只需要排成一个列表, 指出重复号码就行了.”

> ——佩瑞·梅森, 《愤怒的哀悼者》中的律师 (1951)

> “树排序” 计算机——应用这一新的 “计算机方法” 来进行自然研究, 可以快速辨识美国、阿拉斯加和加拿大 260 多个不同树种, 甚至包括棕榈、沙漠里的树, 以及其他外来树种. 要进行排序, 只要插入排序指针就行了. <br>——埃德蒙科技公司的产品目录 (1964)

在本章, 我们将研究一个在程序设计中经常遇到的主题: 按升序或降序重新排列项目. 设想一下, 如果一本词典的单词不是按照字母顺序排列的, 那这本词典的使用将会是何等困难! 我们将会看到, 项目在计算机存储器中的存储顺序, 通常会深远地影响到处理这些项目的算法的速度和简单性.

尽管英语词典中把 sorting 一词定义为按照类别对事物进行分类、整理的过程, 但计算机程序员在使用这个词时通常会采用一种更特定的含义: 按照升序或降序对事物进行排列. 这一过程可能应当称为 ordering, 而不是 sorting; 但由于 ordering 一词附加了太多的不同含义, 所以一旦使用这个词, 马上就会导致混淆. 比如下面这个句子: “由于我们的磁带机中仅有两台处于工作状态 (in working order), 所以我受命 (was ordered) 在短期内 (in short order) 订购 (to order) 更多磁带机, 以使 (in order to) 数据排序 (to order the data) 速度提高几个数量级 (orders).” 而数学术语则为 order 一词赋予了更多的含义: the order of a group (群的阶)、the order of a permutation (排列的阶)、the order of a branch point (分支点的级数)、relations of order (次序关系), 等等, 等等. 所以我们认为: order 一词可能会导致紊乱.

有人曾经提出, sequencing 是排序过程的最佳名字. 但这个词经常显得缺乏适当的内涵, 特别是存在相等元素时; 而且它有时会与其他术语相冲突. 的确, sorting 单词本身的使用也有些过度 (“I was sort of out of sorts after sorting that sort of data”, 在对那类数据进行排序后, 我有点不高兴了), 但它在计算领域的交流中牢固地确定了自己的位置. 因此, 我们在使用 sorting 一词时, 将严格采用其 “排序” 含义, 后文不再解释了.

排序的一些最重要应用包括:

(a) 求解 “归属” 问题. 也就是将所有具有相同标识的项目集中在一起. 假定有 10000 个任意顺序的项目, 其中有许多项目的取值相同; 假定我们希望重新排列这些数据, 使所有取值相同的项目都出现在连续位置. 这一分类问题基本上是 sorting 的较早含义 (即 “分类”). 只要采用这个单词的新含义 (即 “排序”) 来处理文件, 使这些取值按升序排列 $v_1\le v_2\le\cdots\le v_{10000}$, 就可以轻松解决这一问题. 这一过程所能实现的效率, 解释了为什么 sorting 一词的最初含义会发生变化 (由 “分类” 变为 “排序”).

<a id="pdf-008"></a>
<a id="p-2"></a>

(b) 匹配两个或更多个文件中的项目. 如果几个文件按相同顺序排列, 一次顺序扫描就可能找出所有匹配项, 无须反复查找. 佩瑞·梅森就是利用这一原理来帮助侦破谋杀案的 (见本章开头的引语). 在处理一个信息列表时, 最快速的处理方法是从头至尾依次遍历该列表, 而不是在其中随机跳转, 除非整个列表小到可以放到一个高速随机存储器中. 通过排序, 有可能对大型文件进行顺序访问, 实际取代直接寻址.

(c) 按键值查找信息. 在第 6 章将会看到, 排序还可以帮助查找, 因此有助于使计算机输出结果更便于人类使用. 事实上, 一份按字母顺序排序的列表, 即使与其相关联的数值信息存在计算错误, 往往也会显得更权威一些.

尽管排序在传统上主要用于商务数据处理, 但它实际上是一种基本工具, 每个程序员都应当牢记在心, 在各种情况下广泛运用. 我们已经在习题 2.3.2-17 中讨论了它在代数式化简中的应用. 后面的习题将展示各种典型应用.

可以展示排序通用性的一个早期大规模软件系统是 “LARC 科学编译器”, 它是由乔尔·埃德温、戴维·弗格森和他们在 “计算机科学公司” 的同事们于 1960 年开发的. 这一优化编译器是针对扩展 FORTRAN 语言开发的, 其中大量使用了排序, 以适当顺序向各种编译算法提供源程序的相关部分. 第一遍扫描是词法扫描, 将 FORTRAN 源代码划分为各个标记, 每个标记表示一个标识符、一个常量或一个运算符, 等等. 每个标记都被赋予几个序列号; 在按照名称和适当的序列号进行排序时, 会将所有使用某一给定标识符的内容都集中在一起. 用户用 “定义项” 来指定一个标识符是代表函数名、参数, 还是数组变量, 由于为定义项指定的序列号较小, 所以它们会在拥有给定标识符的标记中排在前列, 这样既便于检查其使用是否存在冲突, 又可根据 `EQUIVALENCE` 声明来分配存储. 针对每个标识符收集的信息现在被附加到每个标记, 这样就不再需要在高速存储器中维护标识符的 “符号表”. 随后, 根据另一序列号对经过更新的标记进行排序, 这一操作基本上会使源程序恢复最初顺序, 但精心设计的编号机制将算术表达式转换为一种更为方便的 “波兰前缀” 形式. 在后续编译阶段也会用到排序, 以便于循环优化、将错误消息合并到清单中等. 简而言之, 采用这一编译器的设计方式, 在针对辅助磁鼓存储器上的存储文件执行操作时, 几乎都可以顺序完成, 这是因为在这些数据上附加了适当的序列号, 从而可以采用各种便利的排列方式来存储数据.

20 世纪 60 年代的计算机制造商估计: 将所有用户考虑在内时, 他们的计算机有超过 25%的运行时间花费在排序上. 事实上, 在许多安装实例中, 排序任务占用了一半以上的计算时间. 根据这些统计数字, 也许能够得出以下结论之一: (1) 排序有许多重要应用, (2) 许多人在不应当排序的时候进行了排序, (3) 低效排序算法的使用非常普遍. 实际情景可能涉及所有这三种可能性, 但无论是哪种情况, 都可以看出: 排序值得作为实际问题加以认真研究.

即使排序几乎没有什么用处, 也有充足的理由对其进行研究. 已经发现的一些天才算法表明: 排序本身就是一个极有意义、值得探讨的主题. 在这一领域还有许多富有魅力、悬而未决的问题, 当然也有大量已经解决的问题.

从更宽广的角度来看, 我们还会发现, 排序算法提供了一个很有价值的案例研究: 如何从整体上攻克计算机编程问题. 在这一章将会介绍许多重要的数据结构操作原理. 我们将研究各种排序技巧的演进过程, 尝试描述这些思想最初是如何发现的. 通过这一案例研究的外推, 可以学习到大量策略, 用于帮助我们为其他计算机问题设计出优秀算法.

排序技巧还出色地展示了算法分析中涉及的一般思想——这些思想用于判断各种算法的性能特征, 以在相互竞争的方法之间做出明智选择. 在这一章, 偏爱数学的读者将会找到许多具有指导意义的技巧, 用于评估计算机算法的速度、化解复杂的递推关系. 另一方面, 这些材料的组织方式也会使不喜欢数学的读者能够放心地略过这些计算.

<a id="pdf-009"></a>
<a id="p-3"></a>

在继续讨论之前, 应当更清楚地描述一下我们的问题, 并介绍一些术语. 有 $N$ 个需要排序的项目

$$
R_1,R_2,\ldots,R_N,
$$

它们被称为记录, 由 $N$ 条记录组成的整个集合称为文件. 每条记录 $R_j$ 有一个键 $K_j$, 它左右着排序过程. 除了键之外, 通常还存在其他数据, 这一额外的 “附属信息” 对于排序过程没有什么影响, 只是必须将其作为每条记录的组成部分加以携带.

针对这些键指定了一种顺序关系 “$<$”, 使得对于任意键值 $a,b,c$ 满足以下条件:

(i) $a<b$, $a=b$, $b<a$ 中有且仅有一种关系为真. (这一条件称为三分律.)

(ii) 如果 $a<b$, $b<c$, 则 $a<c$. (这一条件是广为人知的传递律.)

性质 (i) 与性质 (ii) 刻画了线性次序的数学概念, 也称为全序. 任何满足这两条性质的关系 “$<$” 都可以使用本章即将介绍的大多数方法进行排序, 不过其中一些排序方法专门设计用来处理具有通常次序的数值键或字母键.

排序的目的是确定下标 $\{1,2,\ldots,N\}$ 的一种排列 $p(1)\,p(2)\,\ldots\,p(N)$, 使这些键值按非递减顺序排列:

$$
K_{p(1)}\le K_{p(2)}\le\cdots\le K_{p(N)}.\tag{1}
$$

如果再进一步要求: 具有相同键值的记录仍然保持原来的相对顺序, 则说这一排序是稳定的. 换句话说, 稳定排序具有以下补充特性:

$$
\text{如果 }K_{p(i)}=K_{p(j)}\quad\text{且}\quad i<j,
\quad\text{则}\quad p(i)<p(j).\tag{2}
$$

在某些情况下, 我们希望重新安排这些记录在存储器中的物理位置, 使它们的键值处于有序状态. 但在另外一些情况下, 只需一个辅助表就足够了, 这个辅助表以某种方式指定排列方式, 从而可以按照键序来访问这些记录.

本章的一些排序方法假定同时存在 $\infty$ 和 $-\infty$ 值, 或存在其中之一, 分别将其定义为大于或小于所有键:

$$
-\infty<K_j<\infty,\qquad\text{对于 }1\le j\le N.\tag{3}
$$

这些极端值偶尔用作虚拟键或标识指示器. 性质 (3) 中排除了相等的情况. 如果出现相等情况, 可以对这些算法进行修改, 使它们仍能正常工作, 但通常会损失一些效率和简洁性.

排序通常可以划分为内部排序和外部排序. 在内部排序中, 记录完全保存在计算机的高速随机存储器中, 而当记录数目超出了存储器能够同时容纳的数量时, 则采用外部排序. 内部排序在数据的结构安排与存取访问上具有更大的灵活性, 而外部排序则向我们展示如何应对相当严格的存取限制.

利用一个相当出色的通用排序算法, 对 $N$ 条记录进行排序所需要的时间大约与 $N\log N$ 成正比, 大约要对数据进行 $\log N$ 次 “扫描”. 在 5.3.1 节将会看到, 如果这些记录的顺序随机, 并且排序过程是通过键值的两两比较来完成的, 这就是最短排序时间. 如果将记录数量加倍, 其他条件不变, 排序时间将略高于原来的两倍. (实际上, 当 $N$ 趋近于无穷大时, 如果键值不同, 更准确的排序时间应当是 $N(\log N)^2$, 这是因为键大小的增长速度至少和 $\log N$ 一样快. 但从实际应用角度来说, $N$ 永远不可能真正趋近于无穷大.)

另一方面, 对于某一连续数值分布来说, 如果已知这些键是随机分布的, 将会看到, 排序过程平均可以在 $O(N)$ 个步骤中完成.

<a id="pdf-010"></a>
<a id="p-4"></a>

## 习题（第一组）

<a id="ex-5-1"></a>

**1.** [M20] 由三分律和传递律证明: 如果假定排序稳定, 则排列 $p(1)\,p(2)\,\ldots\,p(N)$ 是唯一确定的.　[答案](./answers/5.md#ans-5-1)

<a id="ex-5-2"></a>

**2.** [21] 假定一个特定文件中的每条记录 $R_j$ 包含两个键, 一个 “主键” $K_j$ 和一个 “次键” $k_j$, 在每一组键上定义了线性次序 $<$. 然后可以按照通常方式在键对 $(K,k)$ 之间定义字典序:　[答案](./answers/5.md#ans-5-2)

$$
\text{当 }K_i<K_j\quad\text{或当 }K_i=K_j\quad\text{且}\quad k_i<k_j
\quad\text{时,}\quad (K_i,k_i)<(K_j,k_j).
$$

Alice 取得这样一个文件, 首先按照主键对其排序, 得到 $n$ 组记录, 每组记录中的主键相等,

$$
K_{p(1)}=\cdots=K_{p(i_1)}<K_{p(i_1+1)}=\cdots=K_{p(i_2)}
<\cdots<K_{p(i_{n-1}+1)}=\cdots=K_{p(i_n)},
$$

式中 $i_n=N$. 随后, 她对 $n$ 组中的每一组记录 $R_{p(i_{j-1}+1)},\ldots,R_{p(i_j)}$ 按照次键进行排序.

Bill 取得同一原始文件, 首先按照次键对其排序, 然后按照主键对前面得到的文件进行排序.

Chris 取得同一原始文件, 根据主键和次键 $(K_j,k_j)$ 的字典序对其进行一次排序操作.

每个人得到的结果是否相同?

<a id="ex-5-3"></a>

**3.** [M25] 设 $<$ 是 $K_1,\ldots,K_N$ 的一个关系, 满足三分律, 但不满足传递律. 证明: 即使不满足传递律, 也可能以稳定形式对这些记录进行排序, 使其满足条件 (1) 和条件 (2). 事实上, 至少有三种排列满足这些条件!　[答案](./answers/5.md#ans-5-3)

<a id="ex-5-4"></a>

▶ **4.** [21] 词典编纂人员在编纂词典时, 必须把大写和小写字母整合在一起, 所以并没有在词典中实际使用严格的字典序. 他们希望按照如下方式进行排序:　[答案](./answers/5.md#ans-5-4)

$$
\mathrm a<\mathrm A<\mathrm{aa}<\mathrm{AA}<\mathrm{AAA}
<\mathrm{Aachen}<\mathrm{aah}<\cdots<\mathrm{zzz}<\mathrm{ZZZ}.
$$

说明如何实现上述字典序.

<a id="ex-5-5"></a>

▶ **5.** [M28] 为所有非负整数设计一种满足以下条件的二进制编码: 如果把 $n$ 编码为字符串 $\rho(n)$, 当且仅当 $\rho(m)$ 根据字典序小于 $\rho(n)$ 时, $m<n$. 此外, 对于任意 $m\ne n$, $\rho(m)$ 都不应当是 $\rho(n)$ 的前缀. 如果可能, 对于所有大的 $n$ 值, $\rho(n)$ 的长度应当不超过 $\lg n+O(\log\log n)$. (如果希望对混有单词与数字的文本进行排序, 或者希望将任何大型字母表映射为二进制字符串, 这种编码都是很有用的.)　[答案](./answers/5.md#ans-5-5)

<a id="ex-5-6"></a>

**6.** [15] 阿呆先生是一位 MIX 程序员, 他希望知道存储在单元 `A` 的数值是大于、小于还是等于存储在单元 `B` 的数值. 于是, 他编写了代码 `LDA A; SUB B`, 并测试寄存器 `A` 是正, 是负, 还是零. 他犯了什么严重错误? 应当怎么做?　[答案](./answers/5.md#ans-5-6)

<a id="ex-5-7"></a>

**7.** [17] 根据以下规范编写一段 MIX 子例程, 进行键值的多精度对比.　[答案](./answers/5.md#ans-5-7)

调用序列:

```mixal
JMP COMPARE
```

进入条件: $\mathrm{rI1}=n$; 对于 $1\le k\le n$, $\mathrm{CONTENTS}(\mathtt A+k)=a_k$ 且 $\mathrm{CONTENTS}(\mathtt B+k)=b_k$; 假定 $n\ge1$.

退出条件:

$$
\begin{aligned}
\mathrm{CI}&=\mathtt{GREATER},&&\text{如果 }(a_n,\ldots,a_1)>(b_n,\ldots,b_1);\\
\mathrm{CI}&=\mathtt{EQUAL},&&\text{如果 }(a_n,\ldots,a_1)=(b_n,\ldots,b_1);\\
\mathrm{CI}&=\mathtt{LESS},&&\text{如果 }(a_n,\ldots,a_1)<(b_n,\ldots,b_1);
\end{aligned}
$$

`rX` 和 `rI1` 可能受到影响.

其中, 关系 $(a_n,\ldots,a_1)<(b_n,\ldots,b_1)$ 表示由左向右的字典序, 也就是说, 存在一个下标 $j$, 对于 $n\ge k>j$, $a_k=b_k$, 而 $a_j<b_j$.

<a id="ex-5-8"></a>

▶ **8.** [30] 单元 `A` 和单元 `B` 分别包含两个数值 $a$ 与 $b$. 证明: 有可能编写一个 MIX 程序, 计算 $\min(a,b)$ 并将其存储在单元 `C`, 但不使用任何跳转操作符. (小心: 由于不能判断是否发生了运算溢出, 所以明智的做法是确保无论 $a$、$b$ 取什么值都不会发生溢出.)　[答案](./answers/5.md#ans-5-8)

<a id="ex-5-9"></a>

**9.** [M27] 以非递减顺序存储 $N$ 个介于 0 和 1 之间的独立均匀分布随机变量, 这些数值中第 $r$ 个最小数 $\le x$ 的概率是多少?　[答案](./answers/5.md#ans-5-9)

<a id="pdf-011"></a>
<a id="p-5"></a>

## 习题（第二组）

早年间, 计算机没有太多的随机存储器. 以下每个习题都描述了计算机程序员在当时必须解决的一个问题. 假定可供使用的内部存储器容量只有几千个字, 用大约六台磁带机 (这些磁带机对于排序来说足够了) 作为补充, 请给出一种解决这一问题的 “好” 方法. 事实证明, 在这些约束条件下能够出色工作的算法, 在现代计算机上也能高效运行.

<a id="ex-5-10"></a>

**10.** [15] 有一个包含 100 万个数据字的磁带. 如何判断这条磁带上有多少个互不相同的数据字?　[答案](./answers/5.md#ans-5-10)

<a id="ex-5-11"></a>

**11.** [18] 你在美国国家税务局工作. 你会从各家单位收到数百万个 “信息” 表, 报告这些单位向别人支付了多少报酬; 还会从人们那里收到数百万个 “税” 表, 报告这些人收到了多少报酬. 如何找出那些没有申报全部收入的人?　[答案](./answers/5.md#ans-5-11)

<a id="ex-5-12"></a>

**12.** [M25] (矩阵转置) 有一条磁带, 其中包含 100 万个字, 表示按行存储的 $1000\times1000$ 矩阵的元素: $a_{1,1}\,a_{1,2}\,\ldots\,a_{1,1000}\,a_{2,1}\,\ldots\,a_{2,1000}\,\ldots\,a_{1000,1000}$. 如何创建一条磁带, 在其中按列存储这些元素: $a_{1,1}\,a_{2,1}\,\ldots\,a_{1000,1}\,a_{1,2}\,\ldots\,a_{1000,2}\,\ldots\,a_{1000,1000}$? (争取使数据扫描次数少于 12 次.)　[答案](./answers/5.md#ans-5-12)

<a id="ex-5-13"></a>

**13.** [M26] 如何将一个包括 $N$ 个字的大型文件 “打乱” 为一种随机排列方式?　[答案](./answers/5.md#ans-5-13)

<a id="ex-5-14"></a>

**14.** [20] 你正在使用两个计算机系统, 它们对于用来确定数字字母顺序的 “排序序列” 采用不同约定. 如何将一个计算机的有序数字字母文件调整为另一计算机使用的顺序?　[答案](./answers/5.md#ans-5-14)

<a id="ex-5-15"></a>

**15.** [18] 有一个姓名清单, 其中列出了大量在美国出生的人的名字, 还有他们出生的州名. 如何计算在每个州出生的人数? (假定清单中每个人只出现一次.)　[答案](./answers/5.md#ans-5-15)

<a id="ex-5-16"></a>

**16.** [20] 为便于修改大型 FORTRAN 程序, 希望设计一个 “交叉引用” 例程; 这一例程以 FORTRAN 程序为输入, 在输出时添加一个索引, 给出程序中对每个标识符 (即每个名字) 的每次应用. 如何设计这样一个例程?　[答案](./answers/5.md#ans-5-16)

<a id="ex-5-17"></a>

▶ **17.** [33] (图书馆卡片排序) 在计算机数据库出现之前, 每个图书馆都维护一个卡片目录, 使用户能够找到自己想要的书籍. 但是随着馆藏的增加, 要将目录卡片排成便于人类使用的顺序, 是一件非常复杂的任务. 下面的 “字母顺序” 清单展示了在《美国图书馆协会排片规则》(芝加哥: 1942) 推荐的许多步骤:　[答案](./answers/5.md#ans-5-17)

<a id="table-ex-5-17"></a>

<table style="white-space:nowrap">
<thead><tr><th>卡片文字</th><th>注释</th></tr></thead>
<tbody>
<tr><td>R. Accademia nazionale dei Lincei, Rome</td><td>Ignore foreign royalty (except British)</td></tr>
<tr><td>1812; ein historischer Roman.</td><td>Achtzehnhundertzwölf</td></tr>
<tr><td>Bibliothèque d’histoire révolutionnaire.</td><td>Treat apostrophe as space in French</td></tr>
<tr><td>Bibliothèque des curiosités.</td><td>Ignore accents on letters</td></tr>
<tr><td>Brown, Mrs. J. Crosby</td><td>Ignore designation of rank</td></tr>
<tr><td>Brown, John</td><td>Names with dates follow those without</td></tr>
<tr><td>Brown, John, mathematician</td><td>… and the latter are subarranged</td></tr>
<tr><td>Brown, John, of Boston</td><td>by descriptive words</td></tr>
<tr><td>Brown, John, 1715–1766</td><td>Arrange identical names by birthdate</td></tr>
<tr><td>BROWN, JOHN, 1715–1766</td><td>Works “about” follow works “by”</td></tr>
<tr><td>Brown, John, d. 1811</td><td>Sometimes birthdate must be estimated</td></tr>
<tr><td>Brown, Dr. John, 1810–1882</td><td>Ignore designation of rank</td></tr>
<tr><td>Brown-Williams, Reginald Makepeace</td><td>Treat hyphen as space</td></tr>
<tr><td>Brown America.</td><td>Book titles follow compound names</td></tr>
<tr><td>Brown &amp; Dallison’s Nevada directory.</td><td>&amp; in English becomes “and”</td></tr>
<tr><td>Brownjohn, Alan</td><td></td></tr>
<tr><td>Den’, Vladimir Éduardovich, 1867–</td><td>Ignore apostrophe in names</td></tr>
<tr><td>The den.</td><td>Ignore an initial article</td></tr>
<tr><td>Den lieben langen Tag.</td><td>… provided it’s in nominative case</td></tr>
<tr><td>Dix, Morgan, 1827–1908</td><td>Names precede words</td></tr>
</tbody></table>

<a id="pdf-012"></a>
<a id="p-6"></a>

<table style="white-space:nowrap">
<tbody>
<tr><td>1812 ouverture.</td><td>Dix-huit cent douze</td></tr>
<tr><td>Le XIX<sup>e</sup> siècle français.</td><td>Dix-neuvième</td></tr>
<tr><td>The 1847 issue of U. S. stamps.</td><td>Eighteen forty-seven</td></tr>
<tr><td>1812 overture.</td><td>Eighteen twelve</td></tr>
<tr><td>I am a mathematician.</td><td>(a book by Norbert Wiener)</td></tr>
<tr><td>IBM journal of research and development.</td><td>Initials are like one-letter words</td></tr>
<tr><td>ha-I ha-ehad.</td><td>Ignore initial article</td></tr>
<tr><td>Ia; a love story.</td><td>Ignore punctuation in titles</td></tr>
<tr><td>International Business Machines Corporation</td><td></td></tr>
<tr><td>al-Khuwārizmī, Muḥammad ibn Mūsā,<br><em>fl.</em> 813–846</td><td>Ignore initial “al-” in Arabic names</td></tr>
<tr><td>Labour. A magazine for all workers.</td><td>Respell it “Labor”</td></tr>
<tr><td>Labor research association</td><td></td></tr>
<tr><td>Labour, <em>see</em> Labor</td><td>Cross-reference card</td></tr>
<tr><td>McCall’s cookbook</td><td>Ignore apostrophe in English</td></tr>
<tr><td>McCarthy, John, 1927–</td><td>Mc = Mac</td></tr>
<tr><td>Machine-independent computer<br>programming.</td><td>Treat hyphen as space</td></tr>
<tr><td>MacMahon, Maj. Percy Alexander,<br>1854–1929</td><td>Ignore designation of rank</td></tr>
<tr><td>Mrs. Dalloway.</td><td>“Mrs.” = “Mistress”</td></tr>
<tr><td>Mistress of mistresses.</td><td></td></tr>
<tr><td>Royal society of London</td><td>Don’t ignore British royalty</td></tr>
<tr><td>St. Petersburger Zeitung.</td><td>“St.” = “Saint”, even in German</td></tr>
<tr><td>Saint-Saëns, Camille, 1835–1921</td><td>Treat hyphen as space</td></tr>
<tr><td>Ste-Marie, Gaston P</td><td>Sainte</td></tr>
<tr><td>Seminumerical algorithms.</td><td>(a book by Donald Ervin Knuth)</td></tr>
<tr><td>Uncle Tom’s cabin.</td><td>(a book by Harriet Beecher Stowe)</td></tr>
<tr><td>U. S. bureau of the census.</td><td>“U. S.” = “United States”</td></tr>
<tr><td>Vandermonde, Alexandre Théophile,<br>1735–1796</td><td></td></tr>
<tr><td>Van Valkenburg, Mac Elwyn, 1921–</td><td>Ignore space after prefix in surnames</td></tr>
<tr><td>Von Neumann, John, 1903–1957</td><td></td></tr>
<tr><td>The whole art of legerdemain.</td><td>Ignore initial article</td></tr>
<tr><td>Who’s afraid of Virginia Woolf?</td><td>Ignore apostrophe in English</td></tr>
<tr><td>Wijngaarden, Adriaan van, 1916–</td><td>Surname begins with uppercase letter</td></tr>
</tbody></table>

(这些规则大多有一些特定的例外, 还有其他许多规则, 这里没有列出.)

如果你接到一项任务: 用计算机对大量目录卡进行排序, 最终维护由这些卡片组成的一个超大型文件, 如果你没有机会改变卡片编排的长期策略, 如何安排这些数据, 以方便进行排序和合并操作?

<a id="ex-5-18"></a>

**18.** [M25] (欧内斯特·帕克) 莱昂哈德·欧拉曾经猜测 [*Nova Acta Acad. Sci. Petropolitanæ* **13** (1795), 45–63, §3; 写于 1778 年], 对于正整数 $u,v,w,x,y,z$, 以下方程无解:　[答案](./answers/5.md#ans-5-18)

$$
u^6+v^6+w^6+x^6+y^6=z^6.
$$

同时, 他还猜测, 对于所有 $n\ge3$, 以下方程没有正整数解:

$$
x_1^n+\cdots+x_{n-1}^n=x_n^n,
$$

<a id="pdf-013"></a>
<a id="p-7"></a>

但计算机发现了恒等式 $27^5+84^5+110^5+133^5=144^5$, 证明这个更具一般性的猜想是错误的, 见利昂·兰德、托马斯·帕金和约翰·塞尔弗里奇,*Math. Comp.* **21** (1967), 446–459. 诺姆·埃尔基斯后来找到了当 $n=4$ 时的无数个反例 [*Math. Comp.* **51** (1988), 825–835]. 你能否想出一种方法, 通过排序来帮助查找欧拉猜想在 $n=6$ 时的反例?

<a id="ex-5-19"></a>

▶ **19.** [24] 给定一个文件, 其中包含大约 100 万个不同的 30 位二进制字 $x_1,\ldots,x_N$, 有什么好办法可以找出全部互补对 $\{x_i,x_j\}$? (如果一个字中为 0 的位置, 另一个字中为 1, 反之亦然, 则说这两个字是互补的. 因此, 如果将两个字看作二进制数, 当且仅当它们的和为 $(11\ldots1)_2$ 时, 这两个字互补.)　[答案](./answers/5.md#ans-5-19)

<a id="ex-5-20"></a>

▶ **20.** [25] 给定一个文件, 其中包含 1000 个 30 位二进制字 $x_1,\ldots,x_{1000}$, 怎样准备一个字对列表, 使其中的所有字对 $(x_i,x_j)$ 都满足 $x_i=x_j$, 最多有两个数位例外?　[答案](./answers/5.md#ans-5-20)

<a id="ex-5-21"></a>

**21.** [22] 如何寻找由五个字母组成的变位词 (anagram), 比如 `CARET`, `CARTE`, `CATER`, `CRATE`, `REACT`, `RECTA`, `TRACE`; `CRUEL`, `LUCRE`, `ULCER`; `DOWRY`, `ROWDY`, `WORDY`? [人们可能想知道, 除了下面这一组五字母英语变位词之外, 是否还有其他包括 10 个或更多个五字母英语变位词的集合:　[答案](./answers/5.md#ans-5-21)

```text
APERS, ASPER, PARES, PARSE, PEARS, PRASE, PRESA, RAPES, REAPS, SPAER, SPARE, SPEAR,
```

也许还可以向这一集合中添加法语单词 `APRÈS`.]

<a id="ex-5-22"></a>

**22.** [M28] 给定大量有向图的技术说明, 可以用什么方法将同构图划分在一起? (如果有向图的顶点之间存在一一对应关系、有向弧之间存在一一对应关系, 其中顶点与有向弧之间的对应关系保持关联性, 则说这些有向图是同构的.)　[答案](./answers/5.md#ans-5-22)

<a id="ex-5-23"></a>

**23.** [30] 在一个包括 4096 人的人群中, 每个人有大约 100 个熟人. 已经准备了一个文件, 其中列出了所有互相熟识的人员对. (这一关系是对称的: 如果 $x$ 熟悉 $y$, 那 $y$ 也熟悉 $x$. 因此, 这个文件包括大约 200000 个项目.) 给定一个 $k$ 值, 如何设计一种算法, 列出这一人群中所有包含 $k$ 个人的小团体? (小团体是指一组互相熟悉的人: 小团体中的每个人都与所有其他人熟悉.) 假定不存在人数达到 25 的小团体, 因此小团体的总数不会过多.　[答案](./answers/5.md#ans-5-23)

<a id="ex-5-24"></a>

▶ **24.** [30] 姓名不同的 300 万人, 头脚相挨着躺下来, 可以从纽约排到加利福尼亚. 每个参与者都拿到一个纸片, 在上面写下自己的名字和紧排在他西侧的人名. 在最西端的那个人不知道要做什么, 所以他把自己的纸片扔了. 然后把剩下的 2999999 个纸片放在一个巨大的篮子里, 运到华盛顿特区的国家档案馆. 在那里, 将篮中的纸片完全打乱, 传送到磁带上.　[答案](./answers/5.md#ans-5-24)

这时, 一位信息科学家观察到: 磁带上有足够的信息可以按原始顺序重建出人员列表. 一位计算机科学家发现了一种方法, 只需对数据磁带进行不到 1000 次扫描就能完成这一重建过程, 而且仅对磁带文件进行顺序访问, 并使用少量随机存储器. 怎样才可能做到呢?

[换句话说, 对于 $1\le i<N$, 以随机顺序给出数对 $(x_i,x_{i+1})$, 其中 $x_i$ 互不相同. 如何获得序列 $x_1x_2\ldots x_N$? 要求所采取的全部操作仅限于能够在磁带上使用的串行技术. 这个问题就是: 在没有一种简单方法来判断两个给定键的前后顺序时, 如何完成排序. 我们已经在习题 2.2.3–25 中提出了这一问题.]

<a id="ex-5-25"></a>

**25.** [M21] (离散对数) 已知 $p$ 是一个 (相当大的) 素数, $a$ 是一个模 $p$ 的原根. 因此, 对于 $1\le b<p$ 范围内的所有 $b$ 值, 存在唯一的 $n$ 值, 使得 $a^n\bmod p=b$, $1\le n<p$. (这个 $n$ 称为 $b$ 关于 $a$ 对 $p$ 求模的指数.) 说明在给定 $b$ 时, 如何在不超过 $\Omega(n)$ 个步骤中找到 $n$. [提示: 设 $m=\lceil\sqrt p\rceil$, 试针对 $0\le n_1,n_2<m$ 求解 $a^{mn_1}\equiv ba^{-n_2}\pmod p$.]　[答案](./answers/5.md#ans-5-25)
