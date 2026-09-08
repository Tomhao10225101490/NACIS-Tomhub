import { addBook, emitAll } from './gen-textbooks.mjs';

// pri-g3 · 三年级上册
addBook('pri-g3', 'g3-3a', [
  ['u1', 'Hello', [
    ['hello', 'int.', '你好'], ['I', 'pron.', '我'], ['am', 'v.', '是'], ['goodbye', 'int.', '再见'],
    ['name', 'n.', '名字'], ['what', 'pron.', '什么'], ['is', 'v.', '是'], ['your', 'pron.', '你的'],
    ['my', 'pron.', '我的'], ['nice', 'adj.', '好的'], ['meet', 'v.', '遇见'], ['you', 'pron.', '你'],
  ]],
  ['u2', 'My family', [
    ['father', 'n.', '父亲'], ['mother', 'n.', '母亲'], ['brother', 'n.', '兄弟'], ['sister', 'n.', '姐妹'],
    ['family', 'n.', '家庭'], ['grandpa', 'n.', '爷爷'], ['grandma', 'n.', '奶奶'], ['who', 'pron.', '谁'],
    ['he', 'pron.', '他'], ['she', 'pron.', '她'], ['this', 'pron.', '这'], ['man', 'n.', '男人'],
  ]],
  ['u3', 'At school', [
    ['school', 'n.', '学校'], ['bag', 'n.', '书包'], ['book', 'n.', '书'], ['pen', 'n.', '钢笔'],
    ['pencil', 'n.', '铅笔'], ['ruler', 'n.', '尺子'], ['eraser', 'n.', '橡皮'], ['desk', 'n.', '课桌'],
    ['chair', 'n.', '椅子'], ['teacher', 'n.', '老师'], ['student', 'n.', '学生'], ['have', 'v.', '有'],
  ]],
  ['u4', 'My home', [
    ['home', 'n.', '家'], ['room', 'n.', '房间'], ['bed', 'n.', '床'], ['door', 'n.', '门'],
    ['window', 'n.', '窗户'], ['table', 'n.', '桌子'], ['sofa', 'n.', '沙发'], ['TV', 'n.', '电视'],
    ['kitchen', 'n.', '厨房'], ['bathroom', 'n.', '浴室'], ['where', 'adv.', '哪里'], ['in', 'prep.', '在…里'],
  ]],
  ['u5', 'My body', [
    ['body', 'n.', '身体'], ['head', 'n.', '头'], ['face', 'n.', '脸'], ['eye', 'n.', '眼睛'],
    ['ear', 'n.', '耳朵'], ['nose', 'n.', '鼻子'], ['mouth', 'n.', '嘴'], ['hand', 'n.', '手'],
    ['foot', 'n.', '脚'], ['arm', 'n.', '胳膊'], ['leg', 'n.', '腿'], ['hair', 'n.', '头发'],
  ]],
  ['u6', 'My classroom', [
    ['classroom', 'n.', '教室'], ['blackboard', 'n.', '黑板'], ['light', 'n.', '灯'], ['fan', 'n.', '风扇'],
    ['picture', 'n.', '图画'], ['wall', 'n.', '墙'], ['floor', 'n.', '地板'], ['door', 'n.', '门'],
    ['many', 'adj.', '许多'], ['our', 'pron.', '我们的'], ['new', 'adj.', '新的'], ['clean', 'adj.', '干净的'],
  ]],
]);
// MARKER pri-g3
// pri-g3 · 三年级下册
addBook('pri-g3', 'g3-3b', [
  ['u1', 'My day', [
    ['day', 'n.', '一天'], ['morning', 'n.', '早晨'], ['afternoon', 'n.', '下午'], ['evening', 'n.', '晚上'],
    ['get up', 'v.', '起床'], ['go to school', 'v.', '上学'], ['eat', 'v.', '吃'], ['breakfast', 'n.', '早餐'],
    ['lunch', 'n.', '午餐'], ['dinner', 'n.', '晚餐'], ['time', 'n.', '时间'], ['clock', 'n.', '钟'],
  ]],
  ['u2', 'My week', [
    ['week', 'n.', '一周'], ['Monday', 'n.', '星期一'], ['Tuesday', 'n.', '星期二'], ['Wednesday', 'n.', '星期三'],
    ['Thursday', 'n.', '星期四'], ['Friday', 'n.', '星期五'], ['Saturday', 'n.', '星期六'], ['Sunday', 'n.', '星期日'],
    ['today', 'n.', '今天'], ['tomorrow', 'n.', '明天'], ['yesterday', 'n.', '昨天'], ['every', 'adj.', '每'],
  ]],
  ['u3', 'My food', [
    ['food', 'n.', '食物'], ['rice', 'n.', '米饭'], ['noodle', 'n.', '面条'], ['bread', 'n.', '面包'],
    ['meat', 'n.', '肉'], ['fish', 'n.', '鱼'], ['egg', 'n.', '鸡蛋'], ['milk', 'n.', '牛奶'],
    ['juice', 'n.', '果汁'], ['water', 'n.', '水'], ['fruit', 'n.', '水果'], ['like', 'v.', '喜欢'],
  ]],
  ['u4', 'My clothes', [
    ['clothes', 'n.', '衣服'], ['shirt', 'n.', '衬衫'], ['T-shirt', 'n.', 'T 恤'], ['skirt', 'n.', '短裙'],
    ['dress', 'n.', '连衣裙'], ['hat', 'n.', '帽子'], ['shoe', 'n.', '鞋'], ['sock', 'n.', '袜子'],
    ['jacket', 'n.', '外套'], ['put on', 'v.', '穿上'], ['take off', 'v.', '脱下'], ['wear', 'v.', '穿'],
  ]],
  ['u5', 'My toys', [
    ['toy', 'n.', '玩具'], ['car', 'n.', '小汽车'], ['ball', 'n.', '球'], ['doll', 'n.', '洋娃娃'],
    ['kite', 'n.', '风筝'], ['plane', 'n.', '飞机'], ['boat', 'n.', '船'], ['train', 'n.', '火车'],
    ['bear', 'n.', '熊'], ['robot', 'n.', '机器人'], ['play', 'v.', '玩'], ['fun', 'adj.', '有趣的'],
  ]],
  ['u6', 'My holidays', [
    ['holiday', 'n.', '假日'], ['park', 'n.', '公园'], ['zoo', 'n.', '动物园'], ['beach', 'n.', '海滩'],
    ['swim', 'v.', '游泳'], ['run', 'v.', '跑'], ['jump', 'v.', '跳'], ['fly', 'v.', '飞'],
    ['ride', 'v.', '骑'], ['bike', 'n.', '自行车'], ['happy', 'adj.', '快乐的'], ['go', 'v.', '去'],
  ]],
]);
// pri-g3 · 四年级上册
addBook('pri-g3', 'g3-4a', [
  ['u1', 'My classroom', [
    ['classroom', 'n.', '教室'], ['window', 'n.', '窗户'], ['door', 'n.', '门'], ['picture', 'n.', '图片'],
    ['near', 'prep.', '在…附近'], ['clean', 'adj.', '干净的'], ['desk', 'n.', '课桌'], ['chair', 'n.', '椅子'],
    ['computer', 'n.', '电脑'], ['fan', 'n.', '风扇'], ['wall', 'n.', '墙'], ['our', 'pron.', '我们的'],
  ]],
  ['u2', 'My schoolbag', [
    ['schoolbag', 'n.', '书包'], ['English book', 'n.', '英语书'], ['maths book', 'n.', '数学书'], ['Chinese book', 'n.', '语文书'],
    ['notebook', 'n.', '笔记本'], ['storybook', 'n.', '故事书'], ['heavy', 'adj.', '重的'], ['cute', 'adj.', '可爱的'],
    ['lose', 'v.', '丢失'], ['find', 'v.', '找到'], ['many', 'adj.', '许多'], ['colour', 'n.', '颜色'],
  ]],
  ['u3', 'My friends', [
    ['friend', 'n.', '朋友'], ['long', 'adj.', '长的'], ['short', 'adj.', '短的'], ['thin', 'adj.', '瘦的'],
    ['strong', 'adj.', '强壮的'], ['tall', 'adj.', '高的'], ['quiet', 'adj.', '安静的'], ['friendly', 'adj.', '友好的'],
    ['music', 'n.', '音乐'], ['science', 'n.', '科学'], ['sport', 'n.', '运动'], ['hobby', 'n.', '爱好'],
  ]],
  ['u4', 'My home', [
    ['home', 'n.', '家'], ['study', 'n.', '书房'], ['kitchen', 'n.', '厨房'], ['bedroom', 'n.', '卧室'],
    ['bathroom', 'n.', '浴室'], ['living room', 'n.', '客厅'], ['phone', 'n.', '电话'], ['fridge', 'n.', '冰箱'],
    ['table', 'n.', '桌子'], ['sofa', 'n.', '沙发'], ['shelf', 'n.', '架子'], ['key', 'n.', '钥匙'],
  ]],
  ['u5', 'Dinner is ready', [
    ['dinner', 'n.', '晚餐'], ['rice', 'n.', '米饭'], ['beef', 'n.', '牛肉'], ['chicken', 'n.', '鸡肉'],
    ['noodle', 'n.', '面条'], ['soup', 'n.', '汤'], ['vegetable', 'n.', '蔬菜'], ['fish', 'n.', '鱼'],
    ['bread', 'n.', '面包'], ['milk', 'n.', '牛奶'], ['ready', 'adj.', '准备好的'], ['help', 'v.', '帮忙'],
  ]],
  ['u6', 'My family', [
    ['family', 'n.', '家庭'], ['father', 'n.', '父亲'], ['mother', 'n.', '母亲'], ['parents', 'n.', '父母'],
    ['uncle', 'n.', '叔叔'], ['aunt', 'n.', '阿姨'], ['baby', 'n.', '婴儿'], ['cousin', 'n.', '表亲'],
    ['people', 'n.', '人'], ['driver', 'n.', '司机'], ['doctor', 'n.', '医生'], ['job', 'n.', '工作'],
  ]],
]);
// pri-g3 · 四年级下册
addBook('pri-g3', 'g3-4b', [
  ['u1', 'My school', [
    ['school', 'n.', '学校'], ['playground', 'n.', '操场'], ['garden', 'n.', '花园'], ['library', 'n.', '图书馆'],
    ['office', 'n.', '办公室'], ['art room', 'n.', '美术室'], ['music room', 'n.', '音乐室'], ['first', 'num.', '第一'],
    ['second', 'num.', '第二'], ['third', 'num.', '第三'], ['floor', 'n.', '楼层'], ['our', 'pron.', '我们的'],
  ]],
  ['u2', 'What time is it?', [
    ['time', 'n.', '时间'], ['clock', 'n.', '钟'], ['watch', 'n.', '手表'], ["o'clock", 'adv.', '…点钟'],
    ['breakfast', 'n.', '早餐'], ['lunch', 'n.', '午餐'], ['dinner', 'n.', '晚餐'], ['English class', 'n.', '英语课'],
    ['music class', 'n.', '音乐课'], ['PE class', 'n.', '体育课'], ['get up', 'v.', '起床'], ['now', 'adv.', '现在'],
  ]],
  ['u3', 'Weather', [
    ['weather', 'n.', '天气'], ['warm', 'adj.', '温暖的'], ['cold', 'adj.', '冷的'], ['hot', 'adj.', '热的'],
    ['cool', 'adj.', '凉爽的'], ['sunny', 'adj.', '晴朗的'], ['rainy', 'adj.', '下雨的'], ['snowy', 'adj.', '下雪的'],
    ['windy', 'adj.', '有风的'], ['cloudy', 'adj.', '多云的'], ['rain', 'n.', '雨'], ['today', 'n.', '今天'],
  ]],
  ['u4', 'At the farm', [
    ['farm', 'n.', '农场'], ['cow', 'n.', '奶牛'], ['sheep', 'n.', '绵羊'], ['hen', 'n.', '母鸡'],
    ['horse', 'n.', '马'], ['goat', 'n.', '山羊'], ['pig', 'n.', '猪'], ['duck', 'n.', '鸭子'],
    ['rabbit', 'n.', '兔子'], ['tomato', 'n.', '番茄'], ['potato', 'n.', '土豆'], ['carrot', 'n.', '胡萝卜'],
  ]],
  ['u5', 'My clothes', [
    ['clothes', 'n.', '衣服'], ['pants', 'n.', '长裤'], ['jeans', 'n.', '牛仔裤'], ['shorts', 'n.', '短裤'],
    ['socks', 'n.', '袜子'], ['shoes', 'n.', '鞋子'], ['sweater', 'n.', '毛衣'], ['coat', 'n.', '外套'],
    ['jacket', 'n.', '夹克'], ['whose', 'pron.', '谁的'], ['mine', 'pron.', '我的'], ['yours', 'pron.', '你的'],
  ]],
  ['u6', 'Shopping', [
    ['shopping', 'n.', '购物'], ['shop', 'n.', '商店'], ['buy', 'v.', '买'], ['sell', 'v.', '卖'],
    ['price', 'n.', '价格'], ['money', 'n.', '钱'], ['expensive', 'adj.', '贵的'], ['cheap', 'adj.', '便宜的'],
    ['pretty', 'adj.', '漂亮的'], ['size', 'n.', '尺码'], ['try on', 'v.', '试穿'], ['how much', 'pron.', '多少钱'],
  ]],
]);
// pri-g3 · 五年级上册
addBook('pri-g3', 'g3-5a', [
  ['u1', 'My day', [
    ['day', 'n.', '一天'], ['morning', 'n.', '早晨'], ['usually', 'adv.', '通常'], ['often', 'adv.', '经常'],
    ['sometimes', 'adv.', '有时'], ['always', 'adv.', '总是'], ['never', 'adv.', '从不'], ['get up', 'v.', '起床'],
    ['eat breakfast', 'v.', '吃早餐'], ['go to school', 'v.', '上学'], ['do homework', 'v.', '做作业'], ['watch TV', 'v.', '看电视'],
  ]],
  ['u2', 'My week', [
    ['week', 'n.', '一周'], ['Monday', 'n.', '周一'], ['Tuesday', 'n.', '周二'], ['Wednesday', 'n.', '周三'],
    ['Thursday', 'n.', '周四'], ['Friday', 'n.', '周五'], ['Saturday', 'n.', '周六'], ['Sunday', 'n.', '周日'],
    ['weekend', 'n.', '周末'], ['subject', 'n.', '科目'], ['art', 'n.', '美术'], ['PE', 'n.', '体育'],
  ]],
  ['u3', 'My food', [
    ['food', 'n.', '食物'], ['favourite', 'adj.', '最喜欢的'], ['fresh', 'adj.', '新鲜的'], ['healthy', 'adj.', '健康的'],
    ['sweet', 'adj.', '甜的'], ['salty', 'adj.', '咸的'], ['sour', 'adj.', '酸的'], ['bitter', 'adj.', '苦的'],
    ['tomato', 'n.', '番茄'], ['potato', 'n.', '土豆'], ['onion', 'n.', '洋葱'], ['yummy', 'adj.', '美味的'],
  ]],
  ['u4', 'What can you do?', [
    ['can', 'v.', '能'], ['dance', 'v.', '跳舞'], ['sing', 'v.', '唱歌'], ['swim', 'v.', '游泳'],
    ['draw', 'v.', '画画'], ['cook', 'v.', '做饭'], ['play the piano', 'v.', '弹钢琴'], ['play football', 'v.', '踢足球'],
    ['play basketball', 'v.', '打篮球'], ['run', 'v.', '跑'], ['jump', 'v.', '跳'], ['speak English', 'v.', '说英语'],
  ]],
  ['u5', 'My room', [
    ['room', 'n.', '房间'], ['bed', 'n.', '床'], ['desk', 'n.', '书桌'], ['chair', 'n.', '椅子'],
    ['closet', 'n.', '衣柜'], ['mirror', 'n.', '镜子'], ['lamp', 'n.', '台灯'], ['curtain', 'n.', '窗帘'],
    ['plant', 'n.', '植物'], ['picture', 'n.', '图画'], ['tidy', 'adj.', '整洁的'], ['dirty', 'adj.', '脏的'],
  ]],
  ['u6', 'In a nature park', [
    ['park', 'n.', '公园'], ['river', 'n.', '河'], ['lake', 'n.', '湖'], ['mountain', 'n.', '山'],
    ['forest', 'n.', '森林'], ['flower', 'n.', '花'], ['tree', 'n.', '树'], ['bird', 'n.', '鸟'],
    ['animal', 'n.', '动物'], ['nature', 'n.', '自然'], ['beautiful', 'adj.', '美丽的'], ['quiet', 'adj.', '安静的'],
  ]],
]);
// pri-g3 · 五年级下册
addBook('pri-g3', 'g3-5b', [
  ['u1', 'My day', [
    ['day', 'n.', '一天'], ['start', 'v.', '开始'], ['usually', 'adv.', '通常'], ['Spain', 'n.', '西班牙'],
    ['late', 'adv.', '迟'], ['early', 'adv.', '早'], ['why', 'adv.', '为什么'], ['shop', 'n.', '商店'],
    ['work', 'v.', '工作'], ['morning', 'n.', '早晨'], ['evening', 'n.', '晚上'], ['busy', 'adj.', '忙碌的'],
  ]],
  ['u2', 'My favourite season', [
    ['season', 'n.', '季节'], ['spring', 'n.', '春天'], ['summer', 'n.', '夏天'], ['autumn', 'n.', '秋天'],
    ['winter', 'n.', '冬天'], ['warm', 'adj.', '温暖的'], ['hot', 'adj.', '热的'], ['cool', 'adj.', '凉爽的'],
    ['cold', 'adj.', '冷的'], ['best', 'adv.', '最'], ['because', 'conj.', '因为'], ['leaf', 'n.', '树叶'],
  ]],
  ['u3', 'My school calendar', [
    ['calendar', 'n.', '日历'], ['January', 'n.', '一月'], ['February', 'n.', '二月'], ['March', 'n.', '三月'],
    ['April', 'n.', '四月'], ['May', 'n.', '五月'], ['June', 'n.', '六月'], ['July', 'n.', '七月'],
    ['month', 'n.', '月份'], ['year', 'n.', '年'], ['party', 'n.', '聚会'], ['trip', 'n.', '旅行'],
  ]],
  ['u4', 'When is the art show?', [
    ['art show', 'n.', '艺术展'], ['when', 'adv.', '什么时候'], ['first', 'num.', '第一'], ['second', 'num.', '第二'],
    ['third', 'num.', '第三'], ['fourth', 'num.', '第四'], ['fifth', 'num.', '第五'], ['twelfth', 'num.', '第十二'],
    ['twentieth', 'num.', '第二十'], ['date', 'n.', '日期'], ['birthday', 'n.', '生日'], ['test', 'n.', '测试'],
  ]],
  ['u5', 'Whose dog is it?', [
    ['dog', 'n.', '狗'], ['whose', 'pron.', '谁的'], ['mine', 'pron.', '我的'], ['yours', 'pron.', '你的'],
    ['his', 'pron.', '他的'], ['hers', 'pron.', '她的'], ['ours', 'pron.', '我们的'], ['theirs', 'pron.', '他们的'],
    ['puppy', 'n.', '小狗'], ['kitten', 'n.', '小猫'], ['rabbit', 'n.', '兔子'], ['climb', 'v.', '爬'],
  ]],
  ['u6', 'Work quietly', [
    ['quietly', 'adv.', '安静地'], ['keep', 'v.', '保持'], ['talk', 'v.', '说话'], ['eat', 'v.', '吃'],
    ['drink', 'v.', '喝'], ['listen', 'v.', '听'], ['read', 'v.', '读'], ['write', 'v.', '写'],
    ['work', 'v.', '工作'], ['play', 'v.', '玩'], ['rule', 'n.', '规则'], ['take turns', 'v.', '轮流'],
  ]],
]);
// pri-g3 · 六年级上册
addBook('pri-g3', 'g3-6a', [
  ['u1', 'How do you go there?', [
    ['go', 'v.', '去'], ['how', 'adv.', '怎样'], ['by', 'prep.', '乘'], ['bus', 'n.', '公交车'],
    ['bike', 'n.', '自行车'], ['car', 'n.', '小汽车'], ['train', 'n.', '火车'], ['plane', 'n.', '飞机'],
    ['ship', 'n.', '船'], ['subway', 'n.', '地铁'], ['walk', 'v.', '步行'], ['foot', 'n.', '脚'],
  ]],
  ['u2', 'Ways to go to school', [
    ['way', 'n.', '方式'], ['school', 'n.', '学校'], ['sometimes', 'adv.', '有时'], ['often', 'adv.', '经常'],
    ['usually', 'adv.', '通常'], ['never', 'adv.', '从不'], ['slow', 'adj.', '慢的'], ['fast', 'adj.', '快的'],
    ['safe', 'adj.', '安全的'], ['dangerous', 'adj.', '危险的'], ['stop', 'v.', '停止'], ['wait', 'v.', '等待'],
  ]],
  ['u3', 'My weekend plan', [
    ['plan', 'n.', '计划'], ['weekend', 'n.', '周末'], ['visit', 'v.', '拜访'], ['grandparents', 'n.', '祖父母'],
    ['take a trip', 'v.', '去旅行'], ['see a film', 'v.', '看电影'], ['read a book', 'v.', '读书'], ['this morning', 'n.', '今天上午'],
    ['this afternoon', 'n.', '今天下午'], ['this evening', 'n.', '今天晚上'], ['tomorrow', 'n.', '明天'], ['next week', 'n.', '下周'],
  ]],
  ['u4', 'I have a pen pal', [
    ['pen pal', 'n.', '笔友'], ['hobby', 'n.', '爱好'], ['like', 'v.', '喜欢'], ['dance', 'v.', '跳舞'],
    ['sing', 'v.', '唱歌'], ['read', 'v.', '阅读'], ['play', 'v.', '玩'], ['do', 'v.', '做'],
    ['study', 'v.', '学习'], ['live', 'v.', '居住'], ['teach', 'v.', '教'], ['watch', 'v.', '观看'],
  ]],
  ['u5', 'What does he do?', [
    ['job', 'n.', '工作'], ['doctor', 'n.', '医生'], ['nurse', 'n.', '护士'], ['teacher', 'n.', '老师'],
    ['driver', 'n.', '司机'], ['worker', 'n.', '工人'], ['farmer', 'n.', '农民'], ['police officer', 'n.', '警察'],
    ['fisherman', 'n.', '渔夫'], ['scientist', 'n.', '科学家'], ['pilot', 'n.', '飞行员'], ['coach', 'n.', '教练'],
  ]],
  ['u6', 'How do you feel?', [
    ['feel', 'v.', '感觉'], ['happy', 'adj.', '快乐的'], ['sad', 'adj.', '悲伤的'], ['angry', 'adj.', '生气的'],
    ['worried', 'adj.', '担心的'], ['afraid', 'adj.', '害怕的'], ['tired', 'adj.', '疲倦的'], ['ill', 'adj.', '病的'],
    ['well', 'adj.', '健康的'], ['better', 'adj.', '更好的'], ['should', 'v.', '应该'], ['wear', 'v.', '穿'],
  ]],
]);
// pri-g3 · 六年级下册
addBook('pri-g3', 'g3-6b', [
  ['u1', 'How tall are you?', [
    ['tall', 'adj.', '高的'], ['short', 'adj.', '矮的'], ['taller', 'adj.', '更高的'], ['shorter', 'adj.', '更矮的'],
    ['strong', 'adj.', '强壮的'], ['older', 'adj.', '更年长的'], ['younger', 'adj.', '更年轻的'], ['bigger', 'adj.', '更大的'],
    ['heavier', 'adj.', '更重的'], ['longer', 'adj.', '更长的'], ['thinner', 'adj.', '更瘦的'], ['smaller', 'adj.', '更小的'],
  ]],
  ['u2', 'Last weekend', [
    ['last', 'adj.', '上一个'], ['weekend', 'n.', '周末'], ['cleaned', 'v.', '打扫'], ['stayed', 'v.', '停留'],
    ['washed', 'v.', '洗'], ['watched', 'v.', '观看'], ['played', 'v.', '玩'], ['visited', 'v.', '拜访'],
    ['drank', 'v.', '喝'], ['read', 'v.', '读'], ['slept', 'v.', '睡觉'], ['had', 'v.', '有'],
  ]],
  ['u3', 'Where did you go?', [
    ['where', 'adv.', '哪里'], ['went', 'v.', '去'], ['camp', 'v.', '露营'], ['fish', 'v.', '钓鱼'],
    ['rode', 'v.', '骑'], ['bought', 'v.', '买'], ['ate', 'v.', '吃'], ['took', 'v.', '拍'],
    ['saw', 'v.', '看见'], ['beach', 'n.', '海滩'], ['forest', 'n.', '森林'], ['mountain', 'n.', '山'],
  ]],
  ['u4', 'Then and now', [
    ['then', 'adv.', '那时'], ['now', 'adv.', '现在'], ['before', 'prep.', '在…之前'], ['after', 'prep.', '在…之后'],
    ['dining hall', 'n.', '饭厅'], ['gym', 'n.', '体育馆'], ['grass', 'n.', '草地'], ['cycling', 'n.', '骑车'],
    ['ice-skate', 'v.', '滑冰'], ['badminton', 'n.', '羽毛球'], ['change', 'v.', '改变'], ['different', 'adj.', '不同的'],
  ]],
  ['u5', 'Changes in me', [
    ['change', 'n.', '变化'], ['grow', 'v.', '成长'], ['become', 'v.', '变得'], ['taller', 'adj.', '更高'],
    ['stronger', 'adj.', '更强壮'], ['smarter', 'adj.', '更聪明'], ['before', 'adv.', '以前'], ['now', 'adv.', '现在'],
    ['could', 'v.', '能'], ['can', 'v.', '能'], ['couldn\'t', 'v.', '不能'], ['didn\'t', 'v.', '没有'], ['active', 'adj.', '活跃的'],
  ]],
  ['u6', 'Farewell', [
    ['farewell', 'n.', '告别'], ['leave', 'v.', '离开'], ['miss', 'v.', '想念'], ['remember', 'v.', '记得'],
    ['friend', 'n.', '朋友'], ['teacher', 'n.', '老师'], ['school', 'n.', '学校'], ['class', 'n.', '班级'],
    ['goodbye', 'int.', '再见'], ['good luck', 'n.', '好运'], ['keep in touch', 'v.', '保持联系'], ['hope', 'v.', '希望'],
  ]],
]);
// pri-g1 · 一年级起点 (12 books, 6 units × 8 words each)
addBook('pri-g1', 'g1-1a', [
  ['u1', 'Unit 1', [['hello', 'int.', '你好'], ['hi', 'int.', '嗨'], ['bye', 'int.', '再见'], ['I', 'pron.', '我'], ['am', 'v.', '是'], ['you', 'pron.', '你'], ['name', 'n.', '名字'], ['good', 'adj.', '好的']]],
  ['u2', 'Unit 2', [['face', 'n.', '脸'], ['eye', 'n.', '眼睛'], ['ear', 'n.', '耳朵'], ['nose', 'n.', '鼻子'], ['mouth', 'n.', '嘴'], ['head', 'n.', '头'], ['hair', 'n.', '头发'], ['big', 'adj.', '大的']]],
  ['u3', 'Unit 3', [['red', 'adj.', '红的'], ['blue', 'adj.', '蓝的'], ['yellow', 'adj.', '黄的'], ['green', 'adj.', '绿的'], ['pink', 'adj.', '粉的'], ['black', 'adj.', '黑的'], ['white', 'adj.', '白的'], ['colour', 'n.', '颜色']]],
  ['u4', 'Unit 4', [['cat', 'n.', '猫'], ['dog', 'n.', '狗'], ['pig', 'n.', '猪'], ['duck', 'n.', '鸭子'], ['bear', 'n.', '熊'], ['bird', 'n.', '鸟'], ['fish', 'n.', '鱼'], ['animal', 'n.', '动物']]],
  ['u5', 'Unit 5', [['one', 'num.', '一'], ['two', 'num.', '二'], ['three', 'num.', '三'], ['four', 'num.', '四'], ['five', 'num.', '五'], ['six', 'num.', '六'], ['seven', 'num.', '七'], ['eight', 'num.', '八']]],
  ['u6', 'Unit 6', [['apple', 'n.', '苹果'], ['banana', 'n.', '香蕉'], ['pear', 'n.', '梨'], ['orange', 'n.', '橙子'], ['grape', 'n.', '葡萄'], ['milk', 'n.', '牛奶'], ['water', 'n.', '水'], ['juice', 'n.', '果汁']]],
]);
addBook('pri-g1', 'g1-1b', [
  ['u1', 'Unit 1', [['boy', 'n.', '男孩'], ['girl', 'n.', '女孩'], ['man', 'n.', '男人'], ['woman', 'n.', '女人'], ['baby', 'n.', '婴儿'], ['friend', 'n.', '朋友'], ['family', 'n.', '家庭'], ['new', 'adj.', '新的']]],
  ['u2', 'Unit 2', [['hand', 'n.', '手'], ['foot', 'n.', '脚'], ['arm', 'n.', '胳膊'], ['leg', 'n.', '腿'], ['body', 'n.', '身体'], ['tall', 'adj.', '高的'], ['short', 'adj.', '矮的'], ['small', 'adj.', '小的']]],
  ['u3', 'Unit 3', [['book', 'n.', '书'], ['pen', 'n.', '钢笔'], ['bag', 'n.', '书包'], ['ruler', 'n.', '尺子'], ['desk', 'n.', '课桌'], ['chair', 'n.', '椅子'], ['school', 'n.', '学校'], ['classroom', 'n.', '教室']]],
  ['u4', 'Unit 4', [['car', 'n.', '小汽车'], ['bus', 'n.', '公交车'], ['bike', 'n.', '自行车'], ['train', 'n.', '火车'], ['plane', 'n.', '飞机'], ['boat', 'n.', '船'], ['ship', 'n.', '轮船'], ['wheel', 'n.', '车轮']]],
  ['u5', 'Unit 5', [['nine', 'num.', '九'], ['ten', 'num.', '十'], ['eleven', 'num.', '十一'], ['twelve', 'num.', '十二'], ['twenty', 'num.', '二十'], ['many', 'adj.', '许多'], ['how many', 'pron.', '多少'], ['count', 'v.', '数']]],
  ['u6', 'Unit 6', [['sun', 'n.', '太阳'], ['moon', 'n.', '月亮'], ['star', 'n.', '星星'], ['sky', 'n.', '天空'], ['cloud', 'n.', '云'], ['rain', 'n.', '雨'], ['snow', 'n.', '雪'], ['wind', 'n.', '风']]],
]);
addBook('pri-g1', 'g1-2a', [
  ['u1', 'Unit 1', [['morning', 'n.', '早晨'], ['afternoon', 'n.', '下午'], ['evening', 'n.', '晚上'], ['day', 'n.', '白天'], ['night', 'n.', '夜晚'], ['today', 'n.', '今天'], ['hello', 'int.', '你好'], ['goodbye', 'int.', '再见']]],
  ['u2', 'Unit 2', [['father', 'n.', '父亲'], ['mother', 'n.', '母亲'], ['brother', 'n.', '兄弟'], ['sister', 'n.', '姐妹'], ['grandpa', 'n.', '爷爷'], ['grandma', 'n.', '奶奶'], ['uncle', 'n.', '叔叔'], ['aunt', 'n.', '阿姨']]],
  ['u3', 'Unit 3', [['table', 'n.', '桌子'], ['chair', 'n.', '椅子'], ['bed', 'n.', '床'], ['door', 'n.', '门'], ['window', 'n.', '窗户'], ['room', 'n.', '房间'], ['home', 'n.', '家'], ['house', 'n.', '房子']]],
  ['u4', 'Unit 4', [['run', 'v.', '跑'], ['jump', 'v.', '跳'], ['swim', 'v.', '游泳'], ['fly', 'v.', '飞'], ['walk', 'v.', '走'], ['play', 'v.', '玩'], ['sing', 'v.', '唱歌'], ['dance', 'v.', '跳舞']]],
  ['u5', 'Unit 5', [['happy', 'adj.', '快乐的'], ['sad', 'adj.', '伤心的'], ['angry', 'adj.', '生气的'], ['tired', 'adj.', '累的'], ['hungry', 'adj.', '饿的'], ['thirsty', 'adj.', '渴的'], ['hot', 'adj.', '热的'], ['cold', 'adj.', '冷的']]],
  ['u6', 'Unit 6', [['cake', 'n.', '蛋糕'], ['bread', 'n.', '面包'], ['rice', 'n.', '米饭'], ['meat', 'n.', '肉'], ['egg', 'n.', '鸡蛋'], ['fish', 'n.', '鱼'], ['fruit', 'n.', '水果'], ['ice cream', 'n.', '冰淇淋']]],
]);
addBook('pri-g1', 'g1-2b', [
  ['u1', 'Unit 1', [['spring', 'n.', '春天'], ['summer', 'n.', '夏天'], ['autumn', 'n.', '秋天'], ['winter', 'n.', '冬天'], ['warm', 'adj.', '温暖的'], ['hot', 'adj.', '热的'], ['cool', 'adj.', '凉爽的'], ['cold', 'adj.', '冷的']]],
  ['u2', 'Unit 2', [['shirt', 'n.', '衬衫'], ['T-shirt', 'n.', 'T 恤'], ['skirt', 'n.', '短裙'], ['dress', 'n.', '连衣裙'], ['hat', 'n.', '帽子'], ['shoe', 'n.', '鞋'], ['sock', 'n.', '袜子'], ['jacket', 'n.', '外套']]],
  ['u3', 'Unit 3', [['park', 'n.', '公园'], ['zoo', 'n.', '动物园'], ['shop', 'n.', '商店'], ['farm', 'n.', '农场'], ['school', 'n.', '学校'], ['hospital', 'n.', '医院'], ['library', 'n.', '图书馆'], ['cinema', 'n.', '电影院']]],
  ['u4', 'Unit 4', [['read', 'v.', '读'], ['write', 'v.', '写'], ['draw', 'v.', '画'], ['listen', 'v.', '听'], ['speak', 'v.', '说'], ['look', 'v.', '看'], ['watch', 'v.', '观看'], ['play', 'v.', '玩']]],
  ['u5', 'Unit 5', [['Monday', 'n.', '星期一'], ['Tuesday', 'n.', '星期二'], ['Wednesday', 'n.', '星期三'], ['Thursday', 'n.', '星期四'], ['Friday', 'n.', '星期五'], ['Saturday', 'n.', '星期六'], ['Sunday', 'n.', '星期日'], ['week', 'n.', '一周']]],
  ['u6', 'Unit 6', [['ball', 'n.', '球'], ['kite', 'n.', '风筝'], ['doll', 'n.', '洋娃娃'], ['toy', 'n.', '玩具'], ['robot', 'n.', '机器人'], ['game', 'n.', '游戏'], ['puzzle', 'n.', '拼图'], ['fun', 'adj.', '有趣的']]],
]);
addBook('pri-g1', 'g1-3a', [
  ['u1', 'Unit 1', [['hello', 'int.', '你好'], ['name', 'n.', '名字'], ['my', 'pron.', '我的'], ['your', 'pron.', '你的'], ['his', 'pron.', '他的'], ['her', 'pron.', '她的'], ['what', 'pron.', '什么'], ['who', 'pron.', '谁']]],
  ['u2', 'Unit 2', [['father', 'n.', '父亲'], ['mother', 'n.', '母亲'], ['parents', 'n.', '父母'], ['family', 'n.', '家庭'], ['brother', 'n.', '兄弟'], ['sister', 'n.', '姐妹'], ['baby', 'n.', '婴儿'], ['people', 'n.', '人']]],
  ['u3', 'Unit 3', [['pen', 'n.', '钢笔'], ['pencil', 'n.', '铅笔'], ['ruler', 'n.', '尺子'], ['eraser', 'n.', '橡皮'], ['book', 'n.', '书'], ['bag', 'n.', '书包'], ['desk', 'n.', '课桌'], ['chair', 'n.', '椅子']]],
  ['u4', 'Unit 4', [['home', 'n.', '家'], ['room', 'n.', '房间'], ['bed', 'n.', '床'], ['door', 'n.', '门'], ['window', 'n.', '窗户'], ['table', 'n.', '桌子'], ['sofa', 'n.', '沙发'], ['TV', 'n.', '电视']]],
  ['u5', 'Unit 5', [['body', 'n.', '身体'], ['head', 'n.', '头'], ['face', 'n.', '脸'], ['eye', 'n.', '眼睛'], ['ear', 'n.', '耳朵'], ['nose', 'n.', '鼻子'], ['mouth', 'n.', '嘴'], ['hand', 'n.', '手']]],
  ['u6', 'Unit 6', [['red', 'adj.', '红的'], ['blue', 'adj.', '蓝的'], ['yellow', 'adj.', '黄的'], ['green', 'adj.', '绿的'], ['black', 'adj.', '黑的'], ['white', 'adj.', '白的'], ['pink', 'adj.', '粉的'], ['orange', 'adj.', '橙色的']]],
]);
addBook('pri-g1', 'g1-3b', [
  ['u1', 'Unit 1', [['morning', 'n.', '早晨'], ['afternoon', 'n.', '下午'], ['evening', 'n.', '晚上'], ['night', 'n.', '夜晚'], ['today', 'n.', '今天'], ['time', 'n.', '时间'], ['clock', 'n.', '钟'], ['watch', 'n.', '手表']]],
  ['u2', 'Unit 2', [['Monday', 'n.', '星期一'], ['Tuesday', 'n.', '星期二'], ['Wednesday', 'n.', '星期三'], ['Thursday', 'n.', '星期四'], ['Friday', 'n.', '星期五'], ['Saturday', 'n.', '星期六'], ['Sunday', 'n.', '星期日'], ['weekend', 'n.', '周末']]],
  ['u3', 'Unit 3', [['food', 'n.', '食物'], ['rice', 'n.', '米饭'], ['bread', 'n.', '面包'], ['meat', 'n.', '肉'], ['fish', 'n.', '鱼'], ['egg', 'n.', '鸡蛋'], ['milk', 'n.', '牛奶'], ['water', 'n.', '水']]],
  ['u4', 'Unit 4', [['shirt', 'n.', '衬衫'], ['skirt', 'n.', '短裙'], ['dress', 'n.', '连衣裙'], ['hat', 'n.', '帽子'], ['shoe', 'n.', '鞋'], ['sock', 'n.', '袜子'], ['coat', 'n.', '外套'], ['wear', 'v.', '穿']]],
  ['u5', 'Unit 5', [['toy', 'n.', '玩具'], ['car', 'n.', '小汽车'], ['ball', 'n.', '球'], ['doll', 'n.', '洋娃娃'], ['kite', 'n.', '风筝'], ['plane', 'n.', '飞机'], ['train', 'n.', '火车'], ['play', 'v.', '玩']]],
  ['u6', 'Unit 6', [['park', 'n.', '公园'], ['zoo', 'n.', '动物园'], ['shop', 'n.', '商店'], ['farm', 'n.', '农场'], ['school', 'n.', '学校'], ['hospital', 'n.', '医院'], ['library', 'n.', '图书馆'], ['cinema', 'n.', '电影院']]],
]);
addBook('pri-g1', 'g1-4a', [
  ['u1', 'Unit 1', [['classroom', 'n.', '教室'], ['window', 'n.', '窗户'], ['door', 'n.', '门'], ['picture', 'n.', '图片'], ['wall', 'n.', '墙'], ['floor', 'n.', '地板'], ['desk', 'n.', '课桌'], ['chair', 'n.', '椅子']]],
  ['u2', 'Unit 2', [['schoolbag', 'n.', '书包'], ['English book', 'n.', '英语书'], ['maths book', 'n.', '数学书'], ['Chinese book', 'n.', '语文书'], ['notebook', 'n.', '笔记本'], ['storybook', 'n.', '故事书'], ['pencil', 'n.', '铅笔'], ['ruler', 'n.', '尺子']]],
  ['u3', 'Unit 3', [['friend', 'n.', '朋友'], ['tall', 'adj.', '高的'], ['short', 'adj.', '矮的'], ['thin', 'adj.', '瘦的'], ['strong', 'adj.', '强壮的'], ['quiet', 'adj.', '安静的'], ['friendly', 'adj.', '友好的'], ['kind', 'adj.', '善良的']]],
  ['u4', 'Unit 4', [['home', 'n.', '家'], ['kitchen', 'n.', '厨房'], ['bedroom', 'n.', '卧室'], ['bathroom', 'n.', '浴室'], ['living room', 'n.', '客厅'], ['study', 'n.', '书房'], ['phone', 'n.', '电话'], ['fridge', 'n.', '冰箱']]],
  ['u5', 'Unit 5', [['dinner', 'n.', '晚餐'], ['rice', 'n.', '米饭'], ['beef', 'n.', '牛肉'], ['chicken', 'n.', '鸡肉'], ['noodle', 'n.', '面条'], ['soup', 'n.', '汤'], ['vegetable', 'n.', '蔬菜'], ['bread', 'n.', '面包']]],
  ['u6', 'Unit 6', [['father', 'n.', '父亲'], ['mother', 'n.', '母亲'], ['parents', 'n.', '父母'], ['uncle', 'n.', '叔叔'], ['aunt', 'n.', '阿姨'], ['cousin', 'n.', '表亲'], ['doctor', 'n.', '医生'], ['driver', 'n.', '司机']]],
]);
addBook('pri-g1', 'g1-4b', [
  ['u1', 'Unit 1', [['school', 'n.', '学校'], ['playground', 'n.', '操场'], ['garden', 'n.', '花园'], ['library', 'n.', '图书馆'], ['office', 'n.', '办公室'], ['art room', 'n.', '美术室'], ['music room', 'n.', '音乐室'], ['first', 'num.', '第一']]],
  ['u2', 'Unit 2', [['time', 'n.', '时间'], ['breakfast', 'n.', '早餐'], ['lunch', 'n.', '午餐'], ['dinner', 'n.', '晚餐'], ['English class', 'n.', '英语课'], ['music class', 'n.', '音乐课'], ['PE class', 'n.', '体育课'], ['now', 'adv.', '现在']]],
  ['u3', 'Unit 3', [['weather', 'n.', '天气'], ['warm', 'adj.', '温暖的'], ['cold', 'adj.', '冷的'], ['hot', 'adj.', '热的'], ['sunny', 'adj.', '晴朗的'], ['rainy', 'adj.', '下雨的'], ['snowy', 'adj.', '下雪的'], ['windy', 'adj.', '有风的']]],
  ['u4', 'Unit 4', [['farm', 'n.', '农场'], ['cow', 'n.', '奶牛'], ['sheep', 'n.', '绵羊'], ['hen', 'n.', '母鸡'], ['horse', 'n.', '马'], ['pig', 'n.', '猪'], ['duck', 'n.', '鸭子'], ['rabbit', 'n.', '兔子']]],
  ['u5', 'Unit 5', [['clothes', 'n.', '衣服'], ['pants', 'n.', '长裤'], ['shorts', 'n.', '短裤'], ['socks', 'n.', '袜子'], ['shoes', 'n.', '鞋子'], ['sweater', 'n.', '毛衣'], ['coat', 'n.', '外套'], ['mine', 'pron.', '我的']]],
  ['u6', 'Unit 6', [['shopping', 'n.', '购物'], ['buy', 'v.', '买'], ['sell', 'v.', '卖'], ['price', 'n.', '价格'], ['money', 'n.', '钱'], ['expensive', 'adj.', '贵的'], ['cheap', 'adj.', '便宜的'], ['pretty', 'adj.', '漂亮的']]],
]);
addBook('pri-g1', 'g1-5a', [
  ['u1', 'Unit 1', [['usually', 'adv.', '通常'], ['often', 'adv.', '经常'], ['sometimes', 'adv.', '有时'], ['always', 'adv.', '总是'], ['never', 'adv.', '从不'], ['get up', 'v.', '起床'], ['eat breakfast', 'v.', '吃早餐'], ['do homework', 'v.', '做作业']]],
  ['u2', 'Unit 2', [['week', 'n.', '一周'], ['Monday', 'n.', '周一'], ['Tuesday', 'n.', '周二'], ['Wednesday', 'n.', '周三'], ['Thursday', 'n.', '周四'], ['Friday', 'n.', '周五'], ['Saturday', 'n.', '周六'], ['Sunday', 'n.', '周日']]],
  ['u3', 'Unit 3', [['food', 'n.', '食物'], ['favourite', 'adj.', '最喜欢的'], ['fresh', 'adj.', '新鲜的'], ['healthy', 'adj.', '健康的'], ['sweet', 'adj.', '甜的'], ['sour', 'adj.', '酸的'], ['tomato', 'n.', '番茄'], ['potato', 'n.', '土豆']]],
  ['u4', 'Unit 4', [['can', 'v.', '能'], ['dance', 'v.', '跳舞'], ['sing', 'v.', '唱歌'], ['swim', 'v.', '游泳'], ['draw', 'v.', '画画'], ['cook', 'v.', '做饭'], ['play the piano', 'v.', '弹钢琴'], ['play football', 'v.', '踢足球']]],
  ['u5', 'Unit 5', [['room', 'n.', '房间'], ['bed', 'n.', '床'], ['desk', 'n.', '书桌'], ['chair', 'n.', '椅子'], ['closet', 'n.', '衣柜'], ['mirror', 'n.', '镜子'], ['lamp', 'n.', '台灯'], ['curtain', 'n.', '窗帘']]],
  ['u6', 'Unit 6', [['park', 'n.', '公园'], ['river', 'n.', '河'], ['lake', 'n.', '湖'], ['mountain', 'n.', '山'], ['forest', 'n.', '森林'], ['flower', 'n.', '花'], ['tree', 'n.', '树'], ['bird', 'n.', '鸟']]],
]);
addBook('pri-g1', 'g1-5b', [
  ['u1', 'Unit 1', [['day', 'n.', '一天'], ['start', 'v.', '开始'], ['late', 'adv.', '迟'], ['early', 'adv.', '早'], ['why', 'adv.', '为什么'], ['shop', 'n.', '商店'], ['work', 'v.', '工作'], ['busy', 'adj.', '忙碌的']]],
  ['u2', 'Unit 2', [['season', 'n.', '季节'], ['spring', 'n.', '春天'], ['summer', 'n.', '夏天'], ['autumn', 'n.', '秋天'], ['winter', 'n.', '冬天'], ['warm', 'adj.', '温暖的'], ['hot', 'adj.', '热的'], ['cold', 'adj.', '冷的']]],
  ['u3', 'Unit 3', [['calendar', 'n.', '日历'], ['January', 'n.', '一月'], ['February', 'n.', '二月'], ['March', 'n.', '三月'], ['April', 'n.', '四月'], ['May', 'n.', '五月'], ['June', 'n.', '六月'], ['month', 'n.', '月份']]],
  ['u4', 'Unit 4', [['art show', 'n.', '艺术展'], ['when', 'adv.', '什么时候'], ['first', 'num.', '第一'], ['second', 'num.', '第二'], ['third', 'num.', '第三'], ['date', 'n.', '日期'], ['birthday', 'n.', '生日'], ['test', 'n.', '测试']]],
  ['u5', 'Unit 5', [['dog', 'n.', '狗'], ['whose', 'pron.', '谁的'], ['mine', 'pron.', '我的'], ['yours', 'pron.', '你的'], ['his', 'pron.', '他的'], ['hers', 'pron.', '她的'], ['ours', 'pron.', '我们的'], ['theirs', 'pron.', '他们的']]],
  ['u6', 'Unit 6', [['quietly', 'adv.', '安静地'], ['keep', 'v.', '保持'], ['talk', 'v.', '说话'], ['eat', 'v.', '吃'], ['drink', 'v.', '喝'], ['listen', 'v.', '听'], ['read', 'v.', '读'], ['write', 'v.', '写']]],
]);
addBook('pri-g1', 'g1-6a', [
  ['u1', 'Unit 1', [['go', 'v.', '去'], ['how', 'adv.', '怎样'], ['by', 'prep.', '乘'], ['bus', 'n.', '公交车'], ['bike', 'n.', '自行车'], ['car', 'n.', '小汽车'], ['train', 'n.', '火车'], ['plane', 'n.', '飞机']]],
  ['u2', 'Unit 2', [['way', 'n.', '方式'], ['sometimes', 'adv.', '有时'], ['often', 'adv.', '经常'], ['usually', 'adv.', '通常'], ['slow', 'adj.', '慢的'], ['fast', 'adj.', '快的'], ['safe', 'adj.', '安全的'], ['stop', 'v.', '停止']]],
  ['u3', 'Unit 3', [['plan', 'n.', '计划'], ['weekend', 'n.', '周末'], ['visit', 'v.', '拜访'], ['trip', 'n.', '旅行'], ['see a film', 'v.', '看电影'], ['read a book', 'v.', '读书'], ['tomorrow', 'n.', '明天'], ['next week', 'n.', '下周']]],
  ['u4', 'Unit 4', [['pen pal', 'n.', '笔友'], ['hobby', 'n.', '爱好'], ['like', 'v.', '喜欢'], ['dance', 'v.', '跳舞'], ['sing', 'v.', '唱歌'], ['read', 'v.', '阅读'], ['live', 'v.', '居住'], ['teach', 'v.', '教']]],
  ['u5', 'Unit 5', [['job', 'n.', '工作'], ['doctor', 'n.', '医生'], ['teacher', 'n.', '老师'], ['driver', 'n.', '司机'], ['worker', 'n.', '工人'], ['farmer', 'n.', '农民'], ['police officer', 'n.', '警察'], ['scientist', 'n.', '科学家']]],
  ['u6', 'Unit 6', [['feel', 'v.', '感觉'], ['happy', 'adj.', '快乐的'], ['sad', 'adj.', '悲伤的'], ['angry', 'adj.', '生气的'], ['worried', 'adj.', '担心的'], ['afraid', 'adj.', '害怕的'], ['tired', 'adj.', '疲倦的'], ['should', 'v.', '应该']]],
]);
addBook('pri-g1', 'g1-6b', [
  ['u1', 'Unit 1', [['tall', 'adj.', '高的'], ['short', 'adj.', '矮的'], ['taller', 'adj.', '更高的'], ['strong', 'adj.', '强壮的'], ['older', 'adj.', '更年长的'], ['younger', 'adj.', '更年轻的'], ['bigger', 'adj.', '更大的'], ['heavier', 'adj.', '更重的']]],
  ['u2', 'Unit 2', [['last', 'adj.', '上一个'], ['weekend', 'n.', '周末'], ['cleaned', 'v.', '打扫'], ['stayed', 'v.', '停留'], ['washed', 'v.', '洗'], ['watched', 'v.', '观看'], ['played', 'v.', '玩'], ['visited', 'v.', '拜访']]],
  ['u3', 'Unit 3', [['where', 'adv.', '哪里'], ['went', 'v.', '去'], ['camp', 'v.', '露营'], ['fish', 'v.', '钓鱼'], ['rode', 'v.', '骑'], ['bought', 'v.', '买'], ['ate', 'v.', '吃'], ['saw', 'v.', '看见']]],
  ['u4', 'Unit 4', [['then', 'adv.', '那时'], ['now', 'adv.', '现在'], ['before', 'prep.', '在…之前'], ['dining hall', 'n.', '饭厅'], ['gym', 'n.', '体育馆'], ['grass', 'n.', '草地'], ['change', 'v.', '改变'], ['different', 'adj.', '不同的']]],
  ['u5', 'Unit 5', [['change', 'n.', '变化'], ['grow', 'v.', '成长'], ['become', 'v.', '变得'], ['taller', 'adj.', '更高'], ['stronger', 'adj.', '更强壮'], ['before', 'adv.', '以前'], ['could', 'v.', '能'], ['active', 'adj.', '活跃的']]],
  ['u6', 'Unit 6', [['farewell', 'n.', '告别'], ['leave', 'v.', '离开'], ['miss', 'v.', '想念'], ['remember', 'v.', '记得'], ['friend', 'n.', '朋友'], ['teacher', 'n.', '老师'], ['goodbye', 'int.', '再见'], ['hope', 'v.', '希望']]],
]);
// mid · 初中新目标 (5 books)
addBook('mid', 'mid-7a', [
  ['u1', 'Unit 1', [['name', 'n.', '名字'], ['nice', 'adj.', '好的'], ['meet', 'v.', '遇见'], ['too', 'adv.', '也'], ['your', 'pron.', '你的'], ['his', 'pron.', '他的'], ['her', 'pron.', '她的'], ['hello', 'int.', '你好'], ['zero', 'num.', '零'], ['one', 'num.', '一'], ['two', 'num.', '二'], ['three', 'num.', '三']]],
  ['u2', 'Unit 2', [['what', 'pron.', '什么'], ['is', 'v.', '是'], ['this', 'pron.', '这'], ['that', 'pron.', '那'], ['pen', 'n.', '钢笔'], ['pencil', 'n.', '铅笔'], ['book', 'n.', '书'], ['eraser', 'n.', '橡皮'], ['ruler', 'n.', '尺子'], ['bag', 'n.', '书包'], ['desk', 'n.', '课桌'], ['chair', 'n.', '椅子']]],
  ['u3', 'Unit 3', [['colour', 'n.', '颜色'], ['red', 'adj.', '红的'], ['blue', 'adj.', '蓝的'], ['yellow', 'adj.', '黄的'], ['green', 'adj.', '绿的'], ['black', 'adj.', '黑的'], ['white', 'adj.', '白的'], ['pink', 'adj.', '粉的'], ['brown', 'adj.', '棕的'], ['orange', 'adj.', '橙色的'], ['purple', 'adj.', '紫的'], ['grey', 'adj.', '灰的']]],
  ['u4', 'Unit 4', [['family', 'n.', '家庭'], ['father', 'n.', '父亲'], ['mother', 'n.', '母亲'], ['brother', 'n.', '兄弟'], ['sister', 'n.', '姐妹'], ['grandfather', 'n.', '祖父'], ['grandmother', 'n.', '祖母'], ['uncle', 'n.', '叔叔'], ['aunt', 'n.', '阿姨'], ['cousin', 'n.', '表亲'], ['parents', 'n.', '父母'], ['baby', 'n.', '婴儿']]],
  ['u5', 'Unit 5', [['where', 'adv.', '哪里'], ['in', 'prep.', '在…里'], ['on', 'prep.', '在…上'], ['under', 'prep.', '在…下'], ['table', 'n.', '桌子'], ['bed', 'n.', '床'], ['desk', 'n.', '书桌'], ['chair', 'n.', '椅子'], ['room', 'n.', '房间'], ['home', 'n.', '家'], ['house', 'n.', '房子'], ['door', 'n.', '门']]],
  ['u6', 'Unit 6', [['have', 'v.', '有'], ['has', 'v.', '有'], ['do', 'v.', '做'], ['does', 'v.', '做'], ['like', 'v.', '喜欢'], ['likes', 'v.', '喜欢'], ['want', 'v.', '想要'], ['wants', 'v.', '想要'], ['play', 'v.', '玩'], ['watch', 'v.', '观看'], ['eat', 'v.', '吃'], ['drink', 'v.', '喝']]],
  ['u7', 'Unit 7', [['clothes', 'n.', '衣服'], ['shirt', 'n.', '衬衫'], ['T-shirt', 'n.', 'T 恤'], ['skirt', 'n.', '短裙'], ['dress', 'n.', '连衣裙'], ['hat', 'n.', '帽子'], ['shoe', 'n.', '鞋'], ['sock', 'n.', '袜子'], ['jacket', 'n.', '外套'], ['trousers', 'n.', '长裤'], ['shorts', 'n.', '短裤'], ['wear', 'v.', '穿']]],
  ['u8', 'Unit 8', [['sport', 'n.', '运动'], ['football', 'n.', '足球'], ['basketball', 'n.', '篮球'], ['tennis', 'n.', '网球'], ['swim', 'v.', '游泳'], ['run', 'v.', '跑'], ['jump', 'v.', '跳'], ['play', 'v.', '玩'], ['team', 'n.', '队'], ['game', 'n.', '比赛'], ['win', 'v.', '赢'], ['lose', 'v.', '输']]],
  ['u9', 'Unit 9', [['food', 'n.', '食物'], ['rice', 'n.', '米饭'], ['noodle', 'n.', '面条'], ['bread', 'n.', '面包'], ['meat', 'n.', '肉'], ['fish', 'n.', '鱼'], ['egg', 'n.', '鸡蛋'], ['milk', 'n.', '牛奶'], ['fruit', 'n.', '水果'], ['vegetable', 'n.', '蔬菜'], ['breakfast', 'n.', '早餐'], ['dinner', 'n.', '晚餐']]],
  ['u10', 'Unit 10', [['weather', 'n.', '天气'], ['sunny', 'adj.', '晴朗的'], ['rainy', 'adj.', '下雨的'], ['snowy', 'adj.', '下雪的'], ['windy', 'adj.', '有风的'], ['cloudy', 'adj.', '多云的'], ['warm', 'adj.', '温暖的'], ['hot', 'adj.', '热的'], ['cold', 'adj.', '冷的'], ['cool', 'adj.', '凉爽的'], ['season', 'n.', '季节'], ['spring', 'n.', '春天']]],
  ['u11', 'Unit 11', [['school', 'n.', '学校'], ['classroom', 'n.', '教室'], ['library', 'n.', '图书馆'], ['playground', 'n.', '操场'], ['office', 'n.', '办公室'], ['subject', 'n.', '科目'], ['maths', 'n.', '数学'], ['English', 'n.', '英语'], ['Chinese', 'n.', '语文'], ['science', 'n.', '科学'], ['art', 'n.', '美术'], ['music', 'n.', '音乐']]],
  ['u12', 'Unit 12', [['holiday', 'n.', '假日'], ['party', 'n.', '聚会'], ['gift', 'n.', '礼物'], ['cake', 'n.', '蛋糕'], ['sing', 'v.', '唱歌'], ['dance', 'v.', '跳舞'], ['happy', 'adj.', '快乐的'], ['fun', 'adj.', '有趣的'], ['friend', 'n.', '朋友'], ['together', 'adv.', '一起'], ['celebrate', 'v.', '庆祝'], ['wish', 'v.', '祝愿']]],
]);
addBook('mid', 'mid-7b', [
  ['u1', 'Unit 1', [['can', 'v.', '能'], ['play', 'v.', '玩'], ['guitar', 'n.', '吉他'], ['piano', 'n.', '钢琴'], ['chess', 'n.', '国际象棋'], ['speak', 'v.', '说'], ['join', 'v.', '加入'], ['club', 'n.', '俱乐部'], ['dance', 'v.', '跳舞'], ['sing', 'v.', '唱歌'], ['swim', 'v.', '游泳'], ['draw', 'v.', '画画']]],
  ['u2', 'Unit 2', [['time', 'n.', '时间'], ['get up', 'v.', '起床'], ['go to school', 'v.', '上学'], ['eat breakfast', 'v.', '吃早餐'], ['take a shower', 'v.', '洗澡'], ['usually', 'adv.', '通常'], ['always', 'adv.', '总是'], ['never', 'adv.', '从不'], ['morning', 'n.', '早晨'], ['evening', 'n.', '晚上'], ['clock', 'n.', '钟'], ['watch', 'n.', '手表']]],
  ['u3', 'Unit 3', [['bus', 'n.', '公交车'], ['bike', 'n.', '自行车'], ['car', 'n.', '小汽车'], ['train', 'n.', '火车'], ['subway', 'n.', '地铁'], ['walk', 'v.', '步行'], ['ride', 'v.', '骑'], ['drive', 'v.', '驾驶'], ['stop', 'v.', '停止'], ['station', 'n.', '车站'], ['far', 'adj.', '远的'], ['near', 'adj.', '近的']]],
  ['u4', 'Unit 4', [['rule', 'n.', '规则'], ['must', 'v.', '必须'], ['have to', 'v.', '不得不'], ['can', 'v.', '可以'], ['can\'t', 'v.', '不能'], ['listen', 'v.', '听'], ['fight', 'v.', '打架'], ['run', 'v.', '跑'], ['quiet', 'adj.', '安静的'], ['noisy', 'adj.', '吵闹的'], ['late', 'adj.', '迟的'], ['early', 'adj.', '早的']]],
  ['u5', 'Unit 5', [['animal', 'n.', '动物'], ['panda', 'n.', '熊猫'], ['tiger', 'n.', '老虎'], ['lion', 'n.', '狮子'], ['elephant', 'n.', '大象'], ['koala', 'n.', '考拉'], ['cute', 'adj.', '可爱的'], ['smart', 'adj.', '聪明的'], ['lazy', 'adj.', '懒惰的'], ['friendly', 'adj.', '友好的'], ['shy', 'adj.', '害羞的'], ['dangerous', 'adj.', '危险的']]],
  ['u6', 'Unit 6', [['job', 'n.', '工作'], ['doctor', 'n.', '医生'], ['nurse', 'n.', '护士'], ['teacher', 'n.', '老师'], ['driver', 'n.', '司机'], ['worker', 'n.', '工人'], ['farmer', 'n.', '农民'], ['police officer', 'n.', '警察'], ['bank', 'n.', '银行'], ['hospital', 'n.', '医院'], ['busy', 'adj.', '忙碌的'], ['work', 'v.', '工作']]],
  ['u7', 'Unit 7', [['cook', 'v.', '做饭'], ['rice', 'n.', '米饭'], ['noodle', 'n.', '面条'], ['meat', 'n.', '肉'], ['fish', 'n.', '鱼'], ['soup', 'n.', '汤'], ['vegetable', 'n.', '蔬菜'], ['fruit', 'n.', '水果'], ['sweet', 'adj.', '甜的'], ['salty', 'adj.', '咸的'], ['healthy', 'adj.', '健康的'], ['delicious', 'adj.', '美味的']]],
  ['u8', 'Unit 8', [['read', 'v.', '读'], ['write', 'v.', '写'], ['listen', 'v.', '听'], ['speak', 'v.', '说'], ['study', 'v.', '学习'], ['teach', 'v.', '教'], ['book', 'n.', '书'], ['library', 'n.', '图书馆'], ['subject', 'n.', '科目'], ['maths', 'n.', '数学'], ['English', 'n.', '英语'], ['science', 'n.', '科学']]],
  ['u9', 'Unit 9', [['movie', 'n.', '电影'], ['cinema', 'n.', '电影院'], ['watch', 'v.', '观看'], ['interesting', 'adj.', '有趣的'], ['boring', 'adj.', '无聊的'], ['funny', 'adj.', '好笑的'], ['scary', 'adj.', '吓人的'], ['exciting', 'adj.', '刺激的'], ['actor', 'n.', '演员'], ['story', 'n.', '故事'], ['love', 'v.', '喜爱'], ['enjoy', 'v.', '享受']]],
  ['u10', 'Unit 10', [['music', 'n.', '音乐'], ['song', 'n.', '歌曲'], ['sing', 'v.', '唱歌'], ['dance', 'v.', '跳舞'], ['play', 'v.', '演奏'], ['band', 'n.', '乐队'], ['popular', 'adj.', '流行的'], ['classical', 'adj.', '古典的'], ['loud', 'adj.', '大声的'], ['quiet', 'adj.', '安静的'], ['favourite', 'adj.', '最喜欢的'], ['relax', 'v.', '放松']]],
  ['u11', 'Unit 11', [['weekend', 'n.', '周末'], ['clean', 'v.', '打扫'], ['wash', 'v.', '洗'], ['visit', 'v.', '拜访'], ['stay', 'v.', '停留'], ['play', 'v.', '玩'], ['go shopping', 'v.', '购物'], ['relax', 'v.', '放松'], ['busy', 'adj.', '忙碌的'], ['free', 'adj.', '空闲的'], ['fun', 'n.', '乐趣'], ['tired', 'adj.', '疲倦的']]],
  ['u12', 'Unit 12', [['travel', 'v.', '旅行'], ['trip', 'n.', '旅行'], ['beach', 'n.', '海滩'], ['mountain', 'n.', '山'], ['forest', 'n.', '森林'], ['lake', 'n.', '湖'], ['river', 'n.', '河'], ['camp', 'v.', '露营'], ['fish', 'v.', '钓鱼'], ['swim', 'v.', '游泳'], ['photo', 'n.', '照片'], ['happy', 'adj.', '快乐的']]],
]);
addBook('mid', 'mid-8a', [
  ['u1', 'Unit 1', [['exercise', 'v.', '锻炼'], ['health', 'n.', '健康'], ['healthy', 'adj.', '健康的'], ['often', 'adv.', '经常'], ['always', 'adv.', '总是'], ['usually', 'adv.', '通常'], ['sometimes', 'adv.', '有时'], ['never', 'adv.', '从不'], ['junk food', 'n.', '垃圾食品'], ['habit', 'n.', '习惯'], ['sleep', 'v.', '睡觉'], ['early', 'adv.', '早']]],
  ['u2', 'Unit 2', [['cold', 'n.', '感冒'], ['fever', 'n.', '发烧'], ['cough', 'v.', '咳嗽'], ['headache', 'n.', '头痛'], ['stomachache', 'n.', '胃痛'], ['toothache', 'n.', '牙痛'], ['sore', 'adj.', '疼痛的'], ['hurt', 'v.', '受伤'], ['medicine', 'n.', '药'], ['rest', 'n.', '休息'], ['doctor', 'n.', '医生'], ['well', 'adj.', '健康的']]],
  ['u3', 'Unit 3', [['volunteer', 'v.', '志愿'], ['clean up', 'v.', '清理'], ['help', 'v.', '帮助'], ['plant', 'v.', '种植'], ['give out', 'v.', '分发'], ['visit', 'v.', '拜访'], ['raise', 'v.', '筹集'], ['money', 'n.', '钱'], ['charity', 'n.', '慈善'], ['homeless', 'adj.', '无家可归的'], ['care', 'v.', '关心'], ['share', 'v.', '分享']]],
  ['u4', 'Unit 4', [['allow', 'v.', '允许'], ['choose', 'v.', '选择'], ['should', 'v.', '应该'], ['enough', 'adj.', '足够的'], ['busy', 'adj.', '忙碌的'], ['free', 'adj.', '空闲的'], ['independent', 'adj.', '独立的'], ['responsible', 'adj.', '负责的'], ['decision', 'n.', '决定'], ['rule', 'n.', '规则'], ['fair', 'adj.', '公平的'], ['own', 'adj.', '自己的']]],
  ['u5', 'Unit 5', [['cartoon', 'n.', '卡通'], ['comedy', 'n.', '喜剧'], ['news', 'n.', '新闻'], ['documentary', 'n.', '纪录片'], ['show', 'n.', '节目'], ['famous', 'adj.', '著名的'], ['popular', 'adj.', '受欢迎的'], ['boring', 'adj.', '无聊的'], ['interesting', 'adj.', '有趣的'], ['funny', 'adj.', '好笑的'], ['watch', 'v.', '观看'], ['channel', 'n.', '频道']]],
  ['u6', 'Unit 6', [['space', 'n.', '太空'], ['astronaut', 'n.', '宇航员'], ['rocket', 'n.', '火箭'], ['planet', 'n.', '行星'], ['star', 'n.', '恒星'], ['moon', 'n.', '月亮'], ['sun', 'n.', '太阳'], ['earth', 'n.', '地球'], ['explore', 'v.', '探索'], ['future', 'n.', '未来'], ['machine', 'n.', '机器'], ['science', 'n.', '科学']]],
  ['u7', 'Unit 7', [['tour', 'n.', '旅游'], ['guide', 'n.', '导游'], ['map', 'n.', '地图'], ['scenery', 'n.', '风景'], ['famous', 'adj.', '著名的'], ['wonderful', 'adj.', '极好的'], ['capital', 'n.', '首都'], ['population', 'n.', '人口'], ['language', 'n.', '语言'], ['foreign', 'adj.', '外国的'], ['abroad', 'adv.', '在国外'], ['passport', 'n.', '护照']]],
  ['u8', 'Unit 8', [['festival', 'n.', '节日'], ['celebrate', 'v.', '庆祝'], ['traditional', 'adj.', '传统的'], ['lantern', 'n.', '灯笼'], ['dragon', 'n.', '龙'], ['dumpling', 'n.', '饺子'], ['mooncake', 'n.', '月饼'], ['parade', 'n.', '游行'], ['firework', 'n.', '烟花'], ['culture', 'n.', '文化'], ['custom', 'n.', '习俗'], ['holiday', 'n.', '假日']]],
  ['u9', 'Unit 9', [['environment', 'n.', '环境'], ['protect', 'v.', '保护'], ['pollution', 'n.', '污染'], ['recycle', 'v.', '回收'], ['waste', 'n.', '废物'], ['plastic', 'n.', '塑料'], ['paper', 'n.', '纸'], ['energy', 'n.', '能源'], ['save', 'v.', '节约'], ['green', 'adj.', '环保的'], ['earth', 'n.', '地球'], ['clean', 'adj.', '干净的']]],
  ['u10', 'Unit 10', [['future', 'n.', '未来'], ['dream', 'n.', '梦想'], ['job', 'n.', '工作'], ['scientist', 'n.', '科学家'], ['engineer', 'n.', '工程师'], ['artist', 'n.', '艺术家'], ['writer', 'n.', '作家'], ['pilot', 'n.', '飞行员'], ['successful', 'adj.', '成功的'], ['hard', 'adv.', '努力地'], ['hope', 'v.', '希望'], ['plan', 'v.', '计划']]],
]);
addBook('mid', 'mid-8b', [
  ['u1', 'Unit 1', [['matter', 'n.', '事情'], ['wrong', 'adj.', '有问题的'], ['stomachache', 'n.', '胃痛'], ['toothache', 'n.', '牙痛'], ['headache', 'n.', '头痛'], ['fever', 'n.', '发烧'], ['cough', 'v.', '咳嗽'], ['sore throat', 'n.', '喉咙痛'], ['hurt', 'v.', '受伤'], ['medicine', 'n.', '药'], ['rest', 'n.', '休息'], ['doctor', 'n.', '医生']]],
  ['u2', 'Unit 2', [['volunteer', 'v.', '志愿'], ['clean up', 'v.', '清理'], ['cheer up', 'v.', '使振奋'], ['give out', 'v.', '分发'], ['put off', 'v.', '推迟'], ['set up', 'v.', '建立'], ['fix up', 'v.', '修理'], ['raise', 'v.', '筹集'], ['homeless', 'adj.', '无家可归的'], ['charity', 'n.', '慈善'], ['help', 'v.', '帮助'], ['kind', 'adj.', '善良的']]],
  ['u3', 'Unit 3', [['sweep', 'v.', '扫'], ['fold', 'v.', '折叠'], ['trash', 'n.', '垃圾'], ['borrow', 'v.', '借'], ['lend', 'v.', '借出'], ['invite', 'v.', '邀请'], ['snack', 'n.', '零食'], ['chores', 'n.', '家务'], ['dish', 'n.', '盘子'], ['clean', 'v.', '打扫'], ['tidy', 'adj.', '整洁的'], ['messy', 'adj.', '凌乱的']]],
  ['u4', 'Unit 4', [['allow', 'v.', '允许'], ['choose', 'v.', '选择'], ['enough', 'adj.', '足够的'], ['should', 'v.', '应该'], ['independent', 'adj.', '独立的'], ['responsible', 'adj.', '负责的'], ['decision', 'n.', '决定'], ['rule', 'n.', '规则'], ['fair', 'adj.', '公平的'], ['own', 'adj.', '自己的'], ['grow up', 'v.', '长大'], ['adult', 'n.', '成年人']]],
  ['u5', 'Unit 5', [['animal', 'n.', '动物'], ['endangered', 'adj.', '濒危的'], ['protect', 'v.', '保护'], ['habitat', 'n.', '栖息地'], ['wild', 'adj.', '野生的'], ['panda', 'n.', '熊猫'], ['tiger', 'n.', '老虎'], ['elephant', 'n.', '大象'], ['save', 'v.', '拯救'], ['forest', 'n.', '森林'], ['nature', 'n.', '自然'], ['hunt', 'v.', '捕猎']]],
  ['u6', 'Unit 6', [['festival', 'n.', '节日'], ['celebrate', 'v.', '庆祝'], ['traditional', 'adj.', '传统的'], ['lantern', 'n.', '灯笼'], ['dragon', 'n.', '龙'], ['dumpling', 'n.', '饺子'], ['mooncake', 'n.', '月饼'], ['parade', 'n.', '游行'], ['firework', 'n.', '烟花'], ['culture', 'n.', '文化'], ['custom', 'n.', '习俗'], ['holiday', 'n.', '假日']]],
  ['u7', 'Unit 7', [['music', 'n.', '音乐'], ['band', 'n.', '乐队'], ['popular', 'adj.', '流行的'], ['classical', 'adj.', '古典的'], ['loud', 'adj.', '大声的'], ['quiet', 'adj.', '安静的'], ['song', 'n.', '歌曲'], ['sing', 'v.', '唱歌'], ['favourite', 'adj.', '最喜欢的'], ['relax', 'v.', '放松'], ['enjoy', 'v.', '享受'], ['dance', 'v.', '跳舞']]],
  ['u8', 'Unit 8', [['literature', 'n.', '文学'], ['novel', 'n.', '小说'], ['poem', 'n.', '诗歌'], ['writer', 'n.', '作家'], ['character', 'n.', '角色'], ['story', 'n.', '故事'], ['famous', 'adj.', '著名的'], ['classic', 'n.', '名著'], ['read', 'v.', '阅读'], ['library', 'n.', '图书馆'], ['interest', 'n.', '兴趣'], ['review', 'n.', '评论']]],
  ['u9', 'Unit 9', [['science', 'n.', '科学'], ['invention', 'n.', '发明'], ['machine', 'n.', '机器'], ['robot', 'n.', '机器人'], ['technology', 'n.', '技术'], ['discover', 'v.', '发现'], ['experiment', 'n.', '实验'], ['scientist', 'n.', '科学家'], ['future', 'n.', '未来'], ['space', 'n.', '太空'], ['computer', 'n.', '电脑'], ['modern', 'adj.', '现代的']]],
  ['u10', 'Unit 10', [['environment', 'n.', '环境'], ['protect', 'v.', '保护'], ['pollution', 'n.', '污染'], ['recycle', 'v.', '回收'], ['waste', 'n.', '废物'], ['plastic', 'n.', '塑料'], ['energy', 'n.', '能源'], ['save', 'v.', '节约'], ['green', 'adj.', '环保的'], ['clean', 'adj.', '干净的'], ['earth', 'n.', '地球'], ['reduce', 'v.', '减少']]],
]);
addBook('mid', 'mid-9', [
  ['u1', 'Unit 1', [['learn', 'v.', '学习'], ['study', 'v.', '研究'], ['method', 'n.', '方法'], ['practice', 'v.', '练习'], ['improve', 'v.', '提高'], ['ability', 'n.', '能力'], ['skill', 'n.', '技能'], ['knowledge', 'n.', '知识'], ['memory', 'n.', '记忆'], ['review', 'v.', '复习'], ['note', 'n.', '笔记'], ['careful', 'adj.', '仔细的']]],
  ['u2', 'Unit 2', [['invention', 'n.', '发明'], ['invent', 'v.', '发明'], ['machine', 'n.', '机器'], ['technology', 'n.', '技术'], ['discover', 'v.', '发现'], ['scientist', 'n.', '科学家'], ['engineer', 'n.', '工程师'], ['design', 'v.', '设计'], ['modern', 'adj.', '现代的'], ['useful', 'adj.', '有用的'], ['create', 'v.', '创造'], ['tool', 'n.', '工具']]],
  ['u3', 'Unit 3', [['environment', 'n.', '环境'], ['protect', 'v.', '保护'], ['pollution', 'n.', '污染'], ['recycle', 'v.', '回收'], ['waste', 'n.', '废物'], ['plastic', 'n.', '塑料'], ['energy', 'n.', '能源'], ['save', 'v.', '节约'], ['reduce', 'v.', '减少'], ['green', 'adj.', '环保的'], ['clean', 'adj.', '干净的'], ['earth', 'n.', '地球']]],
  ['u4', 'Unit 4', [['festival', 'n.', '节日'], ['celebrate', 'v.', '庆祝'], ['traditional', 'adj.', '传统的'], ['culture', 'n.', '文化'], ['custom', 'n.', '习俗'], ['lantern', 'n.', '灯笼'], ['dragon', 'n.', '龙'], ['dumpling', 'n.', '饺子'], ['mooncake', 'n.', '月饼'], ['parade', 'n.', '游行'], ['firework', 'n.', '烟花'], ['holiday', 'n.', '假日']]],
  ['u5', 'Unit 5', [['music', 'n.', '音乐'], ['band', 'n.', '乐队'], ['popular', 'adj.', '流行的'], ['classical', 'adj.', '古典的'], ['instrument', 'n.', '乐器'], ['piano', 'n.', '钢琴'], ['guitar', 'n.', '吉他'], ['violin', 'n.', '小提琴'], ['song', 'n.', '歌曲'], ['sing', 'v.', '唱歌'], ['perform', 'v.', '表演'], ['enjoy', 'v.', '享受']]],
  ['u6', 'Unit 6', [['literature', 'n.', '文学'], ['novel', 'n.', '小说'], ['poem', 'n.', '诗歌'], ['writer', 'n.', '作家'], ['character', 'n.', '角色'], ['story', 'n.', '故事'], ['famous', 'adj.', '著名的'], ['classic', 'n.', '名著'], ['read', 'v.', '阅读'], ['library', 'n.', '图书馆'], ['interest', 'n.', '兴趣'], ['review', 'n.', '评论']]],
  ['u7', 'Unit 7', [['health', 'n.', '健康'], ['healthy', 'adj.', '健康的'], ['exercise', 'v.', '锻炼'], ['habit', 'n.', '习惯'], ['sleep', 'v.', '睡觉'], ['junk food', 'n.', '垃圾食品'], ['medicine', 'n.', '药'], ['doctor', 'n.', '医生'], ['rest', 'n.', '休息'], ['stress', 'n.', '压力'], ['relax', 'v.', '放松'], ['fit', 'adj.', '健壮的']]],
  ['u8', 'Unit 8', [['travel', 'v.', '旅行'], ['tour', 'n.', '旅游'], ['guide', 'n.', '导游'], ['map', 'n.', '地图'], ['scenery', 'n.', '风景'], ['capital', 'n.', '首都'], ['population', 'n.', '人口'], ['language', 'n.', '语言'], ['foreign', 'adj.', '外国的'], ['abroad', 'adv.', '在国外'], ['passport', 'n.', '护照'], ['beach', 'n.', '海滩']]],
  ['u9', 'Unit 9', [['future', 'n.', '未来'], ['dream', 'n.', '梦想'], ['job', 'n.', '工作'], ['career', 'n.', '职业'], ['scientist', 'n.', '科学家'], ['engineer', 'n.', '工程师'], ['artist', 'n.', '艺术家'], ['writer', 'n.', '作家'], ['pilot', 'n.', '飞行员'], ['successful', 'adj.', '成功的'], ['hard', 'adv.', '努力地'], ['plan', 'v.', '计划']]],
  ['u10', 'Unit 10', [['communication', 'n.', '交流'], ['message', 'n.', '消息'], ['internet', 'n.', '互联网'], ['email', 'n.', '电子邮件'], ['phone', 'n.', '电话'], ['social', 'adj.', '社交的'], ['share', 'v.', '分享'], ['connect', 'v.', '连接'], ['online', 'adv.', '在线'], ['website', 'n.', '网站'], ['screen', 'n.', '屏幕'], ['information', 'n.', '信息']]],
  ['u11', 'Unit 11', [['challenge', 'n.', '挑战'], ['difficulty', 'n.', '困难'], ['overcome', 'v.', '克服'], ['brave', 'adj.', '勇敢的'], ['confident', 'adj.', '自信的'], ['patient', 'adj.', '耐心的'], ['responsible', 'adj.', '负责的'], ['honest', 'adj.', '诚实的'], ['wise', 'adj.', '明智的'], ['kind', 'adj.', '善良的'], ['support', 'v.', '支持'], ['encourage', 'v.', '鼓励']]],
  ['u12', 'Unit 12', [['nature', 'n.', '自然'], ['mountain', 'n.', '山'], ['river', 'n.', '河'], ['lake', 'n.', '湖'], ['forest', 'n.', '森林'], ['ocean', 'n.', '海洋'], ['desert', 'n.', '沙漠'], ['island', 'n.', '岛屿'], ['weather', 'n.', '天气'], ['season', 'n.', '季节'], ['wild', 'adj.', '野生的'], ['beautiful', 'adj.', '美丽的']]],
  ['u13', 'Unit 13', [['society', 'n.', '社会'], ['rule', 'n.', '规则'], ['respect', 'v.', '尊重'], ['fair', 'adj.', '公平的'], ['equal', 'adj.', '平等的'], ['right', 'n.', '权利'], ['duty', 'n.', '责任'], ['citizen', 'n.', '公民'], ['law', 'n.', '法律'], ['public', 'adj.', '公共的'], ['community', 'n.', '社区'], ['together', 'adv.', '一起']]],
  ['u14', 'Unit 14', [['farewell', 'n.', '告别'], ['memory', 'n.', '回忆'], ['remember', 'v.', '记得'], ['miss', 'v.', '想念'], ['friend', 'n.', '朋友'], ['teacher', 'n.', '老师'], ['classmate', 'n.', '同学'], ['graduation', 'n.', '毕业'], ['future', 'n.', '未来'], ['hope', 'v.', '希望'], ['wish', 'v.', '祝愿'], ['goodbye', 'int.', '再见']]],
]);
// INSERT-HERE
console.log('emitted', emitAll(), 'words');
