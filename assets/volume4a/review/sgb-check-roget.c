#include <stdio.h>
#include <string.h>
#include "gb_graph.h"
#include "gb_roget.h"
int main(void) {
  Graph *g=roget(1022L,0L,0L,0L);
  Vertex *v;
  long maximum=-1,badness=-1,other_max=-1;
  if (!g) { fprintf(stderr,"roget returned null\n"); return 1; }
  for (v=g->vertices; v<g->vertices+g->n; v++) {
    Arc *a;long d=0;
    for(a=v->arcs;a;a=a->next)d++;
    if(d>maximum)maximum=d;
    if(strcmp(v->name,"badness")==0)badness=d;
    else if(d>other_max)other_max=d;
  }
  printf("id\t%s\nvertices\t%ld\narcs\t%ld\nmaximumOutdegree\t%ld\nbadnessOutdegree\t%ld\nmaximumOtherOutdegree\t%ld\n",g->id,g->n,g->m,maximum,badness,other_max);
  gb_recycle(g);
  return maximum==22 && badness==22 && other_max==20 ? 0 : 2;
}
