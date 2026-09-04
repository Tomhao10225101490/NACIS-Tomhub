/** Alex Practice · bilingual MCQ / TF bank (expanded + fully bilingual) */
export const questions = [
  {
    "id": "q-p1",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "声音是由物体的什么产生的？ / What produces sound?",
    "options": [
      "振动 vibration",
      "发光 light emission",
      "传热 heat transfer",
      "流动 flowing"
    ],
    "answer": 0,
    "explain": "发声体都在振动；振动停止则发声停止。 / Sound is produced by vibration."
  },
  {
    "id": "q-p2",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "声音可以在真空中传播。 / Sound can travel through a vacuum.",
    "answer": false,
    "explain": "声音是机械波，需介质；真空不能传声。 / Sound needs a medium; vacuum cannot transmit sound."
  },
  {
    "id": "q-p3",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "决定音调高低的是？ / What determines pitch?",
    "options": [
      "振幅 amplitude",
      "频率 frequency",
      "音色 timbre",
      "声速 speed of sound"
    ],
    "answer": 1,
    "explain": "频率越高，音调越高。 / Higher frequency → higher pitch."
  },
  {
    "id": "q-p4",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "决定响度大小的主要因素是？ / Loudness mainly depends on ______.",
    "options": [
      "频率 frequency",
      "振幅 amplitude",
      "音色 timbre",
      "波长 wavelength"
    ],
    "answer": 1,
    "explain": "振幅越大，响度越大。 / Larger amplitude → louder sound."
  },
  {
    "id": "q-p5",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "超声波的频率高于 20000 Hz。 / Ultrasound has frequency above 20 000 Hz.",
    "answer": true,
    "explain": "高于 20 kHz 为超声，低于 20 Hz 为次声。 / >20 kHz ultrasound; <20 Hz infrasound."
  },
  {
    "id": "q-p6",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "一般情况下，声音在哪种介质中传播最快？ / In which medium does sound usually travel fastest?",
    "options": [
      "空气 air",
      "水 water",
      "钢铁 steel",
      "真空 vacuum"
    ],
    "answer": 2,
    "explain": "通常：固体 > 液体 > 气体。 / Usually solids > liquids > gases."
  },
  {
    "id": "q-p7",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "“音色”的英文是？ / The English word for 音色 is ______.",
    "options": [
      "音调 pitch",
      "响度 loudness",
      "音色 timbre",
      "回声 echo"
    ],
    "answer": 2,
    "explain": "音色对应 timbre；pitch=音调；loudness=响度。 / Timbre means tone quality; pitch is 音调; loudness is 响度."
  },
  {
    "id": "q-p8",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "音调由振幅决定。 / Pitch is determined by amplitude.",
    "answer": false,
    "explain": "音调由频率决定；振幅决定响度。 / Pitch→frequency; loudness→amplitude."
  },
  {
    "id": "q-p9",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "减弱噪声的途径不包括？ / Which is NOT a way to reduce noise?",
    "options": [
      "在声源处减弱 at source",
      "在传播途径中减弱 along path",
      "在人耳处减弱 at ear",
      "提高声音的频率 raise frequency"
    ],
    "answer": 3,
    "explain": "噪声控制：声源、传播途径、接收处。 / Noise control: at source, along the path, and at the receiver."
  },
  {
    "id": "q-p10",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "分贝（dB）用来表示？ / The decibel (dB) is used to express ______.",
    "options": [
      "音调 pitch",
      "音色 timbre",
      "声音强弱 sound level",
      "声速 speed"
    ],
    "answer": 2,
    "explain": "分贝表示声音强弱（声强级）。 / The decibel expresses sound intensity level."
  },
  {
    "id": "q-p11",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "月球上两名宇航员不借助无线电也能直接对话。 / Astronauts on the Moon can talk without radio.",
    "answer": false,
    "explain": "月球近似真空，声音无法传播。 / Near vacuum — no sound transmission."
  },
  {
    "id": "q-p12",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "人耳的听觉频率范围大约是？ / Human hearing range is about ______.",
    "options": [
      "0–20 Hz 次声范围附近",
      "20–20 000 Hz 可听声",
      "20 kHz–2 MHz 超声段",
      "仅 440 Hz only A4"
    ],
    "answer": 1,
    "explain": "约 20 Hz–20 000 Hz。 / About 20 Hz–20 000 Hz."
  },
  {
    "id": "q-p13",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "空气中声速大约是（15℃）？ / Speed of sound in air at ~15°C is about ______.",
    "options": [
      "3×10⁸ m/s 光速量级",
      "34 m/s 过小",
      "340 m/s 空气中声速",
      "3400 m/s 固体量级"
    ],
    "answer": 2,
    "explain": "约 340 m / About 340 m / s."
  },
  {
    "id": "q-p14",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "次声波的频率低于 20 Hz。 / Infrasound has frequency below 20 Hz.",
    "answer": true,
    "explain": "低于 20 Hz 的声波叫次声波。 / Sound below 20 Hz is called infrasound."
  },
  {
    "id": "q-p15",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "回声测距中，若声速为 v、往返时间为 t，距离约为？ / Echo ranging: distance ≈ ______.",
    "options": [
      "vt 往返路程",
      "vt/2 单程距离",
      "2vt 过大",
      "v/t 无意义"
    ],
    "answer": 1,
    "explain": "单程距离 s = vt / One-way distance s = vt / 2."
  },
  {
    "id": "q-p16",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "下列关于乐音三要素，对应正确的是？ / Which pairing is correct?",
    "options": [
      "音调↔频率 pitch↔frequency",
      "响度↔频率 loudness↔frequency",
      "音色↔振幅 timbre↔amplitude",
      "音调↔振幅 pitch↔amplitude"
    ],
    "answer": 0,
    "explain": "音调-频率；响度-振幅；音色-波形 / Pitch↔frequency; loudness↔amplitude; timbre↔waveform / material."
  },
  {
    "id": "q-p17",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "声音在固体中一定不能传播。 / Sound cannot travel in solids.",
    "answer": false,
    "explain": "固体通常也能传声，且往往更快。 / Solids usually transmit sound and often faster."
  },
  {
    "id": "q-p18",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "用棉花塞耳属于在何处减弱噪声？ / Cotton in ears reduces noise at the ______.",
    "options": [
      "声源 source",
      "传播途径 path",
      "人耳 receiver",
      "真空 vacuum"
    ],
    "answer": 2,
    "explain": "在人耳（接收处）减弱。 / Reduced at the ear (receiver)."
  },
  {
    "id": "q-p19",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "声波在空气中属于？ / Sound waves in air are ______.",
    "options": [
      "横波 transverse",
      "纵波 longitudinal",
      "电磁波 electromagnetic",
      "不需要介质 no medium"
    ],
    "answer": 1,
    "explain": "纵波（疏密波）。 / Longitudinal (compression) waves."
  },
  {
    "id": "q-p20",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "频率越高，波长一定越长（同介质、同声速）。 / Higher frequency always means longer wavelength (same medium).",
    "answer": false,
    "explain": "v=fλ，声速一定时，频率越高波长越短。 / From v=fλ, higher f means shorter λ at fixed speed."
  },
  {
    "id": "q-p21",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "蝙蝠探测障碍物主要利用？ / Bats detect obstacles mainly using ______.",
    "options": [
      "次声波 infrasound",
      "可见光 visible light",
      "超声波 ultrasound",
      "红外线 infrared"
    ],
    "answer": 2,
    "explain": "超声波回声定位。 / Ultrasound echolocation."
  },
  {
    "id": "q-p22",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "下列能传声的是？ / Which can transmit sound?",
    "options": [
      "水 water",
      "真空 vacuum",
      "月球表面无介质处 vacuum on Moon",
      "完全空的太空 empty space"
    ],
    "answer": 0,
    "explain": "水可以传声；真空不能。 / Water transmits sound; vacuum does not."
  },
  {
    "id": "q-p23",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "振幅越大，音调一定越高。 / Larger amplitude always means higher pitch.",
    "answer": false,
    "explain": "振幅影响响度，不影响音调。 / Amplitude affects loudness, not pitch."
  },
  {
    "id": "q-p24",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "噪声污染主要危害不包括？ / Noise pollution does NOT mainly cause ______.",
    "options": [
      "听力损伤 hearing loss",
      "睡眠干扰 sleep disturbance",
      "情绪烦躁 annoyance",
      "提高智商 higher IQ"
    ],
    "answer": 3,
    "explain": "噪声影响听力与健康，但不提高智商。 / Noise harms hearing / health but does not raise IQ."
  },
  {
    "id": "q-p25",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "音叉发声时，叉股在？ / When a tuning fork sounds, its prongs are ______.",
    "options": [
      "振动 vibrating",
      "静止 still",
      "熔化 melting",
      "发光 glowing"
    ],
    "answer": 0,
    "explain": "振动。 / They are vibrating."
  },
  {
    "id": "q-p26",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "真空中光速可传播，但声速不能。 / Light can travel in vacuum but sound cannot.",
    "answer": true,
    "explain": "光是电磁波；声是机械波。 / Light is electromagnetic; sound is mechanical."
  },
  {
    "id": "q-p27",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "同一声源，距离越远通常响度？ / Farther from a source, loudness usually ______.",
    "options": [
      "增大 increases",
      "减小 decreases",
      "不变 unchanged",
      "先增后减 increases then decreases only"
    ],
    "answer": 1,
    "explain": "减小。 / It decreases."
  },
  {
    "id": "q-p28",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "下列属于超声波应用的是？ / An application of ultrasound is ______.",
    "options": [
      "广播电台 radio broadcast",
      "人耳听音乐 listening to music",
      "医学 B 超 medical ultrasound scan",
      "次声预警 only infrasound warning"
    ],
    "answer": 2,
    "explain": "B 超、测距、清洗等。 / Ultrasound imaging, ranging, cleaning, etc."
  },
  {
    "id": "q-p29",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "只要物体振动，人就一定能听到声音。 / Any vibration must be heard by humans.",
    "answer": false,
    "explain": "频率超出听觉范围或响度太小则听不到。 / If frequency is outside hearing range or loudness is too low, we cannot hear it."
  },
  {
    "id": "q-p30",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "“禁止鸣笛”是在何处控制噪声？ / 'No horn' controls noise at the ______.",
    "options": [
      "声源 source",
      "传播途径 path",
      "人耳 ear",
      "真空 vacuum"
    ],
    "answer": 0,
    "explain": "声源处。 / At the source."
  },
  {
    "id": "q-p31",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "光在同种均匀介质中沿直线传播。 / Light travels in straight lines in a uniform medium.",
    "answer": true,
    "explain": "直线传播可解释影子、小孔成像等。 / Rectilinear propagation explains shadows and pinhole images."
  },
  {
    "id": "q-p32",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "光的反射定律中，反射角 ______ 入射角。 / In reflection, angle of reflection ______ angle of incidence.",
    "options": [
      "大于 greater than >",
      "小于 less than <",
      "等于 equal to =",
      "无关 unrelated"
    ],
    "answer": 2,
    "explain": "反射角等于入射角。 / Angle of reflection equals angle of incidence."
  },
  {
    "id": "q-p33",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "平面镜成像的特点是？ / A plane mirror forms an image that is ______.",
    "options": [
      "倒立缩小实像 inverted diminished real",
      "正立等大虚像 upright same-size virtual",
      "倒立放大虚像 inverted magnified virtual",
      "正立放大实像 upright magnified real"
    ],
    "answer": 1,
    "explain": "正立、等大、虚像。 / Upright, same-size virtual image."
  },
  {
    "id": "q-p34",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "虚像可以用光屏承接。 / A virtual image can be caught on a screen.",
    "answer": false,
    "explain": "虚像不能用光屏承接；实像可以。 / Virtual images cannot be caught on a screen; real images can."
  },
  {
    "id": "q-p35",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "凸透镜对光线的作用是？ / A convex lens ______ light.",
    "options": [
      "发散 diverges",
      "会聚 converges",
      "既不会聚也不发散 neither",
      "吸收 absorbs"
    ],
    "answer": 1,
    "explain": "会聚 converging。 / A converging (convex) lens gathers parallel rays."
  },
  {
    "id": "q-p36",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "矫正近视眼应使用？ / Myopia is corrected with a ______.",
    "options": [
      "凸透镜 convex lens",
      "凹透镜 concave lens",
      "平面镜 plane mirror",
      "三棱镜 prism"
    ],
    "answer": 1,
    "explain": "凹透镜。 / A concave (diverging) lens."
  },
  {
    "id": "q-p37",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "当物距 u > 2f 时，凸透镜成的像是？ / For a convex lens, if u > 2f, the image is ______.",
    "options": [
      "倒立缩小实像 inverted diminished real",
      "倒立放大实像 inverted magnified real",
      "正立放大虚像 upright magnified virtual",
      "正立等大实像 upright same-size real"
    ],
    "answer": 0,
    "explain": "倒立缩小实像（照相机）。 / Inverted diminished real image (camera)."
  },
  {
    "id": "q-p38",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "光的三原色是红、黄、蓝。 / Primary colours of light are red, yellow, blue.",
    "answer": false,
    "explain": "光的三原色是红、绿、蓝（RGB）。 / Primary colours of light are red, green and blue (RGB)."
  },
  {
    "id": "q-p39",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "红外线的显著特点是？ / A key property of infrared is ______.",
    "options": [
      "化学作用强 strong chemical effect",
      "热效应强 strong heating effect",
      "荧光作用强 fluorescence",
      "杀菌能力强 sterilising"
    ],
    "answer": 1,
    "explain": "热效应强。 / Strong heating effect."
  },
  {
    "id": "q-p40",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "光从空气斜射入水中时，折射角 ______ 入射角。 / Air to water: angle of refraction ______ angle of incidence.",
    "options": [
      "大于 greater than >",
      "小于 less than <",
      "等于 equal to =",
      "无法确定 unknown"
    ],
    "answer": 1,
    "explain": "折射角小于入射角。 / Angle of refraction is smaller than angle of incidence."
  },
  {
    "id": "q-p41",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "凹透镜对光有发散作用，可矫正远视。 / A concave lens corrects long-sightedness.",
    "answer": false,
    "explain": "凹透镜矫正近视；远视用凸透镜。 / Concave lens corrects myopia; convex corrects hyperopia."
  },
  {
    "id": "q-p42",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "放大镜利用凸透镜成什么像？ / A magnifying glass forms a ______.",
    "options": [
      "倒立缩小实像 inverted diminished real",
      "倒立放大实像 inverted magnified real",
      "正立放大虚像 upright magnified virtual",
      "正立缩小虚像 upright diminished virtual"
    ],
    "answer": 2,
    "explain": "u < f：正立放大虚像。 / When u < f: upright magnified virtual image."
  },
  {
    "id": "q-p43",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "法线与镜面的关系是？ / The normal is ______ to the mirror surface.",
    "options": [
      "平行 parallel",
      "成 45° at 45°",
      "垂直 perpendicular",
      "重合 coincident"
    ],
    "answer": 2,
    "explain": "垂直。 / Perpendicular (normal)."
  },
  {
    "id": "q-p44",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "入射角是入射光线与镜面的夹角。 / Angle of incidence is between incident ray and mirror.",
    "answer": false,
    "explain": "入射角是入射光线与法线的夹角。 / Incidence angle is between incident ray and the normal."
  },
  {
    "id": "q-p45",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "矫正远视眼应使用？ / Hyperopia is corrected with a ______.",
    "options": [
      "凸透镜 convex lens",
      "凹透镜 concave lens",
      "平面镜 plane mirror",
      "三棱镜 triangular prism"
    ],
    "answer": 0,
    "explain": "凸透镜。 / A convex (converging) lens."
  },
  {
    "id": "q-p46",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "白光通过三棱镜色散后，偏折最大的通常是？ / In dispersion, which colour is bent most?",
    "options": [
      "红 red",
      "绿 green",
      "黄 yellow",
      "紫 violet"
    ],
    "answer": 3,
    "explain": "紫光偏折最大，红光最小。 / Violet bends most; red least."
  },
  {
    "id": "q-p47",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "实像一定是倒立的，虚像一定是正立的（透镜常见情形）。 / For common lens cases: real images inverted, virtual upright.",
    "answer": true,
    "explain": "凸透镜：实像倒立，虚像正立（中学范围）。 / Convex lens: real images inverted; virtual images upright (school level)."
  },
  {
    "id": "q-p48",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "紫外线的作用不包括？ / Ultraviolet is NOT mainly used for ______.",
    "options": [
      "强热取暖 strong heating",
      "杀菌 sterilisation",
      "使荧光物质发光 fluorescence",
      "促进维生素 D 合成 vitamin D"
    ],
    "answer": 0,
    "explain": "紫外线可杀菌、使荧光物质发光；热效应主要是红外。 / UV can sterilise and cause fluorescence; IR mainly heats."
  },
  {
    "id": "q-p49",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "小孔成像成的是？ / A pinhole forms a ______.",
    "options": [
      "正立虚像 upright virtual",
      "倒立实像 inverted real",
      "正立实像 upright real",
      "倒立虚像 inverted virtual"
    ],
    "answer": 1,
    "explain": "倒立的实像。 / An inverted real image."
  },
  {
    "id": "q-p50",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "光在真空中的速度约为 3×10⁸ m/s。 / Speed of light in vacuum is about 3×10⁸ m/s.",
    "answer": true,
    "explain": "这是光速的常用近似值。 / This is the usual approximate value of c."
  },
  {
    "id": "q-p51",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "漫反射 ______ 遵守反射定律。 / Diffuse reflection ______ the laws of reflection.",
    "options": [
      "不遵守 does not obey",
      "遵守 obeys",
      "只在夜间遵守 only at night",
      "只对红光遵守 only for red"
    ],
    "answer": 1,
    "explain": "仍然遵守。 / The laws still hold."
  },
  {
    "id": "q-p52",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "当 u = 2f 时，凸透镜成？ / For convex lens at u = 2f, image is ______.",
    "options": [
      "倒立等大实像 inverted same-size real",
      "正立放大虚像 upright magnified virtual",
      "倒立缩小实像 inverted diminished real",
      "不成像 no image"
    ],
    "answer": 0,
    "explain": "倒立等大实像。 / Inverted same-size real image."
  },
  {
    "id": "q-p53",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "平面镜成的像与物到镜面的距离相等。 / Object and plane-mirror image are equidistant from the mirror.",
    "answer": true,
    "explain": "像与物关于镜面对称。 / Object and image are symmetric about the mirror."
  },
  {
    "id": "q-p54",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "近视眼成像落在视网膜的？ / In myopia, the image forms ______ the retina.",
    "options": [
      "前方 in front of",
      "后方 behind",
      "之上 on",
      "无关 unrelated"
    ],
    "answer": 0,
    "explain": "前方。 / In front of the retina."
  },
  {
    "id": "q-p55",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "下列属于光的直线传播现象的是？ / Which is due to rectilinear propagation?",
    "options": [
      "海市蜃楼 mirage",
      "彩虹 rainbow",
      "影子 shadow",
      "透镜成像 lens imaging mainly"
    ],
    "answer": 2,
    "explain": "影子。 / A shadow."
  },
  {
    "id": "q-p56",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "凹透镜对光线有会聚作用。 / A concave lens converges light.",
    "answer": false,
    "explain": "凹透镜发散光线。 / A concave lens diverges light."
  },
  {
    "id": "q-p57",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "投影仪利用凸透镜成？ / A projector forms a ______.",
    "options": [
      "正立放大虚像 upright magnified virtual",
      "倒立放大实像 inverted magnified real",
      "倒立缩小实像 inverted diminished real",
      "正立等大虚像 upright same-size virtual"
    ],
    "answer": 1,
    "explain": "倒立放大实像。 / Inverted magnified real image."
  },
  {
    "id": "q-p58",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "光从水斜射入空气，折射角 ______ 入射角。 / Water to air: refraction angle ______ incidence angle.",
    "options": [
      "大于 greater than >",
      "小于 less than <",
      "等于 equal to =",
      "一定 90° always 90°"
    ],
    "answer": 0,
    "explain": "折射角大于入射角。 / Angle of refraction is larger than angle of incidence."
  },
  {
    "id": "q-p59",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "我们能从不同方向看到本身不发光的物体，是因为漫反射。 / We see non-luminous objects from many directions due to diffuse reflection.",
    "answer": true,
    "explain": "粗糙表面发生漫反射。 / Rough surfaces cause diffuse reflection."
  },
  {
    "id": "q-p60",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "过光心的光线经透镜后？ / A ray through the optical centre ______.",
    "options": [
      "一定过焦点 through focus",
      "一定平行主光轴 parallel to axis",
      "方向不变 undeviated",
      "一定反射 reflected"
    ],
    "answer": 2,
    "explain": "传播方向不变。 / Direction unchanged."
  },
  {
    "id": "q-p61",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "判断物体运动或静止，必须选定？ / To judge motion or rest you must choose a ______.",
    "options": [
      "质量 mass",
      "参照物 reference object",
      "速度 speed",
      "力 force"
    ],
    "answer": 1,
    "explain": "参照物。 / A reference object / frame."
  },
  {
    "id": "q-p62",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "速度公式是？ / The formula for speed is ______.",
    "options": [
      "v = s×t 错误式",
      "v = s÷t 速度公式",
      "v = t÷s 错误式",
      "v = F÷m 错误式"
    ],
    "answer": 1,
    "explain": "速度等于路程除以时间：v = s÷t。 / Speed equals distance divided by time: v = s/t."
  },
  {
    "id": "q-p63",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "力的单位是牛顿，符号为 N。 / The unit of force is the newton (N).",
    "answer": true,
    "explain": "国际单位制中力的单位是牛顿。 / The SI unit of force is the newton."
  },
  {
    "id": "q-p64",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "重力的施力物体是？ / The agent of gravity on Earth is the ______.",
    "options": [
      "桌子 table",
      "空气 air",
      "地球 Earth",
      "人 person"
    ],
    "answer": 2,
    "explain": "地球。 / The Earth."
  },
  {
    "id": "q-p65",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "二力平衡的条件不包括？ / Which is NOT required for two-force balance?",
    "options": [
      "大小相等 equal magnitude",
      "方向相反 opposite direction",
      "作用在同一直线上 same line",
      "作用在两个不同物体上 on two different bodies"
    ],
    "answer": 3,
    "explain": "必须作用在同一物体上。 / They must act on the same object."
  },
  {
    "id": "q-p66",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "惯性是一种力。 / Inertia is a type of force.",
    "answer": false,
    "explain": "惯性是物体的固有属性，不是力。 / Inertia is a property of matter, not a force."
  },
  {
    "id": "q-p67",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "牛顿第一定律指出：物体不受力时将？ / Newton's first law: if no net force, a body ______.",
    "options": [
      "一定静止 always at rest",
      "一定匀速直线 always uniform motion",
      "保持静止或匀速直线 rest or uniform motion",
      "加速 accelerate"
    ],
    "answer": 2,
    "explain": "保持静止或匀速直线运动。 / Remain at rest or in uniform straight-line motion."
  },
  {
    "id": "q-p68",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "G = mg 中，g 的近似值通常取？ / In G = mg, g is about ______.",
    "options": [
      "1 N/kg 过小",
      "9.8 N/kg 重力加速度 g",
      "100 N/kg 过大",
      "0.98 N/kg 过小"
    ],
    "answer": 1,
    "explain": "9.8 N / About 9.8 N / kg."
  },
  {
    "id": "q-p69",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "力可以离开物体而独立存在。 / A force can exist without objects.",
    "answer": false,
    "explain": "力是物体对物体的作用。 / Force is an interaction between objects."
  },
  {
    "id": "q-p70",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "力的三要素是？ / The three elements of a force are ______.",
    "options": [
      "大小、方向、速度 magnitude, direction, speed",
      "大小、方向、作用点 magnitude, direction, point",
      "质量、方向、作用点 mass, direction, point of action",
      "大小、质量、方向 magnitude, mass, direction"
    ],
    "answer": 1,
    "explain": "大小、方向、作用点。 / Magnitude, direction and point of application."
  },
  {
    "id": "q-p71",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "汽车突然刹车，乘客向前倾是因为？ / Passengers lurch forward in sudden braking due to ______.",
    "options": [
      "重力 gravity",
      "惯性 inertia",
      "摩擦力 friction",
      "弹力 elastic force"
    ],
    "answer": 1,
    "explain": "惯性。 / Inertia."
  },
  {
    "id": "q-p72",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "物体受到平衡力时一定保持静止。 / Balanced forces mean a body must be at rest.",
    "answer": false,
    "explain": "也可能做匀速直线运动。 / It may also move at constant velocity in a straight line."
  },
  {
    "id": "q-p73",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "质量 2 kg 的物体，重力约为？（g=10 N/kg） / Mass 2 kg; weight ≈ ? (g=10)",
    "options": [
      "2 N 过小",
      "10 N 干扰项",
      "20 N 正确",
      "200 N 过大"
    ],
    "answer": 2,
    "explain": "重力 G = mg = 2×10 = 20 N。 / Weight G = mg = 2×10 = 20 N."
  },
  {
    "id": "q-p74",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "坐在行驶火车上的人看路旁树在后退，所选参照物是？ / Trees seem to move backward; reference is likely the ______.",
    "options": [
      "火车 train",
      "树 trees",
      "地面 ground only",
      "太阳 Sun only"
    ],
    "answer": 0,
    "explain": "火车（自己）。 / The train itself (as reference)."
  },
  {
    "id": "q-p75",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "质量越大，惯性越大。 / Greater mass means greater inertia.",
    "answer": true,
    "explain": "惯性大小只与质量有关。 / Inertia depends only on mass."
  },
  {
    "id": "q-p76",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "测量力的常用仪器是？ / Force is commonly measured with a ______.",
    "options": [
      "天平 balance",
      "温度计 thermometer",
      "弹簧测力计 spring balance",
      "量筒 measuring cylinder"
    ],
    "answer": 2,
    "explain": "弹簧测力计。 / A spring balance (newtonmeter)."
  },
  {
    "id": "q-p77",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "匀速直线运动的速度？ / In uniform linear motion, speed ______.",
    "options": [
      "大小方向都不变 constant magnitude & direction",
      "只大小变 only magnitude changes",
      "只方向变 only direction changes",
      "不断增大 keeps increasing"
    ],
    "answer": 0,
    "explain": "大小和方向都不变。 / Both magnitude and direction stay constant."
  },
  {
    "id": "q-p78",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "摩擦力的方向总是与物体运动方向相反。 / Friction always opposes the direction of motion.",
    "answer": false,
    "explain": "阻碍的是相对运动或相对运动趋势，不一定与运动方向相反（如人走路时静摩擦可向前）。 / Friction opposes relative motion or tendency; not always opposite to travel direction."
  },
  {
    "id": "q-p79",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "同一地点，物体重量与质量的关系是？ / At the same place, weight and mass are ______.",
    "options": [
      "无关 unrelated",
      "成正比 proportional",
      "成反比 inversely proportional",
      "相等 equal"
    ],
    "answer": 1,
    "explain": "成正比 G=mg。 / Proportional: G = mg."
  },
  {
    "id": "q-p80",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "下列属于平衡状态的是？ / Which is an equilibrium state?",
    "options": [
      "自由落体加速 accelerating free fall",
      "转弯转弯 turning",
      "静止或匀速直线 rest or uniform motion",
      "刹车减速 decelerating"
    ],
    "answer": 2,
    "explain": "匀速直线或静止。 / Uniform straight-line motion or rest."
  },
  {
    "id": "q-p81",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "作用力与反作用力是一对平衡力。 / Action and reaction are a pair of balanced forces.",
    "answer": false,
    "explain": "作用在两个物体上，不是平衡力。 / They act on two different objects — not a balanced pair on one body."
  },
  {
    "id": "q-p82",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "减小有害摩擦的方法是？ / A way to reduce unwanted friction is ______.",
    "options": [
      "增大压力 increase pressure",
      "加润滑剂 lubricate",
      "把接触面弄得更粗糙 roughen surfaces",
      "增大接触面积（滑动） only increase area"
    ],
    "answer": 1,
    "explain": "加润滑油等。 / Add lubricant, etc."
  },
  {
    "id": "q-p83",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "路程 100 m，时间 20 s，平均速度是？ / Distance 100 m in 20 s; average speed = ______.",
    "options": [
      "2000 m/s 过大",
      "0.2 m/s 过小",
      "5 m/s 正确",
      "20 m/s 干扰项"
    ],
    "answer": 2,
    "explain": "平均速度 = 总路程÷总时间 = 1000÷200 = 5 m/s。 / Average speed = total distance/total time = 5 m/s."
  },
  {
    "id": "q-p84",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "力是维持物体运动的原因。 / Force is needed to keep an object moving.",
    "answer": false,
    "explain": "力是改变运动状态的原因；牛顿第一定律。 / Force changes motion state; Newton I describes inertia."
  },
  {
    "id": "q-p85",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "下列关于重力，正确的是？ / Which statement about gravity is correct?",
    "options": [
      "方向竖直向下 vertically downward",
      "方向总水平 always horizontal",
      "与质量无关 independent of mass",
      "施力物体是空气 agent is air"
    ],
    "answer": 0,
    "explain": "方向竖直向下（指向地心）。 / Vertically downward (towards Earth centre)."
  },
  {
    "id": "q-p86",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "踢出的足球在草地上越滚越慢，是因为？ / A rolling ball slows on grass mainly due to ______.",
    "options": [
      "没有惯性 no inertia",
      "惯性消失 inertia vanishes",
      "受到摩擦等阻力 friction/resistance",
      "重力消失 gravity vanishes"
    ],
    "answer": 2,
    "explain": "受到阻力（摩擦等）。 / It experiences resistance (friction, etc.)."
  },
  {
    "id": "q-p87",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "参照物可以任意选择，但选不同参照物结论可能不同。 / Choice of reference frame can change the description of motion.",
    "answer": true,
    "explain": "运动具有相对性。 / Motion is relative."
  },
  {
    "id": "q-p88",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "弹簧测力计的原理基于？ / A spring balance works based on ______.",
    "options": [
      "惯性 inertia",
      "胡克定律/弹性形变 Hooke / elasticity",
      "光速 light speed",
      "密度 density"
    ],
    "answer": 1,
    "explain": "在弹性限度内，弹簧伸长与拉力成正比。 / Within elastic limit, extension ∝ pulling force."
  },
  {
    "id": "q-p89",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "一对平衡力的合力是？ / The resultant of two balanced forces is ______.",
    "options": [
      "零 zero",
      "等于较大的力 the larger force",
      "等于两力之和 sum",
      "无法确定 unknown"
    ],
    "answer": 0,
    "explain": "零。 / Zero."
  },
  {
    "id": "q-p90",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "航天员在太空中质量为零。 / Astronauts in space have zero mass.",
    "answer": false,
    "explain": "质量不变；失重不等于质量为零。 / Mass unchanged; weightlessness ≠ zero mass."
  },
  {
    "id": "q-b1",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "人体结构和功能的基本单位是？ / The basic unit of the human body is the ______.",
    "options": [
      "组织 tissue",
      "器官 organ",
      "细胞 cell",
      "系统 system"
    ],
    "answer": 2,
    "explain": "细胞 → 组织 → 器官 → 系统。 / Cell → tissue → organ → system."
  },
  {
    "id": "q-b2",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "消化和吸收的主要场所是？ / Main site of digestion and absorption is the ______.",
    "options": [
      "胃 stomach",
      "小肠 small intestine",
      "大肠 large intestine",
      "口腔 mouth"
    ],
    "answer": 1,
    "explain": "小肠。 / The small intestine."
  },
  {
    "id": "q-b3",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "动脉是将血液运回心脏的血管。 / Arteries carry blood back to the heart.",
    "answer": false,
    "explain": "动脉运离心脏；静脉运回心脏。 / Arteries carry blood away; veins return it."
  },
  {
    "id": "q-b4",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "运输氧气的主要是？ / Oxygen is mainly transported by ______.",
    "options": [
      "白细胞 WBC",
      "血小板 platelets",
      "红细胞 RBC",
      "血浆蛋白 plasma proteins"
    ],
    "answer": 2,
    "explain": "红细胞（血红蛋白）。 / Red blood cells (haemoglobin)."
  },
  {
    "id": "q-b5",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "肺泡的主要功能是？ / Alveoli are mainly for ______.",
    "options": [
      "消化 digestion",
      "气体交换 gas exchange",
      "产生尿液 urine formation",
      "泵血 pumping blood"
    ],
    "answer": 1,
    "explain": "气体交换。 / Gas exchange."
  },
  {
    "id": "q-b6",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "形成尿液的主要器官是？ / Urine is mainly formed in the ______.",
    "options": [
      "膀胱 bladder",
      "输尿管 ureter",
      "肾脏 kidney",
      "尿道 urethra"
    ],
    "answer": 2,
    "explain": "肾脏。 / The kidneys."
  },
  {
    "id": "q-b7",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "酶是生物催化剂，能加快反应速率。 / Enzymes are biological catalysts.",
    "answer": true,
    "explain": "酶具有催化作用和专一性。 / Enzymes catalyse and are specific."
  },
  {
    "id": "q-b8",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "心脏有几个腔？ / How many chambers does the heart have?",
    "options": [
      "2（数值 value）",
      "3（数值 value）",
      "4 个腔 four chambers",
      "5（数值 value）"
    ],
    "answer": 2,
    "explain": "四个腔。 / Four chambers."
  },
  {
    "id": "q-b9",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "体循环的起点是？ / Systemic circulation starts from the ______.",
    "options": [
      "右心房 right atrium",
      "右心室 right ventricle",
      "左心房 left atrium",
      "左心室 left ventricle"
    ],
    "answer": 3,
    "explain": "左心室。 / The left ventricle."
  },
  {
    "id": "q-b10",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "肺循环中，血液流经肺部后氧气含量增加。 / Blood gains oxygen in pulmonary circulation.",
    "answer": true,
    "explain": "肺部气体交换使血氧增加。 / Pulmonary gas exchange raises blood oxygen."
  },
  {
    "id": "q-b11",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "血小板的主要功能是？ / Platelets mainly help in ______.",
    "options": [
      "运输氧气 carry O₂",
      "吞噬病菌 phagocytosis",
      "止血和凝血 clotting",
      "运输养料 carry nutrients only"
    ],
    "answer": 2,
    "explain": "止血和凝血。 / Stopping bleeding and clotting."
  },
  {
    "id": "q-b12",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "淀粉的消化开始于？ / Starch digestion begins in the ______.",
    "options": [
      "口腔 mouth",
      "食道 oesophagus",
      "胃 stomach",
      "小肠 small intestine"
    ],
    "answer": 0,
    "explain": "口腔。 / The mouth (oral cavity)."
  },
  {
    "id": "q-b13",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "蛋白质的消化从口腔开始。 / Protein digestion begins in the mouth.",
    "answer": false,
    "explain": "蛋白质化学性消化从胃开始。 / Chemical digestion of protein begins in the stomach."
  },
  {
    "id": "q-b14",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "肾单位包括？ / A nephron includes ______.",
    "options": [
      "仅肾小球和肾小囊 glomerulus + Bowman’s capsule only",
      "肾小球、肾小囊和肾小管 glomerulus, capsule & tubule",
      "只含肾小管 tubule only",
      "膀胱和输尿管 bladder & ureter"
    ],
    "answer": 1,
    "explain": "肾小球、肾小囊和肾小管。 / Glomerulus, Bowman’s capsule and tubule."
  },
  {
    "id": "q-b15",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "胆汁由哪个器官分泌？ / Bile is secreted by the ______.",
    "options": [
      "胃 stomach",
      "胰腺 pancreas",
      "肝脏 liver",
      "小肠 small intestine"
    ],
    "answer": 2,
    "explain": "肝脏。 / The liver."
  },
  {
    "id": "q-b16",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "胆汁含有消化酶。 / Bile contains digestive enzymes.",
    "answer": false,
    "explain": "胆汁不含消化酶，可乳化脂肪。 / Bile has no digestive enzymes; it emulsifies fats."
  },
  {
    "id": "q-b17",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "毛细血管的管壁特点是？ / Capillary walls are ______.",
    "options": [
      "很薄 very thin",
      "很厚 very thick",
      "有瓣膜 always have valves",
      "与主动脉一样粗 as wide as aorta"
    ],
    "answer": 0,
    "explain": "非常薄，利于物质交换。 / Very thin walls aid exchange."
  },
  {
    "id": "q-b18",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "血红蛋白存在于？ / Haemoglobin is found in ______.",
    "options": [
      "白细胞 WBC",
      "红细胞 RBC",
      "血小板 platelets",
      "血浆 plasma"
    ],
    "answer": 1,
    "explain": "红细胞。 / Red blood cells."
  },
  {
    "id": "q-b19",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "左心室壁通常比右心室壁更厚。 / The left ventricle wall is thicker than the right.",
    "answer": true,
    "explain": "体循环路程更长、阻力更大。 / Systemic route is longer with more resistance."
  },
  {
    "id": "q-b20",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "吸气时膈肌？ / During inhalation the diaphragm ______.",
    "options": [
      "收缩下降 contracts and moves down",
      "舒张上升 relaxes and moves up",
      "不运动 does not move",
      "只左右运动 only moves sideways"
    ],
    "answer": 0,
    "explain": "收缩，顶部下降。 / It contracts and the dome descends."
  },
  {
    "id": "q-b21",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "蛋白质消化的终产物主要是？ / End products of protein digestion are mainly ______.",
    "options": [
      "葡萄糖 glucose",
      "脂肪酸 fatty acids",
      "氨基酸 amino acids",
      "甘油 glycerol only"
    ],
    "answer": 2,
    "explain": "氨基酸。 / Amino acids."
  },
  {
    "id": "q-b22",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "静脉血一定是含氧少的血。 / Venous blood always has low oxygen.",
    "answer": false,
    "explain": "肺静脉中是含氧丰富的血。 / Pulmonary veins carry oxygen-rich blood."
  },
  {
    "id": "q-b23",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "肺循环的起点是？ / Pulmonary circulation starts from the ______.",
    "options": [
      "左心室 left ventricle",
      "右心室 right ventricle",
      "左心房 left atrium",
      "右心房 right atrium"
    ],
    "answer": 1,
    "explain": "右心室。 / The right ventricle."
  },
  {
    "id": "q-b24",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "小肠绒毛的作用是？ / Villi in the small intestine ______.",
    "options": [
      "分泌盐酸 secrete HCl",
      "增大吸收面积 increase surface area",
      "产生红细胞 make RBCs",
      "储存尿液 store urine"
    ],
    "answer": 1,
    "explain": "增大吸收面积。 / Increase absorption surface area."
  },
  {
    "id": "q-b25",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "大肠是吸收营养物质的主要场所。 / The large intestine is the main site of nutrient absorption.",
    "answer": false,
    "explain": "主要是小肠；大肠主要吸收水分等。 / Mainly small intestine; large intestine absorbs water mainly."
  },
  {
    "id": "q-b26",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "尿素主要通过哪个系统排出？ / Urea is mainly excreted by the ______.",
    "options": [
      "消化系统 digestive",
      "呼吸系统 respiratory",
      "泌尿系统 urinary",
      "运动系统 locomotor"
    ],
    "answer": 2,
    "explain": "泌尿系统。 / The urinary system."
  },
  {
    "id": "q-b27",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "白细胞的主要功能是？ / White blood cells mainly ______.",
    "options": [
      "运输氧气 carry O₂",
      "防御病原体 defend against pathogens",
      "凝血 clotting",
      "运输二氧化碳 only carry CO₂"
    ],
    "answer": 1,
    "explain": "防御保护（免疫）。 / Defence / immunity."
  },
  {
    "id": "q-b28",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "血浆的功能之一是运输养料和废物。 / Plasma transports nutrients and wastes.",
    "answer": true,
    "explain": "血浆是血液的液体部分。 / Plasma is the liquid part of blood."
  },
  {
    "id": "q-b29",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "气体交换的主要方式是？ / Gas exchange occurs mainly by ______.",
    "options": [
      "扩散 diffusion",
      "主动运输 active transport only",
      "吞噬 phagocytosis",
      "渗透 osmosis only"
    ],
    "answer": 0,
    "explain": "扩散。 / Diffusion."
  },
  {
    "id": "q-b30",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "心脏中防止血液倒流的结构是？ / Structures that prevent backflow in the heart are ______.",
    "options": [
      "肺泡 alveoli",
      "神经元 neurons",
      "瓣膜 valves",
      "绒毛 villi"
    ],
    "answer": 2,
    "explain": "瓣膜。 / Valves."
  },
  {
    "id": "q-b31",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "组织层次高于器官。 / Tissue is a higher level than organ.",
    "answer": false,
    "explain": "器官由不同组织构成，层次更高。 / An organ is made of tissues — a higher level."
  },
  {
    "id": "q-b32",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "唾液中主要消化哪种营养？ / Saliva mainly starts digesting ______.",
    "options": [
      "淀粉 starch",
      "蛋白质 protein",
      "脂肪 fat",
      "维生素 vitamins"
    ],
    "answer": 0,
    "explain": "淀粉。 / Starch."
  },
  {
    "id": "q-b33",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "肾小球的主要作用是？ / The glomerulus mainly performs ______.",
    "options": [
      "重吸收 reabsorption",
      "滤过 filtration",
      "分泌胆汁 bile secretion",
      "气体交换 gas exchange"
    ],
    "answer": 1,
    "explain": "滤过。 / Filtration."
  },
  {
    "id": "q-b34",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "动脉血管都流动脉血。 / All arteries carry oxygenated blood.",
    "answer": false,
    "explain": "肺动脉运的是静脉血（含氧少）。 / Pulmonary artery carries deoxygenated (venous) blood."
  },
  {
    "id": "q-b35",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "人体所需能量的主要来源通常是？ / The main energy source is usually ______.",
    "options": [
      "糖类 carbohydrates",
      "维生素 vitamins",
      "水 water",
      "无机盐 mineral salts"
    ],
    "answer": 0,
    "explain": "糖类。 / Carbohydrates."
  },
  {
    "id": "q-b36",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "神经系统调节的基本方式是？ / The basic form of nervous regulation is ______.",
    "options": [
      "激素分泌 hormone secretion",
      "反射 reflex",
      "血液循环 circulation",
      "消化 digestion"
    ],
    "answer": 1,
    "explain": "反射。 / A reflex."
  },
  {
    "id": "q-b37",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "反射弧的正确顺序是？ / Correct order of a reflex arc is ______.",
    "options": [
      "效应器→中枢→感受器 effector→CNS→receptor",
      "感受器→传入→中枢→传出→效应器 receptor→sensory→CNS→motor→effector",
      "感受器→效应器→中枢 receptor→effector→CNS",
      "中枢→感受器→效应器 CNS→receptor→effector"
    ],
    "answer": 1,
    "explain": "感受器→传入→中枢→传出→效应器。 / Receptor → sensory → centre → motor → effector."
  },
  {
    "id": "q-b38",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "胰岛素能升高血糖。 / Insulin raises blood glucose.",
    "answer": false,
    "explain": "胰岛素降低血糖。 / Insulin lowers blood glucose."
  },
  {
    "id": "q-b39",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "vaccine 的中文是？ / Vaccine in Chinese is ______.",
    "options": [
      "抗体 antibody",
      "抗原 antigen",
      "疫苗 vaccine",
      "病原体 pathogen"
    ],
    "answer": 2,
    "explain": "疫苗。 / A vaccine."
  },
  {
    "id": "q-b40",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "激素调节与神经调节相比，通常？ / Compared with nervous control, hormonal control is usually ______.",
    "options": [
      "更快、范围更窄 faster & narrower",
      "较慢、范围较广、较持久 slower, wider, longer",
      "只作用于肌肉 muscles only",
      "不需血液运输 no blood transport"
    ],
    "answer": 1,
    "explain": "较慢、范围广、持续时间较长。 / Slower, wider-ranging, longer-lasting."
  },
  {
    "id": "q-b41",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "抗体是由病原体产生的。 / Antibodies are produced by pathogens.",
    "answer": false,
    "explain": "抗体由人体免疫细胞产生。 / Antibodies are made by immune cells."
  },
  {
    "id": "q-b42",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "中枢神经系统包括？ / The CNS includes ______.",
    "options": [
      "脑和脊髓 brain and spinal cord",
      "只含大脑 cerebrum only",
      "脑神经和脊神经 cranial & spinal nerves",
      "只含脊髓 spinal cord only"
    ],
    "answer": 0,
    "explain": "脑和脊髓。 / Brain and spinal cord."
  },
  {
    "id": "q-b43",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "膝跳反射的神经中枢位于大脑皮层。 / The knee-jerk centre is in the cerebral cortex.",
    "answer": false,
    "explain": "膝跳反射中枢在脊髓。 / Knee-jerk centre is in the spinal cord."
  },
  {
    "id": "q-b44",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "甲状腺激素的主要作用是？ / Thyroxine mainly ______.",
    "options": [
      "降低血糖 lower glucose",
      "促进代谢与生长 boost metabolism & growth",
      "仅睡眠时升血压 raise BP only in sleep",
      "消化蛋白质 digest protein"
    ],
    "answer": 1,
    "explain": "促进新陈代谢和生长发育。 / Promote metabolism and growth / development."
  },
  {
    "id": "q-b45",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "传染病流行的三个基本环节是？ / Three links of infectious disease spread are ______.",
    "options": [
      "病原体、抗体、疫苗 pathogen, antibody, vaccine",
      "传染源、传播途径、易感人群 source, route, susceptible host",
      "细菌、病毒、真菌 bacteria, viruses, fungi",
      "隔离、消毒、吃药 isolate, disinfect, take medicine"
    ],
    "answer": 1,
    "explain": "传染源、传播途径、易感人群。 / Source, transmission route, susceptible population."
  },
  {
    "id": "q-b46",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "神经元是？ / A neuron is ______.",
    "options": [
      "神经细胞 nerve cell",
      "肌细胞 muscle cell",
      "骨细胞 bone cell",
      "红细胞 RBC"
    ],
    "answer": 0,
    "explain": "神经细胞。 / A nerve cell (neuron)."
  },
  {
    "id": "q-b47",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "条件反射是先天就有的。 / Conditioned reflexes are inborn.",
    "answer": false,
    "explain": "条件反射后天形成，需大脑皮层参与。 / Conditioned reflexes are learned and need the cerebral cortex."
  },
  {
    "id": "q-b48",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "能升高血糖的激素是？ / Which hormone raises blood glucose?",
    "options": [
      "胰岛素 insulin",
      "生长激素 growth hormone only",
      "胰高血糖素 glucagon",
      "消化酶 digestive enzyme"
    ],
    "answer": 2,
    "explain": "胰高血糖素。 / Glucagon."
  },
  {
    "id": "q-b49",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "接种疫苗属于？ / Vaccination is a form of ______.",
    "options": [
      "治疗传染病 treating infection only",
      "获得性免疫预防 acquired immunity prevention",
      "切断所有传播途径 cutting all routes instantly",
      "消灭传染源 destroying sources only"
    ],
    "answer": 1,
    "explain": "预防，诱导获得性免疫。 / Prevention — inducing adaptive immunity."
  },
  {
    "id": "q-b50",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "稳态是指内环境绝对不变。 / Homeostasis means the internal environment never changes.",
    "answer": false,
    "explain": "稳态是相对稳定，不是绝对不变。 / Homeostasis is relative stability, not absolute constancy."
  },
  {
    "id": "q-b51",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "肾上腺素在紧急情况下可使？ / Adrenaline in emergency can ______.",
    "options": [
      "心跳加快 heart rate rises",
      "血糖立即降为零 glucose to zero",
      "停止呼吸 stop breathing",
      "消化加快 a lot faster digestion only"
    ],
    "answer": 0,
    "explain": "心跳加快、血压升高等。 / Faster heart rate, higher blood pressure, etc."
  },
  {
    "id": "q-b52",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "周围神经系统主要包括？ / The PNS mainly includes ______.",
    "options": [
      "仅大脑 cerebrum only",
      "仅脊髓 spinal cord only",
      "脑神经和脊神经 cranial and spinal nerves",
      "仅反射弧中枢 centres only"
    ],
    "answer": 2,
    "explain": "脑神经和脊神经等。 / Cranial and spinal nerves, etc."
  },
  {
    "id": "q-b53",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "抗原能引起免疫反应。 / Antigens can trigger immune responses.",
    "answer": true,
    "explain": "抗原刺激机体产生抗体等免疫应答。 / Antigens trigger antibody / immune responses."
  },
  {
    "id": "q-b54",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "切断传播途径的措施是？ / Which cuts the route of transmission?",
    "options": [
      "隔离病人 isolation of patient (source control)",
      "消毒环境 disinfection",
      "给易感者增加营养 only better diet",
      "让病人多运动 more exercise for patients"
    ],
    "answer": 1,
    "explain": "消毒、戴口罩等。 / Disinfection, masks, etc."
  },
  {
    "id": "q-b55",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "糖尿病与下列哪种激素关系最直接？ / Diabetes is most directly related to ______.",
    "options": [
      "胰岛素 insulin",
      "胆汁 bile",
      "胃蛋白酶 pepsin",
      "生长激素 only GH"
    ],
    "answer": 0,
    "explain": "胰岛素。 / Insulin."
  },
  {
    "id": "q-b56",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "非特异性免疫是后天获得的。 / Non-specific immunity is acquired after birth.",
    "answer": false,
    "explain": "非特异性免疫生来就有；特异性免疫可获得。 / Innate immunity is inborn; adaptive can be acquired."
  },
  {
    "id": "q-b57",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "效应器可以是？ / An effector can be ______.",
    "options": [
      "只是感受器 receptor only",
      "只是神经中枢 centre only",
      "肌肉或腺体 muscle or gland",
      "只是骨 bone only"
    ],
    "answer": 2,
    "explain": "肌肉或腺体。 / Muscle or gland."
  },
  {
    "id": "q-b58",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "垂体的重要作用之一是？ / One key role of the pituitary is ______.",
    "options": [
      "消化脂肪 digest fat",
      "调节其他内分泌腺 regulate other glands",
      "形成尿液 form urine",
      "气体交换 gas exchange"
    ],
    "answer": 1,
    "explain": "调节其他内分泌腺。 / It regulates other endocrine glands."
  },
  {
    "id": "q-b59",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "健康只包括身体没有疾病。 / Health means only the absence of physical disease.",
    "answer": false,
    "explain": "健康还包括心理与社会适应等方面。 / Health also includes mental and social well-being."
  },
  {
    "id": "q-b60",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "淋巴细胞主要参与？ / Lymphocytes are mainly involved in ______.",
    "options": [
      "特异性免疫 specific immunity",
      "消化蛋白质 protein digestion",
      "运输氧气 oxygen transport",
      "骨生长 bone growth only"
    ],
    "answer": 0,
    "explain": "特异性免疫。 / Specific (adaptive) immunity."
  },
  {
    "id": "q-b61",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "瞳孔对光反射的意义是？ / The pupil light reflex helps to ______.",
    "options": [
      "消化食物 digest food",
      "调节进光量 control light entering eye",
      "产生激素 make hormones",
      "形成尿液 form urine"
    ],
    "answer": 1,
    "explain": "调节进入眼睛的光量。 / Regulate light entering the eye."
  },
  {
    "id": "q-b62",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "激素需要通过导管运输到靶器官。 / Hormones travel through ducts to target organs.",
    "answer": false,
    "explain": "内分泌腺无导管，激素经血液运输。 / Endocrine glands lack ducts; hormones travel in blood."
  },
  {
    "id": "q-b63",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "隔离病人主要是为了控制？ / Isolating patients mainly controls the ______.",
    "options": [
      "传染源 source of infection",
      "易感人群 susceptibles only",
      "抗体 antibody",
      "营养 nutrition"
    ],
    "answer": 0,
    "explain": "传染源。 / The source of infection."
  },
  {
    "id": "q-b64",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "小脑的主要功能是？ / The cerebellum mainly ______.",
    "options": [
      "思维 only thinking",
      "视觉 only vision",
      "协调运动与平衡 coordinate movement & balance",
      "分泌胰岛素 secrete insulin"
    ],
    "answer": 2,
    "explain": "协调运动、维持平衡。 / Coordinate movement and keep balance."
  },
  {
    "id": "q-b65",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "疫苗通常含有灭活或减毒的病原体（或其成分）。 / Vaccines often contain weakened/inactivated pathogens or components.",
    "answer": true,
    "explain": "以诱导机体产生免疫力。 / To induce the body to develop immunity."
  },
  {
    "id": "q-c1",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "空气中体积分数最大的气体是？ / The most abundant gas in air by volume is ______.",
    "options": [
      "氧气 O₂",
      "氮气 N₂",
      "二氧化碳 CO₂",
      "稀有气体 noble gases"
    ],
    "answer": 1,
    "explain": "氮气约 78%。 / Nitrogen is about 78%."
  },
  {
    "id": "q-c2",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "检验二氧化碳常用？ / CO₂ is commonly tested with ______.",
    "options": [
      "石蕊直接确认 litmus alone",
      "澄清石灰水 limewater",
      "酚酞 phenolphthalein",
      "淀粉溶液 starch"
    ],
    "answer": 1,
    "explain": "澄清石灰水。 / Limewater (clear calcium hydroxide)."
  },
  {
    "id": "q-c3",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "氧气可以支持燃烧和呼吸。 / Oxygen supports combustion and respiration.",
    "answer": true,
    "explain": "氧气化学性质较活泼。 / Oxygen is chemically quite reactive."
  },
  {
    "id": "q-c4",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "下列属于纯净物的是？ / Which is a pure substance?",
    "options": [
      "空气 air",
      "海水 sea water",
      "蒸馏水 distilled water",
      "牛奶 milk"
    ],
    "answer": 2,
    "explain": "蒸馏水。 / Distilled water."
  },
  {
    "id": "q-c5",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "冰融化成水属于？ / Ice melting is a ______.",
    "options": [
      "化学变化 chemical change",
      "物理变化 physical change",
      "既是物理又是化学 both",
      "氧化反应 oxidation"
    ],
    "answer": 1,
    "explain": "物理变化。 / A physical change."
  },
  {
    "id": "q-c6",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "催化剂在反应前后质量和化学性质都改变。 / A catalyst changes its mass and chemical nature.",
    "answer": false,
    "explain": "催化剂质量和化学性质反应前后不变。 / A catalyst’s mass and chemical nature are unchanged."
  },
  {
    "id": "q-c7",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "燃烧需要的条件不包括？ / Which is NOT needed for combustion?",
    "options": [
      "可燃物 fuel",
      "氧气（或空气） oxygen/air",
      "温度达到着火点 ignition temperature",
      "必须有催化剂 a catalyst"
    ],
    "answer": 3,
    "explain": "不需要催化剂。 / No catalyst is required."
  },
  {
    "id": "q-c8",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "空气是一种化合物。 / Air is a compound.",
    "answer": false,
    "explain": "空气是混合物。 / Air is a mixture."
  },
  {
    "id": "q-c9",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "铁生锈主要与哪些物质有关？ / Iron rusting mainly involves ______.",
    "options": [
      "只与氮气 nitrogen only",
      "氧气和水 oxygen and water",
      "只与二氧化碳 CO₂ only",
      "只与氢气 H₂ only"
    ],
    "answer": 1,
    "explain": "氧气和水。 / Oxygen and water."
  },
  {
    "id": "q-c10",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "下列属于化学变化的是？ / Which is a chemical change?",
    "options": [
      "水沸腾 boiling water",
      "玻璃破碎 breaking glass",
      "蜡烛燃烧 candle burning",
      "酒精挥发 alcohol evaporating"
    ],
    "answer": 2,
    "explain": "蜡烛燃烧。 / A candle burning."
  },
  {
    "id": "q-c11",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "澄清石灰水变浑浊，通常说明有？ / Limewater turning milky suggests ______.",
    "options": [
      "二氧化碳 CO₂",
      "氧气 O₂",
      "氮气 N₂",
      "氢气 H₂"
    ],
    "answer": 0,
    "explain": "二氧化碳。 / Carbon dioxide."
  },
  {
    "id": "q-c12",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "氮气的化学性质很活泼，易支持燃烧。 / Nitrogen is very reactive and supports combustion.",
    "answer": false,
    "explain": "氮气较稳定，通常不支持燃烧。 / Nitrogen is rather inert and usually does not support combustion."
  },
  {
    "id": "q-c13",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "氢气验纯的常用方法与？ / A common test related to hydrogen purity involves ______.",
    "options": [
      "使石灰水变浑浊 limewater",
      "点燃听爆鸣声 pop test",
      "使火焰立即熄灭 always extinguish",
      "使石蕊变蓝 litmus blue"
    ],
    "answer": 1,
    "explain": "点燃时听声音（爆鸣）。 / Listen for a pop (squeaky pop test)."
  },
  {
    "id": "q-c14",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "水的化学式是？ / The formula of water is ______.",
    "options": [
      "水 H₂O",
      "过氧化氢 H₂O₂",
      "HO₂ 不正确",
      "OH 不完整"
    ],
    "answer": 0,
    "explain": "水的化学式是 H₂O。 / The formula of water is H₂O."
  },
  {
    "id": "q-c15",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "光合作用产生氧气并消耗二氧化碳。 / Photosynthesis consumes CO₂ and produces O₂.",
    "answer": true,
    "explain": "绿色植物光合作用的重要特征。 / A key feature of green-plant photosynthesis."
  },
  {
    "id": "q-c16",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "一氧化碳有毒是因为？ / CO is toxic mainly because it ______.",
    "options": [
      "密度太大 too dense",
      "支持燃烧 supports combustion",
      "易与血红蛋白结合 binds to haemoglobin",
      "无色无味所以无害 colourless so harmless"
    ],
    "answer": 2,
    "explain": "与血红蛋白结合更牢固。 / It binds haemoglobin more strongly than oxygen."
  },
  {
    "id": "q-c17",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "下列属于混合物的是？ / Which is a mixture?",
    "options": [
      "空气 air",
      "氧气 O₂",
      "二氧化碳 CO₂",
      "铁 Fe"
    ],
    "answer": 0,
    "explain": "空气是混合物。 / Air is a mixture."
  },
  {
    "id": "q-c18",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "着火点是可燃物开始燃烧所需的最低温度。 / Ignition temperature is the lowest temperature needed to start burning.",
    "answer": true,
    "explain": "燃烧三要素之一。 / One of the three requirements for combustion."
  },
  {
    "id": "q-c19",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "稀有气体化学性质通常？ / Noble gases are usually ______.",
    "options": [
      "很活泼 very reactive",
      "很稳定 very stable",
      "易燃烧 flammable",
      "易支持燃烧 support combustion"
    ],
    "answer": 1,
    "explain": "很稳定。 / Very stable."
  },
  {
    "id": "q-c20",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "过滤主要用于分离？ / Filtration mainly separates ______.",
    "options": [
      "不溶固体与液体 insoluble solid & liquid",
      "互溶液体 miscible liquids",
      "气体与气体 gases",
      "溶质与溶剂 always solute from solvent"
    ],
    "answer": 0,
    "explain": "不溶性固体与液体。 / Insoluble solid from liquid."
  },
  {
    "id": "q-c21",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "溶液一定是无色的。 / Solutions must be colourless.",
    "answer": false,
    "explain": "溶液可有颜色，如硫酸铜溶液。 / Solutions can be coloured, e.g. copper sulfate."
  },
  {
    "id": "q-c22",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "酸雨的 pH 通常？ / Acid rain typically has pH ______.",
    "options": [
      "等于 7 equal to 7",
      "小于 5.6 less than 5.6",
      "等于 14 equal to 14",
      "大于 10 greater than 10"
    ],
    "answer": 1,
    "explain": "小于 5.6。 / Less than 5.6."
  },
  {
    "id": "q-c23",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "实验室常用双氧水制氧气时，二氧化锰作？ / In H₂O₂ → O₂, MnO₂ acts as a ______.",
    "options": [
      "反应物 reactant",
      "生成物 product",
      "催化剂 catalyst",
      "干燥剂 drying agent only"
    ],
    "answer": 2,
    "explain": "催化剂。 / A catalyst."
  },
  {
    "id": "q-c24",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "完全燃烧碳时主要产物是二氧化碳。 / Complete combustion of carbon mainly gives CO₂.",
    "answer": true,
    "explain": "氧气充足时生成 CO₂。 / With enough oxygen, CO₂ forms."
  },
  {
    "id": "q-c25",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "酚酞遇碱溶液通常？ / Phenolphthalein in alkali usually turns ______.",
    "options": [
      "蓝色 blue",
      "红色 red",
      "紫色 purple always",
      "无变化 no change"
    ],
    "answer": 1,
    "explain": "紫色石蕊遇酸变红。 / Purple litmus turns red in acid."
  },
  {
    "id": "q-c26",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "硬水中常含较多？ / Hard water often contains more ______.",
    "options": [
      "钠离子 only Na⁺",
      "氯气 Cl₂ gas",
      "钙镁离子 Ca²⁺/Mg²⁺",
      "氮气 N₂"
    ],
    "answer": 2,
    "explain": "钙、镁离子。 / Calcium and magnesium ions."
  },
  {
    "id": "q-c27",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "物理变化一定没有能量变化。 / Physical changes never involve energy changes.",
    "answer": false,
    "explain": "如水沸腾需要吸热，仍是物理变化。 / Boiling water needs heat but is still physical."
  },
  {
    "id": "q-c28",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "灭火的原理本质是破坏燃烧条件，例如？ / Fire fighting works by removing a combustion condition, e.g. ______.",
    "options": [
      "隔离可燃物/隔绝氧气/降温 remove fuel/O₂/heat",
      "增加氧气 add oxygen",
      "提高着火点 raise ignition point of air",
      "加入催化剂 add catalyst"
    ],
    "answer": 0,
    "explain": "隔离可燃物或隔绝氧气或降温。 / Remove fuel, cut off oxygen, or cool below ignition point."
  },
  {
    "id": "q-c29",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "臭氧 O₃ 的重要作用之一是？ / One role of ozone is to ______.",
    "options": [
      "提供呼吸氧 for breathing",
      "吸收紫外线 absorb UV",
      "组成空气78% make 78% of air",
      "使石灰水变浑浊 turn limewater milky"
    ],
    "answer": 1,
    "explain": "吸收紫外线。 / Absorb ultraviolet radiation."
  },
  {
    "id": "q-c30",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "溶剂质量分数越大，溶液一定越浓（中学常用说法需条件）。 / A larger mass of solvent always means a more concentrated solution.",
    "answer": false,
    "explain": "浓度取决于溶质与溶液（或溶剂）的相对量。 / Concentration depends on relative amounts of solute and solution."
  },
  {
    "id": "q-c31",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "蒸馏可分离？ / Distillation can separate ______.",
    "options": [
      "沸点不同的液体 liquids of different boiling points",
      "铁屑与沙子 iron filings & sand by magnet only",
      "不滤即得气体 gases without heating",
      "同位素 isotopes only"
    ],
    "answer": 0,
    "explain": "沸点不同的液体混合物。 / Liquid mixtures with different boiling points."
  },
  {
    "id": "q-c32",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "呼吸作用消耗氧气并产生？ / Respiration uses O₂ and produces ______.",
    "options": [
      "氮气 N₂",
      "氢气 H₂",
      "二氧化碳 CO₂",
      "臭氧 O₃"
    ],
    "answer": 2,
    "explain": "二氧化碳（和水等）。 / Carbon dioxide (and water, etc.)."
  },
  {
    "id": "q-c33",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "盐都是咸的可食用氯化钠。 / All salts are edible table salt.",
    "answer": false,
    "explain": "化学上的盐是一类化合物，不一定是食盐。 / A chemical salt is a class of compound, not only table salt."
  },
  {
    "id": "q-c34",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "中和反应的生成物是？ / Neutralisation produces ______.",
    "options": [
      "酸和碱 acid and alkali",
      "盐和水 salt and water",
      "只有水 water only",
      "只有盐 salt only"
    ],
    "answer": 1,
    "explain": "盐和水。 / A salt and water."
  },
  {
    "id": "q-c35",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "空气中氧气的体积分数约为？ / Oxygen in air is about ______ by volume.",
    "options": [
      "78% 氮气 nitrogen",
      "21% 氧气 oxygen",
      "约 0.03% CO₂",
      "50% 不正确 incorrect"
    ],
    "answer": 1,
    "explain": "21%。 / About 21%."
  },
  {
    "id": "q-c36",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "化学变化中的最小粒子是？ / The smallest particle in a chemical change is the ______.",
    "options": [
      "分子 molecule",
      "原子 atom",
      "离子 ion",
      "电子 electron"
    ],
    "answer": 1,
    "explain": "原子。 / The atom."
  },
  {
    "id": "q-c37",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "相对原子质量的标准是？ / Ar is based on ______.",
    "options": [
      "一个氢原子 one H atom",
      "氧原子质量的1/16 1/16 of O",
      "一个¹²C原子质量的1/12 1/12 of ¹²C",
      "一个电子 one electron"
    ],
    "answer": 2,
    "explain": "一个¹²C原子质量的 1 / 1 / 12 the mass of one ¹²C atom."
  },
  {
    "id": "q-c38",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "氧元素的相对原子质量约为？ / Ar(O) is about ______.",
    "options": [
      "1（数值 value）",
      "12（数值 value）",
      "16（数值 value）",
      "18（数值 value）"
    ],
    "answer": 2,
    "explain": "氧的相对原子质量约为 16。 / Relative atomic mass of oxygen is about 16."
  },
  {
    "id": "q-c39",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "钠的元素符号是？ / The symbol for sodium is ______.",
    "options": [
      "So 不正确",
      "钠 Na",
      "氮 N",
      "硫 S"
    ],
    "answer": 1,
    "explain": "钠的元素符号是 Na。 / The symbol for sodium is Na."
  },
  {
    "id": "q-c40",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "原子序数等于质子数，也等于核电荷数。 / Atomic number equals proton number and nuclear charge.",
    "answer": true,
    "explain": "原子中还等于核外电子数。 / In a neutral atom it also equals the electron number."
  },
  {
    "id": "q-c41",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "CO₂ 的相对分子质量是？（C=12,O=16） / Mr(CO₂) = ? (C=12,O=16)",
    "options": [
      "28（数值 value）",
      "32（数值 value）",
      "44（数值 value）",
      "16（数值 value）"
    ],
    "answer": 2,
    "explain": "CO₂ 的相对分子质量 Mr = 12+16×2 = 44。 / Relative molecular mass of CO₂ equals 44."
  },
  {
    "id": "q-c42",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "元素周期表中，横行叫做？ / A horizontal row in the periodic table is a ______.",
    "options": [
      "族 group",
      "周期 period",
      "区 block",
      "系 series"
    ],
    "answer": 1,
    "explain": "周期 period。 / A period is a horizontal row of the periodic table."
  },
  {
    "id": "q-c43",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "化合物是由不同种元素组成的纯净物。 / A compound is a pure substance of different elements.",
    "answer": true,
    "explain": "化合物由不同种元素组成，如 H₂O、CO₂。 / Compounds contain different elements, e.g. H₂O, CO₂."
  },
  {
    "id": "q-c44",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "下列化学式书写正确的是？ / Which formula is correct?",
    "options": [
      "氧化镁 MgO₂",
      "氯化钠 NaCl",
      "水 H₂O₂",
      "氧气 O"
    ],
    "answer": 1,
    "explain": "NaCl 是氯化钠（离子化合物/盐）。 / NaCl is sodium chloride (an ionic salt)."
  },
  {
    "id": "q-c45",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "质量守恒定律说明反应前后？ / Conservation of mass means ______.",
    "options": [
      "分子个数一定不变 molecules unchanged",
      "原子种类和数目不变，总质量不变 atoms & total mass conserved",
      "物质种类不变 substances unchanged",
      "气体体积一定不变 gas volume unchanged"
    ],
    "answer": 1,
    "explain": "原子种类数目不变，总质量不变。 / Atom types and numbers unchanged → total mass unchanged."
  },
  {
    "id": "q-c46",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "Fe 的中文名称和 Ar 约为？ / Fe is ______ with Ar ≈ ______.",
    "options": [
      "氟 19 fluorine 19",
      "铁 56 iron 56",
      "铜 64 copper 64",
      "锌 65 zinc 65"
    ],
    "answer": 1,
    "explain": "铁，56。 / Iron, Ar ≈ 56."
  },
  {
    "id": "q-c47",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "稀有气体的化学性质很活泼。 / Noble gases are chemically very reactive.",
    "answer": false,
    "explain": "稀有气体性质稳定。 / Noble gases are chemically stable."
  },
  {
    "id": "q-c48",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "阳离子是？ / A cation is ______.",
    "options": [
      "带负电 anion",
      "带正电 positive ion",
      "不带电中性原子 neutral atom",
      "电子 electron"
    ],
    "answer": 1,
    "explain": "带正电的离子。 / A positively charged ion."
  },
  {
    "id": "q-c49",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "H₂SO₄ 中硫的化合价是？ / Oxidation number of S in H₂SO₄ is ______.",
    "options": [
      "+2 价 oxidation state +2",
      "+4 价 oxidation state +4",
      "+6 价 oxidation state +6",
      "-2 价 oxidation state −2"
    ],
    "answer": 2,
    "explain": "硫酸根中硫的化合价为 +6。 / Sulphur in sulfate has oxidation number +6."
  },
  {
    "id": "q-c50",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "元素周期表中，IA 族属于？ / Group IA belongs to ______.",
    "options": [
      "副族 subgroup",
      "主族 main group",
      "0 族 group 0",
      "VIII 族 group VIII"
    ],
    "answer": 1,
    "explain": "主族。 / A main group."
  },
  {
    "id": "q-c51",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "相对分子质量等于分子的实际质量（kg）。 / Mr equals the actual mass of a molecule in kg.",
    "answer": false,
    "explain": "Mr 是相对比值，量纲为 1。 / Mr is a relative ratio (dimensionless)."
  },
  {
    "id": "q-c52",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "Ca(OH)₂ 的 Mr 是？（Ca=40,O=16,H=1） / Mr of Ca(OH)₂ = ?",
    "options": [
      "57（数值 value）",
      "74（数值 value）",
      "58（数值 value）",
      "100（数值 value）"
    ],
    "answer": 1,
    "explain": "Ca(OH)₂ 的相对式量 = 40+16×2+1×2 = 74。 / Formula mass of Ca(OH)₂ is 74."
  },
  {
    "id": "q-c53",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "下列属于原子团的是？ / Which is an atomic group/radical?",
    "options": [
      "水 H₂O",
      "氢氧根 OH⁻",
      "氧气 O₂",
      "钠 Na"
    ],
    "answer": 1,
    "explain": "氢氧根离子是 OH⁻。 / The hydroxide ion is OH⁻."
  },
  {
    "id": "q-c54",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "同一主族元素化学性质往往相似。 / Elements in the same main group often have similar properties.",
    "answer": true,
    "explain": "最外层电子数相同。 / Same number of valence electrons."
  },
  {
    "id": "q-c55",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "钾的元素符号是？ / The symbol for potassium is ______.",
    "options": [
      "磷 P",
      "钋 Po",
      "钾 K",
      "Ka 不正确"
    ],
    "answer": 2,
    "explain": "钾的元素符号是 K。 / The symbol for potassium is K."
  },
  {
    "id": "q-c56",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "保持氧气化学性质的最小粒子是？ / The smallest particle keeping O₂'s chemical properties is ______.",
    "options": [
      "氧分子 O₂ molecule",
      "氧原子 O atom",
      "电子 electron",
      "质子 proton"
    ],
    "answer": 0,
    "explain": "氧分子。 / An oxygen molecule."
  },
  {
    "id": "q-c57",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "离子是带电的原子或原子团。 / Ions are charged atoms or groups of atoms.",
    "answer": true,
    "explain": "失去或得到电子形成离子。 / Gain or lose electrons to form ions."
  },
  {
    "id": "q-c58",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "中子的电性是？ / A neutron has charge ______.",
    "options": [
      "正电 positive",
      "负电 negative",
      "不带电 neutral",
      "与质子相同 same as proton"
    ],
    "answer": 2,
    "explain": "不带电。 / Uncharged."
  },
  {
    "id": "q-c59",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "H₂O 的 Mr 是？（H=1,O=16） / Mr(H₂O) = ?",
    "options": [
      "16（数值 value）",
      "18（数值 value）",
      "17（数值 value）",
      "20（数值 value）"
    ],
    "answer": 1,
    "explain": "水的相对分子质量约为 18。 / Mr of water is about 18."
  },
  {
    "id": "q-c60",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "配平化学方程式是为了遵守质量守恒。 / Balancing equations reflects conservation of mass.",
    "answer": true,
    "explain": "使反应前后原子种类和数目相等。 / Equalise atom types and counts before / after."
  },
  {
    "id": "q-c61",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "纵列在周期表中称为？ / A vertical column is called a ______.",
    "options": [
      "族 group",
      "周期 period",
      "同位素 isotope",
      "分子式 formula"
    ],
    "answer": 0,
    "explain": "族。 / A group (column)."
  },
  {
    "id": "q-c62",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "阴离子带？ / An anion carries ______.",
    "options": [
      "正电荷 positive charge",
      "负电荷 negative charge",
      "不带电 no charge",
      "磁荷 magnetic charge"
    ],
    "answer": 1,
    "explain": "负电荷。 / Negative charge."
  },
  {
    "id": "q-c63",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "单质是由同种元素组成的纯净物。 / An element (simple substance) is a pure substance of one element.",
    "answer": true,
    "explain": "单质由同种元素组成，如 O₂、Fe、He。 / Elements as substances include O₂, Fe, He."
  },
  {
    "id": "q-c64",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "质子数决定？ / Proton number determines ______.",
    "options": [
      "元素种类 element identity",
      "中子数 neutron number only",
      "分子质量 molecular mass only",
      "颜色 colour only"
    ],
    "answer": 0,
    "explain": "元素种类（原子序数）。 / Element type (atomic number)."
  },
  {
    "id": "q-c65",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "MgO 中镁的化合价是？ / Valence of Mg in MgO is ______.",
    "options": [
      "+1 价 oxidation state +1",
      "+2 价 oxidation state +2",
      "-2 价 oxidation state −2",
      "0 价 oxidation state 0"
    ],
    "answer": 1,
    "explain": "镁通常显 +2 价。 / Magnesium commonly shows +2."
  },
  {
    "id": "q-c66",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "化学式 O₂ 表示氧气这种物质，也可表示一个氧分子。 / O₂ can mean the substance or one molecule.",
    "answer": true,
    "explain": "化学式具有多种意义。 / A formula can represent several meanings."
  },
  {
    "id": "q-c67",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "质量数等于？ / Mass number equals ______.",
    "options": [
      "质子数 only protons",
      "电子数 only electrons",
      "质子数+中子数 protons+neutrons",
      "中子数−质子数 n−p"
    ],
    "answer": 2,
    "explain": "质子数+中子数。 / Protons + neutrons."
  },
  {
    "id": "q-c68",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "下列属于氧化物的是？ / Which is an oxide?",
    "options": [
      "二氧化碳 CO₂",
      "氯化钠 NaCl",
      "氯化氢/盐酸 HCl",
      "氢氧化钠 NaOH"
    ],
    "answer": 0,
    "explain": "二氧化碳的化学式是 CO₂。 / Carbon dioxide is CO₂."
  },
  {
    "id": "q-c69",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "化学反应前后原子的种类会改变。 / Chemical reactions change the types of atoms.",
    "answer": false,
    "explain": "原子种类不变，只是重新组合。 / Atom types unchanged — only rearranged."
  },
  {
    "id": "q-c70",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "相对原子质量的符号是？ / The symbol for relative atomic mass is ______.",
    "options": [
      "相对分子质量 Mr",
      "相对原子质量 Ar",
      "质量 m",
      "阿伏加德罗常数 Nₐ"
    ],
    "answer": 1,
    "explain": "相对原子质量符号是 Ar。 / Relative atomic mass is denoted Ar."
  },
  {
    "id": "q-c71",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "Na⁺ 的形成是钠原子？ / Na⁺ forms when a sodium atom ______.",
    "options": [
      "失去一个电子 loses one electron",
      "得到一个电子 gains one electron",
      "失去一个质子 loses a proton",
      "得到一个中子 gains a neutron"
    ],
    "answer": 0,
    "explain": "失去一个电子。 / Lose one electron."
  },
  {
    "id": "q-c72",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "同位素的质子数相同、中子数不同。 / Isotopes have the same proton number but different neutron numbers.",
    "answer": true,
    "explain": "同位素质子数相同、中子数不同，如 ¹²C 与 ¹⁴C。 / Isotopes share Z but differ in neutrons, e.g. ¹²C and ¹⁴C."
  },
  {
    "id": "q-c73",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "化学方程式中 (aq) 表示？ / In equations, (aq) means ______.",
    "options": [
      "固体 solid",
      "气体 gas",
      "水溶液 aqueous solution",
      "液体纯液体 pure liquid"
    ],
    "answer": 2,
    "explain": "水溶液。 / Aqueous solution."
  },
  {
    "id": "q-c74",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "SO₄²⁻ 中硫的化合价是？ / Oxidation number of S in SO₄²⁻ is ______.",
    "options": [
      "+2 价 oxidation state +2",
      "+4 价 oxidation state +4",
      "+6 价 oxidation state +6",
      "-2 价 oxidation state −2"
    ],
    "answer": 2,
    "explain": "SO₄²⁻ 中硫为 +6。 / In SO₄²⁻ sulphur is +6."
  },
  {
    "id": "q-c75",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "最外层电子数对元素化学性质影响很大。 / Valence electrons strongly affect chemical properties.",
    "answer": true,
    "explain": "同主族往往最外层电子数相同。 / Same main group often share valence electron count."
  },
  {
    "id": "boost-q1",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "波速、频率与波长的关系是？ / The relation among wave speed, frequency and wavelength is?",
    "options": [
      "v = fλ 波速公式",
      "v = f/λ 错误式",
      "v = λ/f 错误式",
      "v = f + λ 错误式"
    ],
    "answer": 0,
    "explain": "波速等于频率乘以波长。 / Wave speed equals frequency times wavelength."
  },
  {
    "id": "boost-q2",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "声波在空气中是横波。 / Sound waves in air are transverse waves.",
    "answer": false,
    "explain": "空气中的声波是纵波（疏密波）。 / Sound in air is a longitudinal wave."
  },
  {
    "id": "boost-q3",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "同种介质中，频率越高则波长？ / In the same medium, higher frequency means wavelength is ______.",
    "options": [
      "越长 longer",
      "越短 shorter",
      "不变 unchanged",
      "为零 zero"
    ],
    "answer": 1,
    "explain": "v 一定时，f 增大则 λ = v/f 减小。 / At fixed v, larger f means smaller λ."
  },
  {
    "id": "boost-q4",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "水中声速大约比空气中？ / Speed of sound in water compared with air is approximately ______.",
    "options": [
      "更慢 slower",
      "相同 the same",
      "更快（约 1500 m/s）faster (~1500 m/s)",
      "为零 zero"
    ],
    "answer": 2,
    "explain": "水中声速约 1500 m/s，快于空气中约 340 m/s。 / About 1500 m/s in water vs ~340 m/s in air."
  },
  {
    "id": "boost-q5",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "混响是由于声音的多次反射造成的。 / Reverberation is caused by multiple reflections of sound.",
    "answer": true,
    "explain": "多次反射使声音在空间中延续。 / Multiple reflections make sound persist."
  },
  {
    "id": "boost-q6",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "声呐主要利用什么测距？ / Sonar mainly uses ______ to measure distance.",
    "options": [
      "次声波 infrasound",
      "超声波 ultrasound",
      "可见光 visible light",
      "红外线 infrared"
    ],
    "answer": 1,
    "explain": "声呐发射超声波并接收回声。 / Sonar emits ultrasound and receives echoes."
  },
  {
    "id": "boost-q7",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "人耳刚能听见的最小声强称为？ / The minimum audible intensity is the ______.",
    "options": [
      "痛阈 threshold of pain",
      "听阈 threshold of hearing",
      "混响 reverberation",
      "基频 fundamental"
    ],
    "answer": 1,
    "explain": "听阈是刚能听见的最小声强。 / Threshold of hearing is the quietest detectable sound."
  },
  {
    "id": "boost-q8",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "泛音（谐波）会影响音色。 / Overtones (harmonics) affect timbre.",
    "answer": true,
    "explain": "不同泛音成分使音色不同。 / Different harmonic content changes tone quality."
  },
  {
    "id": "boost-q9",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "吸声材料的主要作用是？ / Acoustic absorption materials mainly ______.",
    "options": [
      "增大反射 increase reflection",
      "吸收声能 absorb sound energy",
      "提高音调 raise pitch",
      "产生次声 make infrasound"
    ],
    "answer": 1,
    "explain": "吸声减弱反射与混响。 / They absorb energy and reduce reflections."
  },
  {
    "id": "boost-q10",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "医学 B 超主要利用？ / Medical B-scan ultrasound mainly uses ______.",
    "options": [
      "次声波 infrasound",
      "超声波 ultrasound",
      "X 射线 X-rays",
      "紫外线 ultraviolet"
    ],
    "answer": 1,
    "explain": "超声波用于非侵入成像。 / Ultrasound is used for non-invasive imaging."
  },
  {
    "id": "boost-q11",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "机械波可以在真空中传播。 / Mechanical waves can travel through a vacuum.",
    "answer": false,
    "explain": "机械波需要介质；声波是机械波。 / Mechanical waves need a medium."
  },
  {
    "id": "boost-q12",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "纵波中粒子间距较小的区域叫？ / In a longitudinal wave, the region of closer particles is a ______.",
    "options": [
      "稀疏部 rarefaction",
      "密部 compression",
      "波谷 trough",
      "真空 vacuum"
    ],
    "answer": 1,
    "explain": "密部（compression）粒子更密、压强更高。 / Compressions have higher pressure."
  },
  {
    "id": "boost-q13",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "噪声污染控制不包括？ / Which is NOT a noise-control approach?",
    "options": [
      "声源处减弱 at source",
      "传播途径减弱 along path",
      "接收处防护 at receiver",
      "提高振幅 raise amplitude"
    ],
    "answer": 3,
    "explain": "提高振幅会更响，不是控制噪声。 / Raising amplitude makes sound louder."
  },
  {
    "id": "boost-q14",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "频率为 25 kHz 的声音属于超声波。 / A 25 kHz sound is ultrasound.",
    "answer": true,
    "explain": "高于 20 kHz 为超声。 / Above 20 kHz is ultrasound."
  },
  {
    "id": "boost-q15",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "若 f = 170 Hz，空气中 v = 340 m/s，波长 λ 为？ / If f = 170 Hz and v = 340 m/s, λ = ?",
    "options": [
      "0.5 m（数值 value）",
      "2 m 正确波长",
      "170 m（数值 value）",
      "340 m（数值 value）"
    ],
    "answer": 1,
    "explain": "波长 λ = v÷f = 340÷170 = 2 m。 / Wavelength λ equals v/f = 340/170 = 2 metres."
  },
  {
    "id": "boost-q16",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "弦的张力增大时，基频通常？ / Increasing string tension usually makes the fundamental frequency ______.",
    "options": [
      "降低 lower",
      "升高 higher",
      "不变 unchanged",
      "变为零 zero"
    ],
    "answer": 1,
    "explain": "张力越大，振动越快，音调越高。 / Higher tension → higher pitch."
  },
  {
    "id": "boost-q17",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "回声定位只适用于蝙蝠，人类技术无法利用。 / Only bats can use echolocation; humans cannot.",
    "answer": false,
    "explain": "声呐、超声测距等就是人工回声定位。 / Sonar and ranging use artificial echolocation."
  },
  {
    "id": "boost-q18",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "传声器（麦克风）的作用是？ / A microphone converts ______.",
    "options": [
      "电→声 electricity to sound",
      "声→电 sound to electricity",
      "光→声 light to sound",
      "热→声 heat to sound"
    ],
    "answer": 1,
    "explain": "把声信号转换成电信号。 / It converts sound into an electrical signal."
  },
  {
    "id": "boost-q19",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "折射率 n 的定义（真空）可写成？ / Refractive index n (vs vacuum) can be written as?",
    "options": [
      "n = v/c 错误式",
      "n = c/v 折射率",
      "n = fλ 错误式",
      "n = θ₁/θ₂ 错误式"
    ],
    "answer": 1,
    "explain": "折射率 n = c÷v。 / Refractive index n equals c divided by v."
  },
  {
    "id": "boost-q20",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "光从空气斜射入水中，折射角大于入射角。 / Light from air into water obliquely: refraction angle > incidence angle.",
    "answer": false,
    "explain": "进入光密介质，折射角小于入射角。 / Into denser medium: r < i."
  },
  {
    "id": "boost-q21",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "光导纤维传光主要依靠？ / Optical fibres mainly guide light by ______.",
    "options": [
      "漫反射 diffuse reflection",
      "全反射 total internal reflection",
      "色散 dispersion",
      "衍射 diffraction"
    ],
    "answer": 1,
    "explain": "纤芯与包层折射率差导致全反射。 / Core–cladding index difference enables TIR."
  },
  {
    "id": "boost-q22",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "凸透镜物距 u > 2f 时，像的特点是？ / For a convex lens with u > 2f, the image is ______.",
    "options": [
      "正立放大虚像 upright magnified virtual",
      "倒立缩小实像 inverted diminished real",
      "倒立放大实像 inverted magnified real",
      "正立等大虚像 upright same-size virtual"
    ],
    "answer": 1,
    "explain": "照相机工作区间：倒立缩小实像。 / Camera range: inverted diminished real."
  },
  {
    "id": "boost-q23",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "透镜焦度 P（屈光度）与焦距 f（米）关系？ / Lens power P (dioptre) relates to f (in m) by?",
    "options": [
      "P = f 错误式",
      "P = 1/f 焦度",
      "P = f² 错误式",
      "P = 1/f² 错误式"
    ],
    "answer": 1,
    "explain": "P = 1/f（f 以米为单位）。 / P = 1/f with f in metres."
  },
  {
    "id": "boost-q24",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "斯涅尔定律定量描述折射：n₁sinθ₁ = n₂sinθ₂。 / Snell’s law: n₁sinθ₁ = n₂sinθ₂.",
    "answer": true,
    "explain": "这是折射的定量关系。 / This is the quantitative refraction law."
  },
  {
    "id": "boost-q25",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "红光与青光按一定比例混合可成白光，它们是？ / Red and cyan that mix to white are ______.",
    "options": [
      "原色 primary colours",
      "互补色 complementary colours",
      "单色光不可能 impossible",
      "颜料三原色 pigment primaries"
    ],
    "answer": 1,
    "explain": "互补色光混合可成白光。 / Complementary colours of light mix to white."
  },
  {
    "id": "boost-q26",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "滤色片的作用是？ / An optical filter mainly ______.",
    "options": [
      "让所有色光通过 pass all colours",
      "只让某些色光通过 transmit selected colours",
      "增大光速 increase c",
      "产生声波 make sound"
    ],
    "answer": 1,
    "explain": "滤色片选择透过的波段。 / It selectively transmits wavelengths."
  },
  {
    "id": "boost-q27",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "平面镜成像左右相反（横向倒置）。 / A plane mirror produces lateral inversion.",
    "answer": true,
    "explain": "平面镜像与物左右相反。 / Left and right appear swapped."
  },
  {
    "id": "boost-q28",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "彩虹的形成主要涉及？ / Rainbows mainly involve ______.",
    "options": [
      "只有反射 reflection only",
      "水滴中的折射、反射与色散 refraction, reflection and dispersion",
      "只有衍射 diffraction only",
      "声波干涉 sound interference"
    ],
    "answer": 1,
    "explain": "阳光在水滴中折射、反射并色散。 / Sunlight refracts, reflects and disperses in droplets."
  },
  {
    "id": "boost-q29",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "可见光在电磁波谱中大致位于？ / Visible light in the EM spectrum lies roughly between ______.",
    "options": [
      "红外与紫外 between IR and UV",
      "X 射线与γ射线 between X-rays and gamma",
      "无线电与微波 radio and microwave",
      "只有超声波 ultrasound only"
    ],
    "answer": 0,
    "explain": "可见光介于红外与紫外之间。 / Visible sits between infrared and ultraviolet."
  },
  {
    "id": "boost-q30",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "激光通常具有很好的单色性和方向性。 / Lasers are usually highly monochromatic and directional.",
    "answer": true,
    "explain": "这是激光的重要特性。 / These are key laser properties."
  },
  {
    "id": "boost-q31",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "眼的调节主要依靠改变？ / Accommodation of the eye mainly changes the ______.",
    "options": [
      "瞳孔颜色 pupil colour",
      "晶状体焦距 lens focal length",
      "光速 speed of light",
      "声波频率 sound frequency"
    ],
    "answer": 1,
    "explain": "晶状体曲率改变以看清远近。 / Lens curvature changes for near/far focus."
  },
  {
    "id": "boost-q32",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "物在凸透镜 f 与 2f 之间时，像是？ / Object between F and 2F of a convex lens gives ______.",
    "options": [
      "倒立放大实像 inverted magnified real",
      "正立缩小虚像 upright diminished virtual",
      "倒立缩小实像 inverted diminished real",
      "无像 no image"
    ],
    "answer": 0,
    "explain": "投影仪等工作区间：倒立放大实像。 / Projector range: inverted magnified real."
  },
  {
    "id": "boost-q33",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "临界角是折射角为 90° 时的入射角（光密→光疏）。 / Critical angle is incidence when refraction is 90° (dense→rare).",
    "answer": true,
    "explain": "超过临界角发生全反射。 / Beyond it, total internal reflection occurs."
  },
  {
    "id": "boost-q34",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "放大率 m 可表示为？ / Magnification m can be written as?",
    "options": [
      "m = u/v 错误式",
      "m = v/u（像距/物距）",
      "m = f/u 错误式",
      "m = u×v 错误式"
    ],
    "answer": 1,
    "explain": "放大率 m ≈ 像距÷物距 = v÷u。 / Magnification m is approximately v divided by u."
  },
  {
    "id": "boost-q35",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "本影是指？ / The umbra is ______.",
    "options": [
      "完全照亮区 fully lit region",
      "完全暗影区 full shadow region",
      "半亮半暗区 partial shadow only",
      "光源本身 the source itself"
    ],
    "answer": 1,
    "explain": "本影是光完全照不到的区域。 / Umbra is the full shadow."
  },
  {
    "id": "boost-q36",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "牛顿第二定律可写成？ / Newton’s second law can be written as?",
    "options": [
      "F = mv 错误式",
      "F = ma 牛顿二定律",
      "F = m/a 错误式",
      "F = a/m 错误式"
    ],
    "answer": 1,
    "explain": "合力等于质量乘以加速度。 / Net force equals mass times acceleration."
  },
  {
    "id": "boost-q37",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "作用力与反作用力作用在同一物体上，是一对平衡力。 / Action and reaction act on the same body and are balanced forces.",
    "answer": false,
    "explain": "它们作用在两个物体上，不是平衡力。 / They act on two bodies, not a balanced pair on one."
  },
  {
    "id": "boost-q38",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "力矩 M 的计算公式是？ / Moment M is calculated as?",
    "options": [
      "M = F/d 错误式",
      "M = F × d（力×力臂）",
      "M = F + d 错误式",
      "M = m/a 错误式"
    ],
    "answer": 1,
    "explain": "力矩等于力与力臂之积。 / Moment = force × perpendicular distance."
  },
  {
    "id": "boost-q39",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "杠杆平衡时（忽略杠杆自重）满足？ / For a balanced lever (ignore weight of lever)?",
    "options": [
      "力相等 forces equal only",
      "顺时针力矩之和=逆时针力矩之和 clockwise moments = anticlockwise",
      "力臂必须相等 arms equal only",
      "无需条件 no condition"
    ],
    "answer": 1,
    "explain": "力矩平衡：两边力矩之和相等。 / Principle of moments."
  },
  {
    "id": "boost-q40",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "压强的公式是？ / The formula for pressure is?",
    "options": [
      "p = F A 错误式",
      "p = F/A 压强公式",
      "p = A/F 错误式",
      "p = F + A 错误式"
    ],
    "answer": 1,
    "explain": "压强等于压力除以受力面积。 / Pressure = force / area."
  },
  {
    "id": "boost-q41",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "液体压强随深度增加而增大：p = ρgh。 / Liquid pressure increases with depth: p = ρgh.",
    "answer": true,
    "explain": "同种液体中，深度越大压强越大。 / Deeper → greater pressure."
  },
  {
    "id": "boost-q42",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "密度的定义式是？ / Density is defined as?",
    "options": [
      "ρ = m V 错误式",
      "ρ = m/V 密度公式",
      "ρ = V/m 错误式",
      "ρ = m + V 错误式"
    ],
    "answer": 1,
    "explain": "密度等于质量除以体积。 / Density = mass / volume."
  },
  {
    "id": "boost-q43",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "路程-时间图像的斜率表示？ / The gradient of a distance–time graph represents ______.",
    "options": [
      "加速度 acceleration",
      "速度 speed",
      "力 force",
      "压强 pressure"
    ],
    "answer": 1,
    "explain": "斜率 = Δs/Δt = 速度。 / Gradient = speed."
  },
  {
    "id": "boost-q44",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "速度-时间图像与时间轴围成的面积表示？ / Area under a speed–time graph represents ______.",
    "options": [
      "加速度 acceleration",
      "路程 distance",
      "质量 mass",
      "压强 pressure"
    ],
    "answer": 1,
    "explain": "面积对应路程。 / The area equals distance travelled."
  },
  {
    "id": "boost-q45",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "停车总距离 = 反应距离 + 制动距离。 / Stopping distance = thinking distance + braking distance.",
    "answer": true,
    "explain": "这是中学交通安全常用关系。 / Standard road-safety relation."
  },
  {
    "id": "boost-q46",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "胡克定律（弹性限度内）可写成？ / Hooke’s law (within limit) is?",
    "options": [
      "F = k/x 错误式",
      "F = kx 胡克定律",
      "F = k + x 错误式",
      "F = x/k 错误式"
    ],
    "answer": 1,
    "explain": "弹力与伸长成正比：F = kx。 / Force proportional to extension."
  },
  {
    "id": "boost-q47",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "物体下落达到终极速度时？ / At terminal velocity, a falling object ______.",
    "options": [
      "加速度最大 max acceleration",
      "合力为零 net force zero",
      "质量为零 mass zero",
      "不受重力 no gravity"
    ],
    "answer": 1,
    "explain": "阻力与重力平衡，匀速下落。 / Drag balances weight; net force zero."
  },
  {
    "id": "boost-q48",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "速度是矢量，路程是标量。 / Velocity is a vector; distance (path length) is a scalar.",
    "answer": true,
    "explain": "速度有方向；路程只有大小。 / Velocity has direction; distance does not."
  },
  {
    "id": "boost-q49",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "阿基米德原理指出浮力等于？ / Archimedes’ principle: upthrust equals ______.",
    "options": [
      "物体体积 volume of object",
      "排开液体的重力 weight of fluid displaced",
      "物体密度 density of object",
      "大气压 atmospheric pressure"
    ],
    "answer": 1,
    "explain": "浮力等于排开流体的重力。 / Upthrust = weight of displaced fluid."
  },
  {
    "id": "boost-q50",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "功的入门公式（力与位移同向）是？ / Intro formula for work (force along displacement) is?",
    "options": [
      "W = F/s 错误式",
      "W = Fs 功",
      "W = F + s 错误式",
      "W = m/a 错误式"
    ],
    "answer": 1,
    "explain": "W = Fs。 / Work = force × distance."
  },
  {
    "id": "boost-q51",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "动能的入门表达式是？ / Kinetic energy (intro) is?",
    "options": [
      "Ek = mv 错误式",
      "Ek = ½mv² 动能",
      "Ek = mgh 实为势能式",
      "Ek = Fd 错误式"
    ],
    "answer": 1,
    "explain": "Ek = ½mv²。 / Energy due to motion."
  },
  {
    "id": "boost-q52",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "重心越低、支承面越大，一般越稳定。 / Lower centre of gravity and wider base usually increase stability.",
    "answer": true,
    "explain": "这是稳定性的基本结论。 / Basic stability rule."
  },
  {
    "id": "boost-q53",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "标准大气压大约是？ / Standard atmospheric pressure is about ______.",
    "options": [
      "1 Pa 过小",
      "1.0×10⁵ Pa 标准大气压量级",
      "340 Pa（数值 value）",
      "9.8 Pa（数值 value）"
    ],
    "answer": 1,
    "explain": "约 1.01×10⁵ Pa。 / About 1.0×10⁵ Pa."
  },
  {
    "id": "boost-q54",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "同一压力作用下，受力面积越小则压强？ / For the same force, smaller area means pressure is ______.",
    "options": [
      "越小 smaller",
      "越大 larger",
      "不变 unchanged",
      "为零 zero"
    ],
    "answer": 1,
    "explain": "p = F/A，A 越小 p 越大。 / Smaller A → larger p."
  },
  {
    "id": "boost-q55",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "唾液淀粉酶主要把淀粉分解为？ / Salivary amylase mainly breaks starch into ______.",
    "options": [
      "氨基酸 amino acids",
      "麦芽糖 maltose",
      "脂肪酸 fatty acids",
      "甘油 glycerol"
    ],
    "answer": 1,
    "explain": "淀粉酶催化淀粉→麦芽糖。 / Amylase: starch → maltose."
  },
  {
    "id": "boost-q56",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "胆汁含有脂肪酶，可直接水解脂肪。 / Bile contains lipase and directly hydrolyses fats.",
    "answer": false,
    "explain": "胆汁不含消化酶，只乳化脂肪。 / Bile emulsifies fats; no digestive enzymes."
  },
  {
    "id": "boost-q57",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "脂肪消化的终产物主要是？ / End products of fat digestion are mainly ______.",
    "options": [
      "葡萄糖 glucose",
      "氨基酸 amino acids",
      "甘油和脂肪酸 glycerol and fatty acids",
      "麦芽糖 maltose"
    ],
    "answer": 2,
    "explain": "脂肪→甘油+脂肪酸。 / Fats → glycerol + fatty acids."
  },
  {
    "id": "boost-q58",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "小肠绒毛与微绒毛的主要意义是？ / Villi and microvilli mainly ______.",
    "options": [
      "分泌胰岛素 secrete insulin",
      "增大吸收面积 increase absorption area",
      "产生红细胞 make RBCs",
      "滤过尿素 filter urea"
    ],
    "answer": 1,
    "explain": "极大增加吸收表面积。 / They hugely increase surface area."
  },
  {
    "id": "boost-q59",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "肝门静脉的功能是？ / The hepatic portal vein ______.",
    "options": [
      "把血运出心脏 carries blood out of heart",
      "把小肠吸收物运往肝脏 carries absorbed nutrients to liver",
      "只运氧气 only carries oxygen",
      "形成尿液 forms urine"
    ],
    "answer": 1,
    "explain": "消化吸收后的血液经肝门静脉到肝。 / Absorbed nutrients go to the liver via HPV."
  },
  {
    "id": "boost-q60",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "人体具有双循环：肺循环与体循环。 / Humans have double circulation: pulmonary and systemic.",
    "answer": true,
    "explain": "血液两次经过心脏完成一次全身循环。 / Blood passes heart twice per full circuit."
  },
  {
    "id": "boost-q61",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "房室瓣的作用是？ / Atrioventricular valves ______.",
    "options": [
      "加速血流 speed blood flow",
      "防止心室血倒流入心房 prevent backflow into atria",
      "产生红细胞 make RBCs",
      "分泌激素 secrete hormones"
    ],
    "answer": 1,
    "explain": "保证血液单向流动。 / They keep one-way flow."
  },
  {
    "id": "boost-q62",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "冠状动脉的作用是？ / Coronary arteries ______.",
    "options": [
      "把血送往全身 send blood to whole body",
      "供应心肌氧气和养料 supply the heart muscle",
      "只运静脉血 only carry venous blood",
      "形成尿液 form urine"
    ],
    "answer": 1,
    "explain": "心肌自身的血液供应来自冠状动脉。 / They feed the myocardium."
  },
  {
    "id": "boost-q63",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "吸气时膈肌通常？ / During inspiration the diaphragm usually ______.",
    "options": [
      "舒张上升 relaxes and rises",
      "收缩下降 contracts and descends",
      "停止运动 stops",
      "变成骨骼 becomes bone"
    ],
    "answer": 1,
    "explain": "收缩使胸腔容积增大。 / Contraction increases thoracic volume."
  },
  {
    "id": "boost-q64",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "肺泡壁和毛细血管壁都很薄，利于气体扩散。 / Alveolar and capillary walls are thin to aid diffusion.",
    "answer": true,
    "explain": "薄壁缩短扩散距离。 / Thin walls shorten diffusion distance."
  },
  {
    "id": "boost-q65",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "肾小球的主要作用是？ / The glomerulus mainly performs ______.",
    "options": [
      "消化蛋白质 protein digestion",
      "超滤过 ultrafiltration",
      "气体交换 gas exchange",
      "分泌胆汁 bile secretion"
    ],
    "answer": 1,
    "explain": "滤出血浆成分形成原尿。 / It filters plasma to form filtrate."
  },
  {
    "id": "boost-q66",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "肾小管的主要作用是？ / Renal tubules mainly perform ______.",
    "options": [
      "选择性重吸收 selective reabsorption",
      "咀嚼 chewing",
      "肺通气 ventilation",
      "产生抗体 make antibodies"
    ],
    "answer": 0,
    "explain": "重吸收葡萄糖、水和部分盐等。 / They reclaim useful substances."
  },
  {
    "id": "boost-q67",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "排遗（egestion）等于排泄（excretion）。 / Egestion is the same as excretion.",
    "answer": false,
    "explain": "排遗排出未消化残渣；排泄排出代谢废物。 / Egestion ≠ metabolic excretion."
  },
  {
    "id": "boost-q68",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "蛋白质消化的终产物是？ / The end product of protein digestion is ______.",
    "options": [
      "葡萄糖 glucose",
      "氨基酸 amino acids",
      "脂肪酸 fatty acids",
      "淀粉 starch"
    ],
    "answer": 1,
    "explain": "蛋白质→氨基酸。 / Proteins → amino acids."
  },
  {
    "id": "boost-q69",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "氧合血红蛋白存在于？ / Oxyhaemoglobin is found in ______.",
    "options": [
      "与氧结合的血红蛋白 haemoglobin bound to oxygen",
      "只在血浆中 only in plasma",
      "只在胆汁中 only in bile",
      "只在尿液中 only in urine"
    ],
    "answer": 0,
    "explain": "Hb 与 O₂ 结合形成氧合血红蛋白。 / Hb + O₂ forms oxyhaemoglobin."
  },
  {
    "id": "boost-q70",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "物理性消化的例子是？ / An example of mechanical digestion is ______.",
    "options": [
      "淀粉酶水解 amylase hydrolysis",
      "咀嚼与蠕动 chewing and peristalsis",
      "胰岛素降血糖 insulin lowering glucose",
      "抗体结合抗原 antibody binding"
    ],
    "answer": 1,
    "explain": "物理粉碎与推送属于物理性消化。 / Physical breakdown without chemical change of molecules."
  },
  {
    "id": "boost-q71",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "左心室壁通常比右心室壁更厚。 / The left ventricular wall is usually thicker than the right.",
    "answer": true,
    "explain": "体循环路程更长、阻力更大。 / Systemic circuit needs higher pressure."
  },
  {
    "id": "boost-q72",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "透析主要用于？ / Dialysis is mainly used when ______.",
    "options": [
      "肾功能严重衰竭 kidneys fail seriously",
      "只想增肌 only to gain muscle",
      "提高视力 improve vision",
      "制造胃酸 make stomach acid"
    ],
    "answer": 0,
    "explain": "人工清除血液中代谢废物。 / Artificially removes wastes from blood."
  },
  {
    "id": "boost-q73",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "突触处传递信号主要依靠？ / Synaptic transmission mainly relies on ______.",
    "options": [
      "神经递质 neurotransmitters",
      "骨骼 bone",
      "胆汁 bile",
      "淀粉 starch"
    ],
    "answer": 0,
    "explain": "化学信号（神经递质）跨越突触间隙。 / Chemicals cross the synaptic cleft."
  },
  {
    "id": "boost-q74",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "髓鞘可以加快神经冲动的传导。 / Myelin sheath speeds nerve impulse conduction.",
    "answer": true,
    "explain": "有髓纤维传导更快。 / Myelinated fibres conduct faster."
  },
  {
    "id": "boost-q75",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "虹膜的主要功能是？ / The iris mainly ______.",
    "options": [
      "消化脂肪 digest fat",
      "调节瞳孔大小 control pupil size",
      "泵血 pump blood",
      "滤过尿液 filter urine"
    ],
    "answer": 1,
    "explain": "控制进入眼睛的光量。 / It controls light entering the eye."
  },
  {
    "id": "boost-q76",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "血糖升高时，哪一种激素分泌增加？ / When blood glucose rises, which hormone increases?",
    "options": [
      "胰高血糖素 glucagon",
      "胰岛素 insulin",
      "肾上腺素只唯一 only adrenaline",
      "生长激素 only GH"
    ],
    "answer": 1,
    "explain": "胰岛素促进降血糖。 / Insulin lowers blood glucose."
  },
  {
    "id": "boost-q77",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "负反馈的作用是？ / Negative feedback mainly ______.",
    "options": [
      "放大偏离 amplify deviations",
      "抑制过程以维持稳态 dampen changes to keep homeostasis",
      "停止所有生命 stop all life",
      "只增加噪声 only add noise"
    ],
    "answer": 1,
    "explain": "结果反过来抑制过程，维持相对稳定。 / Output inhibits the process."
  },
  {
    "id": "boost-q78",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "抗生素能有效杀死病毒。 / Antibiotics effectively kill viruses.",
    "answer": false,
    "explain": "抗生素针对细菌，对病毒通常无效。 / Antibiotics target bacteria, not viruses."
  },
  {
    "id": "boost-q79",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "疫苗诱导的是？ / Vaccines mainly induce ______.",
    "options": [
      "被动获得现成抗体 only ready-made antibodies always",
      "主动免疫（自身产生抗体/记忆） active immunity",
      "只增加噪声 only noise",
      "排尿 urination"
    ],
    "answer": 1,
    "explain": "刺激机体产生抗体与记忆细胞。 / Body makes its own adaptive response."
  },
  {
    "id": "boost-q80",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "记忆细胞的意义是？ / Memory cells allow ______.",
    "options": [
      "第一次感染更严重 worse first infection",
      "再次遇抗原时更快更强应答 faster stronger response on re-exposure",
      "停止呼吸 stop breathing",
      "只消化脂肪 only digest fat"
    ],
    "answer": 1,
    "explain": "二次免疫应答迅速。 / Secondary response is rapid."
  },
  {
    "id": "boost-q81",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "肾上腺素应急时可引起？ / Adrenaline in emergency can cause ______.",
    "options": [
      "心跳减慢 slower heart rate only",
      "心跳加快、血流重分配 faster heart rate and blood redistribution",
      "立即睡眠 immediate sleep",
      "停止代谢 stop metabolism"
    ],
    "answer": 1,
    "explain": "战斗或逃跑准备。 / Fight-or-flight preparation."
  },
  {
    "id": "boost-q82",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "1型糖尿病与胰岛素分泌不足密切相关。 / Type 1 diabetes is closely linked to insufficient insulin.",
    "answer": true,
    "explain": "需补充胰岛素等治疗。 / Often treated with insulin."
  },
  {
    "id": "boost-q83",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "滥用抗生素可能导致？ / Antibiotic misuse may lead to ______.",
    "options": [
      "细菌耐药性 bacterial resistance",
      "病毒被消灭 viruses wiped out",
      "光速改变 change in c",
      "重力消失 loss of gravity"
    ],
    "answer": 0,
    "explain": "耐药菌被选择保留。 / Resistant bacteria are selected."
  },
  {
    "id": "boost-q84",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "酒精对神经系统主要是？ / Alcohol mainly acts as a ______ on the nervous system.",
    "options": [
      "兴奋剂 stimulant",
      "抑制剂 depressant",
      "消化酶 enzyme",
      "抗生素 antibiotic"
    ],
    "answer": 1,
    "explain": "减慢神经活动，影响判断。 / It slows CNS activity."
  },
  {
    "id": "boost-q85",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "皮肤和黏膜属于先天防御屏障。 / Skin and mucous membranes are innate barriers.",
    "answer": true,
    "explain": "第一道防线阻止病原体侵入。 / First-line defence."
  },
  {
    "id": "boost-q86",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "被动免疫的特点是？ / Passive immunity involves ______.",
    "options": [
      "直接获得抗体 receiving ready-made antibodies",
      "必须自己从零产生抗体 always making antibodies from scratch first",
      "只靠运动 only exercise",
      "只靠阳光 only sunlight"
    ],
    "answer": 0,
    "explain": "如注射抗体或母传抗体。 / e.g. injected or maternal antibodies."
  },
  {
    "id": "boost-q87",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "HIV 主要破坏？ / HIV mainly damages the ______.",
    "options": [
      "骨骼系统 skeletal system only",
      "免疫系统 immune system",
      "只破坏头发 only hair",
      "只破坏指甲 only nails"
    ],
    "answer": 1,
    "explain": "攻击免疫细胞，导致免疫缺陷。 / Attacks immune cells."
  },
  {
    "id": "boost-q88",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "甲状腺激素的主要作用是？ / Thyroxine mainly ______.",
    "options": [
      "只凝固血液 only clots blood",
      "促进新陈代谢与生长发育 promote metabolism and growth",
      "只乳化脂肪 only emulsify fat",
      "只传导声音 only conduct sound"
    ],
    "answer": 1,
    "explain": "调节代谢率与发育。 / Controls metabolic rate and development."
  },
  {
    "id": "boost-q89",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "条件反射是先天就有的，不需要学习。 / Conditioned reflexes are inborn and need no learning.",
    "answer": false,
    "explain": "条件反射后天形成，常需大脑皮层。 / They are learned."
  },
  {
    "id": "boost-q90",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "吸烟危害与下列哪项无关？ / Smoking harm is LEAST related to ______.",
    "options": [
      "焦油 tar",
      "尼古丁 nicotine",
      "一氧化碳 carbon monoxide",
      "提高肺活量 increasing vital capacity"
    ],
    "answer": 3,
    "explain": "吸烟损害呼吸与健康，不提高肺活量。 / Smoking harms health; does not raise vital capacity."
  },
  {
    "id": "boost-q91",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "工业上从液态空气分离氧气主要用？ / Industrial separation of O₂ from liquid air uses ______.",
    "options": [
      "过滤 filtration",
      "分馏 fractional distillation",
      "蒸发皿蒸发 evaporating dish only",
      "磁选 magnetic separation"
    ],
    "answer": 1,
    "explain": "利用沸点不同分馏。 / Different boiling points allow fractional distillation."
  },
  {
    "id": "boost-q92",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "空气中氧气的体积分数约为 21%。 / Oxygen is about 21% by volume in air.",
    "answer": true,
    "explain": "氮气约 78%，氧气约 21%。 / Nitrogen about 78 percent, oxygen about 21 percent."
  },
  {
    "id": "boost-q93",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "铁生锈通常需要？ / Rusting of iron usually needs ______.",
    "options": [
      "只需要氮气 nitrogen only",
      "氧气和水 oxygen and water",
      "只需要氢气 hydrogen only",
      "真空 vacuum"
    ],
    "answer": 1,
    "explain": "铁与 O₂、水等共同作用而生锈。 / Iron, oxygen and water together."
  },
  {
    "id": "boost-q94",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "镀锌防锈的主要原理是？ / Galvanising protects iron mainly because ______.",
    "options": [
      "锌比铁更不活泼 zinc is less reactive",
      "锌优先被腐蚀（牺牲保护） zinc corrodes preferentially",
      "锌是气体 zinc is a gas",
      "锌能传声 zinc transmits sound"
    ],
    "answer": 1,
    "explain": "锌作牺牲阳极保护铁。 / Zinc acts as sacrificial protection."
  },
  {
    "id": "boost-q95",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "检验氧气常用？ / Oxygen is commonly tested with a ______.",
    "options": [
      "澄清石灰水 limewater",
      "带火星木条 glowing splint",
      "酚酞 phenolphthalein",
      "石蕊试纸只测气味 litmus for smell"
    ],
    "answer": 1,
    "explain": "余烬复燃说明有氧气。 / Glowing splint relights."
  },
  {
    "id": "boost-q96",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "过氧化氢在二氧化锰催化下分解可制氧气。 / H₂O₂ with MnO₂ catalyst can produce oxygen.",
    "answer": true,
    "explain": "常见实验室制氧方法。 / Common lab preparation of O₂."
  },
  {
    "id": "boost-q97",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "澄清石灰水变浑浊常用于检验？ / Limewater turning milky tests for ______.",
    "options": [
      "氧气 O₂",
      "氢气 H₂",
      "二氧化碳 CO₂",
      "氮气 N₂"
    ],
    "answer": 2,
    "explain": "CO₂ 与氢氧化钙反应生成碳酸钙沉淀。 / CO₂ forms CaCO₃ precipitate."
  },
  {
    "id": "boost-q98",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "氢气点燃时的特征检验是？ / Hydrogen is tested by a ______.",
    "options": [
      "余烬复燃 glowing splint relight",
      "爆鸣（吱一声） squeaky pop",
      "使石灰水变浑浊 limewater milky",
      "石蕊变蓝 litmus blue"
    ],
    "answer": 1,
    "explain": "氢气燃烧有爆鸣声。 / Lit hydrogen gives a pop."
  },
  {
    "id": "boost-q99",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "饮用水消毒常用？ / Potable water is often disinfected by ______.",
    "options": [
      "只加淀粉 starch only",
      "氯化 chlorination",
      "只加沙子 sand only",
      "只加热到 10℃ heating to 10°C only"
    ],
    "answer": 1,
    "explain": "氯杀灭微生物。 / Chlorine kills microbes."
  },
  {
    "id": "boost-q100",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "饱和溶液在该温度下不能再溶解更多该溶质。 / A saturated solution cannot dissolve more of that solute at that temperature.",
    "answer": true,
    "explain": "达到溶解平衡。 / Dissolution equilibrium reached."
  },
  {
    "id": "boost-q101",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "酚酞在碱溶液中通常呈？ / Phenolphthalein in alkali is usually ______.",
    "options": [
      "无色 colourless",
      "红色/粉色 red/pink",
      "蓝色 blue",
      "绿色 green"
    ],
    "answer": 1,
    "explain": "酚酞遇碱变红。 / Pink/red in alkaline solution."
  },
  {
    "id": "boost-q102",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "酸雨的 pH 通常？ / Acid rain typically has pH ______.",
    "options": [
      "等于 7 equal to 7",
      "大于 7 greater than 7",
      "小于 5.6 less than 5.6",
      "等于 14 equal to 14"
    ],
    "answer": 2,
    "explain": "一般把 pH < 5.6 的降水称为酸雨。 / Rain with pH < 5.6."
  },
  {
    "id": "boost-q103",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "不完全燃烧可能产生有毒的一氧化碳。 / Incomplete combustion may produce toxic carbon monoxide.",
    "answer": true,
    "explain": "氧气不足时易生成 CO。 / Limited oxygen favours CO."
  },
  {
    "id": "boost-q104",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "催化转化器的作用是？ / A catalytic converter ______.",
    "options": [
      "增加尾气有害物 increase exhaust toxins",
      "减少汽车尾气有害气体 reduce harmful exhaust gases",
      "只增加噪声 only add noise",
      "制取氢气 only make H₂"
    ],
    "answer": 1,
    "explain": "把 CO、NOx 等转化为较无害气体。 / Converts pollutants to less harmful gases."
  },
  {
    "id": "boost-q105",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "二氧化硫过量排放易导致？ / Excess SO₂ emissions can cause ______.",
    "options": [
      "酸雨 acid rain",
      "只有彩虹 only rainbows",
      "只有真空 only vacuum",
      "只有超声波 only ultrasound"
    ],
    "answer": 0,
    "explain": "SO₂ 是酸雨的重要成因之一。 / SO₂ contributes to acid rain."
  },
  {
    "id": "boost-q106",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "合金与纯金属相比通常？ / Compared with pure metals, alloys are often ______.",
    "options": [
      "一定更软 always softer",
      "硬度或强度等性能可改善 hardness/strength can be improved",
      "一定是气体 always gases",
      "不能导电 never conduct"
    ],
    "answer": 1,
    "explain": "合金可获得更优机械性能。 / Alloying improves properties."
  },
  {
    "id": "boost-q107",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "钢是铁的碳合金。 / Steel is an alloy of iron and carbon.",
    "answer": true,
    "explain": "铁碳合金，碳含量可控。 / Iron–carbon alloy."
  },
  {
    "id": "boost-q108",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "全球变暖与下列哪类气体增加关系密切？ / Global warming is closely linked to rising ______.",
    "options": [
      "稀有气体 only noble gases",
      "温室气体（如 CO₂） greenhouse gases such as CO₂",
      "只有氧气 only oxygen",
      "只有氮气 only nitrogen"
    ],
    "answer": 1,
    "explain": "CO₂ 等温室气体增强保温效应。 / Greenhouse gases enhance warming."
  },
  {
    "id": "boost-q109",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "钠原子的简单电子排布是？ / Simple electron configuration of Na is?",
    "options": [
      "2,8,1 钠排布 Na electron arrangement",
      "2,8,8（排布 config）",
      "2,1（排布 config）",
      "8,2,1（排布 config）"
    ],
    "answer": 0,
    "explain": "钠有 11 个电子：2,8,1。 / Sodium: 11 electrons → 2,8,1."
  },
  {
    "id": "boost-q110",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "第一电子层最多容纳 2 个电子，第二层最多 8 个（中学范围）。 / 1st shell max 2 electrons; 2nd max 8 (school level).",
    "answer": true,
    "explain": "这是中学常用电子层容量规则。 / Standard school shell capacities."
  },
  {
    "id": "boost-q111",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "离子键的本质是？ / An ionic bond is essentially ______.",
    "options": [
      "共用电子对 shared electron pair",
      "阴阳离子静电吸引 electrostatic attraction between ions",
      "只有重力 only gravity",
      "声波传递 sound transmission"
    ],
    "answer": 1,
    "explain": "正负离子相互吸引。 / Opposite ions attract."
  },
  {
    "id": "boost-q112",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "共价键的特征是？ / A covalent bond features ______.",
    "options": [
      "电子完全失去 only complete electron loss",
      "共用电子对 a shared pair of electrons",
      "只有金属键 metallic bond only",
      "无电子 none of electrons"
    ],
    "answer": 1,
    "explain": "原子共用电子对成键。 / Atoms share electron pairs."
  },
  {
    "id": "boost-q113",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "配平化学方程式的目的是？ / Balancing equations ensures ______.",
    "options": [
      "左右原子种类和数目相等 same atom types and counts both sides",
      "生成更多产物 always more product",
      "改变元素种类 change elements",
      "提高光速 increase c"
    ],
    "answer": 0,
    "explain": "符合质量守恒与原子守恒。 / Atom and mass conservation."
  },
  {
    "id": "boost-q114",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "化学计量数（系数）之比可表示反应的摩尔比。 / Coefficients give the mole ratio of a reaction.",
    "answer": true,
    "explain": "这是化学计量入门基础。 / Basis of stoichiometry."
  },
  {
    "id": "boost-q115",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "H₂O 的相对分子质量 Mr 约为？（H=1,O=16） / Mr of H₂O is about? (H=1, O=16)",
    "options": [
      "17（数值 value）",
      "18（数值 value）",
      "32（数值 value）",
      "1（数值 value）"
    ],
    "answer": 1,
    "explain": "水的相对分子质量 Mr(H₂O) = 1×2+16 = 18。 / Relative molecular mass of water equals 18."
  },
  {
    "id": "boost-q116",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "下列属于双原子单质分子的是？ / Which is a diatomic element molecule?",
    "options": [
      "氦 He",
      "氖 Ne",
      "氧气 O₂",
      "钠 Na"
    ],
    "answer": 2,
    "explain": "氧气以 O₂ 分子存在。 / Oxygen exists as O₂."
  },
  {
    "id": "boost-q117",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "SO₄²⁻ 属于？ / SO₄²⁻ is a ______.",
    "options": [
      "单原子离子 monoatomic ion",
      "多原子离子/原子团 polyatomic ion",
      "中性原子 neutral atom",
      "电子 electron"
    ],
    "answer": 1,
    "explain": "由多个原子构成的带电基团。 / Multi-atom charged group."
  },
  {
    "id": "boost-q118",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "写化学式时正负化合价代数和必须为零。 / In formulas, the algebraic sum of valencies must be zero.",
    "answer": true,
    "explain": "化合物整体电中性。 / Compounds are electrically neutral overall."
  },
  {
    "id": "boost-q119",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "同位素的共同点是？ / Isotopes of an element share the same ______.",
    "options": [
      "中子数 neutron number",
      "质子数/原子序数 proton/atomic number",
      "质量数 mass number always",
      "一定同为气体 always same gas state"
    ],
    "answer": 1,
    "explain": "质子数相同、中子数不同。 / Same Z, different neutrons."
  },
  {
    "id": "boost-q120",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "状态符号 (aq) 表示？ / The state symbol (aq) means ______.",
    "options": [
      "固体 solid",
      "液体 liquid",
      "气体 gas",
      "水溶液 aqueous solution"
    ],
    "answer": 3,
    "explain": "aqueous：溶解在水中。 / Dissolved in water."
  },
  {
    "id": "boost-q121",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "酸与碱中和生成？ / Neutralisation of acid and alkali produces ______.",
    "options": [
      "只有氧气 oxygen only",
      "盐和水 a salt and water",
      "只有氢气 hydrogen only",
      "只有氮气 nitrogen only"
    ],
    "answer": 1,
    "explain": "酸+碱→盐+水。 / Acid + alkali → salt + water."
  },
  {
    "id": "boost-q122",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "不足量反应物会限制生成物的产量。 / A limiting reactant limits the amount of product.",
    "answer": true,
    "explain": "先耗尽的反应物决定最大产量。 / The reactant used up first caps yield."
  },
  {
    "id": "boost-q123",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "产率（入门）等于？ / Percentage yield (intro) equals ______.",
    "options": [
      "理论/实际×100% theoretical/actual×100%",
      "实际/理论×100% actual/theoretical×100%",
      "实际+理论 actual+theoretical",
      "永远 200% always 200%"
    ],
    "answer": 1,
    "explain": "实际产量除以理论产量再乘 100%。 / Actual over theoretical × 100%."
  },
  {
    "id": "boost-q124",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "置换反应的特征是？ / A displacement reaction features ______.",
    "options": [
      "一种单质替换化合物中另一成分 an element replacing another in a compound",
      "只有融化 melting only",
      "只有升华 sublimation only",
      "没有新物质 no new substance"
    ],
    "answer": 0,
    "explain": "单质与化合物反应生成新单质与新化合物。 / Element + compound → new element + compound."
  },
  {
    "id": "boost-q125",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "化合反应是指？ / A combination (synthesis) reaction is ______.",
    "options": [
      "一种变多种 one becomes many",
      "多种生成一种 many form one",
      "一定置换 displacement always",
      "一定中和 neutralisation always"
    ],
    "answer": 1,
    "explain": "两种或多种物质生成一种。 / Two or more substances form one."
  },
  {
    "id": "boost-q126",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "稀有气体原子通常具有稳定的最外层电子结构。 / Noble-gas atoms usually have stable outer shells.",
    "answer": true,
    "explain": "因此化学性质稳定。 / Hence low reactivity."
  },
  {
    "id": "boost-q127",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "CuSO₄·5H₂O 中的 “·5H₂O” 表示？ / In CuSO₄·5H₂O, “·5H₂O” means ______.",
    "options": [
      "五个氧原子 five oxygen atoms only",
      "结晶水 water of crystallisation",
      "五个铜原子 five copper atoms",
      "催化剂 a catalyst"
    ],
    "answer": 1,
    "explain": "晶体中结合的水分子。 / Water of crystallisation."
  },
  {
    "id": "boost-q128",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "金属活动性顺序中，较前金属通常能置换较后金属离子。 / In the reactivity series, a more reactive metal can usually ______.",
    "options": [
      "被较后金属置换 be displaced by a less reactive metal",
      "置换较不活泼金属离子 displace a less reactive metal ion",
      "变成稀有气体 become a noble gas",
      "失去质子数 lose proton number"
    ],
    "answer": 1,
    "explain": "活动性强的金属可置换弱的。 / More reactive metals displace less reactive ones."
  },
  {
    "id": "boost-q129",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "痛阈大致对应？ / Threshold of pain roughly corresponds to ______.",
    "options": [
      "刚能听见的最小声 just audible minimum",
      "引起疼痛的很强声音 very loud sound causing pain",
      "真空中的声速 speed in vacuum",
      "只有次声 only infrasound"
    ],
    "answer": 1,
    "explain": "痛阈是引起听觉疼痛的声强级。 / Level that causes pain."
  },
  {
    "id": "boost-q130",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "两相近频率的声音叠合可产生拍音。 / Two close frequencies can produce beats.",
    "answer": true,
    "explain": "强弱周期性交替即拍。 / Periodic loudness variation."
  },
  {
    "id": "boost-q131",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "超声清洗利用超声波产生？ / Ultrasonic cleaning uses ultrasound to produce ______.",
    "options": [
      "空化等效应 cavitation effects",
      "可见彩虹 visible rainbows",
      "重力消失 weightlessness",
      "核反应 nuclear reactions"
    ],
    "answer": 0,
    "explain": "空化气泡有助于剥离污垢。 / Cavitation helps remove dirt."
  },
  {
    "id": "boost-q132",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "潜望镜主要利用？ / A periscope mainly uses ______.",
    "options": [
      "平面镜反射 plane-mirror reflection",
      "只有声波 only sound",
      "只有磁力 only magnetism",
      "只有化学变化 only chemistry"
    ],
    "answer": 0,
    "explain": "两次反射改变视线方向。 / Two reflections redirect the line of sight."
  },
  {
    "id": "boost-q133",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "海市蜃楼与空气折射率梯度引起的折射有关。 / Mirages relate to refraction in air with refractive-index gradients.",
    "answer": true,
    "explain": "不同气层光速不同导致光线弯曲。 / Varying n bends light rays."
  },
  {
    "id": "boost-q134",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "偏振是哪类波可以表现的性质（入门）？ / Polarisation (intro) is a property of ______ waves.",
    "options": [
      "只有纵波 longitudinal only",
      "横波 transverse",
      "只有声波 in air sound only",
      "只有水流 water flow only"
    ],
    "answer": 1,
    "explain": "横波可偏振；光是横波。 / Transverse waves can be polarised."
  },
  {
    "id": "boost-q135",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "散光主要与什么有关？ / Astigmatism is mainly related to ______.",
    "options": [
      "角膜曲率不均 uneven corneal curvature",
      "只缺维生素 C only vitamin C lack",
      "只缺钙 only calcium lack",
      "声速过快 too-fast sound"
    ],
    "answer": 0,
    "explain": "不同方向焦距不同导致模糊。 / Different focal powers in different meridians."
  },
  {
    "id": "boost-q136",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "支点是指？ / A fulcrum (pivot) is ______.",
    "options": [
      "杠杆转动的轴 the axis a lever turns about",
      "只有光源 only a light source",
      "只有声源 only a sound source",
      "只有催化剂 only a catalyst"
    ],
    "answer": 0,
    "explain": "杠杆绕支点转动。 / Lever rotates about the pivot."
  },
  {
    "id": "boost-q137",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "重力势能入门公式为 Ep = mgh。 / Gravitational potential energy (intro) is Ep = mgh.",
    "answer": true,
    "explain": "与质量和高度有关。 / Depends on mass and height."
  },
  {
    "id": "boost-q138",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "反应距离主要取决于？ / Thinking distance mainly depends on ______.",
    "options": [
      "只与轮胎花纹 only tyre tread",
      "车速与反应时间 speed and reaction time",
      "只与车漆颜色 only paint colour",
      "只与电台频道 only radio station"
    ],
    "answer": 1,
    "explain": "反应时间内仍以原速前进。 / Distance = speed × reaction time."
  },
  {
    "id": "boost-q139",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "帕斯卡（Pa）等于？ / One pascal (Pa) equals ______.",
    "options": [
      "1 N·m 力矩单位也可",
      "1 N/m² = 1 Pa（数值/公式 value/formula）",
      "1 kg/m³ 密度单位",
      "1 m/s² 加速度单位"
    ],
    "answer": 1,
    "explain": "1 Pa = 1 N/m²。 / SI unit of pressure."
  },
  {
    "id": "boost-q140",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "非平衡力的作用是？ / An unbalanced (net) force ______.",
    "options": [
      "一定使物体静止 always keeps rest",
      "改变运动状态 changes the state of motion",
      "一定使质量改变 always changes mass",
      "消灭惯性 destroys inertia"
    ],
    "answer": 1,
    "explain": "产生加速度，改变速度。 / Causes acceleration."
  },
  {
    "id": "boost-q141",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "胃蛋白酶最适环境偏？ / Pepsin works best in ______ conditions.",
    "options": [
      "强碱 strongly alkaline",
      "酸性 acidic",
      "中性且无水 neutral with no water",
      "真空 vacuum"
    ],
    "answer": 1,
    "explain": "胃内酸性环境利于胃蛋白酶。 / Stomach acid suits pepsin."
  },
  {
    "id": "boost-q142",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "动脉瓣（半月瓣）防止血液从动脉倒流入心室。 / Semilunar valves stop backflow from arteries into ventricles.",
    "answer": true,
    "explain": "保证单向泵血。 / Maintain one-way pumping."
  },
  {
    "id": "boost-q143",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "组织液来源于？ / Tissue fluid mainly comes from ______.",
    "options": [
      "血浆渗出 capillary plasma filtration/leakage",
      "只有胆汁 only bile",
      "只有尿液 only urine",
      "只有空气 only air"
    ],
    "answer": 0,
    "explain": "毛细血管血浆成分进入组织间隙。 / Plasma filters into tissues."
  },
  {
    "id": "boost-q144",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "肺活量是指？ / Vital capacity is ______.",
    "options": [
      "心跳次数 heart rate",
      "用力吸气后再用力呼出的最大气量 max air exhaled after full inhale",
      "血压 blood pressure",
      "尿量 urine volume"
    ],
    "answer": 1,
    "explain": "反映呼吸功能的常用指标。 / Common lung function measure."
  },
  {
    "id": "boost-q145",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "气管软骨环的作用是？ / Tracheal cartilage rings ______.",
    "options": [
      "消化蛋白质 digest protein",
      "保持气道开放 keep the airway open",
      "泵血 pump blood",
      "分泌胰岛素 secrete insulin"
    ],
    "answer": 1,
    "explain": "防止气管塌陷。 / Prevent airway collapse."
  },
  {
    "id": "boost-q146",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "抗利尿激素（ADH）可促进肾小管对水的重吸收。 / ADH promotes water reabsorption in kidney tubules.",
    "answer": true,
    "explain": "有助于减少尿量、保水。 / Helps conserve water."
  },
  {
    "id": "boost-q147",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "冠心病直接相关的血管是？ / Coronary heart disease directly involves the ______.",
    "options": [
      "冠状动脉 coronary arteries",
      "只有肝门静脉 only hepatic portal vein",
      "只有毛细淋巴管 only lymph capillaries",
      "只有输尿管 only ureter"
    ],
    "answer": 0,
    "explain": "冠状动脉狭窄导致心肌缺血。 / Narrowed coronaries starve heart muscle."
  },
  {
    "id": "boost-q148",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "胰岛主要分泌？ / Islets of Langerhans mainly secrete ______.",
    "options": [
      "胆汁 bile",
      "胰岛素（及胰高血糖素） insulin (and glucagon)",
      "只有胃酸 only gastric acid",
      "只有唾液 only saliva"
    ],
    "answer": 1,
    "explain": "调节血糖的关键内分泌结构。 / Key endocrine control of blood glucose."
  },
  {
    "id": "boost-q149",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "兴奋剂加快神经系统活动；抑制剂减慢。 / Stimulants speed the CNS; depressants slow it.",
    "answer": true,
    "explain": "两类药物对神经活动影响相反。 / Opposite effects on nervous activity."
  },
  {
    "id": "boost-q150",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "传播媒介（vector）的例子是？ / An example of a disease vector is ______.",
    "options": [
      "传播疟疾的蚊子 mosquito transmitting malaria",
      "蒸馏水 distilled water",
      "平面镜 plane mirror",
      "凸透镜 convex lens"
    ],
    "answer": 0,
    "explain": "媒介生物携带病原体传播疾病。 / Vectors carry pathogens."
  },
  {
    "id": "boost-q151",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "成瘾后停用常出现？ / After addiction, stopping a drug often causes ______.",
    "options": [
      "戒断症状 withdrawal symptoms",
      "立刻获得超能力 instant superpowers",
      "质量守恒被打破 broken mass conservation",
      "光速变慢 slower light"
    ],
    "answer": 0,
    "explain": "身体依赖导致不适反应。 / Dependence produces withdrawal."
  },
  {
    "id": "boost-q152",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "雌激素主要促进？ / Oestrogen mainly promotes ______.",
    "options": [
      "女性第二性征等 female secondary sexual characteristics",
      "只制造红细胞 only RBC production",
      "只制造声波 only sound waves",
      "只制造合金 only alloys"
    ],
    "answer": 0,
    "explain": "性激素调节第二性征与生殖相关变化。 / Sex hormone effects."
  },
  {
    "id": "boost-q153",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "随意动作受大脑皮层控制。 / Voluntary actions are controlled by the cerebral cortex.",
    "answer": true,
    "explain": "有意识控制的运动。 / Conscious control of movement."
  },
  {
    "id": "boost-q154",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "硬水含较多？ / Hard water contains relatively more ______.",
    "options": [
      "钙镁离子 Ca²⁺ and Mg²⁺",
      "只有氦 only helium",
      "只有氖 only neon",
      "只有氩 only argon"
    ],
    "answer": 0,
    "explain": "钙镁离子使水变硬。 / Calcium and magnesium ions."
  },
  {
    "id": "boost-q155",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "通用指示剂的用途是？ / Universal indicator is used to ______.",
    "options": [
      "测量不同 pH 的颜色变化 show colours across pH range",
      "测量声速 measure sound speed",
      "测量焦距 measure focal length",
      "测量血压 measure blood pressure"
    ],
    "answer": 0,
    "explain": "不同 pH 显不同颜色。 / Different colours at different pH."
  },
  {
    "id": "boost-q156",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "氮氧化物（NOx）可参与形成酸雨和光化学烟雾。 / NOx can contribute to acid rain and photochemical smog.",
    "answer": true,
    "explain": "重要的空气污染物。 / Important air pollutants."
  },
  {
    "id": "boost-q157",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "可再生能源的例子是？ / An example of renewable energy is ______.",
    "options": [
      "煤 coal",
      "石油 oil",
      "风能 wind energy",
      "天然气 natural gas"
    ],
    "answer": 2,
    "explain": "风能可持续利用。 / Wind is renewable."
  },
  {
    "id": "boost-q158",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "沉淀（水处理）的目的是？ / Sedimentation in water treatment aims to ______.",
    "options": [
      "让悬浮物沉降 remove suspended solids by settling",
      "提高音调 raise pitch",
      "增大焦距 increase focal length",
      "制造超声波 make ultrasound"
    ],
    "answer": 0,
    "explain": "颗粒沉降便于后续过滤。 / Particles settle before filtration."
  },
  {
    "id": "boost-q159",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "石蕊遇酸通常呈？ / Litmus in acid is usually ______.",
    "options": [
      "红色 red",
      "蓝色 blue",
      "无色 colourless",
      "绿色 green"
    ],
    "answer": 0,
    "explain": "酸红碱蓝。 / Red in acid, blue in alkali."
  },
  {
    "id": "boost-q160",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "电子式（点叉图）主要用于表示？ / Dot-and-cross diagrams mainly show ______.",
    "options": [
      "价电子与成键 valence electrons and bonding",
      "只表示声速 only sound speed",
      "只表示血压 only blood pressure",
      "只表示焦距 only focal length"
    ],
    "answer": 0,
    "explain": "展示原子如何共用或转移电子。 / Shows how electrons are shared/transferred."
  },
  {
    "id": "boost-q161",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "分解反应是一种物质生成两种或多种物质。 / Decomposition: one substance forms two or more.",
    "answer": true,
    "explain": "与化合反应相反。 / Opposite of combination."
  },
  {
    "id": "boost-q162",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "沉淀反应的特征是生成？ / A precipitation reaction forms ______.",
    "options": [
      "难溶固体 an insoluble solid",
      "只有真空 only vacuum",
      "只有声波 only sound",
      "只有虚像 only virtual image"
    ],
    "answer": 0,
    "explain": "出现沉淀（ppt）。 / An insoluble product appears."
  },
  {
    "id": "boost-q163",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "相对式量适用于？ / Relative formula mass is used for ______.",
    "options": [
      "只适用于气体分子 gas molecules only",
      "离子化合物等化学式单元 ionic compounds / formula units",
      "只适用于声音 only sound",
      "只适用于透镜 only lenses"
    ],
    "answer": 1,
    "explain": "按化学式把各原子 Ar 相加。 / Sum Ar values in the formula."
  },
  {
    "id": "boost-q164",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "同主族元素性质相似的主要原因是？ / Same-group elements are similar mainly because of ______.",
    "options": [
      "相同中子数 same neutron number",
      "相同最外层电子数 same valence electron count",
      "相同质量数 same mass number",
      "相同颜色 same colour always"
    ],
    "answer": 1,
    "explain": "价电子数决定化学性质相似性。 / Valence electrons drive similarity."
  },
  {
    "id": "boost-q165",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "原子利用率关注期望产物中原子的利用效率。 / Atom economy concerns how efficiently atoms end in the desired product.",
    "answer": true,
    "explain": "绿色化学入门概念。 / Green chemistry intro idea."
  },
  {
    "id": "boost-q166",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "无水物是指？ / Anhydrous means ______.",
    "options": [
      "含结晶水 containing water of crystallisation",
      "不含结晶水 without water of crystallisation",
      "一定是气体 always a gas",
      "一定是合金 always an alloy"
    ],
    "answer": 1,
    "explain": "失去结晶水后的状态。 / Without water of crystallisation."
  },
  {
    "id": "boost-q167",
    "subject": "physics",
    "chapter": "声",
    "type": "mcq",
    "prompt": "若回声测距中往返时间变长（声速不变），距离？ / If echo round-trip time increases (v fixed), distance ______.",
    "options": [
      "变小 decreases",
      "变大 increases",
      "不变 unchanged",
      "变为负 becomes negative"
    ],
    "answer": 1,
    "explain": "s = vt/2，t 越大 s 越大。 / Larger t → larger s."
  },
  {
    "id": "boost-q168",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "盲点处没有？ / The blind spot has no ______.",
    "options": [
      "感光细胞 photoreceptors",
      "血液 blood ever",
      "骨骼 bone ever",
      "空气 air ever"
    ],
    "answer": 0,
    "explain": "视神经穿出视网膜处无感光细胞。 / No rods/cones where optic nerve exits."
  },
  {
    "id": "boost-q169",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "速度-时间图斜率表示？ / Gradient of a speed–time graph is ______.",
    "options": [
      "路程 distance",
      "加速度 acceleration",
      "质量 mass",
      "压强 pressure"
    ],
    "answer": 1,
    "explain": "斜率 = Δv/Δt = 加速度。 / Gradient = acceleration."
  },
  {
    "id": "boost-q170",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "乳化的意义是？ / Emulsification is important because it ______.",
    "options": [
      "增大脂肪表面积便于酶作用 increases fat surface area for lipase",
      "直接变成氨基酸 turns fat into amino acids",
      "产生声波 produces sound",
      "形成虚像 forms virtual images"
    ],
    "answer": 0,
    "explain": "小液滴更易被脂肪酶催化。 / Tiny droplets aid enzyme action."
  },
  {
    "id": "boost-q171",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "主动免疫与被动免疫的关键差别是？ / Key difference: active vs passive immunity is ______.",
    "options": [
      "主动由自身产生抗体/记忆；被动直接获抗体 active makes own antibodies/memory; passive receives antibodies",
      "没有差别 no difference",
      "被动一定更持久 passive always lasts longer",
      "主动只针对病毒 active only for viruses"
    ],
    "answer": 0,
    "explain": "主动通常更持久。 / Active usually longer-lasting."
  },
  {
    "id": "boost-q172",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "颗粒物污染常用指标包括？ / Particulate pollution indicators include ______.",
    "options": [
      "PM2.5 等 PM2.5 etc.",
      "只有音调 only pitch",
      "只有焦距 only focal length",
      "只有化合价 only valency"
    ],
    "answer": 0,
    "explain": "细颗粒物危害呼吸健康。 / Fine particles harm respiratory health."
  },
  {
    "id": "boost-q173",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "燃烧反应通常是？ / Combustion reactions are usually ______.",
    "options": [
      "与氧剧烈反应并放热发光 rapid reaction with oxygen releasing heat/light",
      "只有熔化 melting only",
      "只有溶解 dissolving only",
      "只有反射 reflection only"
    ],
    "answer": 0,
    "explain": "发光发热的氧化反应。 / Vigorous oxidation with heat and light."
  },
  {
    "id": "boost-q174",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "化学变化中原子种类不变，只是重新组合。 / In chemical changes, atom types stay the same; they rearrange.",
    "answer": true,
    "explain": "质量守恒的微观解释。 / Microscopic basis of mass conservation."
  },
  {
    "id": "boost-q175",
    "subject": "physics",
    "chapter": "光",
    "type": "mcq",
    "prompt": "透镜成像公式（中学形式）是？ / The school lens formula is?",
    "options": [
      "1/u + 1/v = 1/f 透镜公式",
      "u + v = f 错误式",
      "u/v = f 错误式",
      "u × v = f 错误式"
    ],
    "answer": 0,
    "explain": "1/u + 1/v = 1/f（注意符号规则）。 / Reciprocal form with sign convention."
  },
  {
    "id": "boost-q176",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "浮力方向通常？ / Upthrust (buoyancy) usually acts ______.",
    "options": [
      "竖直向下 vertically down",
      "竖直向上 vertically up",
      "水平向左 horizontally left always",
      "无方向 has no direction"
    ],
    "answer": 1,
    "explain": "流体对物体的向上托力。 / Upward force from the fluid."
  },
  {
    "id": "boost-q177",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "摄食（ingestion）是指？ / Ingestion means ______.",
    "options": [
      "食物进入消化道 taking food into the alimentary canal",
      "排出粪便 egestion of faeces",
      "形成尿液 forming urine",
      "产生神经冲动 making nerve impulses"
    ],
    "answer": 0,
    "explain": "消化过程的第一步。 / First step of feeding/digestion sequence."
  },
  {
    "id": "boost-q178",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "mcq",
    "prompt": "睾酮主要促进？ / Testosterone mainly promotes ______.",
    "options": [
      "男性第二性征等 male secondary sexual characteristics",
      "只乳化脂肪 only fat emulsification",
      "只反射光线 only light reflection",
      "只降低气压 only lowering air pressure"
    ],
    "answer": 0,
    "explain": "雄性激素作用。 / Androgen effects."
  },
  {
    "id": "boost-q179",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "mcq",
    "prompt": "稀溶液与浓溶液的差别在于？ / Dilute vs concentrated refers to ______.",
    "options": [
      "溶质相对多少 relative amount of solute",
      "一定是不同元素 different elements always",
      "一定不同温度 different temperature always",
      "一定不同声速 different sound speed always"
    ],
    "answer": 0,
    "explain": "描述溶质含量高低。 / How much solute is present."
  },
  {
    "id": "boost-q180",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "同周期从左到右（主族）原子半径大致？ / Across a period (main groups), atomic radius generally ______.",
    "options": [
      "增大 increases",
      "减小 decreases",
      "先失电子再无关 loses electrons then unrelated",
      "变为负 becomes negative"
    ],
    "answer": 1,
    "explain": "核电荷增加，外层电子拉得更紧。 / Increasing nuclear charge pulls shells in."
  },
  {
    "id": "boost-q181",
    "subject": "physics",
    "chapter": "声",
    "type": "tf",
    "prompt": "声强是单位面积上的声功率。 / Sound intensity is sound power per unit area.",
    "answer": true,
    "explain": "与响度相关但概念不同。 / Related to, but not identical with, loudness."
  },
  {
    "id": "boost-q182",
    "subject": "physics",
    "chapter": "光",
    "type": "tf",
    "prompt": "光照度描述单位面积接收的光通量。 / Illuminance describes luminous flux per unit area.",
    "answer": true,
    "explain": "表示被照面明亮程度。 / How brightly a surface is lit."
  },
  {
    "id": "boost-q183",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "tf",
    "prompt": "矢量既有大小又有方向。 / A vector has both magnitude and direction.",
    "answer": true,
    "explain": "力、速度、加速度等都是矢量。 / Force, velocity, acceleration are vectors."
  },
  {
    "id": "boost-q184",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "tf",
    "prompt": "同化是指吸收的营养被细胞利用。 / Assimilation means absorbed nutrients are used by cells.",
    "answer": true,
    "explain": "营养进入代谢与构建过程。 / Nutrients enter metabolism/building."
  },
  {
    "id": "boost-q185",
    "subject": "biology",
    "chapter": "调节与健康",
    "type": "tf",
    "prompt": "黏液可以阻挡并帮助清除病原体。 / Mucus can trap and help remove pathogens.",
    "answer": true,
    "explain": "呼吸道等处的屏障作用。 / Barrier in airways etc."
  },
  {
    "id": "boost-q186",
    "subject": "chemistry",
    "chapter": "身边的物质",
    "type": "tf",
    "prompt": "弱酸完全电离（中学定性：弱酸部分电离）。 / Weak acids fully ionise (school: they partially ionise).",
    "answer": false,
    "explain": "弱酸只部分电离。 / Weak acids ionise partially."
  },
  {
    "id": "boost-q187",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "tf",
    "prompt": "同位素丰度会影响元素的平均相对原子质量。 / Isotope abundance affects average relative atomic mass.",
    "answer": true,
    "explain": "Ar 是按丰度加权平均。 / Ar is abundance-weighted."
  },
  {
    "id": "boost-q188",
    "subject": "physics",
    "chapter": "运动和力",
    "type": "mcq",
    "prompt": "摩擦力有时是有用的，例如？ / Friction can be useful, for example when ______.",
    "options": [
      "走路不打滑 walking without slipping",
      "机器无谓发热 useless heating of machines only",
      "轮胎完全光滑 tyres perfectly smooth",
      "无法握笔 unable to hold a pen"
    ],
    "answer": 0,
    "explain": "走路、握物都需要摩擦。 / Walking and gripping need friction."
  },
  {
    "id": "boost-q189",
    "subject": "biology",
    "chapter": "人体生命活动",
    "type": "mcq",
    "prompt": "胆囊的作用是？ / The gall bladder ______.",
    "options": [
      "暂存胆汁 stores bile",
      "产生胰岛素 makes insulin",
      "滤过原尿 filters urine",
      "传导神经冲动 conducts nerve impulses"
    ],
    "answer": 0,
    "explain": "储存并按需释放胆汁。 / Stores and releases bile."
  },
  {
    "id": "boost-q190",
    "subject": "chemistry",
    "chapter": "物质构成",
    "type": "mcq",
    "prompt": "化学方程式中的守恒包括？ / Conservation in equations includes ______.",
    "options": [
      "原子守恒与质量守恒 atom and mass conservation",
      "只有音调守恒 only pitch conservation",
      "只有虚像守恒 only virtual-image conservation",
      "打破质子数 changing proton numbers freely"
    ],
    "answer": 0,
    "explain": "左右原子种类数目与总质量不变。 / Atoms and total mass conserved."
  }
];


export function filterQuestions({ subject = 'all', type = 'all', chapter = null, limit = 0 } = {}) {
  let list = questions.slice();
  if (subject && subject !== 'all') list = list.filter((q) => q.subject === subject);
  if (type && type !== 'all') list = list.filter((q) => q.type === type);
  if (chapter) list = list.filter((q) => q.chapter === chapter);
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
