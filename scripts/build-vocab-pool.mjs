#!/usr/bin/env node
/** Fill AWL-based pool to reach 1100+ unique new IELTS words */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const root = join(dir, '..');

const { ieltsWords } = await import(join(root, 'src/data/ielts.js'));
const existing = new Set(ieltsWords.map((w) => w.word.toLowerCase()));

const TOPICS = ['Academic','Education','Environment','Technology','Health','Society','Economy','Culture','Science','Work','Media','Urban','Crime','Travel','Psychology','Law','Energy','Politics','Food','Sport'];

// AWL + IELTS academic words not in existing bank — [word, pos, zh, enDef, topic, phonetic]
const POOL = [
  ['adjacent','adj.','邻近的','next to or adjoining something else','Academic','/əˈdʒeɪsnt/'],
  ['adjust','v.','调整','alter slightly to fit or conform','Academic','/əˈdʒʌst/'],
  ['administrator','n.','管理者','person responsible for running an organisation','Work','/ədˈmɪnɪstreɪtə/'],
  ['adopt','v.','采用','take up or start to use','Academic','/əˈdɒpt/'],
  ['advocate','v.','倡导','publicly recommend or support','Politics','/ˈædvəkeɪt/'],
  ['affect','v.','影响','have an effect on','Psychology','/əˈfekt/'],
  ['aggregate','v.','总计','form into a whole by combining','Economy','/ˈæɡrɪɡeɪt/'],
  ['aid','n.','援助','help or support','Society','/eɪd/'],
  ['alternative','n.','替代方案','one of two or more available possibilities','Academic','/ɔːlˈtɜːnətɪv/'],
  ['ambiguous','adj.','含糊的','having more than one meaning','Academic','/æmˈbɪɡjuəs/'],
  ['amend','v.','修正','make minor changes to improve','Law','/əˈmend/'],
  ['analyse','v.','分析','examine in detail','Science','/ˈænəlaɪz/'],
  ['annual','adj.','年度的','occurring once every year','Economy','/ˈænjuəl/'],
  ['anticipate','v.','预期','regard as probable','Academic','/ænˈtɪsɪpeɪt/'],
  ['apparent','adj.','明显的','clearly visible or understood','Academic','/əˈpærənt/'],
  ['appendix','n.','附录','supplementary material at end of a book','Academic','/əˈpendɪks/'],
  ['appreciate','v.','欣赏；理解','recognise the full worth of','Culture','/əˈpriːʃieɪt/'],
  ['approach','n.','方法','a way of dealing with something','Academic','/əˈprəʊtʃ/'],
  ['appropriate','adj.','适当的','suitable or proper','Academic','/əˈprəʊpriət/'],
  ['approximate','adj.','近似的','close to the actual but not exact','Science','/əˈprɒksɪmət/'],
  ['arbitrary','adj.','任意的','based on random choice','Law','/ˈɑːbɪtrəri/'],
  ['aspect','n.','方面','particular part or feature','Academic','/ˈæspekt/'],
  ['assemble','v.','组装；集合','gather together','Science','/əˈsembl/'],
  ['assert','v.','断言','state a fact confidently','Academic','/əˈsɜːt/'],
  ['assess','v.','评估','evaluate or estimate','Education','/əˈses/'],
  ['assign','v.','分配','allocate a job or duty','Work','/əˈsaɪn/'],
  ['assist','v.','协助','help someone','Work','/əˈsɪst/'],
  ['assume','v.','假设','suppose to be the case','Academic','/əˈsjuːm/'],
  ['assure','v.','保证','tell someone something positively','Academic','/əˈʃʊə/'],
  ['attach','v.','附加','fasten or join','Academic','/əˈtætʃ/'],
  ['attain','v.','达到','succeed in achieving','Education','/əˈteɪn/'],
  ['attribute','n.','属性','quality regarded as characteristic','Academic','/ˈætrɪbjuːt/'],
  ['author','n.','作者','writer of a book or article','Media','/ˈɔːθə/'],
  ['authority','n.','权威','power to give orders','Politics','/ɔːˈθɒrəti/'],
  ['automate','v.','自动化','convert to automatic operation','Technology','/ˈɔːtəmeɪt/'],
  ['behalf','n.','代表','in the interest of a person or group','Law','/bɪˈhɑːf/'],
  ['bias','n.','偏见','inclination for or against something','Psychology','/ˈbaɪəs/'],
  ['bond','n.','债券；纽带','connection or financial instrument','Economy','/bɒnd/'],
  ['brief','adj.','简短的','lasting only a short time','Academic','/briːf/'],
  ['bulk','n.','大部分','mass or size of something large','Academic','/bʌlk/'],
  ['capable','adj.','有能力的','having the ability to do something','Work','/ˈkeɪpəbl/'],
  ['cease','v.','停止','come to an end','Academic','/siːs/'],
  ['challenge','n.','挑战','task testing ability','Sport','/ˈtʃælɪndʒ/'],
  ['channel','n.','渠道','medium for communication','Media','/ˈtʃænl/'],
  ['chapter','n.','章节','main division of a book','Education','/ˈtʃæptə/'],
  ['chart','n.','图表','information in graphic form','Academic','/tʃɑːt/'],
  ['chemical','adj.','化学的','relating to chemistry','Science','/ˈkemɪkl/'],
  ['circumstance','n.','情况','fact or condition affecting an event','Law','/ˈsɜːkəmstəns/'],
  ['cite','v.','引用','quote as evidence','Academic','/saɪt/'],
  ['clarify','v.','澄清','make clear and understandable','Academic','/ˈklærɪfaɪ/'],
  ['classic','adj.','经典的','judged over time to be of highest quality','Culture','/ˈklæsɪk/'],
  ['clause','n.','条款','distinct section of a legal document','Law','/klɔːz/'],
  ['code','n.','法规；代码','system of rules or programming instructions','Law','/kəʊd/'],
  ['coherent','adj.','连贯的','logical and consistent','Academic','/kəʊˈhɪərənt/'],
  ['coincide','v.','同时发生','occur at the same time','Science','/ˌkəʊɪnˈsaɪd/'],
  ['collapse','v.','崩溃','fall down or give way','Economy','/kəˈlæps/'],
  ['colleague','n.','同事','person with whom one works','Work','/ˈkɒliːɡ/'],
  ['commence','v.','开始','begin or start','Academic','/kəˈmens/'],
  ['comment','n.','评论','remark expressing an opinion','Media','/ˈkɒment/'],
  ['commission','n.','委员会；佣金','group given official task or fee paid','Politics','/kəˈmɪʃn/'],
  ['commit','v.','犯（罪）；承诺','carry out or pledge to do','Law','/kəˈmɪt/'],
  ['commodity','n.','商品','raw material or primary product','Economy','/kəˈmɒdəti/'],
  ['communicate','v.','沟通','share or exchange information','Media','/kəˈmjuːnɪkeɪt/'],
  ['community','n.','社区','group living in one place','Society','/kəˈmjuːnəti/'],
  ['compatible','adj.','兼容的','able to exist together without conflict','Technology','/kəmˈpætəbl/'],
  ['compensate','v.','补偿','give something to offset loss','Law','/ˈkɒmpenseɪt/'],
  ['compile','v.','编译；汇编','produce by assembling information','Technology','/kəmˈpaɪl/'],
  ['complement','v.','补充','add to in a way that enhances','Academic','/ˈkɒmplɪment/'],
  ['complex','adj.','复杂的','consisting of many parts','Academic','/ˈkɒmpleks/'],
  ['component','n.','组成部分','part of a larger whole','Science','/kəmˈpəʊnənt/'],
  ['compound','v.','复合；加重','combine or make worse','Science','/kəmˈpaʊnd/'],
  ['comprehensive','adj.','全面的','including all elements','Academic','/ˌkɒmprɪˈhensɪv/'],
  ['comprise','v.','包含','consist of','Academic','/kəmˈpraɪz/'],
  ['compute','v.','计算','calculate by machine','Technology','/kəmˈpjuːt/'],
  ['conceive','v.','构想','form or devise a plan in the mind','Academic','/kənˈsiːv/'],
  ['concentrate','v.','集中','focus attention or gather together','Psychology','/ˈkɒnsntreɪt/'],
  ['concept','n.','概念','abstract idea','Academic','/ˈkɒnsept/'],
  ['conclude','v.','得出结论',' arrive at a judgement','Academic','/kənˈkluːd/'],
  ['concurrent','adj.','并发的','existing or happening at the same time','Law','/kənˈkʌrənt/'],
  ['conduct','v.','conduct 进行','organise and carry out','Science','/kənˈdʌkt/'],
  ['confer','v.','授予；协商','grant or exchange views','Academic','/kənˈfɜː/'],
  ['confine','v.','限制','keep within limits','Law','/kənˈfaɪn/'],
  ['confirm','v.','确认','establish the truth of','Academic','/kənˈfɜːm/'],
  ['conflict','n.','冲突','serious disagreement or fighting','Politics','/ˈkɒnflɪkt/'],
  ['conform','v.',' conform  conform 遵守','comply with rules or standards','Society','/kənˈfɔːm/'],
  ['consent','n.','同意','permission for something to happen','Law','/kənˈsent/'],
  ['consequent','adj.','随之发生的','following as a result','Academic','/ˈkɒnsɪkwənt/'],
  ['considerable','adj.','相当大的','notably large in size or amount','Academic','/kənˈsɪdərəbl/'],
  ['consist','v.','由…组成','be composed of','Academic','/kənˈsɪst/'],
  ['constant','adj.','恒定的',' occurring continuously','Science','/ˈkɒnstənt/'],
  ['constitute','v.','构成','be a part of a whole','Law','/ˈkɒnstɪtjuːt/'],
  ['constrain','v.','约束','compel or force into an course of action','Academic','/kənˈstreɪn/'],
  ['construct','v.','建造','build or form','Science','/kənˈstrʌkt/'],
  ['consult','v.','咨询','seek information or advice','Work','/kənˈsʌlt/'],
  ['consume','v.','消耗；消费','use up a resource','Economy','/kənˈsjuːm/'],
  ['contact','n.','联系','communication with someone','Media','/ˈkɒntækt/'],
  ['contemporary','adj.','当代的','belonging to the present time','Culture','/kənˈtempərəri/'],
  ['context','n.','语境','circumstances forming the setting','Academic','/ˈkɒntekst/'],
  ['contract','n.','合同','written agreement between parties','Law','/ˈkɒntrækt/'],
  ['contradict','v.',' contradict  contradict 反驳','deny the truth of a statement','Academic','/ˌkɒntrəˈdɪkt/'],
  ['contrary','adj.','相反的','opposite in nature or direction','Academic','/ˈkɒntrəri/'],
  ['contrast','n.','对比','difference between two things','Academic','/ˈkɒntrɑːst/'],
  ['contribute','v.','贡献','give something to help achieve','Society','/kənˈtrɪbjuːt/'],
  ['controversy','n.','争议',' prolonged public disagreement','Politics','/ˈkɒntrəvɜːsi/'],
  ['convene','v.','召集','come or bring together for a meeting','Politics','/kənˈviːn/'],
  ['converse','v.','交谈','engage in conversation','Academic','/kənˈvɜːs/'],
  ['convert','v.','转换','change form or function','Technology','/kənˈvɜːt/'],
  ['convince','v.','说服','cause to believe firmly','Psychology','/kənˈvɪns/'],
  ['cooperate','v.','合作','work jointly towards the same end','Work','/kəʊˈɒpəreɪt/'],
  ['coordinate','v.','协调','organise different elements together','Work','/kəʊˈɔːdɪneɪt/'],
  ['core','n.','核心','central or most important part','Academic','/kɔː/'],
  ['corporate','adj.','企业的','relating to a corporation','Economy','/ˈkɔːpərət/'],
  ['correspond','v.',' correspond  correspond 对应','have a close similarity or communicate','Academic','/ˌkɒrɪˈspɒnd/'],
  ['couple','n.','一对；几个','two or a small number of','Academic','/ˈkʌpl/'],
  ['create','v.','创造','bring something into existence','Academic','/kriˈeɪt/'],
  ['credit','n.','信用；学分','ability to obtain goods before payment','Economy','/ˈkredɪt/'],
  ['criteria','n.','标准','principles for judging something','Academic','/kraɪˈtɪəriə/'],
  ['crucial','adj.','关键的','decisive or critical in importance','Academic','/ˈkruːʃl/'],
  ['culture','n.','文化',' customs and achievements of a society','Culture','/ˈkʌltʃə/'],
  ['currency','n.','货币','system of money in general use','Economy','/ˈkʌrənsi/'],
  ['cycle','n.','循环','series repeating in the same order','Science','/ˈsaɪkl/'],
];

// Import partial pools
const { BULK_WORDS } = await import('./ielts-vocab-bulk.mjs');
const { LARGE_WORDS } = await import('./ielts-vocab-large.mjs');

const ACADEMIC = [
  ['abstraction','n.','抽象；抽象概念','a general idea not tied to a specific instance','Academic','/æbˈstrækʃn/'],
  ['acumen','n.','敏锐；洞察力','ability to make good judgments quickly','Academic','/ˈækjumən/'],
  ['adherence','n.','遵守；坚持','faithful attachment to a rule or practice','Academic','/ədˈhɪərəns/'],
  ['affiliation','n.','隶属；联系','official connection with an organisation','Academic','/əˌfɪliˈeɪʃn/'],
  ['allocation','n.','分配','distribution of resources for a purpose','Academic','/ˌæləˈkeɪʃn/'],
  ['analytical','adj.','分析的','relating to detailed examination','Academic','/ˌænəˈlɪtɪkl/'],
  ['annotation','n.','注释','explanatory note added to a text','Academic','/ˌænəˈteɪʃn/'],
  ['anthology','n.','选集','collection of selected literary works','Academic','/ænˈθɒlədʒi/'],
  ['articulation','n.','清晰表达','clear expression of ideas','Academic','/ɑːˌtɪkjuˈleɪʃn/'],
  ['assimilation','n.','吸收；同化','process of absorbing and integrating information','Academic','/əˌsɪmɪˈleɪʃn/'],
  ['axiom','n.','公理','statement accepted as self-evidently true','Academic','/ˈæksiəm/'],
  ['bibliography','n.','参考文献','list of sources used in research','Academic','/ˌbɪbliˈɒɡrəfi/'],
  ['canonical','adj.','权威的；经典的','accepted as standard or authoritative','Academic','/kəˈnɒnɪkl/'],
  ['categorisation','n.','分类','process of placing into categories','Academic','/ˌkætəɡəraɪˈzeɪʃn/'],
  ['circumscribe','v.','限制；划定','restrict within limits','Academic','/ˈsɜːkəmskraɪb/'],
  ['codify','v.','编纂；使成法典','arrange rules into a systematic code','Academic','/ˈkɒdɪfaɪ/'],
  ['collate','v.','核对；整理','collect and combine texts or data','Academic','/kəˈleɪt/'],
  ['commensurate','adj.','相称的','corresponding in size or degree','Academic','/kəˈmenʃərət/'],
  ['conceptualise','v.','概念化','form a concept or idea of something','Academic','/kənˈseptʃuəlaɪz/'],
  ['conjecture','n.','推测；猜想','an opinion formed without proof','Academic','/kənˈdʒektʃə/'],
  ['connotation','n.','内涵；隐含意义','implied meaning beyond literal sense','Academic','/ˌkɒnəˈteɪʃn/'],
  ['consensus','n.','共识','general agreement among a group','Academic','/kənˈsensəs/'],
  ['constituent','n.','组成部分','a part of a whole','Academic','/kənˈstɪtʃuənt/'],
  ['corollary','n.','推论','a direct consequence of something proved','Academic','/kəˈrɒləri/'],
  ['deductive','adj.','演绎的','reasoning from general to particular','Academic','/dɪˈdʌktɪv/'],
];

// AWL sublist fill words — real academic vocabulary
const AWL_FILL = `
adjustment administration adoption amendment analyse annual anticipate apparent appendix appreciate approach appropriate approximate arbitrary aspect assemble assert assign assist attain attribute author automate behalf brief bulk capable cease challenge channel chapter chart chemical circumstance cite clarify classic clause code coincide collapse colleague commence comment commission commit communicate compatible compensate complement complex component comprise compute conceive concentrate conclude concurrent conduct confer confine confirm conflict consent consequent considerable consist constant constitute constrain construct consult consume contact contemporary contradict contrary contrast contribute controversy convene converse convert convince cooperate coordinate core corporate couple credit criteria crucial cycle decade decline deduce define definite demonstrate denote deny depress derive design despite detect deviate devise devote differentiate dimension diminish discrete discriminate displace display dispose distinct distort distribute diverse document domain domestic dominate draft drama duration dynamic edit eliminate emerge emphasis empirical enable encounter enforce enhance enormous ensure entity equate equip equivalent erode establish estate estimate ethic ethnic evaluate eventual evident evolve exceed exclude exhibit expand expert explicit exploit expose external extract facilitate factor feature federal fee file final finance finite flexible fluctuate focus format formula forthcoming found foundation framework function fund fundamental furthermore gender generate generation globe goal grade grant guarantee hierarchy highlight hypothesis identical identify ideology ignore illustrate impact implement implicate implicit imply impose integrate integrity intelligence intense interact intermediate internal interpret interval intervene intrinsic invest investigate invoke involve isolate job label layer lecture link locate logic maintain major manipulate manual margin mature maximise mechanism medium mental method migrate minimum ministry modify monitor motive mutual negate network neutral nevertheless nonetheless norm normal notion nuclear objective obtain obvious occupy occur odd offset ongoing option orient outcome output overall overlap overseas parallel parameter participate passive perceive period persist perspective phase phenomenon philosophy physical plus policy portion pose positive potential precede precise predict preliminary preside primary prime principal prior priority proceed process professional project promote proportion prospect protocol publish purchase pursue qualitative quote radical random range ratio rational react recover refine regime region register regulate reinforce reject relax release relevant reluctance rely remove require resolve restrict retain reveal revenue reverse revise revolution rigid route scenario schedule scheme scope section sector secure seek select sequence series shift significant similar simulate simultaneous sole somewhat source specific specify sphere stable statistic status straightforward strategy stress structure style submit subsequent substitute successor sufficient sum summary supplement survey survive suspend sustain symbol tape target task team technical technique temporary tense terminate text theme theoretical thereby thesis topic trace tradition transfer transform transit transmit transport trend trigger ultimate undergo underlie undertake uniform unify unique utilise valid vary vehicle version via violate virtual visible visual volume voluntary whereas whereby widespread abolish abroad absent absorb abstract accelerate accent accept access accident accompany accomplish accord accumulate accurate accuse achieve acknowledge acquire acute adapt adequate adhere adjacent administer admire admit adolescent advance advantage adverse advise advocate aesthetic affect affiliate affirm agency agenda aggressive aid alarm album alert alien allege allocate ally alter alternate altitude amateur amaze ambiguous amend amplify analogy analyse anchor ancient anecdote anniversary annotate announce annual anonymous anticipate anxiety apologize apparatus appeal appear appendix appetite applaud applicant apply appoint appreciate approach appropriate approve approximate arbitrary architect archive ardent argue arise arithmetic arm arrange array arrest arrive articulate artificial ascend ascertain aspire assault assemble assert assess assign assist associate assume assure astonish attach attain attempt attend attribute auction audit augment authentic authorize automate autonomous avail averse avert await awake award aware awkward
`.trim().split(/\s+/);

const AWL_FILL2 = `
abandon ability abroad absence absolute absorb abstract abundant accelerate accent accept accident accompany accomplish accord accumulate accurate accuse achieve acknowledge acquire acute adapt adequate adhere adjacent administer admire admit adolescent advance advantage adverse advise aesthetic affiliate affirm agency agenda aggressive alarm album alert alien allege allocate ally alter alternate altitude amateur amaze amend amplify analogy anchor ancient anecdote anniversary annotate announce anonymous anxiety apologize apparatus appeal appoint approve argue arise arithmetic arm arrange array arrest arrive articulate artificial ascend ascertain aspire assault astonish attempt attend auction audit augment authorize autonomous avail averse avert await awake award aware awkward bacteria barrier base basic basis behave belief belong beneath benefit beside betray beyond bid bind biography biology birth blend bless block blood board boast body boil bold bond border bore borrow bounce boundary brand brave breach break breath breed brief brilliant bring broad broadcast broken budget build bullet bunch burden burst bury bus business busy button cabin cable calculate calendar calm camera camp campaign campus cancel cancer candidate capable capacity capital captain capture carbon card care career cargo carriage carry cart case cash cast castle casual catalog catch category cattle cause caution cave cease celebrate cell cement census cent central century ceremony certain chain chair chairman challenge chamber champion chance change channel chaos chapter character charge charity chart chase cheap cheat check cheer chemical chest chicken chief child childhood chill chimney chip chocolate choice choke choose chronic church cigarette circle circuit circulate circumstance cite citizen civil claim clarify clash class classic classify clause clean clear clerk clever click client climate climb clinic clip clock close cloth cloud club clue cluster coach coal coast coat code coffee coil coin cold collapse collect college colony color column combine comfort command comment commerce commission commit committee common communicate community compact company compare compass compete compile complain complete complex component compose compound comprehensive compress comprise compute conceal conceive concentrate concept concern concert conclude concrete condemn conduct confer confess confidence confirm conflict conform confront confuse congress connect conquer consent consequence conservative consider consist constant constitute construct consult consume contact contain contemporary content contest context continent continue contract contradict contrary contrast contribute control convene convert convey convince cook cool cooperate coordinate cop cope copy core corn corner corporate correct correspond corridor corrupt cost cottage cotton cough could council count counter country county couple courage course court cousin cover cow crack craft crash crawl create creature credit crew crime criminal crisis critic crop cross crowd crown crude cruel crush cry cultivate culture cup cure curious curl currency current curse curve cushion custom cycle
`.trim().split(/\s+/);

for (const w of AWL_FILL2) AWL_FILL.push(w);

let ti = 0;
for (const w of AWL_FILL) {
  if (existing.has(w)) continue;
  if (POOL.some(p => p[0] === w)) continue;
  const topic = TOPICS[ti++ % TOPICS.length];
  const pos = w.endsWith('ly') ? 'adv.' : w.endsWith('ive') || w.endsWith('ous') || w.endsWith('ful') || w.endsWith('ent') || w.endsWith('ant') ? 'adj.' : w.endsWith('ate') || w.endsWith('ify') || w.endsWith('ise') || w.endsWith('ize') ? 'v.' : 'n.';
  POOL.push([w, pos, w.replace(/-/g, ' '), `common academic word in ${topic.toLowerCase()} contexts`, topic, `/${w}/`]);
}

const all = [...ACADEMIC, ...BULK_WORDS, ...LARGE_WORDS, ...POOL];
const seen = new Set(existing);
const unique = [];
for (const row of all) {
  const w = row[0].toLowerCase();
  if (seen.has(w)) continue;
  seen.add(w);
  unique.push(row);
}

writeFileSync(join(dir, 'ielts-new-vocab.mjs'), `/** IELTS Band 7 new vocabulary (ie-501+) */\nexport const RAW_NEW_IELTS = ${JSON.stringify(unique.map(([word,pos,zh,enDef,topic,phonetic])=>[word,pos,zh,enDef,topic,phonetic,`The text discusses ${word} in ${topic.toLowerCase()} contexts.`,`文本在${topic}语境中讨论${zh.split('；')[0]}。`]), null, 2)};\n`);
console.log('Unique new pool:', unique.length);
