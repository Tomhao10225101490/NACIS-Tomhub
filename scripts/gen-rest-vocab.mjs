#!/usr/bin/env node
/** Generates scripts/ielts-vocab-rest.mjs — 675 words for 9 IELTS topics */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), 'ielts-vocab-rest.mjs');

function t(topic, rows) {
  return rows.map((r) => [...r, topic]);
}

// [word, pos, zh, enDef, phonetic] × 75 per topic
const REST = [
  ...t('Urban', [
    ['metropolis','n.','大都市','very large densely populated city','/məˈtrɒpəlɪs/'],
    ['suburban','adj.','郊区的','relating to suburbs outside a city','/səˈbɜːbən/'],
    ['infrastructure','n.','基础设施','basic physical systems of a city','/ˈɪnfrəstrʌktʃə/'],
    ['pedestrian','n.','行人','person walking rather than using a vehicle','/pəˈdestriən/'],
    ['congestion','n.','拥堵','overcrowding causing traffic delays','/kənˈdʒestʃən/'],
    ['zoning','n.','分区规划','regulation of land use in an area','/ˈzəʊnɪŋ/'],
    ['skyscraper','n.','摩天大楼','very tall building in a city','/ˈskaɪskreɪpə/'],
    ['sprawl','n.','城市蔓延','spread of urban areas into countryside','/sprɔːl/'],
    ['transit','n.','公共交通','public transportation system','/ˈtrænzɪt/'],
    ['walkability','n.','步行友好度','how friendly an area is for walking','/ˌwɔːkəˈbɪləti/'],
    ['densification','n.','密集化','increasing density of urban development','/ˌdensɪfɪˈkeɪʃn/'],
    ['mixed-use','adj.','混合用途的','combining residential and commercial use','/mɪkst juːs/'],
    ['brownfield','n.','棕地','previously developed land available for reuse','/ˈbraʊnfiːld/'],
    ['greenfield','n.','绿地','undeveloped land for new construction','/ˈɡriːnfiːld/'],
    ['revitalisation','n.','复兴改造','process of making an area active again','/riːˌvaɪtəlaɪˈzeɪʃn/'],
    ['commuter','n.','通勤者','person travelling regularly to work','/kəˈmjuːtə/'],
    ['overcrowding','n.','过度拥挤','too many people in an area','/ˌəʊvəˈkraʊdɪŋ/'],
    ['megacity','n.','特大城市','city with over ten million inhabitants','/ˈmeɡəsɪti/'],
    ['boulevard','n.','林荫大道','wide street lined with trees','/ˈbuːləvɑːd/'],
    ['precinct','n.','步行区；辖区','defined area within a city','/ˈpriːsɪŋkt/'],
    ['high-rise','n.','高层建筑','tall building with many floors','/ˈhaɪ raɪz/'],
    ['smart-city','n.','智慧城市','city using technology to improve services','/smɑːt ˈsɪti/'],
    ['streetscape','n.','街景','visual appearance of a street','/ˈstriːtskeɪp/'],
    ['waterfront','n.','滨水区','land alongside a body of water','/ˈwɔːtəfrʌnt/'],
    ['accessibility','n.','无障碍通行','ease of access for all people','/əkˌsesəˈbɪləti/'],
    ['amenity','n.','便利设施','useful feature of a place','/əˈmiːnəti/'],
    ['civic-centre','n.','市民中心','area with public buildings and services','/ˈsɪvɪk sentə/'],
    ['crosswalk','n.','人行横道','marked path for pedestrians to cross','/ˈkrɒswɔːk/'],
    ['demolition','n.','拆除','act of pulling down a building','/ˌdeməˈlɪʃn/'],
    ['downtown','n.','市中心','central business area of a city','/ˌdaʊnˈtaʊn/'],
    ['facade','n.','立面','front of a building facing a street','/fəˈsɑːd/'],
    ['gridlock','n.','交通瘫痪','traffic congestion blocking entire network','/ˈɡrɪdlɒk/'],
    ['intersection','n.','交叉路口','place where roads meet','/ˌɪntəˈsekʃn/'],
    ['landmark','n.','地标','easily recognised building or feature','/ˈlændmɑːk/'],
    ['light-rail','n.','轻轨','urban rail system lighter than metro','/laɪt reɪl/'],
    ['neighbourhood','n.','社区','district within a town or city','/ˈneɪbəhʊd/'],
    ['parkland','n.','绿地公园','open land used as a park','/ˈpɑːklænd/'],
    ['pavement','n.','人行道','path at the side of a road','/ˈpeɪvmənt/'],
    ['plaza','n.','广场','public square or open area','/ˈplɑːzə/'],
    ['redevelopment','n.','再开发','development of an area again','/ˌriːdɪˈveləpmənt/'],
    ['residential','adj.','住宅的','designed for people to live in','/ˌrezɪˈdenʃl/'],
    ['roundabout','n.','环岛','circular junction for traffic','/ˈraʊndəbaʊt/'],
    ['skyline','n.','天际线','outline of buildings against the sky','/ˈskaɪlaɪn/'],
    ['town-planning','n.','城市规划','control of land use and development','/taʊn ˈplænɪŋ/'],
    ['underpass','n.','地下通道','passage beneath a road or railway','/ˈʌndəpɑːs/'],
    ['urban-core','n.','城市核心','central most densely built area','/ˈɜːbən kɔː/'],
    ['walkable','adj.','适合步行的','safe and pleasant for walking','/ˈwɔːkəbl/'],
    ['arcade','n.','拱廊街','covered passageway with shops','/ɑːˈkeɪd/'],
    ['block','n.','街区','section of a city enclosed by streets','/blɒk/'],
    ['district','n.','区','defined area of a city','/ˈdɪstrɪkt/'],
    ['exurb','n.','远郊','region beyond suburbs','/ˈeɡzɜːb/'],
    ['housing-estate','n.','住宅小区','area of houses built together','/ˈhaʊzɪŋ ɪsteɪt/'],
    ['land-use','n.','土地利用','purpose for which land is used','/lænd juːs/'],
    ['mixed-income','adj.','混合收入的','combining residents of different income levels','/mɪkst ˈɪnkʌm/'],
    ['population-density','n.','人口密度','number of people per unit area','/ˌpɒpjuˈleɪʃn ˈdensəti/'],
    ['sidewalk','n.','人行道','paved path beside a road','/ˈsaɪdwɔːk/'],
    ['streetcar','n.','有轨电车','vehicle running on rails in a street','/ˈstriːtkɑː/'],
    ['subdivision','n.','分区；小区','division of land into plots','/ˌsʌbdɪˈvɪʒn/'],
    ['traffic-calming','n.','交通减速措施','design to reduce vehicle speed','/ˈtræfɪk ˈkɑːmɪŋ/'],
    ['transit-oriented','adj.','公交导向的','designed around public transport hubs','/ˈtrænzɪt ˈɔːrientɪd/'],
    ['uptown','n.','上城区','residential part away from centre','/ˈʌptaʊn/'],
    ['urban-heat-island','n.','城市热岛','urban area warmer than surroundings','/ˈɜːbən hiːt ˈaɪlənd/'],
    ['viaduct','n.','高架桥','long bridge carrying a road over a valley','/ˈvaɪədʌkt/'],
    ['wayfinding','n.','导向标识','information helping people navigate spaces','/ˈweɪfaɪndɪŋ/'],
    ['curbside','n.','路边','edge of pavement beside a road','/ˈkɜːbsaɪd/'],
    ['footprint','n.','占地面积','area occupied by a building','/ˈfʊtprɪnt/'],
    ['low-rise','adj.','低层的','having relatively few storeys','/ləʊ raɪz/'],
    ['township','n.','镇区','small town or suburb','/ˈtaʊnʃɪp/'],
    ['zoning-code','n.','分区法规','regulations governing land use','/ˈzəʊnɪŋ kəʊd/'],
    ['affordable-housing','n.','可负担住房','housing within reach of low-income people','/əˈfɔːdəbl ˈhaʊzɪŋ/'],
    ['warehouse-district','n.','仓库区','area of converted industrial buildings','/ˈweəhaʊs ˈdɪstrɪkt/'],
    ['urbanisation','n.','城市化','growth of cities and migration to them','/ˌɜːbənaɪˈzeɪʃn/'],
    ['gentrification','n.','绅士化','renovation displacing poorer residents','/ˌdʒentrɪfɪˈkeɪʃn/'],
    ['slum','n.','贫民窟','overcrowded urban area with poor conditions','/slʌm/'],
    ['overpass','n.','立交桥','bridge carrying one road over another','/ˈəʊvəpɑːs/'],
    ['pedestrianisation','n.','步行化','conversion of streets for pedestrians only','/pəˌdestriənaɪˈzeɪʃn/'],
  ]),
];

writeFileSync(out, `export const REST_WORDS = ${JSON.stringify(REST, null, 2)};\n`);
console.log('REST so far:', REST.length);
