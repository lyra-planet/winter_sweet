---
title: kmp算法ck永远的痛
tags: 数据结构 关于我自己是智障这件事
class: 生活 真的吗
---

我超，kmp算法真的好难，理解了三天才明白，我直接怀疑自己的脑子到底适不适合去写代码(っ °Д °;)っ

幸好自己最后还是学会了，我直接脱胎换骨，数据结构继续冲![636f7306410f3f1834da3f57fbb266d791d61700_raw.jpg](https://s2.loli.net/2021/12/12/kJbAFhq3HCaNeoB.jpg)

<!-- more -->

```c
#define _CRT_SECURE_NO_WARNINGS
/*******************************
 ADT 串（string）
 Data
 串中元素仅由一个字符组成，相邻的元素具有前驱和后驱的关系。
 Operation
	StrAssign(T,*chars):生成一个其值等于字符串的常量的串T
	StrCopy(T,S):串S存在，由串S复制得串T
	ClearString(S):串S存在，将串清空
	StringEmpty(S):若串为空，返回true,否则返回false
	StrLength(S):返回串S的元素个数，即串的长度
	StrCompare(S,T):若S>T,返回值>0,若S=T，返回0，若S<T,返回值<0
	Concat(T,S1,S2):用T返回由S1和S2链接而成的新串
	SubString(Sub,S,pos,len):串S存在，1<=pos<=StrLength(S),
											且0<=len<=StrLength(S)-pos+1,用Sub返回
											串S的第pos个字符起长度为len的子串
	Index(S,T,pos):串S和T存在,T是非空串,1<=pos<=StrLength(S)
							若主串S中存在和串T值相同的子串，则返回它在主串中第
							pos个字符后第一次出现的位置，否则返回0
	Replace(S,T,V):串S,T和V存在,T是非空串。用V替代主串中出现的所有与T不重叠的子串。
	StrInsert(S,pos,T):串S和T存在,1<=pos<=StrLength(S)+1
								在串S的第pos个字符之前插入串T
	StrDelete(S,pos,len):串S存在，1<=pos<=StrLength(S)-len+1
									从串S中删除第pos个字符起长度为len的字符串
									
									不同的高级语言对串的基本操作集可以有不同的定义方法。在上述定义的操作中,串赋值StrAssign、
									串比较 StrCompare、求串长 Strength、串联接 Concat及求子串 Substring五种操作构成串类型的
									最小操作子集,即这些操作不可能利用其他串操作来实现;反之,其他串操作(除串清除 Clearstring和
									串销毁 Destroystring外)均可在该最小操作子集上实现。
									例如,可利用判等、求串长和求子串等操作实现定位函数 Index(S,T)。

 endADT
 *******************************/
/*
这书太烂了，看知乎学
*/
/*
定长顺序存储表示
类似于线性表的顺序存储结构，用一组地址连续的存储单元存储串值的字符序列。在串的定长顺序存储结构中，为每个串变量分配一个固定长度的存储区，即定长数组。
*/
#include <stdio.h>
#define MAXLEN 255
typedef struct
{
	char ch[MAXLEN];//每个分量储存一个字符
	int length;//串的实际长度
}SString;
/*
串的实际长度只能小于等于MAXLEN，超过预定义长度的串值会被舍去，称为截断。串长有两种表示方法: 
一是如上述定义描述的那样，用一个额外的变量len来存放串的长度;二是在串值后面加一一个不计入串长的结束标记字符“\0”，
此时的串长为隐含值。在一些串的操作(如插入、联接等)中，若串值序列的长度超过上界MAXLEN,约定用“截断”法处理，
要克服这种弊端，只能不限定串长的最大长度，即采用动态分配的方式。
*/

/*
堆分配存储表示仍然以一组地址连续的存储单元存放串值的字符序列，但它们的存储空间是在程序执行过程中动态分配得到的。
*/
typedef struct
{
	char* ch;//按串的长度分配储存区,ch指向串的基地址
	int length;//串的长度
}HString;
/*
在C语言中，存在一一个称之为“堆”的自由存储区，并用malloc()和free()函数来完成动则返回一个指向起始地址的指针，
作为串的基地址，这个串由ch指针来指示;若分配失败，则返回NULL。已分配的空间可用free()释放掉。
上述两种存储表示通常为高级程序设计语言所采用。块链存储表示仅做简单介绍。
*/
/*
类似于线性表的链式存储结构，也可采用链表方式存储串值。由于串的特殊性(每个元素只有一个字符)，
在具体实现时，每个结点既可以存放一个字符， 也可以存放多个字符。每个结点称为块，整个链表称为块链结构。
最后一个结点占不满时通常用“#”补上
*/

/*
串的模式匹配（重点）
1、简单的模式匹配算法
子串的定位操作通常称为串的模式匹配，它求的是子串(常称模式串)在主串中的位置。这里采用定长顺序存储结构，给出一种不依赖于其他串操作的暴力匹配算法。
*/
int Index(SString S, SString T)
{
	int i = 1, j = 1;
	while (i <= S.length && j <= T.length)
	{
		if (S.ch[i] == T.ch[j])
		{
			++i;
			++j;
		}
		else
		{//指针后退重新开始匹配
			i = i - j + 2;
			j = 1;
		}
	}
	
	if (j > T.length)
	{
		return i - T.length;
	}
	else
	{
		return 0;
	}

}
/*
简单的模式匹配算法的最坏时间复杂度为O(nm)，其中n和m分别为主串和模式串的长度。
*/
/*
2、KMP算法
在上面的简单匹配中，每趟匹配失败都是模式后移一位再从头开始比较。
而某趟已匹配相等的字符序列是模式的某个前缀，这种频繁的重复比较相当于模式串在不断地进行自我比较，这就是其低效率的根源。
因此，可以从分析模式本身的结构着手，如果已匹配相等的前缀序列中有某个后缀正好是模式的前缀，
那么就可以将模式向后滑动到与这些相等字符对齐的位置，主串i指针无须回溯，并继续从该位置开始进行比较。
而模式向后滑动位数的计算仅与模式本身的结构有关，与主串无关。

KMP算法的特点就是：仅仅后移模式串，比较指针不回溯。很是牛掰。


移动位数=已匹配的字符数−最后一个匹配的字符对应最大公共前后缀长度

用部分匹配值时,每当匹配失败,就去找它前一个元素的部分匹配值,这样使用起来有些不方便,所以将PM表右移一位,
这样哪个元素匹配失败,直接看它自己的部分匹配值即可。将上例中字符串′abac'的PM表右移一位,就得到了next数组：

有时为了使公式更加简洁、计算简单，将next数组整体+1。
最终得到子串指针变化公式j = n e x t [ j ] j=next[ j ]j=next[j]。
next[ j ]的含义是:

在子串的第j个字符与主串发生失配时,则跳到子串的next[ j ]位置重新与主串当前位置进行比较。
通过分析，可以知道，除第一个字符外，模式串中其余的字符对应的next数组的值等于其最大公共前后缀长度加上1

next[j]=最大公共前后缀长度+1
*/

void get_next(SString T, int* next)
{
	int i = 1, j = 0;
	next[1] = 0;
	while (i < T.length)
	{
		if (j == 0 || T.ch[i] == T.ch[j])//  ch[i]表示后缀的单个字符，   ch[j]表示前缀的单个字符,   查找时后缀不变
		{
			++i;
			++j;
			next[i] = j;//若pi=pj,则next[j+1] = next[j]+1
		}
		else
		{
			j = next[j];//否则令j=next[j],j值回溯，循环继续
		}
	}
}

int Index_KMP(SString S, SString T)
{
	int i = 1, j = 1;
	int next[255];//定义next数组
	get_next(T, next);//得到next数组
	while (i <= S.length && j <= T.length)
	{
		if (j == 0 || S.ch[i] == T.ch[j])//字符串相等则继续
		{
			++i, ++j;
		}
		else
		{
			j = next[j];//模式串向右移动
		}
		if (j > T.length)
		{
			return i - T.length;
		}
		else
		{
			return 0;
		}
	}
}
/*
前面定义的next数组在某些情况下尚有缺陷，还可以进 - 步优化。如图4.7 所示，模式' aaaab '
在和主串′ ' aaabaaaaab '
进行匹配时 :
显然后面3次用一个和p4相同的字符跟S4比较毫无意义，必然失配。
比较毫无意义。那么如果出现了这种类型的应该如何处理呢 ?
如果出现了，则需要再次递归，将]next[j]修正为next[next[j]], 直至两者不相等为止，更新后的数组命名为nextval。计算next数组修正值的算法如下，此时匹配算法不变。
*/
void get_nextval(SString T, int* nextval)
{
	int i = 1, j = 0;
	nextval[1] = 0;
	while (i < T.length)
	{
		if (j == 0 || T.ch[i] == T.ch[j])//ch[i]表示后缀的单个字符，ch[j]表示前缀的单个字符
		{
			++i;
			++j;
			if (T.ch[i] != T.ch[j])//若当前字符与前缀字符不同
			{
				nextval[i] = j;//则当前的j为nextval在1位置上的值
			}
			else//如果与前缀字符相同
			{	  //则将前缀字符的nextval值给nextval在i位置上的值	
				nextval[i] = nextval[j];
			}
		}
		else
		{
			j = nextval[j];//否则令j = next[j],j值回溯，循环继续
		}
	}
}
/*
总结改进过的KMP算法，它是在计算出next值的同时，如果a位字符与它next值指向的b位字符相等，则该a位的nextval就指向b位的nextval值，如果不等，则该a位的nextval值就是它自己a位的next的值。
这块逻辑很简单，有了next数组，我们很容易就能推导出它的nextval数组了。
*/

/*
总结
串是由零个或者多个字符组成的有限序列
本质上是线性表的拓展
我们关注子串的应用：查找，替换等操作
*/
```

看到这了，真的不考虑v我50吗老伙计(/ω＼*)……… (/ω•＼*)

