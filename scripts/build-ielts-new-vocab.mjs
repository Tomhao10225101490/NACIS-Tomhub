#!/usr/bin/env node
/** Builds scripts/ielts-new-vocab.mjs — 1000+ curated new IELTS words */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, 'ielts-new-vocab.mjs');

const TOPIC_EX = {
  Academic: (w) => [`The thesis examines ${w} in academic discourse.`, `论文在学术论述中探讨${w}。`],
  Education: (w) => [`Teachers integrate ${w} into the curriculum.`, `教师将${w}纳入课程。`],
  Environment: (w) => [`Conservation efforts address ${w} directly.`, `保护工作直接应对${w}。`],
  Technology: (w) => [`Engineers applied ${w} to improve the system.`, `工程师运用${w}改进系统。`],
  Health: (w) => [`Clinicians monitor ${w} during treatment.`, `临床医生在治疗中监测${w}。`],
  Society: (w) => [`Policy makers debated ${w} in parliament.`, `政策制定者在议会辩论${w}。`],
  Economy: (w) => [`Analysts linked ${w} to market trends.`, `分析师将${w}与市场趋势关联。`],
  Culture: (w) => [`The festival celebrated ${w} through art.`, `节庆通过艺术展现${w}。`],
  Science: (w) => [`The experiment measured ${w} under controlled conditions.`, `实验在受控条件下测量${w}。`],
  Work: (w) => [`Managers prioritised ${w} in the workplace.`, `管理者在工作场所优先关注${w}。`],
  Media: (w) => [`Journalists reported on ${w} across platforms.`, `记者在各平台报道${w}。`],
  Urban: (w) => [`Planners considered ${w} when redesigning the district.`, `规划者改造街区时考虑${w}。`],
  Crime: (w) => [`Investigators examined ${w} at the crime scene.`, `调查人员在犯罪现场检查${w}。`],
  Travel: (w) => [`Tourists encountered ${w} during their journey.`, `游客在旅途中遇到${w}。`],
  Psychology: (w) => [`Therapists explored ${w} in cognitive therapy.`, `治疗师在认知疗法中探讨${w}。`],
  Law: (w) => [`The court ruled on ${w} under statute.`, `法院依成文法对${w}作出裁决。`],
  Energy: (w) => [`Engineers optimised ${w} in the power grid.`, `工程师在电网中优化${w}。`],
  Politics: (w) => [`Candidates debated ${w} during the campaign.`, `候选人在竞选期间辩论${w}。`],
  Food: (w) => [`Chefs highlighted ${w} in regional cuisine.`, `厨师在地方菜系中突出${w}。`],
  Sport: (w) => [`Athletes trained to improve ${w} before competition.`, `运动员赛前训练以提高${w}。`],
};

function t(topic, rows) {
  return rows.map(([word, pos, zh, enDef, phonetic]) => {
    const [ex, exZh] = TOPIC_EX[topic](word);
    return [word, pos, zh, enDef, topic, phonetic, ex, exZh];
  });
}

const { BULK_WORDS } = await import('./ielts-vocab-bulk.mjs');
const { LARGE_WORDS } = await import('./ielts-vocab-large.mjs');

const ACADEMIC = t('Academic', [
  ['abstraction','n.','抽象；抽象概念','a general idea not tied to a specific instance','/æbˈstrækʃn/'],
  ['acumen','n.','敏锐；洞察力','ability to make good judgments quickly','/ˈækjumən/'],
  ['adherence','n.','遵守；坚持','faithful attachment to a rule or practice','/ədˈhɪərəns/'],
  ['affiliation','n.','隶属；联系','official connection with an organisation','/əˌfɪliˈeɪʃn/'],
  ['aggregate','n.','总计；集合体','a whole formed by combining parts','/ˈæɡrɪɡət/'],
  ['allocation','n.','分配','distribution of resources for a purpose','/ˌæləˈkeɪʃn/'],
  ['analytical','adj.','分析的','relating to detailed examination','/ˌænəˈlɪtɪkl/'],
  ['annotation','n.','注释','explanatory note added to a text','/ˌænəˈteɪʃn/'],
  ['anthology','n.','选集','collection of selected literary works','/ænˈθɒlədʒi/'],
  ['articulation','n.','清晰表达','clear expression of ideas','/ɑːˌtɪkjuˈleɪʃn/'],
  ['assimilation','n.','吸收；同化','process of absorbing and integrating information','/əˌsɪmɪˈleɪʃn/'],
  ['axiom','n.','公理','statement accepted as self-evidently true','/ˈæksiəm/'],
  ['bibliography','n.','参考文献','list of sources used in research','/ˌbɪbliˈɒɡrəfi/'],
  ['canonical','adj.','权威的；经典的','accepted as standard or authoritative','/kəˈnɒnɪkl/'],
  ['categorisation','n.','分类','process of placing into categories','/ˌkætəɡəraɪˈzeɪʃn/'],
  ['circumscribe','v.','限制；划定','restrict within limits','/ˈsɜːkəmskraɪb/'],
  ['codify','v.','编纂；使成法典','arrange rules into a systematic code','/ˈkɒdɪfaɪ/'],
  ['collate','v.','核对；整理','collect and combine texts or data','/kəˈleɪt/'],
  ['commensurate','adj.','相称的','corresponding in size or degree','/kəˈmenʃərət/'],
  ['conceptualise','v.','概念化','form a concept or idea of something','/kənˈseptʃuəlaɪz/'],
  ['conjecture','n.','推测；猜想','an opinion formed without proof','/kənˈdʒektʃə/'],
  ['connotation','n.','内涵；隐含意义','implied meaning beyond literal sense','/ˌkɒnəˈteɪʃn/'],
  ['consensus','n.','共识','general agreement among a group','/kənˈsensəs/'],
  ['constituent','n.','组成部分','a part of a whole','/kənˈstɪtʃuənt/'],
  ['corollary','n.','推论','a direct consequence of something proved','/kəˈrɒləri/'],
]);

const bulkExpanded = BULK_WORDS.map(([word, pos, zh, enDef, topic, phonetic]) => {
  const [ex, exZh] = TOPIC_EX[topic](word);
  return [word, pos, zh, enDef, topic, phonetic, ex, exZh];
});

const largeExpanded = LARGE_WORDS.map(([word, pos, zh, enDef, topic, phonetic]) => {
  const [ex, exZh] = TOPIC_EX[topic](word);
  return [word, pos, zh, enDef, topic, phonetic, ex, exZh];
});

const RAW = [...ACADEMIC, ...bulkExpanded, ...largeExpanded];

writeFileSync(out, `/** IELTS Band 7 new vocabulary (ie-501+) — curated AWL / academic words */\nexport const RAW_NEW_IELTS = ${JSON.stringify(RAW, null, 2)};\n`);
console.log('Built', RAW.length, 'entries →', out);
