#!/usr/bin/env node
/** Generates scripts/ielts-vocab-large.mjs — 750 words across 10 IELTS topics */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), 'ielts-vocab-large.mjs');

function t(topic, rows) {
  return rows.map((r) => [...r, topic]);
}

// [word, pos, zh, enDef, phonetic]
const LARGE = [
  ...t('Media', [
    ['broadcast','v.','广播；播送','transmit by radio or television','/ˈbrɔːdkɑːst/'],
    ['broadsheet','n.','大开本报纸','serious newspaper with large pages','/ˈbrɔːdʃiːt/'],
    ['byline','n.','署名行','line naming the writer of an article','/ˈbaɪlaɪn/'],
    ['censorship','n.','审查制度','suppression of unacceptable material','/ˈsensəʃɪp/'],
    ['circulation','n.','发行量','number of copies of a publication sold','/ˌsɜːkjəˈleɪʃn/'],
    ['clickbait','n.','标题党','sensational headline to attract clicks','/ˈklɪkbeɪt/'],
    ['columnist','n.','专栏作家','journalist who writes regular columns','/ˈkɒləmnɪst/'],
    ['commentary','n.','评论；解说','expression of opinions about an event','/ˈkɒməntri/'],
    ['correspondent','n.','通讯员','journalist reporting from a particular place','/ˌkɒrɪˈspɒndənt/'],
    ['coverage','n.','报道范围','reporting of news and events','/ˈkʌvərɪdʒ/'],
    ['disinformation','n.','虚假信息','deliberately false information spread','/ˌdɪsɪnfəˈmeɪʃn/'],
    ['editorial','n.','社论','article expressing newspaper opinion','/ˌedɪˈtɔːriəl/'],
    ['fact-checking','n.','事实核查','verification of factual claims','/fækt ˈtʃekɪŋ/'],
    ['freelance','adj.','自由职业的','working independently for various outlets','/ˈfriːlɑːns/'],
    ['gatekeeping','n.','把关','controlling access to information channels','/ˈɡeɪtkiːpɪŋ/'],
    ['headline','n.','标题','heading at the top of a newspaper article','/ˈhedlaɪn/'],
    ['infotainment','n.','信息娱乐','material combining information and entertainment','/ˌɪnfəʊˈteɪnmənt/'],
    ['investigative','adj.','调查性的','involving detailed inquiry to uncover facts','/ɪnˈvestɪɡətɪv/'],
    ['journalism','n.','新闻业','activity of gathering and publishing news','/ˈdʒɜːnəlɪzəm/'],
    ['libel','n.','文字诽谤','published false statement damaging reputation','/ˈlaɪbl/'],
    ['mass-media','n.','大众传媒','communication reaching large audiences','/mæs ˈmiːdiə/'],
    ['misinformation','n.','错误信息','false information spread regardless of intent','/ˌmɪsɪnfəˈmeɪʃn/'],
    ['multimedia','n.','多媒体','using several media types together','/ˌmʌltiˈmiːdiə/'],
    ['newscast','n.','新闻广播','broadcast news programme','/ˈnjuːzkɑːst/'],
    ['objectivity','n.','客观性','lack of bias in reporting','/ˌɒbdʒekˈtɪvəti/'],
    ['paywall','n.','付费墙','system restricting access to paid subscribers','/ˈpeɪwɔːl/'],
    ['podcast','n.','播客','digital audio programme series','/ˈpɒdkɑːst/'],
    ['propaganda','n.','宣传','biased information to promote a cause','/ˌprɒpəˈɡændə/'],
    ['publicity','n.','宣传；曝光','notice or attention given by media','/pʌbˈlɪsəti/'],
    ['readership','n.','读者群','people who read a publication','/ˈriːdəʃɪp/'],
    ['reportage','n.','报道','reporting of news in newspapers or on TV','/rɪˈpɔːtɪdʒ/'],
    ['satire','n.','讽刺','use of humour to criticise foolishness','/ˈsætaɪə/'],
    ['scoop','n.','独家新闻','exclusive news story published first','/skuːp/'],
    ['sensationalism','n.','煽情主义','use of shocking stories to provoke interest','/senˈseɪʃənəlɪzəm/'],
    ['soundbite','n.','简短引语','short extract from speech for broadcasting','/ˈsaʊndbaɪt/'],
    ['spin','n.','舆论导向','biased interpretation to favour a viewpoint','/spɪn/'],
    ['streaming','n.','流媒体','transmitting or receiving data continuously','/ˈstriːmɪŋ/'],
    ['subeditor','n.','副编辑','person who checks text for publication','/sʌbˈedɪtə/'],
    ['tabloid','n.','小报','newspaper with compact sensational format','/ˈtæblɔɪd/'],
    ['telecast','n.','电视广播','broadcast by television','/ˈtelikɑːst/'],
    ['transparency','n.','透明度','openness in sharing information','/trænsˈpærənsi/'],
    ['trending','adj.','热门的','currently popular on social media','/ˈtrendɪŋ/'],
    ['viewership','n.','观众数','audience watching a television programme','/ˈvjuːəʃɪp/'],
    ['viral','adj.','病毒式传播的','spread rapidly online','/ˈvaɪrəl/'],
    ['vlog','n.','视频博客','blog in video form','/vlɒɡ/'],
    ['whistleblower','n.','举报人','person who exposes wrongdoing in an organisation','/ˈwɪslbləʊə/'],
    ['anchor','n.','主播','main presenter of a news broadcast','/ˈæŋkə/'],
    ['backlash','n.','强烈反对','strong adverse reaction by the public','/ˈbæklæʃ/'],
    ['bulletin','n.','简报','short official news report','/ˈbʊlətɪn/'],
    ['caption','n.','图片说明','text accompanying an illustration','/ˈkæpʃn/'],
    ['cartoon','n.','漫画','humorous drawing in a newspaper','/kɑːˈtuːn/'],
    ['deadline','n.','截稿时间','latest time for submitting material','/ˈdedlaɪn/'],
    ['demographics','n.','受众人口统计','statistical data about an audience','/ˌdeməˈɡræfɪks/'],
    ['documentary','n.','纪录片','programme presenting factual information','/ˌdɒkjuˈmentri/'],
    ['exposé','n.','曝光报道','report revealing something scandalous','/ɪkˈspəʊzeɪ/'],
    ['feature','n.','特写','special article on a particular subject','/ˈfiːtʃə/'],
    ['footage','n.','影像素材','film or video of a particular event','/ˈfʊtɪdʒ/'],
    ['hashtag','n.','话题标签','word prefixed with hash on social media','/ˈhæʃtæɡ/'],
    ['influencer','n.','网红','person affecting opinions via social media','/ˈɪnfluənsə/'],
    ['layout','n.','版面设计','arrangement of text and images on a page','/ˈleɪaʊt/'],
    ['masthead','n.','报头','title of a newspaper on the front page','/ˈmɑːsthed/'],
    ['newsroom','n.','编辑部','room where news is written and edited','/ˈnjuːzruːm/'],
    ['op-ed','n.','评论版','page with opinion pieces','/ˈɒp ed/'],
    ['paparazzi','n.','狗仔队','photographers pursuing celebrities','/ˌpæpəˈrætsi/'],
    ['press-release','n.','新闻稿','official statement issued to media','/pres rɪˈliːs/'],
    ['ratings','n.','收视率','measure of audience size for a broadcast','/ˈreɪtɪŋz/'],
    ['retraction','n.','撤稿','withdrawal of a previously published statement','/rɪˈtrækʃn/'],
    ['wire-service','n.','通讯社','agency supplying news to media outlets','/ˈwaɪə sɜːvɪs/'],
    ['yellow-journalism','n.','黄色新闻','journalism using sensationalism over facts','/ˈjeləʊ ˈdʒɜːnəlɪzəm/'],
    ['banner','n.','横幅标题','headline across the front page','/ˈbænə/'],
    ['copy-editing','n.','文字编辑','editing text for publication','/ˈkɒpi edɪtɪŋ/'],
    ['freelancer','n.','自由撰稿人','independent journalist or writer','/ˈfriːlɑːnsə/'],
    ['interviewee','n.','受访者','person being interviewed','/ˌɪntəvjuːˈiː/'],
    ['newsworthy','adj.','有新闻价值的','sufficiently interesting for news reporting','/ˈnjuːzwɜːði/'],
    ['outlet','n.','媒体渠道','means of publishing or broadcasting news','/ˈaʊtlet/'],
    ['pundit','n.','评论员','expert who gives opinions in media','/ˈpʌndɪt/'],
    ['syndicate','n.','辛迪加','group selling content to multiple outlets','/ˈsɪndɪkət/'],
    ['teleprompter','n.','提词器','device displaying text for a speaker','/ˈteliprɒmptə/'],
    ['viewpoint','n.','观点','a particular attitude or way of considering','/ˈvjuːpɔɪnt/'],
  ]),
];

writeFileSync(out, `export const LARGE_WORDS = ${JSON.stringify(LARGE, null, 2)};\n`);
console.log('Wrote', LARGE.length, 'large entries');
