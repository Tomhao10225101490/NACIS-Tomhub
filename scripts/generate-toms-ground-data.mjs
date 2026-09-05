#!/usr/bin/env node
/** Generate ielts.js, chinese.js, math.js for Tom's Ground */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RAW_CHINESE_VOCAB, RAW_MATH_VOCAB } from './toms-chinese-math-data.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src/data');
mkdirSync(outDir, { recursive: true });

const TOPICS = ['Academic', 'Education', 'Environment', 'Technology', 'Health', 'Society', 'Economy', 'Culture', 'Science', 'Work'];

// [word, pos, zh, enDef, topic, phonetic, example, exampleZh]
const RAW_IELTS = [
  // Academic (50)
  ['ubiquitous', 'adj.', '无处不在的', 'found or existing everywhere', 'Academic', '/juːˈbɪkwɪtəs/', 'Smartphones are ubiquitous in modern life.', '智能手机在现代生活中无处不在。'],
  ['mitigate', 'v.', '减轻；缓解', 'make less severe or harmful', 'Academic', '/ˈmɪtɪɡeɪt/', 'Policies can mitigate the impact of inflation.', '政策能缓解通货膨胀的影响。'],
  ['proliferate', 'v.', '激增；扩散', 'increase rapidly in number', 'Academic', '/prəˈlɪfəreɪt/', 'Online courses have proliferated since 2020.', '2020年以来在线课程激增。'],
  ['dichotomy', 'n.', '二分法；对立', 'a division into two contrasting parts', 'Academic', '/daɪˈkɒtəmi/', 'There is a dichotomy between theory and practice.', '理论与实践之间存在对立。'],
  ['pragmatic', 'adj.', '务实的', 'dealing with things practically', 'Academic', '/præɡˈmætɪk/', 'We need a pragmatic approach to the problem.', '我们需要一种务实的方法。'],
  ['stringent', 'adj.', '严格的', 'strict and demanding', 'Academic', '/ˈstrɪndʒənt/', 'Stringent rules govern academic integrity.', '严格的规则约束学术诚信。'],
  ['exacerbate', 'v.', '使恶化', 'make a problem worse', 'Academic', '/ɪɡˈzæsəbeɪt/', 'Delay will exacerbate the situation.', '拖延会使情况恶化。'],
  ['paradigm', 'n.', '范式；模式', 'a typical example or pattern', 'Academic', '/ˈpærədaɪm/', 'This study shifts the research paradigm.', '这项研究改变了研究范式。'],
  ['cohesive', 'adj.', '有凝聚力的', 'forming a united whole', 'Academic', '/kəʊˈhiːsɪv/', 'A cohesive essay has clear logical links.', '结构紧凑的文章逻辑清晰。'],
  ['discrepancy', 'n.', '差异；不一致', 'a lack of agreement', 'Academic', '/dɪsˈkrepənsi/', 'There is a discrepancy between the two reports.', '两份报告之间存在差异。'],
  ['meticulous', 'adj.', '一丝不苟的', 'showing great attention to detail', 'Academic', '/məˈtɪkjələs/', 'She kept meticulous research notes.', '她做了细致的研究笔记。'],
  ['ambiguous', 'adj.', '含糊的', 'having more than one meaning', 'Academic', '/æmˈbɪɡjuəs/', 'The wording of the question is ambiguous.', '题目的表述含糊不清。'],
  ['empirical', 'adj.', '实证的', 'based on observation or experiment', 'Academic', '/ɪmˈpɪrɪkl/', 'The claim lacks empirical evidence.', '这一说法缺乏实证依据。'],
  ['inherent', 'adj.', '固有的', 'existing as a natural part', 'Academic', '/ɪnˈherənt/', 'Risk is inherent in any investment.', '任何投资都固有风险。'],
  ['facilitate', 'v.', '促进；使便利', 'make an action easier', 'Academic', '/fəˈsɪlɪteɪt/', 'Technology can facilitate collaborative learning.', '技术能促进协作学习。'],
  ['comprehensive', 'adj.', '全面的', 'including all elements', 'Academic', '/ˌkɒmprɪˈhensɪv/', 'The review offers a comprehensive overview.', '这篇综述提供了全面概述。'],
  ['substantiate', 'v.', '证实', 'provide evidence to support', 'Academic', '/səbˈstænʃieɪt/', 'You must substantiate your argument with data.', '你必须用数据证实论点。'],
  ['correlate', 'v.', '相关联', 'have a mutual relationship', 'Academic', '/ˈkɒrəleɪt/', 'Sleep quality correlates with academic performance.', '睡眠质量与学业表现相关。'],
  ['hypothesis', 'n.', '假设', 'a proposed explanation to be tested', 'Academic', '/haɪˈpɒθəsɪs/', 'The hypothesis was tested in three trials.', '该假设经过三次试验检验。'],
  ['analogous', 'adj.', '类似的', 'comparable in certain respects', 'Academic', '/əˈnæləɡəs/', 'The process is analogous to language acquisition.', '这一过程类似于语言习得。'],
  ['coherent', 'adj.', '连贯的', 'logical and consistent', 'Academic', '/kəʊˈhɪərənt/', 'Present your ideas in a coherent order.', '请按连贯顺序呈现观点。'],
  ['controversial', 'adj.', '有争议的', 'causing public disagreement', 'Academic', '/ˌkɒntrəˈvɜːʃl/', 'The policy remains highly controversial.', '该政策仍极具争议。'],
  ['cumulative', 'adj.', '累积的', 'increasing by successive additions', 'Academic', '/ˈkjuːmjələtɪv/', 'Learning is a cumulative process.', '学习是一个累积过程。'],
  ['deduce', 'v.', '推断', 'reach a conclusion by reasoning', 'Academic', '/dɪˈdjuːs/', 'From the data we can deduce a trend.', '从数据可推断出趋势。'],
  ['derive', 'v.', '得出；源于', 'obtain from a source', 'Academic', '/dɪˈraɪv/', 'Many English words derive from Latin.', '许多英语词源于拉丁语。'],
  ['diverse', 'adj.', '多样的', 'showing great variety', 'Academic', '/daɪˈvɜːs/', 'The cohort is culturally diverse.', '该群体文化背景多样。'],
  ['dominate', 'v.', '占主导', 'have a commanding influence', 'Academic', '/ˈdɒmɪneɪt/', 'One theory dominates the field.', '一种理论在该领域占主导。'],
  ['explicit', 'adj.', '明确的', 'stated clearly', 'Academic', '/ɪkˈsplɪsɪt/', 'Give explicit instructions to participants.', '向参与者给出明确指示。'],
  ['implicit', 'adj.', '隐含的', 'implied though not stated', 'Academic', '/ɪmˈplɪsɪt/', 'There is an implicit bias in the sample.', '样本中存在隐含偏差。'],
  ['inevitable', 'adj.', '不可避免的', 'certain to happen', 'Academic', '/ɪnˈevɪtəbl/', 'Change is inevitable in any society.', '任何社会变化都不可避免。'],
  ['integral', 'adj.', '不可或缺的', 'necessary to make a whole complete', 'Academic', '/ˈɪntɪɡrəl/', 'Critical thinking is integral to research.', '批判性思维是研究不可或缺的。'],
  ['intrinsic', 'adj.', '内在的', 'belonging naturally; essential', 'Academic', '/ɪnˈtrɪnzɪk/', 'Motivation has both intrinsic and extrinsic forms.', '动机有内在与外在之分。'],
  ['invoke', 'v.', '援引；引起', 'cite or call on for support', 'Academic', '/ɪnˈvəʊk/', 'The author invokes several classic studies.', '作者援引了几项经典研究。'],
  ['isolate', 'v.', '隔离；分离', 'set apart from others', 'Academic', '/ˈaɪsəleɪt/', 'Researchers isolated the key variable.', '研究者分离出关键变量。'],
  ['leverage', 'v.', '利用（ leverage ）', 'use something to maximum advantage', 'Academic', '/ˈliːvərɪdʒ/', 'Students can leverage online resources.', '学生可利用在线资源。'],
  ['manifest', 'v.', '显现', 'display or show clearly', 'Academic', '/ˈmænɪfest/', 'Stress can manifest as physical symptoms.', '压力可表现为身体症状。'],
  ['marginal', 'adj.', '微小的；边缘的', 'of minor importance', 'Academic', '/ˈmɑːdʒɪnl/', 'The improvement was only marginal.', '改善幅度仅属微小。'],
  ['mechanism', 'n.', '机制', 'a process or means by which something occurs', 'Academic', '/ˈmekənɪzəm/', 'The mechanism behind the effect is unclear.', '该效应背后的机制尚不清楚。'],
  ['methodical', 'adj.', '有条理的', 'done according to a system', 'Academic', '/məˈθɒdɪkl/', 'A methodical review reduces errors.', '有条理的审阅可减少错误。'],
  ['modulate', 'v.', '调节', 'adjust to the proper measure', 'Academic', '/ˈmɒdjuleɪt/', 'Teachers modulate task difficulty for learners.', '教师为学习者调节任务难度。'],
  ['notion', 'n.', '观念', 'a conception or belief', 'Academic', '/ˈnəʊʃn/', 'The notion of fairness varies across cultures.', '公平的观念因文化而异。'],
  ['offset', 'v.', '抵消', 'counteract by having an opposite effect', 'Academic', '/ˈɒfset/', 'Gains in one area may offset losses in another.', '一方面的收益可能抵消另一方面的损失。'],
  ['overlap', 'v.', '重叠', 'extend over partly the same area', 'Academic', '/ˌəʊvəˈlæp/', 'These two topics overlap considerably.', '这两个主题大量重叠。'],
  ['parallel', 'adj.', '平行的；类似的', 'similar in some way', 'Academic', '/ˈpærəlel/', 'We found parallel results in two studies.', '两项研究得出类似结果。'],
  ['parameter', 'n.', '参数', 'a limit or boundary defining scope', 'Academic', '/pəˈræmɪtə/', 'Set clear parameters for the experiment.', '为实验设定明确参数。'],
  ['persistent', 'adj.', '持续的', 'continuing firmly despite difficulty', 'Academic', '/pəˈsɪstənt/', 'Persistent effort leads to mastery.', '持续努力才能精通。'],
  ['plausible', 'adj.', ' plausible 的；貌似合理的', 'seeming reasonable or probable', 'Academic', '/ˈplɔːzəbl/', 'That is a plausible explanation.', '那是一种貌似合理的解释。'],
  ['precede', 'v.', '先于', 'come before in time or order', 'Academic', '/prɪˈsiːd/', 'A pilot study preceded the main trial.', '主试验前进行了试点研究。'],
  ['predominant', 'adj.', '占优势的', 'having superior strength or influence', 'Academic', '/prɪˈdɒmɪnənt/', 'Visual learners form the predominant group.', '视觉型学习者占多数。'],
  ['premise', 'n.', '前提', 'a statement assumed to be true', 'Academic', '/ˈpremɪs/', 'The argument rests on a false premise.', '该论证建立在错误前提上。'],
  // Education (50)
  ['curriculum', 'n.', '课程', 'the subjects taught in a school', 'Education', '/kəˈrɪkjələm/', 'The curriculum includes science and arts.', '课程包括科学与艺术。'],
  ['pedagogy', 'n.', '教学法', 'the method and practice of teaching', 'Education', '/ˈpedəɡɒdʒi/', 'Effective pedagogy adapts to student needs.', '有效教学法应适应学生需求。'],
  ['literacy', 'n.', '读写能力', 'ability to read and write', 'Education', '/ˈlɪtərəsi/', 'Digital literacy is essential today.', '数字素养如今至关重要。'],
  ['numeracy', 'n.', '数理能力', 'ability to understand and work with numbers', 'Education', '/ˈnjuːmərəsi/', 'Numeracy skills support daily decision-making.', '数理能力支持日常决策。'],
  ['enrollment', 'n.', '注册；入学', 'the act of registering for a course', 'Education', '/ɪnˈrəʊlmənt/', 'Enrollment rose by ten percent.', '入学人数增加了百分之十。'],
  ['attainment', 'n.', '成就；达到', 'achievement of a skill or level', 'Education', '/əˈteɪnmənt/', 'Reading attainment improved this year.', '今年阅读成绩有所提高。'],
  ['assessment', 'n.', '评估', 'evaluation of progress or ability', 'Education', '/əˈsesmənt/', 'Formative assessment guides learning.', '形成性评估指导学习。'],
  ['competency', 'n.', '能力', 'ability to do something successfully', 'Education', '/ˈkɒmpɪtənsi/', 'The course builds core competencies.', '该课程培养核心能力。'],
  ['diploma', 'n.', '文凭', 'a certificate of completion', 'Education', '/dɪˈpləʊmə/', 'She earned her diploma with honours.', '她以优异成绩获得文凭。'],
  ['dissertation', 'n.', '学位论文', 'a long essay on a particular subject', 'Education', '/ˌdɪsəˈteɪʃn/', 'He is writing his doctoral dissertation.', '他正在撰写博士论文。'],
  ['extracurricular', 'adj.', '课外的', 'outside the regular curriculum', 'Education', '/ˌekstrəkəˈrɪkjələ/', 'Extracurricular activities build teamwork.', '课外活动培养团队合作。'],
  ['faculty', 'n.', '院系；全体教员', 'teaching staff of a university', 'Education', '/ˈfæklti/', 'The faculty voted on the new policy.', '全体教员对新政策进行表决。'],
  ['mentor', 'n.', '导师', 'an experienced adviser', 'Education', '/ˈmentɔː/', 'A good mentor guides career choices.', '好导师能指导职业选择。'],
  ['tuition', 'n.', '学费', 'money paid for instruction', 'Education', '/tjuˈɪʃn/', 'Tuition fees have increased steadily.', '学费稳步上涨。'],
  ['scholarship', 'n.', '奖学金', 'financial aid for study', 'Education', '/ˈskɒləʃɪp/', 'She won a scholarship to university.', '她获得了大学奖学金。'],
  ['seminar', 'n.', '研讨会', 'a small group discussion class', 'Education', '/ˈsemɪnɑː/', 'The seminar focused on essay writing.', '研讨会聚焦论文写作。'],
  ['syllabus', 'n.', '教学大纲', 'outline of topics in a course', 'Education', '/ˈsɪləbəs/', 'Check the syllabus for deadlines.', '请查看大纲中的截止日期。'],
  ['thesis', 'n.', '论文；论点', 'a statement or theory put forward', 'Education', '/ˈθiːsɪs/', 'Her thesis examines urban migration.', '她的论文研究城市迁移。'],
  ['undergraduate', 'n.', '本科生', 'a university student not yet graduated', 'Education', '/ˌʌndəˈɡrædʒuət/', 'Undergraduates must complete core modules.', '本科生须完成核心模块。'],
  ['vocational', 'adj.', '职业的', 'relating to skills for a job', 'Education', '/vəʊˈkeɪʃənl/', 'Vocational training prepares workers.', '职业培训培养劳动者。'],
  ['accreditation', 'n.', '认证', 'official recognition of quality', 'Education', '/əˌkredɪˈteɪʃn/', 'The programme seeks international accreditation.', '该项目寻求国际认证。'],
  ['cognitive', 'adj.', '认知的', 'relating to mental processes', 'Education', '/ˈkɒɡnətɪv/', 'Cognitive development varies by age.', '认知发展因年龄而异。'],
  ['collaborative', 'adj.', '协作的', 'involving working together', 'Education', '/kəˈlæbərətɪv/', 'Collaborative projects build communication skills.', '协作项目培养沟通能力。'],
  ['differentiate', 'v.', '区分；差异化', 'recognize or make a distinction', 'Education', '/ˌdɪfəˈrenʃieɪt/', 'Teachers differentiate instruction by level.', '教师按水平差异化教学。'],
  ['eligibility', 'n.', '资格', 'the state of being qualified', 'Education', '/ˌelɪdʒəˈbɪləti/', 'Check eligibility before applying.', '申请前请确认资格。'],
  ['feedback', 'n.', '反馈', 'information about performance', 'Education', '/ˈfiːdbæk/', 'Timely feedback improves writing.', '及时反馈有助于写作提高。'],
  ['inquiry', 'n.', '探究', 'a systematic investigation', 'Education', '/ɪnˈkwaɪəri/', 'Inquiry-based learning encourages curiosity.', '探究式学习激发好奇心。'],
  ['intervention', 'n.', '干预', 'action taken to improve a situation', 'Education', '/ˌɪntəˈvenʃn/', 'Early intervention supports struggling readers.', '早期干预帮助阅读困难学生。'],
  ['motivation', 'n.', '动机', 'reason for acting or behaving', 'Education', '/ˌməʊtɪˈveɪʃn/', 'Intrinsic motivation sustains long study.', '内在动机支撑长期学习。'],
  ['proficiency', 'n.', '熟练程度', 'a high degree of skill', 'Education', '/prəˈfɪʃnsi/', 'Language proficiency takes years to build.', '语言熟练度需多年培养。'],
  ['retention', 'n.', '保持；记忆保持', 'continued possession or recall', 'Education', '/rɪˈtenʃn/', 'Spaced practice aids retention.', '间隔练习有助于记忆保持。'],
  ['rubric', 'n.', '评分标准', 'a set of criteria for assessment', 'Education', '/ˈruːbrɪk/', 'The rubric clarifies grading expectations.', '评分标准明确了期望。'],
  ['scaffold', 'v.', '搭建学习支架', 'support learners temporarily', 'Education', '/ˈskæfəʊld/', 'Teachers scaffold complex tasks.', '教师为复杂任务搭建支架。'],
  ['standardized', 'adj.', '标准化的', 'made uniform for comparison', 'Education', '/ˈstændədaɪzd/', 'Standardized tests measure basic skills.', '标准化测试衡量基本技能。'],
  ['transferable', 'adj.', '可迁移的', 'able to be applied in new contexts', 'Education', '/trænsˈfɜːrəbl/', 'Critical thinking is a transferable skill.', '批判性思维是可迁移技能。'],
  ['underachievement', 'n.', '学业不佳', 'performance below expected level', 'Education', '/ˌʌndərəˈtʃiːvmənt/', 'Underachievement may stem from anxiety.', '学业不佳可能源于焦虑。'],
  ['benchmark', 'n.', '基准', 'a standard for comparison', 'Education', '/ˈbentʃmɑːk/', 'Set a benchmark for reading speed.', '设定阅读速度基准。'],
  ['comprehension', 'n.', '理解', 'ability to understand', 'Education', '/ˌkɒmprɪˈhenʃn/', 'Listening comprehension improves with practice.', '听力理解靠练习提高。'],
  ['enrichment', 'n.', ' enrichment ；拓展', 'action of improving quality', 'Education', '/ɪnˈrɪtʃmənt/', 'Enrichment programmes challenge gifted students.', '拓展项目挑战资优学生。'],
  ['formative', 'adj.', '形成性的', 'serving to form or develop', 'Education', '/ˈfɔːmətɪv/', 'Formative quizzes guide revision.', '形成性小测指导复习。'],
  ['holistic', 'adj.', '整体的', 'considering the whole person', 'Education', '/həʊˈlɪstɪk/', 'Holistic education nurtures character.', '整体教育培养品格。'],
  ['inclusive', 'adj.', '包容的', 'including all groups equally', 'Education', '/ɪnˈkluːsɪv/', 'Inclusive classrooms welcome diversity.', '包容课堂欢迎多样性。'],
  ['literature', 'n.', '文献；文学', 'written works or research texts', 'Education', '/ˈlɪtrətʃə/', 'Review the literature before designing a study.', '设计研究前先查阅文献。'],
  ['modality', 'n.', '方式；模态', 'a particular mode of learning', 'Education', '/məʊˈdæləti/', 'Visual modality suits some learners best.', '视觉模态最适合部分学习者。'],
  ['orientation', 'n.', ' orientation ；迎新', 'introduction to a new environment', 'Education', '/ˌɔːriənˈteɪʃn/', 'Freshmen attend orientation week.', '新生参加迎新周。'],
  ['peer', 'n.', '同龄人；同伴', 'a person of the same age or status', 'Education', '/pɪə/', 'Peer tutoring benefits both partners.', '同伴辅导对双方都有益。'],
  ['remedial', 'adj.', '补救的', 'giving extra help to improve', 'Education', '/rɪˈmiːdiəl/', 'Remedial classes address basic gaps.', '补救课弥补基础差距。'],
  ['summative', 'adj.', '总结性的', 'evaluating at the end of a period', 'Education', '/ˈsʌmətɪv/', 'Summative exams count toward the grade.', '总结性考试计入成绩。'],
  ['transcript', 'n.', '成绩单', 'an official record of grades', 'Education', '/ˈtrænskrɪpt/', 'Universities require official transcripts.', '大学要求官方成绩单。'],
  ['workshop', 'n.', '工作坊', 'a practical training session', 'Education', '/ˈwɜːkʃɒp/', 'The writing workshop improved our drafts.', '写作工作坊改进了我们的草稿。'],
  // Environment (50)
  ['biodiversity', 'n.', '生物多样性', 'variety of life in a habitat', 'Environment', '/ˌbaɪəʊdaɪˈvɜːsəti/', 'Protecting biodiversity preserves ecosystems.', '保护生物多样性即保护生态系统。'],
  ['sustainable', 'adj.', '可持续的', 'able to be maintained without depletion', 'Environment', '/səˈsteɪnəbl/', 'Sustainable farming reduces soil loss.', '可持续农业减少土壤流失。'],
  ['emission', 'n.', '排放', 'production and discharge of gas', 'Environment', '/ɪˈmɪʃn/', 'Carbon emissions must fall sharply.', '碳排放须大幅下降。'],
  ['renewable', 'adj.', '可再生的', 'not depleted when used', 'Environment', '/rɪˈnjuːəbl/', 'Renewable energy expands each year.', '可再生能源逐年扩大。'],
  ['deforestation', 'n.', ' deforestation ；毁林', 'clearing of forests', 'Environment', '/diːˌfɒrɪˈsteɪʃn/', 'Deforestation threatens wildlife habitats.', '毁林威胁野生动物栖息地。'],
  ['ecosystem', 'n.', '生态系统', 'biological community and environment', 'Environment', '/ˈiːkəʊsɪstəm/', 'Coral reefs are fragile ecosystems.', '珊瑚礁是脆弱的生态系统。'],
  ['contamination', 'n.', '污染', 'presence of harmful substances', 'Environment', '/kənˌtæmɪˈneɪʃn/', 'Water contamination affects public health.', '水污染影响公众健康。'],
  ['conservation', 'n.', '保护', 'preservation of natural resources', 'Environment', '/ˌkɒnsəˈveɪʃn/', 'Wildlife conservation needs funding.', '野生动物保护需要资金。'],
  ['depletion', 'n.', '耗尽', 'reduction in number or quantity', 'Environment', '/dɪˈpliːʃn/', 'Ozone depletion has slowed globally.', '全球臭氧耗减已放缓。'],
  ['habitat', 'n.', '栖息地', 'natural home of an organism', 'Environment', '/ˈhæbɪtæt/', 'Urban sprawl destroys natural habitats.', '城市扩张破坏自然栖息地。'],
  ['pollutant', 'n.', '污染物', 'a substance that pollutes', 'Environment', '/pəˈluːtənt/', 'Factories must filter air pollutants.', '工厂须过滤空气污染物。'],
  ['recycle', 'v.', '回收利用', 'convert waste into reusable material', 'Environment', '/riːˈsaɪkl/', 'Communities recycle plastics and paper.', '社区回收塑料和纸张。'],
  ['erosion', 'n.', '侵蚀', 'gradual destruction by wind or water', 'Environment', '/ɪˈrəʊʒn/', 'Coastal erosion threatens villages.', '海岸侵蚀威胁村庄。'],
  ['greenhouse', 'n.', '温室（效应）', 'gas trapping heat in atmosphere', 'Environment', '/ˈɡriːnhaʊs/', 'Greenhouse gases warm the planet.', '温室气体使地球变暖。'],
  ['drought', 'n.', '干旱', 'prolonged lack of rain', 'Environment', '/draʊt/', 'Severe drought ruined the harvest.', '严重干旱毁了收成。'],
  ['floodplain', 'n.', '洪泛平原', 'area beside a river prone to flooding', 'Environment', '/ˈflʌdpleɪn/', 'Building on floodplains increases risk.', '在洪泛平原建房增加风险。'],
  ['watershed', 'n.', '流域', 'area draining into a river', 'Environment', '/ˈwɔːtəʃed/', 'The watershed supplies drinking water.', '该流域供应饮用水。'],
  ['afforestation', 'n.', '造林', 'establishment of a forest', 'Environment', '/əˌfɒrɪˈsteɪʃn/', 'Afforestation can restore degraded land.', '造林可恢复退化土地。'],
  ['biodegradable', 'adj.', '可生物降解的', 'capable of being decomposed naturally', 'Environment', '/ˌbaɪəʊdɪˈɡreɪdəbl/', 'Use biodegradable packaging when possible.', '尽量使用可降解包装。'],
  ['carbon', 'n.', '碳', 'element; carbon footprint context', 'Environment', '/ˈkɑːbən/', 'Track your carbon footprint monthly.', '每月记录碳足迹。'],
  ['desertification', 'n.', ' desertification ；荒漠化', 'land becoming desert', 'Environment', '/dɪˌzɜːtɪfɪˈkeɪʃn/', 'Desertification spreads in dry regions.', '荒漠化在干旱地区蔓延。'],
  ['ecological', 'adj.', '生态的', 'relating to ecology', 'Environment', '/ˌiːkəˈlɒdʒɪkl/', 'Ecological balance is easily disrupted.', '生态平衡易被打破。'],
  ['extinction', 'n.', '灭绝', 'dying out of a species', 'Environment', '/ɪkˈstɪŋkʃn/', 'Poaching pushes species toward extinction.', '偷猎使物种濒临灭绝。'],
  ['footprint', 'n.', '足迹；影响', 'impact on the environment', 'Environment', '/ˈfʊtprɪnt/', 'Reduce your environmental footprint.', '减少环境足迹。'],
  ['geothermal', 'adj.', '地热的', 'relating to heat from the earth', 'Environment', '/ˌdʒiːəʊˈθɜːml/', 'Geothermal plants use underground heat.', '地热电厂利用地下热能。'],
  ['hazardous', 'adj.', '有害的', 'dangerous, especially to health', 'Environment', '/ˈhæzədəs/', 'Hazardous waste needs special disposal.', '有害废物需特殊处理。'],
  ['landfill', 'n.', '垃圾填埋场', 'waste disposal site', 'Environment', '/ˈlændfɪl/', 'Landfills produce methane gas.', '填埋场产生甲烷。'],
  ['monsoon', 'n.', '季风', 'seasonal wind bringing heavy rain', 'Environment', '/mɒnˈsuːn/', 'The monsoon affects crop planting.', '季风影响作物种植。'],
  ['ozone', 'n.', '臭氧', 'form of oxygen in the atmosphere', 'Environment', '/ˈəʊzəʊn/', 'The ozone layer blocks UV radiation.', '臭氧层阻挡紫外线。'],
  ['pesticide', 'n.', '农药', 'substance for destroying pests', 'Environment', '/ˈpestɪsaɪd/', 'Pesticide runoff harms rivers.', '农药径流危害河流。'],
  ['reclamation', 'n.', ' reclaim ；复垦', 'recovery of usable land or materials', 'Environment', '/ˌrekləˈmeɪʃn/', 'Land reclamation restored the wetland.', '土地复垦恢复了湿地。'],
  ['reservoir', 'n.', '水库', 'large natural or artificial lake', 'Environment', '/ˈrezəvwɑː/', 'The reservoir stores winter rainfall.', '水库储存冬季降雨。'],
  ['sanitation', 'n.', '卫生设施', 'conditions relating to public health', 'Environment', '/ˌsænɪˈteɪʃn/', 'Poor sanitation spreads disease.', '卫生条件差会传播疾病。'],
  ['sediment', 'n.', '沉积物', 'matter settling to the bottom', 'Environment', '/ˈsedɪmənt/', 'River sediment builds fertile deltas.', '河流沉积物形成肥沃三角洲。'],
  ['smog', 'n.', ' smog ；烟雾', 'fog combined with smoke', 'Environment', '/smɒɡ/', 'Smog levels exceeded safe limits.', ' smog 浓度超过安全限值。'],
  ['toxic', 'adj.', '有毒的', 'poisonous', 'Environment', '/ˈtɒksɪk/', 'Toxic chemicals leaked into the soil.', '有毒化学品渗入土壤。'],
  ['urbanisation', 'n.', '城市化', 'growth of cities', 'Environment', '/ˌɜːbənaɪˈzeɪʃn/', 'Rapid urbanisation strains resources.', '快速城市化使资源紧张。'],
  ['vegetation', 'n.', '植被', 'plants of a region', 'Environment', '/ˌvedʒəˈteɪʃn/', 'Dense vegetation slows erosion.', '茂密植被减缓侵蚀。'],
  ['wildlife', 'n.', '野生动物', 'wild animals collectively', 'Environment', '/ˈwaɪldlaɪf/', 'Wildlife corridors link forest patches.', '野生动物通道连接林斑。'],
  ['acidification', 'n.', '酸化', 'becoming more acidic', 'Environment', '/əˌsɪdɪfɪˈkeɪʃn/', 'Ocean acidification harms shellfish.', '海洋酸化危害贝类。'],
  ['algae', 'n.', '藻类', 'simple aquatic organisms', 'Environment', '/ˈældʒiː/', 'Algae blooms indicate nutrient pollution.', '藻类暴发表明营养污染。'],
  ['canopy', 'n.', '树冠层', 'upper layer of forest trees', 'Environment', '/ˈkænəpi/', 'The canopy blocks much sunlight.', '树冠层遮挡大量阳光。'],
  ['compost', 'n.', '堆肥', 'decayed organic matter for soil', 'Environment', '/ˈkɒmpɒst/', 'Kitchen scraps make good compost.', '厨余可制成好堆肥。'],
  ['conservationist', 'n.', '环保主义者', 'person who advocates conservation', 'Environment', '/ˌkɒnsəˈveɪʃənɪst/', 'Conservationists monitor endangered species.', '环保主义者监测濒危物种。'],
  ['degrade', 'v.', '退化；降解', 'break down or lower in quality', 'Environment', '/dɪˈɡreɪd/', 'Plastics degrade very slowly.', '塑料降解极慢。'],
  ['endangered', 'adj.', '濒危的', 'seriously at risk of extinction', 'Environment', '/ɪnˈdeɪndʒəd/', 'The panda is an endangered species.', '熊猫是濒危物种。'],
  ['flora', 'n.', '植物群', 'plants of a particular region', 'Environment', '/ˈflɔːrə/', 'Local flora adapted to dry summers.', '当地植物群适应干燥夏季。'],
  ['fauna', 'n.', '动物群', 'animals of a particular region', 'Environment', '/ˈfɔːnə/', 'Island fauna evolved in isolation.', '岛屿动物群在隔离中演化。'],
  ['groundwater', 'n.', '地下水', 'water held underground', 'Environment', '/ˈɡraʊndwɔːtə/', 'Overuse lowers groundwater levels.', '过度使用使地下水位下降。'],
  ['invasive', 'adj.', '入侵的', 'tending to spread harmfully', 'Environment', '/ɪnˈveɪsɪv/', 'Invasive species outcompete natives.', '入侵物种排挤本地种。'],
  ['reforestation', 'n.', '重新造林', 'restoring forests on cleared land', 'Environment', '/riːˌfɒrɪˈsteɪʃn/', 'Reforestation absorbs carbon dioxide.', '重新造林吸收二氧化碳。'],
  // Technology (50)
  ['algorithm', 'n.', '算法', 'step-by-step problem-solving procedure', 'Technology', '/ˈælɡərɪðəm/', 'Search engines rely on complex algorithms.', '搜索引擎依赖复杂算法。'],
  ['automation', 'n.', '自动化', 'use of automatic equipment', 'Technology', '/ˌɔːtəˈmeɪʃn/', 'Automation speeds up manufacturing.', '自动化加快制造。'],
  ['bandwidth', 'n.', '带宽', 'data transfer capacity', 'Technology', '/ˈbændwɪdθ/', 'Video calls need higher bandwidth.', '视频通话需要更高带宽。'],
  ['cybersecurity', 'n.', '网络安全', 'protection of computer systems', 'Technology', '/ˈsaɪbəsɪˌkjʊərəti/', 'Cybersecurity threats grow each year.', '网络安全威胁逐年增加。'],
  ['digital', 'adj.', '数字的', 'relating to computer technology', 'Technology', '/ˈdɪdʒɪtl/', 'Digital tools transform classrooms.', '数字工具改变课堂。'],
  ['encryption', 'n.', '加密', 'converting data into a secure code', 'Technology', '/ɪnˈkrɪpʃn/', 'Encryption protects online banking.', '加密保护网上银行。'],
  ['innovation', 'n.', '创新', 'introduction of new ideas or methods', 'Technology', '/ˌɪnəˈveɪʃn/', 'Innovation drives economic growth.', '创新推动经济增长。'],
  ['interface', 'n.', '界面', 'point of interaction between systems', 'Technology', '/ˈɪntəfeɪs/', 'A clear interface improves usability.', '清晰界面提升可用性。'],
  ['prototype', 'n.', '原型', 'early sample or model', 'Technology', '/ˈprəʊtətaɪp/', 'Engineers tested a working prototype.', '工程师测试了可用原型。'],
  ['software', 'n.', '软件', 'programs for computers', 'Technology', '/ˈsɒftweə/', 'Open-source software is widely used.', '开源软件被广泛使用。'],
  ['hardware', 'n.', '硬件', 'physical components of a computer', 'Technology', '/ˈhɑːdweə/', 'Upgrade hardware before installing new apps.', '安装新应用前先升级硬件。'],
  ['database', 'n.', '数据库', 'structured set of data', 'Technology', '/ˈdeɪtəbeɪs/', 'The database stores user profiles.', '数据库存储用户资料。'],
  ['artificial', 'adj.', '人工的', 'made by humans; not natural', 'Technology', '/ˌɑːtɪˈfɪʃl/', 'Artificial intelligence raises ethical questions.', '人工智能引发伦理问题。'],
  ['blockchain', 'n.', '区块链', 'distributed digital ledger', 'Technology', '/ˈblɒktʃeɪn/', 'Blockchain secures transaction records.', '区块链保护交易记录。'],
  ['cloud', 'n.', '云（计算）', 'remote servers accessed via internet', 'Technology', '/klaʊd/', 'Files are backed up to the cloud.', '文件备份到云端。'],
  ['connectivity', 'n.', '连接性', 'ability to connect to networks', 'Technology', '/ˌkɒnekˈtɪvəti/', 'Rural connectivity remains limited.', '农村连接性仍然有限。'],
  ['deploy', 'v.', '部署', 'bring into effective action', 'Technology', '/dɪˈplɔɪ/', 'The team will deploy the update tonight.', '团队今晚将部署更新。'],
  ['disruptive', 'adj.', '颠覆性的', 'causing radical change', 'Technology', '/dɪsˈrʌptɪv/', 'Disruptive tech reshapes entire industries.', '颠覆性技术重塑整个行业。'],
  ['embed', 'v.', '嵌入', 'fix firmly in a surrounding mass', 'Technology', '/ɪmˈbed/', 'Sensors embed data in daily devices.', '传感器把数据嵌入日常设备。'],
  ['firmware', 'n.', '固件', 'permanent software in hardware', 'Technology', '/ˈfɜːmweə/', 'Update firmware to fix security bugs.', '更新固件修复安全漏洞。'],
  ['glitch', 'n.', '小故障', 'sudden minor malfunction', 'Technology', '/ɡlɪtʃ/', 'A software glitch delayed the launch.', '软件小故障推迟了发布。'],
  ['hack', 'v.', '黑客入侵', 'gain unauthorized access to data', 'Technology', '/hæk/', 'Hackers target weak passwords.', '黑客针对弱密码。'],
  ['integrate', 'v.', '整合', 'combine into a whole', 'Technology', '/ˈɪntɪɡreɪt/', 'Apps integrate with calendar services.', '应用与日历服务整合。'],
  ['latency', 'n.', '延迟', 'delay before data transfer begins', 'Technology', '/ˈleɪtənsi/', 'Low latency matters in online games.', '低延迟对在线游戏很重要。'],
  ['malware', 'n.', '恶意软件', 'software designed to harm systems', 'Technology', '/ˈmælweə/', 'Never open attachments with malware.', '切勿打开含恶意软件的附件。'],
  ['metadata', 'n.', '元数据', 'data describing other data', 'Technology', '/ˈmetədeɪtə/', 'Photos store metadata about location.', '照片存储位置元数据。'],
  ['optimize', 'v.', '优化', 'make as effective as possible', 'Technology', '/ˈɒptɪmaɪz/', 'Developers optimize code for speed.', '开发者优化代码以提高速度。'],
  ['platform', 'n.', '平台', 'hardware or software environment', 'Technology', '/ˈplætfɔːm/', 'The platform hosts millions of users.', '该平台拥有数百万用户。'],
  ['quantum', 'adj.', '量子的', 'relating to quantum mechanics', 'Technology', '/ˈkwɒntəm/', 'Quantum computing is still experimental.', '量子计算仍处于实验阶段。'],
  ['redundant', 'adj.', '冗余的', 'not needed; duplicated for backup', 'Technology', '/rɪˈdʌndənt/', 'Redundant servers prevent downtime.', '冗余服务器防止停机。'],
  ['scalable', 'adj.', '可扩展的', 'able to grow without losing performance', 'Technology', '/ˈskeɪləbl/', 'Cloud systems are highly scalable.', '云系统高度可扩展。'],
  ['sensor', 'n.', '传感器', 'device detecting physical input', 'Technology', '/ˈsensə/', 'Sensors monitor air quality.', '传感器监测空气质量。'],
  ['stream', 'v.', '流式传输', 'transmit or receive data continuously', 'Technology', '/striːm/', 'Millions stream music daily.', '数百万人每日流式收听音乐。'],
  ['synchronize', 'v.', '同步', 'cause to occur at the same time', 'Technology', '/ˈsɪŋkrənaɪz/', 'Devices synchronize contacts automatically.', '设备自动同步联系人。'],
  ['throughput', 'n.', '吞吐量', 'amount processed in a given time', 'Technology', '/ˈθruːpʊt/', 'Network throughput dropped during peak hours.', '高峰时段网络吞吐量下降。'],
  ['upgrade', 'v.', '升级', 'raise to a higher standard', 'Technology', '/ʌpˈɡreɪd/', 'Users should upgrade to the latest version.', '用户应升级到最新版本。'],
  ['virtual', 'adj.', '虚拟的', 'simulated by computer', 'Technology', '/ˈvɜːtʃuəl/', 'Virtual meetings save travel time.', '虚拟会议节省出行时间。'],
  ['wireless', 'adj.', '无线的', 'using radio signals without wires', 'Technology', '/ˈwaɪələs/', 'Wireless networks cover the campus.', '无线网络覆盖校园。'],
  ['analytics', 'n.', '分析学', 'systematic computational analysis of data', 'Technology', '/ˌænəˈlɪtɪks/', 'Web analytics reveal user behaviour.', '网络分析揭示用户行为。'],
  ['avatar', 'n.', '虚拟形象', 'digital representation of a user', 'Technology', '/ˈævətɑː/', 'Players choose custom avatars.', '玩家选择自定义虚拟形象。'],
  ['compile', 'v.', '编译', 'convert code into executable form', 'Technology', '/kəmˈpaɪl/', 'The compiler checks syntax errors.', '编译器检查语法错误。'],
  ['debug', 'v.', '调试', 'identify and remove errors', 'Technology', '/diːˈbʌɡ/', 'Programmers debug code line by line.', '程序员逐行调试代码。'],
  ['deprecated', 'adj.', '已弃用的', 'no longer recommended for use', 'Technology', '/ˈdeprəkeɪtɪd/', 'This API is deprecated next year.', '该接口明年将弃用。'],
  ['firewall', 'n.', '防火墙', 'security system monitoring traffic', 'Technology', '/ˈfaɪəwɔːl/', 'A firewall blocks suspicious requests.', '防火墙拦截可疑请求。'],
  ['iteration', 'n.', '迭代', 'repetition of a process', 'Technology', '/ˌɪtəˈreɪʃn/', 'Each iteration improves the product.', '每次迭代改进产品。'],
  ['legacy', 'adj.', '遗留的', 'old but still in use', 'Technology', '/ˈleɡəsi/', 'Legacy systems are costly to maintain.', '遗留系统维护成本高。'],
  ['open-source', 'adj.', '开源的', 'software with publicly available code', 'Technology', '/ˌəʊpənˈsɔːs/', 'Open-source tools are free to modify.', '开源工具可免费修改。'],
  ['patch', 'n.', '补丁', 'software update fixing issues', 'Technology', '/pætʃ/', 'Install the security patch immediately.', '立即安装安全补丁。'],
  ['repository', 'n.', '代码仓库', 'storage location for software assets', 'Technology', '/rɪˈpɒzɪtəri/', 'Code is stored in a shared repository.', '代码存放在共享仓库。'],
  ['token', 'n.', '令牌', 'digital unit representing access or value', 'Technology', '/ˈtəʊkən/', 'Login requires a secure token.', '登录需要安全令牌。'],
  // Health (50)
  ['chronic', 'adj.', '慢性的', 'persisting for a long time', 'Health', '/ˈkrɒnɪk/', 'Chronic stress affects sleep quality.', '慢性压力影响睡眠质量。'],
  ['diagnosis', 'n.', '诊断', 'identification of a disease', 'Health', '/ˌdaɪəɡˈnəʊsɪs/', 'Early diagnosis improves outcomes.', '早期诊断改善预后。'],
  ['epidemic', 'n.', '流行病', 'widespread occurrence of disease', 'Health', '/ˌepɪˈdemɪk/', 'The epidemic spread across regions.', '流行病在各地蔓延。'],
  ['immunity', 'n.', '免疫力', 'resistance to infection', 'Health', '/ɪˈmjuːnəti/', 'Vaccines build immunity safely.', '疫苗安全建立免疫力。'],
  ['nutrition', 'n.', '营养', 'process of nourishing the body', 'Health', '/njuːˈtrɪʃn/', 'Balanced nutrition supports growth.', '均衡营养促进成长。'],
  ['obesity', 'n.', '肥胖', 'condition of being very overweight', 'Health', '/əʊˈbiːsəti/', 'Obesity increases diabetes risk.', '肥胖增加糖尿病风险。'],
  ['prevention', 'n.', '预防', 'action to stop something happening', 'Health', '/prɪˈvenʃn/', 'Prevention is cheaper than treatment.', '预防比治疗更经济。'],
  ['rehabilitation', 'n.', '康复', 'restoration to health through therapy', 'Health', '/ˌriːəˌbɪlɪˈteɪʃn/', 'Rehabilitation follows knee surgery.', '膝部手术后进行康复。'],
  ['symptom', 'n.', '症状', 'sign of a disease', 'Health', '/ˈsɪmptəm/', 'Fever is a common symptom.', '发热是常见症状。'],
  ['therapy', 'n.', '治疗；疗法', 'treatment to relieve disorder', 'Health', '/ˈθerəpi/', 'Physical therapy restores mobility.', '物理治疗恢复活动能力。'],
  ['vaccine', 'n.', '疫苗', 'substance that provides immunity', 'Health', '/ˈvæksiːn/', 'The vaccine reduced infection rates.', '疫苗降低了感染率。'],
  ['wellbeing', 'n.', '身心健康', 'state of being comfortable and healthy', 'Health', '/ˌwelˈbiːɪŋ/', 'Exercise improves mental wellbeing.', '运动改善身心健康。'],
  ['acute', 'adj.', '急性的', 'severe and sudden in onset', 'Health', '/əˈkjuːt/', 'Acute pain needs prompt care.', '急性疼痛需及时护理。'],
  ['antibiotic', 'n.', '抗生素', 'medicine that kills bacteria', 'Health', '/ˌæntibaɪˈɒtɪk/', 'Doctors prescribe antibiotics carefully.', '医生谨慎开具抗生素。'],
  ['cardiovascular', 'adj.', '心血管的', 'relating to heart and blood vessels', 'Health', '/ˌkɑːdiəʊˈvæskjələ/', 'Cardiovascular exercise strengthens the heart.', '有氧运动增强心脏。'],
  ['contagious', 'adj.', '传染性的', 'spread by direct contact', 'Health', '/kənˈteɪdʒəs/', 'Flu is highly contagious.', '流感传染性很强。'],
  ['dehydration', 'n.', '脱水', 'loss of body water', 'Health', '/ˌdiːhaɪˈdreɪʃn/', 'Dehydration causes fatigue and headache.', '脱水导致疲劳和头痛。'],
  ['disorder', 'n.', '疾病；紊乱', 'disruption of normal function', 'Health', '/dɪsˈɔːdə/', 'Sleep disorder affects concentration.', '睡眠障碍影响注意力。'],
  ['dosage', 'n.', '剂量', 'amount of medicine to take', 'Health', '/ˈdəʊsɪdʒ/', 'Follow the recommended dosage.', '请按推荐剂量服用。'],
  ['epidemiology', 'n.', '流行病学', 'study of disease patterns', 'Health', '/ˌepɪˌdiːmiˈɒlədʒi/', 'Epidemiology tracks outbreak sources.', '流行病学追踪暴发源。'],
  ['hygiene', 'n.', '卫生', 'conditions promoting health', 'Health', '/ˈhaɪdʒiːn/', 'Hand hygiene prevents infection spread.', '手部卫生防止感染传播。'],
  ['immunisation', 'n.', '免疫接种', 'process of making immune', 'Health', '/ˌɪmjunaɪˈzeɪʃn/', 'Childhood immunisation saves lives.', '儿童免疫接种挽救生命。'],
  ['infection', 'n.', '感染', 'invasion by harmful organisms', 'Health', '/ɪnˈfekʃn/', 'Wound infection requires antibiotics.', '伤口感染需用抗生素。'],
  ['insomnia', 'n.', '失眠', 'inability to sleep', 'Health', '/ɪnˈsɒmniə/', 'Insomnia often links to anxiety.', '失眠常与焦虑相关。'],
  ['intake', 'n.', '摄入量', 'amount consumed', 'Health', '/ˈɪnteɪk/', 'Monitor daily calorie intake.', '监测每日热量摄入。'],
  ['lethal', 'adj.', '致命的', 'sufficient to cause death', 'Health', '/ˈliːθl/', 'The dose would be lethal to children.', '该剂量对儿童致命。'],
  ['longevity', 'n.', '长寿', 'long duration of life', 'Health', '/lɒnˈdʒevəti/', 'Diet affects human longevity.', '饮食影响人类长寿。'],
  ['malnutrition', 'n.', '营养不良', 'lack of proper nutrition', 'Health', '/ˌmælnjuːˈtrɪʃn/', 'Malnutrition stunts child development.', '营养不良阻碍儿童发育。'],
  ['medication', 'n.', '药物', 'substance used for medical treatment', 'Health', '/ˌmedɪˈkeɪʃn/', 'Take medication with food.', '请随餐服药。'],
  ['mental', 'adj.', '心理的；精神的', 'relating to the mind', 'Health', '/ˈmentl/', 'Mental health deserves equal attention.', '心理健康应获同等重视。'],
  ['metabolism', 'n.', '新陈代谢', 'chemical processes in the body', 'Health', '/məˈtæbəlɪzəm/', 'Exercise boosts metabolism.', '运动促进新陈代谢。'],
  ['mortality', 'n.', '死亡率', 'death rate in a population', 'Health', '/mɔːˈtæləti/', 'Mortality fell after vaccination.', '接种后死亡率下降。'],
  ['outbreak', 'n.', '暴发', 'sudden start of disease', 'Health', '/ˈaʊtbreɪk/', 'Health officials contained the outbreak.', '卫生官员控制了暴发。'],
  ['pandemic', 'n.', '大流行', 'disease spread over many countries', 'Health', '/pænˈdemɪk/', 'The pandemic disrupted global travel.', '大流行扰乱全球旅行。'],
  ['pathogen', 'n.', '病原体', 'agent causing disease', 'Health', '/ˈpæθədʒən/', 'Viruses are common pathogens.', '病毒是常见病原体。'],
  ['physician', 'n.', '内科医生', 'medical doctor', 'Health', '/fɪˈzɪʃn/', 'Consult a physician for persistent pain.', '持续疼痛请咨询内科医生。'],
  ['prescription', 'n.', '处方', 'written order for medicine', 'Health', '/prɪˈskrɪpʃn/', 'The pharmacy filled my prescription.', '药房配好了我的处方。'],
  ['prognosis', 'n.', '预后', 'likely course of a disease', 'Health', '/prɒɡˈnəʊsɪs/', 'The prognosis is favourable with treatment.', '治疗预后良好。'],
  ['psychological', 'adj.', '心理的', 'relating to the mind', 'Health', '/ˌsaɪkəˈlɒdʒɪkl/', 'Psychological support aids recovery.', '心理支持有助康复。'],
  ['quarantine', 'n.', '隔离', 'isolation to prevent disease spread', 'Health', '/ˈkwɒrəntiːn/', 'Travellers entered quarantine for a week.', '旅客隔离一周。'],
  ['resilience', 'n.', '韧性；恢复力', 'ability to recover quickly', 'Health', '/rɪˈzɪliəns/', 'Resilience helps cope with stress.', '韧性帮助应对压力。'],
  ['sedentary', 'adj.', '久坐的', 'involving much sitting', 'Health', '/ˈsedntri/', 'Sedentary lifestyles raise health risks.', '久坐生活方式增加健康风险。'],
  ['stamina', 'n.', '耐力', 'physical or mental endurance', 'Health', '/ˈstæmɪnə/', 'Training builds stamina gradually.', '训练逐步增强耐力。'],
  ['surveillance', 'n.', '监测', 'close observation of health data', 'Health', '/sɜːˈveɪləns/', 'Disease surveillance detects early signals.', '疾病监测发现早期信号。'],
  ['transmission', 'n.', '传播', 'passing of disease from person to person', 'Health', '/trænzˈmɪʃn/', 'Masks reduce airborne transmission.', '口罩减少空气传播。'],
  ['trauma', 'n.', '创伤', 'physical or emotional injury', 'Health', '/ˈtrɔːmə/', 'Trauma counselling supports survivors.', '创伤咨询帮助幸存者。'],
  ['vulnerable', 'adj.', '脆弱的', 'easily harmed physically or emotionally', 'Health', '/ˈvʌlnərəbl/', 'Elderly people are more vulnerable.', '老年人更脆弱。'],
  ['wellness', 'n.', '健康状态', 'active pursuit of health', 'Health', '/ˈwelnəs/', 'Wellness programmes promote exercise.', '健康计划鼓励运动。'],
  ['withdrawal', 'n.', '戒断', 'process of stopping a drug', 'Health', '/wɪðˈdrɔːəl/', 'Withdrawal symptoms can be severe.', '戒断症状可能严重。'],
  ['workout', 'n.', '锻炼', 'session of physical exercise', 'Health', '/ˈwɜːkaʊt/', 'A daily workout improves fitness.', '每日锻炼提升体能。'],
  // Society (50)
  ['demographic', 'adj.', '人口的', 'relating to population structure', 'Society', '/ˌdeməˈɡræfɪk/', 'Demographic shifts affect housing demand.', '人口结构变化影响住房需求。'],
  ['equity', 'n.', '公平', 'fairness and justice', 'Society', '/ˈekwəti/', 'Education equity remains a goal.', '教育公平仍是目标。'],
  ['inequality', 'n.', '不平等', 'lack of equality', 'Society', '/ˌɪnɪˈkwɒləti/', 'Income inequality widened in cities.', '城市收入不平等扩大。'],
  ['migration', 'n.', '迁移', 'movement from one place to another', 'Society', '/maɪˈɡreɪʃn/', 'Rural migration fuels urban growth.', '农村迁移推动城市增长。'],
  ['prejudice', 'n.', '偏见', 'preconceived opinion not based on reason', 'Society', '/ˈpredʒudɪs/', 'Prejudice harms social cohesion.', '偏见损害社会凝聚力。'],
  ['stereotype', 'n.', '刻板印象', 'oversimplified fixed image of a group', 'Society', '/ˈsteriətaɪp/', 'Media can reinforce harmful stereotypes.', '媒体可能强化有害刻板印象。'],
  ['urban', 'adj.', '城市的', 'relating to a city', 'Society', '/ˈɜːbən/', 'Urban areas face traffic congestion.', '城市面临交通拥堵。'],
  ['welfare', 'n.', '福利', 'health and prosperity of a community', 'Society', '/ˈwelfeə/', 'Social welfare supports low-income families.', '社会福利支持低收入家庭。'],
  ['advocacy', 'n.', '倡导', 'public support for a cause', 'Society', '/ˈædvəkəsi/', 'Youth advocacy changed local policy.', '青年倡导改变了地方政策。'],
  ['assimilation', 'n.', '同化', 'absorption into a wider culture', 'Society', '/əˌsɪmɪˈleɪʃn/', 'Assimilation pressures vary by community.', '同化压力因社区而异。'],
  ['civic', 'adj.', '公民的', 'relating to citizens and city life', 'Society', '/ˈsɪvɪk/', 'Civic duty includes voting.', '公民责任包括投票。'],
  ['cohesion', 'n.', '凝聚力', 'action of forming a united whole', 'Society', '/kəʊˈhiːʒn/', 'Shared values strengthen social cohesion.', '共同价值观增强社会凝聚力。'],
  ['discrimination', 'n.', '歧视', 'unjust treatment of different groups', 'Society', '/dɪˌskrɪmɪˈneɪʃn/', 'Laws ban workplace discrimination.', '法律禁止职场歧视。'],
  ['diversity', 'n.', '多样性', 'variety of people or things', 'Society', '/daɪˈvɜːsəti/', 'Workplace diversity drives innovation.', '职场多样性推动创新。'],
  ['empower', 'v.', '赋权', 'give authority or power to', 'Society', '/ɪmˈpaʊə/', 'Education can empower communities.', '教育能赋权社区。'],
  ['ethnic', 'adj.', ' ethnic 的；民族的', 'relating to a population subgroup', 'Society', '/ˈeθnɪk/', 'Ethnic festivals celebrate heritage.', '民族节庆庆祝传统。'],
  ['gender', 'n.', '性别', 'social and cultural roles related to sex', 'Society', '/ˈdʒendə/', 'Gender equality improves outcomes for all.', '性别平等改善所有人的结果。'],
  ['homelessness', 'n.', '无家可归', 'state of having no home', 'Society', '/ˈhəʊmləsnəs/', 'Homelessness rose during the recession.', '经济衰退期间无家可归者增加。'],
  ['humanitarian', 'adj.', '人道主义的', 'concerned with reducing suffering', 'Society', '/hjuːˌmænɪˈteəriən/', 'Humanitarian aid reached the refugees.', '人道援助抵达难民。'],
  ['identity', 'n.', '身份认同', 'who a person is', 'Society', '/aɪˈdentəti/', 'Language shapes cultural identity.', '语言塑造文化认同。'],
  ['inclusion', 'n.', '包容', 'practice of including all people', 'Society', '/ɪnˈkluːʒn/', 'Inclusion benefits schools and workplaces.', '包容使学校和工作场所受益。'],
  ['integration', 'n.', '融合', 'combining into a unified whole', 'Society', '/ˌɪntɪˈɡreɪʃn/', 'Social integration takes time and trust.', '社会融合需要时间和信任。'],
  ['justice', 'n.', '正义；司法', 'fair treatment according to law', 'Society', '/ˈdʒʌstɪs/', 'Access to justice should be equal.', '司法途径应平等可及。'],
  ['marginalised', 'adj.', '边缘化的', 'treated as insignificant', 'Society', '/ˈmɑːdʒɪnəlaɪzd/', 'Policies must support marginalised groups.', '政策须支持边缘群体。'],
  ['multicultural', 'adj.', '多元文化的', 'relating to several cultures', 'Society', '/ˌmʌltiˈkʌltʃərəl/', 'Multicultural cities attract talent.', '多元文化城市吸引人才。'],
  ['norm', 'n.', '规范', 'standard of behaviour in a group', 'Society', '/nɔːm/', 'Social norms guide daily behaviour.', '社会规范指导日常行为。'],
  ['philanthropy', 'n.', '慈善', 'generous giving to good causes', 'Society', '/fɪˈlænθrəpi/', 'Philanthropy funded the new library.', '慈善资助了新图书馆。'],
  ['polarisation', 'n.', '两极分化', 'division into opposing groups', 'Society', '/ˌpəʊləraɪˈzeɪʃn/', 'Media can increase political polarisation.', '媒体可能加剧政治两极分化。'],
  ['poverty', 'n.', '贫困', 'state of being extremely poor', 'Society', '/ˈpɒvəti/', 'Poverty limits access to education.', '贫困限制受教育机会。'],
  ['refugee', 'n.', '难民', 'person forced to leave their country', 'Society', '/ˌrefjuˈdʒiː/', 'Refugees need shelter and legal support.', '难民需要 shelter 和法律支持。'],
  ['segregation', 'n.', '隔离', 'separation of groups', 'Society', '/ˌseɡrɪˈɡeɪʃn/', 'School segregation was outlawed decades ago.', '学校隔离数十年前已被禁止。'],
  ['solidarity', 'n.', '团结', 'unity based on shared interests', 'Society', '/ˌsɒlɪˈdærəti/', 'Workers showed solidarity during the strike.', '罢工期间工人展现团结。'],
  ['stigma', 'n.', '污名', 'mark of disgrace associated with something', 'Society', '/ˈstɪɡmə/', 'Mental illness still carries stigma.', '精神疾病仍带污名。'],
  ['suburb', 'n.', '郊区', 'residential area outside a city', 'Society', '/ˈsʌbɜːb/', 'Many families moved to the suburbs.', '许多家庭迁往郊区。'],
  ['tolerance', 'n.', '宽容', 'acceptance of differing views', 'Society', '/ˈtɒlərəns/', 'Tolerance is vital in diverse societies.', '宽容在多元社会至关重要。'],
  ['volunteer', 'n.', '志愿者', 'person who offers help freely', 'Society', '/ˌvɒlənˈtɪə/', 'Volunteers cleaned the neighbourhood park.', '志愿者清理了社区公园。'],
  ['xenophobia', 'n.', '仇外', 'dislike of foreigners', 'Society', '/ˌzenəˈfəʊbiə/', 'Campaigns fight xenophobia online.', '运动在网上反对仇外。'],
  ['youth', 'n.', '青年', 'time of being young; young people', 'Society', '/juːθ/', 'Youth unemployment remains a concern.', '青年失业仍是关切。'],
  ['activism', 'n.', '行动主义', 'campaigning for social change', 'Society', '/ˈæktɪvɪzəm/', 'Climate activism influenced policy.', '气候行动主义影响了政策。'],
  ['alienation', 'n.', '疏离', 'feeling of isolation from society', 'Society', '/ˌeɪliəˈneɪʃn/', 'Social media can increase alienation.', '社交媒体可能加剧疏离。'],
  ['census', 'n.', '人口普查', 'official count of population', 'Society', '/ˈsensəs/', 'The census guides resource allocation.', '人口普查指导资源分配。'],
  ['civil', 'adj.', '公民的；文明的', 'relating to ordinary citizens', 'Society', '/ˈsɪvl/', 'Civil rights protect basic freedoms.', '公民权利保护基本自由。'],
  ['community', 'n.', '社区', 'group living in one place', 'Society', '/kəˈmjuːnəti/', 'Strong communities support neighbours.', '强大社区互助邻里。'],
  ['conformity', 'n.', ' conformity ；从众', 'behaviour matching group norms', 'Society', '/kənˈfɔːməti/', 'Peer pressure encourages conformity.', '同伴压力鼓励从众。'],
  ['displacement', 'n.', '流离失所', 'forced movement from home', 'Society', '/dɪsˈpleɪsmənt/', 'War caused mass displacement.', '战争造成大规模流离失所。'],
  ['gentrification', 'n.', '绅士化', 'renovation displacing poorer residents', 'Society', '/ˌdʒentrɪfɪˈkeɪʃn/', 'Gentrification raised rent prices.', '绅士化推高了租金。'],
  ['grassroots', 'adj.', ' grassroots 的；基层的', 'ordinary people as the basis of activity', 'Society', '/ˈɡrɑːsruːts/', 'Grassroots movements demand change.', '基层运动要求变革。'],
  ['household', 'n.', '家庭', 'all people living together in a home', 'Society', '/ˈhaʊshəʊld/', 'Average household size has shrunk.', '平均家庭规模缩小。'],
  ['livelihood', 'n.', '生计', 'means of securing necessities of life', 'Society', '/ˈlaɪvlihʊd/', 'Farming is their main livelihood.', '务农是他们的主要生计。'],
  // Economy (50)
  ['inflation', 'n.', '通货膨胀', 'general increase in prices', 'Economy', '/ɪnˈfleɪʃn/', 'Inflation erodes purchasing power.', '通货膨胀削弱购买力。'],
  ['recession', 'n.', '经济衰退', 'period of temporary economic decline', 'Economy', '/rɪˈseʃn/', 'The recession reduced consumer spending.', '衰退减少了消费支出。'],
  ['commodity', 'n.', '商品', 'raw material or primary product', 'Economy', '/kəˈmɒdəti/', 'Oil is a key global commodity.', '石油是关键全球商品。'],
  ['deficit', 'n.', '赤字', 'amount by which spending exceeds income', 'Economy', '/ˈdefɪsɪt/', 'The budget deficit widened this year.', '今年预算赤字扩大。'],
  ['export', 'v.', '出口', 'sell goods to another country', 'Economy', '/ɪkˈspɔːt/', 'China exports electronics worldwide.', '中国向全球出口电子产品。'],
  ['import', 'v.', '进口', 'bring goods from abroad', 'Economy', '/ɪmˈpɔːt/', 'The nation imports most of its oil.', '该国大部分石油靠进口。'],
  ['investment', 'n.', '投资', 'action of putting money to earn profit', 'Economy', '/ɪnˈvestmənt/', 'Foreign investment created new jobs.', '外商投资创造了新岗位。'],
  ['monetary', 'adj.', '货币的', 'relating to money or currency', 'Economy', '/ˈmʌnɪtəri/', 'Monetary policy affects interest rates.', '货币政策影响利率。'],
  ['productivity', 'n.', '生产率', 'efficiency of production', 'Economy', '/ˌprɒdʌkˈtɪvəti/', 'Technology raises worker productivity.', '技术提高工人生产率。'],
  ['subsidy', 'n.', '补贴', 'money granted by government to assist', 'Economy', '/ˈsʌbsədi/', 'Farm subsidies support rural incomes.', '农业补贴支持农村收入。'],
  ['tariff', 'n.', '关税', 'tax on imports or exports', 'Economy', '/ˈtærɪf/', 'Tariffs raised the cost of steel.', '关税提高了钢铁成本。'],
  ['trade', 'n.', '贸易', 'buying and selling of goods', 'Economy', '/treɪd/', 'Free trade benefits many consumers.', '自由贸易使许多消费者受益。'],
  ['unemployment', 'n.', '失业（率）', 'state of being without work', 'Economy', '/ˌʌnɪmˈplɔɪmənt/', 'Unemployment claims rose in winter.', '冬季失业申请增加。'],
  ['venture', 'n.', ' venture ；风险项目', 'business enterprise involving risk', 'Economy', '/ˈventʃə/', 'The startup is a risky venture.', '这家初创企业是风险项目。'],
  ['austerity', 'n.', '紧缩', 'strict economy measures', 'Economy', '/ɒˈsterəti/', 'Austerity cut public spending sharply.', '紧缩大幅削减公共支出。'],
  ['bankruptcy', 'n.', '破产', 'legal status of unable to pay debts', 'Economy', '/ˈbæŋkrʌptsi/', 'Several firms filed for bankruptcy.', '数家公司申请破产。'],
  ['capital', 'n.', '资本', 'wealth used to produce more wealth', 'Economy', '/ˈkæpɪtl/', 'Venture capital funds new tech firms.', '风险投资资助新科技公司。'],
  ['consumer', 'n.', '消费者', 'person who buys goods', 'Economy', '/kənˈsjuːmə/', 'Consumer confidence affects spending.', '消费者信心影响支出。'],
  ['currency', 'n.', '货币', 'system of money in general use', 'Economy', '/ˈkʌrənsi/', 'The currency weakened against the dollar.', '该货币对美元走弱。'],
  ['debt', 'n.', '债务', 'money owed', 'Economy', '/det/', 'Household debt reached record levels.', '家庭债务达纪录水平。'],
  ['devaluation', 'n.', '贬值', 'reduction in value of currency', 'Economy', '/ˌdiːvæljuˈeɪʃn/', 'Devaluation made exports cheaper.', '贬值使出口更便宜。'],
  ['dividend', 'n.', '股息', 'share of profits paid to shareholders', 'Economy', '/ˈdɪvɪdend/', 'The firm raised its dividend.', '公司提高了股息。'],
  ['enterprise', 'n.', '企业；事业', 'business or company', 'Economy', '/ˈentəpraɪz/', 'Small enterprises drive local jobs.', '小企业带动本地就业。'],
  ['fiscal', 'adj.', '财政的', 'relating to government revenue', 'Economy', '/ˈfɪskl/', 'Fiscal reform balanced the budget.', '财政改革平衡了预算。'],
  ['GDP', 'n.', '国内生产总值', 'total value of goods and services produced', 'Economy', '/ˌdʒiː diː ˈpiː/', 'GDP growth slowed last quarter.', '上季度 GDP 增速放缓。'],
  ['globalisation', 'n.', '全球化', 'growth of worldwide integration', 'Economy', '/ˌɡləʊbəlaɪˈzeɪʃn/', 'Globalisation links distant markets.', '全球化连接遥远市场。'],
  ['interest', 'n.', '利息', 'charge for borrowing money', 'Economy', '/ˈɪntrəst/', 'Interest rates influence housing loans.', '利率影响住房贷款。'],
  ['labour', 'n.', '劳动力', 'work force; workers collectively', 'Economy', '/ˈleɪbə/', 'Skilled labour is in short supply.', '熟练劳动力短缺。'],
  ['liquidity', 'n.', '流动性', 'availability of liquid assets or cash', 'Economy', '/lɪˈkwɪdəti/', 'Banks must maintain sufficient liquidity.', '银行须保持足够流动性。'],
  ['market', 'n.', '市场', 'place where goods are traded', 'Economy', '/ˈmɑːkɪt/', 'Competition keeps market prices fair.', '竞争使市场价格公平。'],
  ['merger', 'n.', '合并', 'combination of two companies', 'Economy', '/ˈmɜːdʒə/', 'The merger created a larger bank.', '合并造就更大银行。'],
  ['microfinance', 'n.', '小额信贷', 'small loans to low-income people', 'Economy', '/ˈmaɪkrəʊfaɪnæns/', 'Microfinance helps rural entrepreneurs.', '小额信贷帮助农村创业者。'],
  ['outsourcing', 'n.', '外包', 'obtaining goods from outside supplier', 'Economy', '/ˈaʊtsɔːsɪŋ/', 'Outsourcing cut production costs.', '外包降低了生产成本。'],
  ['portfolio', 'n.', '投资组合', 'range of investments held', 'Economy', '/pɔːtˈfəʊliəʊ/', 'Diversify your investment portfolio.', '分散你的投资组合。'],
  ['privatisation', 'n.', ' privatisation ；私有化', 'transfer from public to private ownership', 'Economy', '/ˌpraɪvətaɪˈzeɪʃn/', 'Privatisation changed the telecom sector.', '私有化改变了电信行业。'],
  ['profit', 'n.', '利润', 'financial gain', 'Economy', '/ˈprɒfɪt/', 'Profit margins narrowed this year.', '今年利润率收窄。'],
  ['quota', 'n.', '配额', 'fixed share of something', 'Economy', '/ˈkwəʊtə/', 'Import quotas protect local farmers.', '进口配额保护本地农民。'],
  ['revenue', 'n.', '收入', 'income generated by business', 'Economy', '/ˈrevənjuː/', 'Online sales boosted revenue.', '在线销售增加了收入。'],
  ['stimulus', 'n.', ' stimulus ；刺激', 'action to encourage economic activity', 'Economy', '/ˈstɪmjələs/', 'Government stimulus supported recovery.', '政府刺激支持复苏。'],
  ['surplus', 'n.', '盈余', 'amount left when needs are met', 'Economy', '/ˈsɜːpləs/', 'Trade surplus grew for three months.', '贸易盈余连续三个月增长。'],
  ['taxation', 'n.', ' taxation ；税收', 'system of imposing taxes', 'Economy', '/tækˈseɪʃn/', 'Taxation funds public services.', '税收资助公共服务。'],
  ['transaction', 'n.', '交易', 'instance of buying or selling', 'Economy', '/trænˈzækʃn/', 'Each transaction is recorded digitally.', '每笔交易数字记录。'],
  ['turnover', 'n.', '营业额', 'amount of business in a period', 'Economy', '/ˈtɜːnəʊvə/', 'Annual turnover exceeded expectations.', '年营业额超出预期。'],
  ['utility', 'n.', '公用事业', 'organised essential service', 'Economy', '/juːˈtɪləti/', 'Water utility prices rose slightly.', '水务价格略涨。'],
  ['volatility', 'n.', '波动性', 'liability to change rapidly', 'Economy', '/ˌvɒləˈtɪləti/', 'Market volatility worries investors.', '市场波动令投资者担忧。'],
  ['wage', 'n.', '工资', 'fixed regular payment for work', 'Economy', '/weɪdʒ/', 'Minimum wage laws protect workers.', '最低工资法保护工人。'],
  ['yield', 'n.', '收益；产量', 'produce or provide a result', 'Economy', '/jiːld/', 'Bond yields fell after the announcement.', '公告后债券收益下降。'],
  ['asset', 'n.', '资产', 'item of value owned', 'Economy', '/ˈæset/', 'Property is a major household asset.', '房产是主要家庭资产。'],
  ['broker', 'n.', '经纪人', 'agent who buys and sells for others', 'Economy', '/ˈbrəʊkə/', 'A broker arranged the stock sale.', '经纪人安排了股票出售。'],
  ['corporation', 'n.', ' corporation ；公司', 'large company or group', 'Economy', '/ˌkɔːpəˈreɪʃn/', 'The corporation expanded overseas.', '公司在海外扩张。'],
  // Culture (50)
  ['heritage', 'n.', '遗产', 'valued traditions passed down', 'Culture', '/ˈherɪtɪdʒ/', 'UNESCO protects world heritage sites.', '联合国教科文组织保护世界遗产。'],
  ['tradition', 'n.', '传统', 'long-established custom', 'Culture', '/trəˈdɪʃn/', 'Family tradition shapes holiday rituals.', '家庭传统塑造节日仪式。'],
  ['ritual', 'n.', '仪式', 'religious or solemn ceremony', 'Culture', '/ˈrɪtʃuəl/', 'The wedding ritual lasted two days.', '婚礼仪式持续两天。'],
  ['aesthetic', 'adj.', '美学的', 'concerned with beauty', 'Culture', '/iːsˈθetɪk/', 'The museum displays aesthetic values.', '博物馆展示美学价值。'],
  ['anthropology', 'n.', '人类学', 'study of human societies', 'Culture', '/ˌænθrəˈpɒlədʒi/', 'Anthropology examines cultural practices.', '人类学考察文化习俗。'],
  ['artefact', 'n.', '文物', 'object made by humans of cultural interest', 'Culture', '/ˈɑːtɪfækt/', 'The artefact dates from the Tang dynasty.', '该文物年代为唐代。'],
  ['authentic', 'adj.', ' authentic 的；正宗的', 'genuine; not copied', 'Culture', '/ɔːˈθentɪk/', 'Tourists seek authentic local food.', '游客寻找正宗本地美食。'],
  ['cuisine', 'n.', '烹饪；菜系', 'style of cooking', 'Culture', '/kwɪˈziːn/', 'Regional cuisine reflects local ingredients.', '地方菜系反映本地食材。'],
  ['custom', 'n.', '习俗', 'traditional way of behaving', 'Culture', '/ˈkʌstəm/', 'It is custom to bow in greeting.', '鞠躬问候是习俗。'],
  ['dialect', 'n.', '方言', 'form of language specific to a region', 'Culture', '/ˈdaɪəlekt/', 'The play uses a southern dialect.', '该剧使用南方方言。'],
  ['folklore', 'n.', '民间传说', 'traditional beliefs and stories', 'Culture', '/ˈfəʊklɔː/', 'Folklore preserves community memory.', '民间传说保存社区记忆。'],
  ['indigenous', 'adj.', ' indigenous 的；本土的', 'originating in a particular place', 'Culture', '/ɪnˈdɪdʒənəs/', 'Indigenous art uses natural pigments.', '本土艺术使用天然颜料。'],
  ['legacy', 'n.', ' legacy ；遗产', 'something handed down from the past', 'Culture', '/ˈleɡəsi/', 'The poet left a lasting legacy.', '诗人留下持久遗产。'],
  ['acculturation', 'n.', '文化适应', 'adoption of another culture\'s traits', 'Culture', '/əˌkʌltʃəˈreɪʃn/', 'Acculturation shapes immigrant youth identity.', '文化适应塑造移民青年认同。'],
  ['myth', 'n.', '神话；迷思', 'traditional story or widely held false belief', 'Culture', '/mɪθ/', 'The myth explains the origin of fire.', '神话解释火的起源。'],
  ['narrative', 'n.', '叙事', 'spoken or written account of events', 'Culture', '/ˈnærətɪv/', 'National narrative shapes identity.', '国家叙事塑造认同。'],
  ['oral', 'adj.', '口头的', 'spoken rather than written', 'Culture', '/ˈɔːrəl/', 'Oral history records elder memories.', '口述历史记录长者记忆。'],
  ['patron', 'n.', '赞助人', 'person who supports artists', 'Culture', '/ˈpeɪtrən/', 'Wealthy patrons funded the opera.', ' wealthy 赞助人资助歌剧。'],
  ['preservation', 'n.', '保护；保存', 'action of keeping something intact', 'Culture', '/ˌprezəˈveɪʃn/', 'Preservation saves historic buildings.', '保护拯救历史建筑。'],
  ['revival', 'n.', '复兴', 'restoration to use or popularity', 'Culture', '/rɪˈvaɪvl/', 'A folk music revival swept the city.', '民间音乐复兴席卷城市。'],
  ['symbolism', 'n.', '象征主义', 'use of symbols to represent ideas', 'Culture', '/ˈsɪmbəlɪzəm/', 'Colour symbolism varies by culture.', '色彩象征因文化而异。'],
  ['tapestry', 'n.', '挂毯；交织', 'rich complex variety', 'Culture', '/ˈtæpɪstri/', 'The city is a tapestry of cultures.', '这座城市是文化交织的挂毯。'],
  ['vernacular', 'n.', '本土语言', 'language of ordinary people in a region', 'Culture', '/vəˈnækjələ/', 'Poets wrote in the local vernacular.', '诗人用当地方言写作。'],
  ['virtuoso', 'n.', '大师', 'person highly skilled in fine arts', 'Culture', '/ˌvɜːtʃuˈəʊsəʊ/', 'The virtuoso performed flawlessly.', '大师演奏完美无瑕。'],
  ['archive', 'n.', '档案', 'collection of historical records', 'Culture', '/ˈɑːkaɪv/', 'Researchers searched the city archive.', '研究者在市档案中检索。'],
  ['bilingual', 'adj.', '双语的', 'speaking two languages', 'Culture', '/baɪˈlɪŋɡwəl/', 'Bilingual education benefits children.', '双语教育惠及儿童。'],
  ['ceremony', 'n.', '典礼', 'formal religious or public occasion', 'Culture', '/ˈserəməni/', 'The opening ceremony drew crowds.', '开幕式吸引人群。'],
  ['cosmopolitan', 'adj.', '国际化的', 'familiar with many cultures', 'Culture', '/ˌkɒzməˈpɒlɪtən/', 'Shanghai is a cosmopolitan hub.', '上海是国际化枢纽。'],
  ['curator', 'n.', '策展人', 'person who manages a museum collection', 'Culture', '/kjʊəˈreɪtə/', 'The curator designed a new exhibition.', '策展人设计新展览。'],
  ['depict', 'v.', '描绘', 'show in a picture or words', 'Culture', '/dɪˈpɪkt/', 'Murals depict local legends.', '壁画描绘本地传说。'],
  ['emblem', 'n.', ' emblem ；象征', 'symbol representing a quality', 'Culture', '/ˈembləm/', 'The dragon is an emblem of power.', '龙是权力象征。'],
  ['epic', 'n.', '史诗', 'long poem about heroic deeds', 'Culture', '/ˈepɪk/', 'Students read an ancient Greek epic.', '学生阅读古希腊史诗。'],
  ['exhibit', 'n.', '展览', 'public display of works', 'Culture', '/ɪɡˈzɪbɪt/', 'The exhibit toured three cities.', '展览巡展三座城市。'],
  ['genre', 'n.', '体裁；类型', 'category of artistic composition', 'Culture', '/ˈʒɒnrə/', 'Jazz is a distinct music genre.', '爵士是 distinct 音乐类型。'],
  ['iconic', 'adj.', '标志性的', 'widely recognised as representative', 'Culture', '/aɪˈkɒnɪk/', 'The tower is an iconic landmark.', '该塔是标志性地标。'],
  ['ideology', 'n.', '意识形态', 'system of ideas forming basis of policy', 'Culture', '/ˌaɪdiˈɒlədʒi/', 'Political ideology influences art funding.', '政治意识形态影响艺术资助。'],
  ['immigrant', 'n.', '移民', 'person who comes to live permanently', 'Culture', '/ˈɪmɪɡrənt/', 'Immigrant communities enrich cuisine.', '移民社区丰富饮食。'],
  ['intercultural', 'adj.', '跨文化的', 'between different cultures', 'Culture', '/ˌɪntəˈkʌltʃərəl/', 'Intercultural exchange builds understanding.', '跨文化交流增进理解。'],
  ['legend', 'n.', ' legend ；传说', 'traditional story sometimes untrue', 'Culture', '/ˈledʒənd/', 'The legend tells of a hidden lake.', '传说讲述隐秘湖泊。'],
  ['linguistic', 'adj.', '语言的', 'relating to language', 'Culture', '/lɪŋˈɡwɪstɪk/', 'Linguistic diversity is a national asset.', '语言多样性是国家财富。'],
  ['monument', 'n.', '纪念碑', 'structure commemorating a person or event', 'Culture', '/ˈmɒnjumənt/', 'The monument honours war heroes.', '纪念碑缅怀战争英雄。'],
  ['mural', 'n.', '壁画', 'painting on a wall', 'Culture', '/ˈmjʊərəl/', 'Street murals brighten the district.', '街头壁画点亮街区。'],
  ['patrimony', 'n.', '文化遗产', 'heritage from ancestors', 'Culture', '/ˈpætrɪməni/', 'Temples are part of national patrimony.', '寺庙是国家文化遗产一部分。'],
  ['performative', 'adj.', '表演性的', 'relating to performance of identity', 'Culture', '/pəˈfɔːmətɪv/', 'Festivals have performative rituals.', '节庆有表演性仪式。'],
  ['proverb', 'n.', '谚语', 'short saying expressing wisdom', 'Culture', '/ˈprɒvɜːb/', 'The proverb warns against greed.', '谚语告诫勿贪婪。'],
  ['repertoire', 'n.', ' repertoire ；曲目/剧目', 'collection of works an artist can perform', 'Culture', '/ˈrepətwɑː/', 'The choir expanded its repertoire.', '合唱团扩充曲目。'],
  ['sacred', 'adj.', '神圣的', 'regarded with great respect', 'Culture', '/ˈseɪkrɪd/', 'The site is sacred to believers.', '该地对信徒神圣。'],
  ['secular', 'adj.', '世俗的', 'not connected with religion', 'Culture', '/ˈsekjələ/', 'Secular music plays at the festival.', '节庆播放世俗音乐。'],
  ['translation', 'n.', '翻译', 'rendering text into another language', 'Culture', '/trænsˈleɪʃn/', 'Good translation preserves nuance.', '好翻译保留细微差别。'],
  ['zeitgeist', 'n.', '时代精神', 'defining spirit of a period', 'Culture', '/ˈtsaɪtɡaɪst/', 'The film captured the zeitgeist of the 1990s.', '影片捕捉九十年代时代精神。'],
  // Science (50)
  ['inference', 'n.', '推断', 'conclusion drawn from evidence', 'Science', '/ˈɪnfərəns/', 'Draw inference only from reliable data.', '仅根据可靠数据作出推断。'],
  ['variable', 'n.', '变量', 'factor that can change in an experiment', 'Science', '/ˈveəriəbl/', 'Temperature is a key variable.', '温度是关键变量。'],
  ['control', 'n.', '对照', 'standard for comparison in experiments', 'Science', '/kənˈtrəʊl/', 'The control group received no treatment.', '对照组未接受治疗。'],
  ['replicate', 'v.', '重复实验', 'repeat an experiment to verify results', 'Science', '/ˈreplɪkeɪt/', 'Other labs could not replicate the finding.', '其他实验室无法重复该发现。'],
  ['spectrum', 'n.', '光谱；范围', 'band of colours or range of values', 'Science', '/ˈspektrəm/', 'Light splits into a colour spectrum.', '光分解为彩色光谱。'],
  ['molecule', 'n.', '分子', 'group of atoms bonded together', 'Science', '/ˈmɒlɪkjuːl/', 'A water molecule has two hydrogen atoms.', '水分子有两个氢原子。'],
  ['organism', 'n.', '生物体', 'individual animal, plant, or microorganism', 'Science', '/ˈɔːɡənɪzəm/', 'Each organism adapts to its niche.', '每种生物适应其生态位。'],
  ['ecology', 'n.', '生态学', 'study of organisms and environment', 'Science', '/iˈkɒlədʒi/', 'Ecology links species and habitats.', '生态学连接物种与栖息地。'],
  ['genetic', 'adj.', '遗传的', 'relating to genes or heredity', 'Science', '/dʒəˈnetɪk/', 'Genetic traits pass to offspring.', '遗传性状传给后代。'],
  ['evolution', 'n.', '进化', 'gradual development of species', 'Science', '/ˌiːvəˈluːʃn/', 'Evolution explains biodiversity over time.', '进化解释随时间的生物多样性。'],
  ['photosynthesis', 'n.', '光合作用', 'process plants use to make food from light', 'Science', '/ˌfəʊtəʊˈsɪnθəsɪs/', 'Photosynthesis produces oxygen.', '光合作用产生氧气。'],
  ['respiration', 'n.', '呼吸作用', 'process of taking in oxygen and releasing energy', 'Science', '/ˌrespəˈreɪʃn/', 'Cell respiration releases usable energy.', '细胞呼吸释放可用能量。'],
  ['catalyst', 'n.', '催化剂', 'substance that speeds a reaction', 'Science', '/ˈkætəlɪst/', 'Enzymes act as biological catalysts.', '酶充当生物催化剂。'],
  ['equilibrium', 'n.', '平衡', 'state where opposing forces are balanced', 'Science', '/ˌiːkwɪˈlɪbriəm/', 'The reaction reached equilibrium.', '反应达到平衡。'],
  ['density', 'n.', '密度', 'mass per unit volume', 'Science', '/ˈdensəti/', 'Oil floats because of lower density.', '油因密度较低而浮起。'],
  ['velocity', 'n.', '速度（矢量）', 'speed in a given direction', 'Science', '/vəˈlɒsəti/', 'Velocity includes direction as well as speed.', '速度包含方向与大小。'],
  ['acceleration', 'n.', '加速度', 'rate of change of velocity', 'Science', '/əkˌseləˈreɪʃn/', 'Gravity causes constant acceleration.', '重力产生恒定加速度。'],
  ['friction', 'n.', '摩擦力', 'resistance when surfaces move against each other', 'Science', '/ˈfrɪkʃn/', 'Friction slows moving objects.', '摩擦力减慢运动物体。'],
  ['momentum', 'n.', '动量', 'quantity of motion of a moving body', 'Science', '/məˈmentəm/', 'Momentum depends on mass and velocity.', '动量取决于质量与速度。'],
  ['radiation', 'n.', '辐射', 'energy transmitted as waves or particles', 'Science', '/ˌreɪdiˈeɪʃn/', 'UV radiation can damage skin.', '紫外线辐射可损伤皮肤。'],
  ['conduction', 'n.', '传导', 'transfer of heat through direct contact', 'Science', '/kənˈdʌkʃn/', 'Metal allows fast heat conduction.', '金属允许快速热传导。'],
  ['convection', 'n.', '对流', 'heat transfer by movement of fluid', 'Science', '/kənˈvekʃn/', 'Convection currents circulate warm air.', '对流使暖空气循环。'],
  ['insulation', 'n.', ' insulation ；绝缘', 'material reducing heat transfer', 'Science', '/ˌɪnsjuˈleɪʃn/', 'Good insulation lowers heating bills.', '良好 insulation 降低取暖费。'],
  ['circuit', 'n.', '电路', 'closed path for electric current', 'Science', '/ˈsɜːkɪt/', 'A broken circuit stops the current.', '断路停止电流。'],
  ['electrode', 'n.', '电极', 'conductor through which current enters or leaves', 'Science', '/ɪˈlektrəʊd/', 'Electrodes connect the battery to the bulb.', '电极连接电池与灯泡。'],
  ['magnetic', 'adj.', '磁性的', 'relating to magnetism', 'Science', '/mæɡˈnetɪk/', 'Magnetic fields surround the wire.', '导线周围有磁场。'],
  ['wavelength', 'n.', '波长', 'distance between wave peaks', 'Science', '/ˈweɪvleŋθ/', 'Red light has a longer wavelength.', '红光波长较长。'],
  ['frequency', 'n.', '频率', 'number of cycles per second', 'Science', '/ˈfriːkwənsi/', 'High frequency sounds have high pitch.', '高频声音音调高。'],
  ['amplitude', 'n.', '振幅', 'maximum displacement from equilibrium', 'Science', '/ˈæmplɪtjuːd/', 'Greater amplitude means louder sound.', '振幅越大声音越响。'],
  ['refraction', 'n.', '折射', 'bending of light passing between media', 'Science', '/rɪˈfrækʃn/', 'Refraction makes a straw look bent.', '折射使吸管看起来弯折。'],
  ['reflection', 'n.', '反射', 'throwing back of light or sound', 'Science', '/rɪˈflekʃn/', 'Mirrors work by reflection.', '镜子靠反射成像。'],
  ['microscope', 'n.', '显微镜', 'instrument for viewing tiny objects', 'Science', '/ˈmaɪkrəskəʊp/', 'Cells appear under a microscope.', '细胞在显微镜下可见。'],
  ['telescope', 'n.', '望远镜', 'instrument for viewing distant objects', 'Science', '/ˈtelɪskəʊp/', 'The telescope revealed distant galaxies.', '望远镜揭示遥远星系。'],
  ['satellite', 'n.', '卫星', 'object orbiting a planet', 'Science', '/ˈsætəlaɪt/', 'Weather satellites track storms.', '气象卫星追踪风暴。'],
  ['orbit', 'n.', '轨道', 'curved path of a celestial object', 'Science', '/ˈɔːbɪt/', 'The moon stays in orbit around Earth.', '月球绕地球轨道运行。'],
  ['gravity', 'n.', '重力', 'force attracting bodies with mass', 'Science', '/ˈɡrævəti/', 'Gravity keeps us on the ground.', '重力使我们留在大地上。'],
  ['atom', 'n.', '原子', 'smallest unit of an element', 'Science', '/ˈætəm/', 'An atom has a nucleus and electrons.', '原子有原子核和电子。'],
  ['compound', 'n.', '化合物', 'substance of two or more elements', 'Science', '/ˈkɒmpaʊnd/', 'Water is a compound of hydrogen and oxygen.', '水是氢氧化合物。'],
  ['mixture', 'n.', '混合物', 'substance of two or more materials not chemically combined', 'Science', '/ˈmɪkstʃə/', 'Air is a mixture of gases.', '空气是气体混合物。'],
  ['solution', 'n.', '溶液', 'homogeneous mixture of solute and solvent', 'Science', '/səˈluːʃn/', 'Salt dissolves to form a solution.', '盐溶解形成溶液。'],
  ['solvent', 'n.', '溶剂', 'substance that dissolves a solute', 'Science', '/ˈsɒlvənt/', 'Water is a universal solvent.', '水是 universal 溶剂。'],
  ['solute', 'n.', '溶质', 'substance dissolved in a solvent', 'Science', '/ˈsɒljuːt/', 'Sugar is the solute in sweet tea.', '糖是甜茶中的溶质。'],
  ['precipitate', 'v.', '沉淀', 'form a solid from a solution', 'Science', '/prɪˈsɪpɪteɪt/', 'Ions precipitate when mixed.', '离子混合时沉淀。'],
  ['neutralisation', 'n.', '中和', 'reaction between acid and base', 'Science', '/ˌnjuːtrəlaɪˈzeɪʃn/', 'Neutralisation produces salt and water.', '中和产生盐和水。'],
  ['oxidation', 'n.', '氧化', 'loss of electrons or gain of oxygen', 'Science', '/ˌɒksɪˈdeɪʃn/', 'Iron rusts through oxidation.', '铁通过氧化生锈。'],
  ['reduction', 'n.', '还原', 'gain of electrons or loss of oxygen', 'Science', '/rɪˈdʌkʃn/', 'Reduction occurs at the cathode.', '还原在阴极发生。'],
  ['electrolysis', 'n.', '电解', 'decomposition using electric current', 'Science', '/ɪˌlektrəˈlɪsɪs/', 'Electrolysis splits water into gases.', '电解把水分解成气体。'],
  ['fossil', 'n.', '化石', 'remains of ancient organisms', 'Science', '/ˈfɒsl/', 'Fossils reveal past life forms.', '化石揭示古代生命形式。'],
  ['sedimentary', 'adj.', '沉积的', 'formed from deposited material', 'Science', '/ˌsedɪˈmentri/', 'Sedimentary rocks contain fossils.', '沉积岩含化石。'],
  ['igneous', 'adj.', '火成的', 'formed from cooled magma or lava', 'Science', '/ˈɪɡniəs/', 'Igneous rocks form from molten rock.', '火成岩由熔岩形成。'],
  // Work (50)
  ['deadline', 'n.', '截止日期', 'latest time by which something must be done', 'Work', '/ˈdedlaɪn/', 'We met the project deadline.', '我们赶上了项目截止日期。'],
  ['collaborate', 'v.', '协作', 'work jointly on an activity', 'Work', '/kəˈlæbəreɪt/', 'Teams collaborate across time zones.', '团队跨时区协作。'],
  ['delegate', 'v.', '委派', 'entrust a task to another person', 'Work', '/ˈdelɪɡeɪt/', 'Managers delegate routine tasks.', '经理委派常规任务。'],
  ['efficiency', 'n.', '效率', 'achieving maximum productivity with minimum waste', 'Work', '/ɪˈfɪʃnsi/', 'Automation improves office efficiency.', '自动化提高办公效率。'],
  ['freelance', 'adj.', ' freelance 的；自由职业的', 'working independently for various employers', 'Work', '/ˈfriːlɑːns/', 'She works as a freelance designer.', '她做自由职业设计师。'],
  ['hierarchy', 'n.', '层级', 'system of ranks in an organisation', 'Work', '/ˈhaɪərɑːki/', 'Clear hierarchy speeds decisions.', '清晰层级加快决策。'],
  ['internship', 'n.', '实习', 'period of work experience for students', 'Work', '/ˈɪntɜːnʃɪp/', 'The internship led to a full-time job.', '实习带来全职工作。'],
  ['negotiate', 'v.', '谈判', 'try to reach an agreement', 'Work', '/nɪˈɡəʊʃieɪt/', 'Unions negotiate better wages.', '工会谈判更好工资。'],
  ['overtime', 'n.', '加班', 'time worked beyond normal hours', 'Work', '/ˈəʊvətaɪm/', 'Overtime pay is higher on holidays.', '节假日加班费更高。'],
  ['promotion', 'n.', '晋升', 'advancement to a higher position', 'Work', '/prəˈməʊʃn/', 'Hard work earned her a promotion.', '努力使她获得晋升。'],
  ['redundancy', 'n.', ' redundancy ；裁员', 'dismissal because a job is no longer needed', 'Work', '/rɪˈdʌndənsi/', 'Redundancy affected fifty staff.', '裁员影响五十名员工。'],
  ['recruit', 'v.', '招聘', 'enrol someone as a member or employee', 'Work', '/rɪˈkruːt/', 'Firms recruit graduates each spring.', '公司每年春季招聘毕业生。'],
  ['resign', 'v.', '辞职', 'voluntarily leave a job', 'Work', '/rɪˈzaɪn/', 'He resigned after ten years.', '工作十年后他辞职了。'],
  ['retirement', 'n.', '退休', 'action of leaving one\'s job permanently', 'Work', '/rɪˈtaɪəmənt/', 'Retirement planning starts early.', '退休规划应尽早开始。'],
  ['supervise', 'v.', '监督', 'observe and direct work', 'Work', '/ˈsuːpəvaɪz/', 'Senior staff supervise trainees.', '资深员工监督实习生。'],
  ['workload', 'n.', '工作量', 'amount of work to be done', 'Work', '/ˈwɜːkləʊd/', 'Her workload doubled this term.', '本学期她的工作量翻倍。'],
  ['appraisal', 'n.', '评估', 'formal assessment of performance', 'Work', '/əˈpreɪzl/', 'Annual appraisal sets new goals.', '年度评估设定新目标。'],
  ['benefit', 'n.', '福利', 'advantage or extra provided by employer', 'Work', '/ˈbenɪfɪt/', 'Health benefits include dental care.', '健康福利含牙科护理。'],
  ['commute', 'v.', '通勤', 'travel regularly between home and work', 'Work', '/kəˈmjuːt/', 'Many workers commute by metro.', '许多工人乘地铁通勤。'],
  ['contract', 'n.', '合同', 'written agreement between parties', 'Work', '/ˈkɒntrækt/', 'Read the contract before signing.', '签字前请读合同。'],
  ['credential', 'n.', ' credentials ；资历', 'qualification proving ability', 'Work', '/krəˈdenʃl/', 'Teaching credentials are required.', '教学资历为必需。'],
  ['dismissal', 'n.', '解雇', 'act of removing someone from employment', 'Work', '/dɪsˈmɪsl/', 'Unfair dismissal can be challenged legally.', '不当解雇可依法申诉。'],
  ['entrepreneur', 'n.', '企业家', 'person who starts a business', 'Work', '/ˌɒntrəprəˈnɜː/', 'Young entrepreneurs launch startups.', '年轻企业家创办初创公司。'],
  ['flexible', 'adj.', '灵活的', 'able to change easily', 'Work', '/ˈfleksəbl/', 'Flexible hours help working parents.', '弹性工时帮助在职父母。'],
  ['grievance', 'n.', ' grievance ；申诉', 'official complaint about treatment at work', 'Work', '/ˈɡriːvəns/', 'She filed a grievance with HR.', '她向人事部提出申诉。'],
  ['induction', 'n.', '入职培训', 'introduction for new employees', 'Work', '/ɪnˈdʌkʃn/', 'Induction covers safety rules.', '入职培训涵盖安全规则。'],
  ['interview', 'n.', '面试', 'formal meeting to assess a candidate', 'Work', '/ˈɪntəvjuː/', 'The interview lasted forty minutes.', '面试持续四十分钟。'],
  ['layoff', 'n.', ' layoff ；临时解雇', 'temporary or permanent discharge of workers', 'Work', '/ˈleɪɒf/', 'Layoffs followed the merger.', '合并后出现 layoff。'],
  ['mentorship', 'n.', '导师指导', 'guidance from an experienced colleague', 'Work', '/ˈmentɔːʃɪp/', 'Mentorship accelerates career growth.', '导师指导加速职业发展。'],
  ['networking', 'n.', '人脉拓展', 'interacting to exchange information and contacts', 'Work', '/ˈnetwɜːkɪŋ/', 'Networking opens job opportunities.', '人脉拓展带来工作机会。'],
  ['onboarding', 'n.', ' onboarding ；入职融入', 'process of integrating a new employee', 'Work', '/ˈɒnbɔːdɪŋ/', 'Good onboarding improves retention.', '良好 onboarding 提高留任率。'],
  ['payroll', 'n.', '工资单；薪酬', 'list of employees and their pay', 'Work', '/ˈpeɪrəʊl/', 'Payroll runs on the last Friday.', '工资每月最后一个周五发放。'],
  ['probation', 'n.', '试用期', 'trial period for new employees', 'Work', '/prəˈbeɪʃn/', 'Probation lasts three months.', '试用期三个月。'],
  ['profession', 'n.', ' profession ；职业', 'paid occupation requiring special training', 'Work', '/prəˈfeʃn/', 'Medicine is a respected profession.', '医学是受尊敬的职业。'],
  ['qualification', 'n.', '资格', 'official record of achievement', 'Work', '/ˌkwɒlɪfɪˈkeɪʃn/', 'The job requires a degree qualification.', '该职位需要学位资格。'],
  ['remote', 'adj.', '远程的', 'done from a distance', 'Work', '/rɪˈməʊt/', 'Remote work became common after 2020.', '2020年后远程工作变得普遍。'],
  ['adaptability', 'n.', '适应力', 'ability to adjust to new conditions', 'Work', '/əˌdæptəˈbɪləti/', 'Adaptability helps workers learn new tools.', '适应力帮助员工学习新工具。'],
  ['retrenchment', 'n.', '裁员', 'reduction of costs or staff', 'Work', '/rɪˈtrentʃmənt/', 'Retrenchment hit the manufacturing unit.', '裁员冲击制造部门。'],
  ['severance', 'n.', '遣散费', 'pay given on termination of employment', 'Work', '/ˈsevərəns/', 'Severance packages vary by contract.', '遣散费因合同而异。'],
  ['shift', 'n.', '班次', 'scheduled period of work', 'Work', '/ʃɪft/', 'Night shift workers earn a premium.', '夜班工人有额外津贴。'],
  ['skillset', 'n.', '技能组合', 'range of skills a person has', 'Work', '/ˈskɪlset/', 'Digital skillsets are in demand.', '数字技能组合需求旺盛。'],
  ['strike', 'n.', '罢工', 'refusal to work as protest', 'Work', '/straɪk/', 'The strike halted production.', '罢工使生产停止。'],
  ['telecommute', 'v.', '远程办公', 'work from home using telecom links', 'Work', '/ˈtelikəˌmjuːt/', 'Many staff telecommute twice weekly.', '许多员工每周远程办公两次。'],
  ['tenure', 'n.', ' tenure ；任期', 'period holding an office or position', 'Work', '/ˈtenjə/', 'Academic tenure protects researchers.', '终身教职保护研究者。'],
  ['trainee', 'n.', '受训者', 'person being trained for a job', 'Work', '/ˌtreɪˈniː/', 'Trainees shadow experienced colleagues.', '受训者跟随经验丰富的同事。'],
  ['attrition', 'n.', '人员流失', 'gradual reduction of staff by departure', 'Work', '/əˈtrɪʃn/', 'High attrition raises recruitment costs.', '高流失率增加招聘成本。'],
  ['understaffed', 'adj.', '人手不足的', 'having too few staff', 'Work', '/ˌʌndəˈstɑːft/', 'The ward was understaffed last week.', '上周病房人手不足。'],
  ['union', 'n.', '工会', 'organisation of workers for rights', 'Work', '/ˈjuːniən/', 'The union negotiated safer conditions.', '工会谈判更安全的工作条件。'],
  ['vacancy', 'n.', '空缺职位', 'unoccupied position', 'Work', '/ˈveɪkənsi/', 'Three vacancies were posted online.', '网上发布了三个空缺职位。'],
  ['workplace', 'n.', '工作场所', 'place where people work', 'Work', '/ˈwɜːkpleɪs/', 'A safe workplace reduces accidents.', '安全的工作场所减少事故。'],
  ['workmanship', 'n.', '手艺；做工', 'quality of work done', 'Work', '/ˈwɜːkmənʃɪp/', 'Fine workmanship shows in the details.', '精细做工体现在细节中。'],
];

// --- generation ---

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildIeltsWords() {
  const seen = new Set();
  const words = [];
  for (const [word, pos, zh, enDef, topic, phonetic, example, exampleZh] of RAW_IELTS) {
    const key = word.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    words.push({
      id: `ie-${String(words.length + 1).padStart(3, '0')}`,
      word,
      phonetic,
      pos,
      zh,
      enDef,
      example,
      exampleZh,
      topic,
    });
  }
  return words;
}

function buildIeltsDays(words) {
  const days = [];
  for (let d = 1; d <= 20; d++) {
    const start = (d - 1) * 25;
    days.push({
      day: d,
      title: `IELTS Band 7 · Day ${d}`,
      titleZh: `雅思 Band 7 · 第 ${d} 天`,
      topic: TOPICS[(d - 1) % TOPICS.length],
      vocabIds: words.slice(start, start + 25).map((w) => w.id),
    });
  }
  return days;
}

function jsExport(obj, indent = 2) {
  return JSON.stringify(obj, null, indent);
}

function writeIelts(words, days) {
  const body = `/** Tom's Ground · NACIS Grade 8 · IELTS Band 7 vocabulary */
export const ieltsWords = ${jsExport(words)};

export const ieltsDays = ${jsExport(days)};

export function getIeltsDay(n) {
  return ieltsDays.find((d) => d.day === Number(n)) || null;
}

export function ieltsDayWords(dayPlan) {
  if (!dayPlan?.vocabIds) return [];
  const map = new Map(ieltsWords.map((w) => [w.id, w]));
  return dayPlan.vocabIds.map((id) => map.get(id)).filter(Boolean);
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
`;
  writeFileSync(join(outDir, 'ielts.js'), body);
}

function buildChineseVocab() {
  return RAW_CHINESE_VOCAB.map(([id, category, term, tag, zh, en, tip]) => ({
    id,
    category,
    term,
    tag,
    zh,
    en,
    tip,
  }));
}

function buildMathVocab() {
  return RAW_MATH_VOCAB.map(([id, chapter, zh, en, detail, tipEn, tipZh]) => ({
    id,
    chapter,
    zh,
    en,
    detail,
    tip: `${tipZh} / ${tipEn}`,
  }));
}

function buildChineseQuestions(vocab) {
  const qs = [];
  let n = 1;
  const add = (q) => { qs.push({ id: `ch-q${String(n++).padStart(3, '0')}`, ...q }); };

  add({ category: '修辞', type: 'mcq', prompt: '“春风又绿江南岸” mainly uses which figure? / 「春风又绿江南岸」主要用了哪种修辞？', options: ['拟人 personification', '比喻 metaphor', '夸张 hyperbole', '对偶 antithesis'], answer: 0, explain: '“绿”字把春风写得像有生命，是拟人。 / 绿字赋予春风人的动作。' });
  add({ category: '修辞', type: 'mcq', prompt: '“飞流直下三千尺” is an example of? / 「飞流直下三千尺」属于？', options: ['夸张 hyperbole', '借代 metonymy', '设问 rhetorical question', '反复 repetition'], answer: 0, explain: '数字极度放大，是夸张。 / Extreme number = hyperbole.' });
  add({ category: '修辞', type: 'tf', prompt: '明喻一定出现“像”“如”等词。 / A simile (明喻) must use words like 像 or 如.', answer: true, explain: '明喻常用像、如、仿佛等标记。 / Similes often mark with 像/如.' });
  add({ category: '修辞', type: 'mcq', prompt: '“问君能有几多愁？恰似一江春水向东流” uses? / 该句用了？', options: ['设问 + 比喻 question + metaphor', '反问 + 夸张 rhetorical Q + hyperbole', '对偶 + 借代 antithesis + metonymy', '反复 + 通感 repetition + synesthesia'], answer: 0, explain: '前句设问，后句比喻。 / Question then metaphor.' });
  add({ category: '修辞', type: 'tf', prompt: '排比只限于三个句子。 / Parallelism (排比) must be exactly three sentences.', answer: false, explain: '排比通常三句及以上，结构相似即可。 / Usually ≥3 parallel clauses.' });
  add({ category: '成语', type: 'mcq', prompt: '比喻死守经验不知变通的是？ / Which idiom means rigidly clinging to old ways?', options: ['守株待兔 wait by the stump', '画蛇添足 add legs to a snake', '亡羊补牢 mend the fold', '三顾茅庐 three visits'], answer: 0, explain: '守株待兔喻不知变通。 / Wait-for-rabbit = inflexible.' });
  add({ category: '成语', type: 'mcq', prompt: '“亡羊补牢”告诉我们要？ / 亡羊补牢 teaches us to ______.', options: ['及时补救 correct in time', '放弃努力 give up', '盲目模仿 copy blindly', '自欺欺人 deceive oneself'], answer: 0, explain: '出了问题及时补救。 / Fix problems promptly.' });
  add({ category: '成语', type: 'tf', prompt: '“刻舟求剑”讽刺不知变通的人。 / 刻舟求剑 mocks those who cannot adapt.', answer: true, explain: '刻舟求剑喻拘泥成规。 / Marks rigidity.' });
  add({ category: '成语', type: 'mcq', prompt: '“青出于蓝而胜于蓝”说明？ / This idiom means ______.', options: ['学生可超过老师 students may surpass teachers', '颜色更深 colours darken', '水比蓝草蓝 water is bluer', '学习无用 study is useless'], answer: 0, explain: '比喻后人超过前人。 / Later generation excels.' });
  add({ category: '成语', type: 'mcq', prompt: '形容刻苦自励、发愤图强的是？ / Which idiom means self-discipline to improve?', options: ['卧薪尝胆 sleep on brushwood', '乐不思蜀 forget home in joy', '对牛弹琴 play lute to cow', '买椟还珠 return pearl keep box'], answer: 0, explain: '卧薪尝胆喻刻苦自励。 / Brushwood/gall = resolve.' });
  add({ category: '文言', type: 'mcq', prompt: '“之”在“公将鼓之”中的用法是？ / 之 in 公将鼓之 is ______.', options: ['代词 it/him pronoun', '的 (possessive)', '到 go to', '主谓之间取消句子独立性'], answer: 0, explain: '此处“之”代指曹公之鼓声/齐师。 / Pronoun object.' });
  add({ category: '文言', type: 'mcq', prompt: '“而”在“学而不思则罔”中表示？ / 而 here means ______.', options: ['转折 but/yet', '并列 and', '修饰', '顺承 then'], answer: 0, explain: '学而不思则罔：只学不思，表转折。 / Contrast.' });
  add({ category: '文言', type: 'tf', prompt: '古汉语“走”常义为“跑”。 / Classical 走 usually means run.', answer: true, explain: '古义走=跑，今义走=walk。 / Archaic 走 = run.' });
  add({ category: '文言', type: 'mcq', prompt: '“以”在“不以物喜”中意思是？ / 以 in 不以物喜 means ______.', options: ['因为 because', '用 with', '把 take', '把……当作 regard as'], answer: 0, explain: '不以物喜：不因为外物而喜。 / Because of.' });
  add({ category: '文言', type: 'mcq', prompt: '“者”在“陈胜者，阳城人也”中的作用是？ / 者 here ______.', options: ['表判断/停顿 marks judgment/pause', '……的人 person who', '代词 he', '语气词 only'], answer: 0, explain: '……者，……也：判断句式。 / Judgment pattern.' });
  add({ category: '阅读', type: 'mcq', prompt: '分析“伏笔”主要关注？ / Foreshadowing analysis focuses on ______.', options: ['后文照应 later echo', '修辞手法 only rhetoric', '字音押韵 rhyme', '标点用法 punctuation'], answer: 0, explain: '伏笔为后文情节做暗示。 / Hints future plot.' });
  add({ category: '阅读', type: 'tf', prompt: '环境描写只写自然景物。 / Setting description only covers nature.', answer: false, explain: '环境描写含自然环境与社会环境。 / Natural + social setting.' });
  add({ category: '阅读', type: 'mcq', prompt: '议论文的“论据”不包括？ / Which is NOT evidence in argumentative writing?', options: ['作者主观情绪 alone author mood alone', '事实数据 facts/data', '道理论证 reasoning', '引用名言 quotations'], answer: 0, explain: '论据需客观材料，非纯情绪。 / Evidence needs support, not mood alone.' });
  add({ category: '病句', type: 'mcq', prompt: '哪句有语病？ / Which sentence is faulty?', options: ['通过这次活动，使我们收获很大。 Through this activity, we gained much.', '这次活动使我们收获很大。', '我们在活动中收获很大。', '这次活动让同学们收获很大。'], answer: 0, explain: '“通过……使……”缺主语。 / Missing subject.' });
  add({ category: '病句', type: 'mcq', prompt: '哪句搭配不当？ / Which has improper collocation?', options: ['提高水平 raise level', '改善条件 improve conditions', '增加质量 increase quality', '增强意识 strengthen awareness'], answer: 2, explain: '应说“提高质量”，不说“增加质量”。 / Improve quality, not increase.' });
  add({ category: '病句', type: 'tf', prompt: '“能否坚持，是成功的关键”没有语病。 / 能否坚持，是成功的关键 is correct.', answer: false, explain: '两面对一面：能否 vs 成功。 / Two-sided vs one-sided.' });
  add({ category: '病句', type: 'mcq', prompt: '“原因是……造成的”属于？ / 原因是……造成的 is ______.', options: ['句式杂糅 mixed pattern', '成分残缺 missing element', '语序不当 wrong order', '表意不明 ambiguous'], answer: 0, explain: '“原因是……”与“……造成的”杂糅。 / Redundant structure.' });
  add({ category: '阅读', type: 'mcq', prompt: '倒叙的作用常是？ / Flashback often ______.', options: ['设置悬念 create suspense', '说明事理 explain facts', '列举数据 list data', '直接点明主旨 state theme directly'], answer: 0, explain: '倒叙常制造悬念或突出结果。 / Suspense/emphasis.' });
  add({ category: '修辞', type: 'mcq', prompt: '“双关”依靠？ / Pun (双关) relies on ______.', options: ['一词多义或谐音 double meaning/homophone', '数量夸张 numeric hyperbole', '人物对话 dialogue only', '环境描写 setting'], answer: 0, explain: '双关利用语义或语音双关。 / Meaning or sound double.' });
  add({ category: '成语', type: 'tf', prompt: '“滥竽充数”比喻没有真才实学混在其中。 / 滥竽充数 means lacking skill but pretending.', answer: true, explain: '不会吹竽却混在乐队里。 / Pretend competence.' });

  // auto MCQ from vocab
  const idiomPool = vocab.filter((v) => v.tag === 'idiom');
  const rhetoricPool = vocab.filter((v) => v.tag === 'rhetoric');
  const wenyanPool = vocab.filter((v) => v.category === '文言实词');
  const readPool = vocab.filter((v) => v.category === '阅读');

  for (let i = 0; i < 15 && i < idiomPool.length; i++) {
    const v = idiomPool[i];
    const others = idiomPool.filter((x) => x.id !== v.id).slice(0, 3);
    add({
      category: '成语',
      type: 'mcq',
      prompt: `「${v.term}」的意思是？ / Meaning of ${v.term}?`,
      options: [v.zh, ...others.map((o) => o.zh)],
      answer: 0,
      explain: `${v.tip} / ${v.en}`,
    });
  }
  for (let i = 0; i < 10 && i < rhetoricPool.length; i++) {
    const v = rhetoricPool[i];
    add({
      category: '修辞',
      type: 'tf',
      prompt: `「${v.term}」属于修辞手法。 / ${v.term} is a rhetorical device.`,
      answer: true,
      explain: `${v.zh}：${v.tip}`,
    });
  }
  for (let i = 0; i < 10 && i < wenyanPool.length; i++) {
    const v = wenyanPool[i];
    add({
      category: '文言',
      type: 'mcq',
      prompt: `文言虚词/实词「${v.term}」常见义包括？ / Common sense of ${v.term}?`,
      options: [v.zh, '仅作语气词 only modal', '无实义 no meaning', '只能作主语 subject only'],
      answer: 0,
      explain: v.tip,
    });
  }
  for (let i = 0; i < 8 && i < readPool.length; i++) {
    const v = readPool[i];
    add({
      category: '阅读',
      type: 'tf',
      prompt: `阅读术语「${v.term}」：${v.zh}。 / Reading term ${v.term}: ${v.en}`,
      answer: true,
      explain: v.tip,
    });
  }

  return qs.slice(0, Math.max(60, qs.length));
}

function buildMathQuestions(vocab) {
  const qs = [];
  let n = 1;
  const add = (q) => { qs.push({ id: `m-q${String(n++).padStart(3, '0')}`, ...q }); };

  add({ chapter: '一次函数', type: 'mcq', prompt: 'y=2x-3 的斜率是？ / Slope of y=2x-3?', options: ['2', '-3', '3', '1/2'], answer: 0, explain: 'k=2。 / In y=kx+b, k=2.' });
  add({ chapter: '一次函数', type: 'mcq', prompt: 'y=-x+4 与 y=-x-1 的位置关系？ / Relation of y=-x+4 and y=-x-1?', options: ['平行 parallel', '相交 intersect', '重合 coincide', '垂直 perpendicular'], answer: 0, explain: 'k 相同 b 不同 → 平行。 / Same k, different b.' });
  add({ chapter: '一次函数', type: 'tf', prompt: '一次函数图象一定过原点。 / Linear functions always pass the origin.', answer: false, explain: '仅当 b=0 时过原点。 / Only if b=0.' });
  add({ chapter: '方程组', type: 'mcq', prompt: '解方程组可用？ / To solve a system you may use ______.', options: ['代入法/加减法 substitution/elimination', '开平方 square root only', '配方法 completing square only', '因式分解 alone'], answer: 0, explain: '二元一次方程组常用代入或加减。 / Standard methods.' });
  add({ chapter: '勾股', type: 'mcq', prompt: '直角边 3 和 4，斜边是？ / Legs 3 and 4, hypotenuse?', options: ['5', '7', '12', '25'], answer: 0, explain: '3²+4²=5²。 / Classic 3-4-5 triple.' });
  add({ chapter: '勾股', type: 'tf', prompt: '勾股定理适用于任意三角形。 / Pythagorean theorem applies to any triangle.', answer: false, explain: '仅直角三角形。 / Right triangles only.' });
  add({ chapter: '全等', type: 'mcq', prompt: '不能判定三角形全等的是？ / Which does NOT prove triangle congruence?', options: ['SSA（一般） SSA (generally)', 'SSS', 'SAS', 'ASA'], answer: 0, explain: 'SSA 一般不能判定全等（除非是 HL）。 / SSA ambiguous.' });
  add({ chapter: '相似', type: 'mcq', prompt: '两角对应相等可判定？ / Two equal angles prove ______.', options: ['三角形相似 triangle similarity', '三角形全等 congruence', '平行 parallel lines', '垂直 perpendicular'], answer: 0, explain: 'AA 相似判定。 / AA similarity.' });
  add({ chapter: '实数', type: 'mcq', prompt: '下列是无理数的是？ / Which is irrational?', options: ['√2', '0.25', '22/7（分数形式） 22/7 as fraction', '0'], answer: 0, explain: '√2 无限不循环。 / √2 is irrational.' });
  add({ chapter: '实数', type: 'tf', prompt: 'π 是有理数。 / π is rational.', answer: false, explain: 'π 是无理数。 / π is irrational.' });
  add({ chapter: '因式分解', type: 'mcq', prompt: 'x²-9 分解为？ / Factor x²-9.', options: ['(x+3)(x-3)', '(x-3)²', '(x+9)(x-1)', 'x(x-9)'], answer: 0, explain: '平方差公式。 / Difference of squares.' });
  add({ chapter: '因式分解', type: 'mcq', prompt: 'x²+6x+9 分解为？ / Factor x²+6x+9.', options: ['(x+3)²', '(x+9)(x+1)', '(x-3)²', 'x(x+6)+9'], answer: 0, explain: '完全平方式。 / Perfect square.' });
  add({ chapter: '不等式', type: 'mcq', prompt: '若 a>b，则 -2a 与 -2b？ / If a>b, compare -2a and -2b.', options: ['-2a < -2b', '-2a > -2b', '相等 equal', '无法比较'], answer: 0, explain: '乘负数不等号方向改变。 / Multiply by negative reverses sign.' });
  add({ chapter: '统计', type: 'mcq', prompt: '数据 2,3,3,7 的众数是？ / Mode of 2,3,3,7?', options: ['3', '2', '7', '3.75'], answer: 0, explain: '3 出现次数最多。 / 3 appears most.' });
  add({ chapter: '统计', type: 'mcq', prompt: '数据 1,3,5,7,9 的中位数是？ / Median of 1,3,5,7,9?', options: ['5', '3', '7', '4'], answer: 0, explain: '排序后中间值是 5。 / Middle value is 5.' });
  add({ chapter: '坐标', type: 'mcq', prompt: '点 (0,-3) 在？ / Point (0,-3) lies on ______.', options: ['y 轴 negative y-axis', 'x 轴 x-axis', '第一象限 QI', '原点 origin'], answer: 0, explain: '横坐标为 0 在 y 轴。 / x=0 on y-axis.' });
  add({ chapter: '几何', type: 'tf', prompt: '等边三角形一定是锐角三角形。 / Equilateral triangles are acute.', answer: true, explain: '三角均为 60°。 / All angles 60°.' });
  add({ chapter: '分式', type: 'tf', prompt: '解分式方程必须验根。 / Check roots after solving fractional equations.', answer: true, explain: '去分母可能产生增根。 / Extraneous roots possible.' });
  add({ chapter: '函数', type: 'mcq', prompt: 'k<0 时 y=kx+b 的图象？ / When k<0, graph of y=kx+b ______.', options: ['从左到右下降 falls left to right', '从左到右上升 rises', '水平 horizontal', '垂直 vertical'], answer: 0, explain: '负斜率递减。 / Negative slope decreases.' });
  add({ chapter: '相似', type: 'mcq', prompt: '相似三角形面积比等于？ / Area ratio of similar triangles equals ______.', options: ['相似比的平方 square of scale factor', '相似比 scale factor', '相似比立方 cube', '周长比 perimeter ratio'], answer: 0, explain: '面积比 = k²。 / Areas scale by k².' });

  const pool = vocab.slice();
  for (let i = 0; i < 40 && i < pool.length; i++) {
    const v = pool[i];
    const others = pool.filter((x) => x.id !== v.id).slice(0, 3);
    add({
      chapter: v.chapter,
      type: i % 3 === 0 ? 'tf' : 'mcq',
      prompt: i % 3 === 0
        ? `术语「${v.zh}」的英文是 ${v.en}。 / Term ${v.zh} translates as ${v.en}.`
        : `「${v.zh}」的英文是？ / English for ${v.zh}?`,
      options: i % 3 === 0 ? undefined : [v.en, ...others.map((o) => o.en)],
      answer: i % 3 === 0 ? true : 0,
      explain: v.tip,
    });
  }

  return qs.slice(0, Math.max(60, qs.length));
}

function writeChinese(vocab, questions) {
  const body = `/** Tom's Ground · NACIS Grade 8 · Chinese */
export const chineseVocab = ${jsExport(vocab)};

export const chineseQuestions = ${jsExport(questions)};

export function filterChineseVocab({ category = 'all', tag = 'all', limit = 0 } = {}) {
  let list = chineseVocab.slice();
  if (category && category !== 'all') list = list.filter((v) => v.category === category);
  if (tag && tag !== 'all') list = list.filter((v) => v.tag === tag);
  shuffle(list);
  if (limit > 0) list = list.slice(0, limit);
  return list;
}

export function filterChineseQuestions({ category = 'all', type = 'all', limit = 0 } = {}) {
  let list = chineseQuestions.slice();
  if (category && category !== 'all') list = list.filter((q) => q.category === category);
  if (type && type !== 'all') list = list.filter((q) => q.type === type);
  shuffle(list);
  if (limit > 0) list = list.slice(0, limit);
  return list;
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
`;
  writeFileSync(join(outDir, 'chinese.js'), body);
}

function writeMath(vocab, questions) {
  const body = `/** Tom's Ground · NACIS Grade 8 · Math */
export const mathVocab = ${jsExport(vocab)};

export const mathQuestions = ${jsExport(questions)};

export function filterMathVocab({ chapter = 'all', limit = 0 } = {}) {
  let list = mathVocab.slice();
  if (chapter && chapter !== 'all') list = list.filter((v) => v.chapter === chapter);
  shuffle(list);
  if (limit > 0) list = list.slice(0, limit);
  return list;
}

export function filterMathQuestions({ chapter = 'all', type = 'all', limit = 0 } = {}) {
  let list = mathQuestions.slice();
  if (chapter && chapter !== 'all') list = list.filter((q) => q.chapter === chapter);
  if (type && type !== 'all') list = list.filter((q) => q.type === type);
  shuffle(list);
  if (limit > 0) list = list.slice(0, limit);
  return list;
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
`;
  writeFileSync(join(outDir, 'math.js'), body);
}

const ieltsWords = buildIeltsWords();
if (ieltsWords.length < 500) {
  console.error(`ERROR: only ${ieltsWords.length} unique IELTS words (need ≥500)`);
  process.exit(1);
}
const ieltsDays = buildIeltsDays(ieltsWords.slice(0, 500));
const chineseVocab = buildChineseVocab();
const chineseQuestions = buildChineseQuestions(chineseVocab);
const mathVocab = buildMathVocab();
const mathQuestions = buildMathQuestions(mathVocab);

writeIelts(ieltsWords.slice(0, 500), ieltsDays);
writeChinese(chineseVocab, chineseQuestions);
writeMath(mathVocab, mathQuestions);

console.log(JSON.stringify({
  ieltsWords: ieltsWords.slice(0, 500).length,
  ieltsDays: ieltsDays.length,
  wordsPerDay: ieltsDays.map((d) => d.vocabIds.length),
  chineseVocab: chineseVocab.length,
  chineseQuestions: chineseQuestions.length,
  mathVocab: mathVocab.length,
  mathQuestions: mathQuestions.length,
}, null, 2));
