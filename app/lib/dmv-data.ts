export const STATE_CODES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC",
] as const;

export type StateCode = (typeof STATE_CODES)[number];

export type Question = {
  id: string;
  state: StateCode;
  category: "道路标志" | "安全驾驶" | "州法规" | "停车规则";
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type StateProfile = {
  code: StateCode;
  name: string;
  englishName: string;
  agency: string;
  officialPassRule: string;
  practiceLength: number;
  accent: string;
  handbookUrl: string;
  note: string;
  curated: boolean;
};

const stateDirectory: Array<[StateCode, string, string, string, string]> = [
  ["AL", "阿拉巴马州", "Alabama", "Alabama ALEA", "https://www.alea.gov/dps/driver-license"],
  ["AK", "阿拉斯加州", "Alaska", "Alaska DMV", "https://dmv.alaska.gov/"],
  ["AZ", "亚利桑那州", "Arizona", "Arizona MVD", "https://azdot.gov/mvd"],
  ["AR", "阿肯色州", "Arkansas", "Arkansas DFA", "https://www.dfa.arkansas.gov/office/driver-services/"],
  ["CA", "加利福尼亚州", "California", "California DMV", "https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/"],
  ["CO", "科罗拉多州", "Colorado", "Colorado DMV", "https://dmv.colorado.gov/"],
  ["CT", "康涅狄格州", "Connecticut", "Connecticut DMV", "https://portal.ct.gov/dmv"],
  ["DE", "特拉华州", "Delaware", "Delaware DMV", "https://dmv.de.gov/"],
  ["FL", "佛罗里达州", "Florida", "FLHSMV", "https://www.flhsmv.gov/pdf/handbooks/englishdriverhandbook.pdf"],
  ["GA", "佐治亚州", "Georgia", "Georgia DDS", "https://dds.georgia.gov/"],
  ["HI", "夏威夷州", "Hawaii", "Hawaii DOT", "https://hidot.hawaii.gov/highways/library/motor-vehicle-safety-office/"],
  ["ID", "爱达荷州", "Idaho", "Idaho DMV", "https://itd.idaho.gov/itddmv/"],
  ["IL", "伊利诺伊州", "Illinois", "Illinois Secretary of State", "https://www.ilsos.gov/departments/drivers/drivers_license/home.html"],
  ["IN", "印第安纳州", "Indiana", "Indiana BMV", "https://www.in.gov/bmv/"],
  ["IA", "艾奥瓦州", "Iowa", "Iowa DOT", "https://iowadot.gov/mvd"],
  ["KS", "堪萨斯州", "Kansas", "Kansas DOR", "https://www.ksrevenue.gov/dovindex.html"],
  ["KY", "肯塔基州", "Kentucky", "Kentucky Drive", "https://drive.ky.gov/"],
  ["LA", "路易斯安那州", "Louisiana", "Louisiana OMV", "https://expresslane.org/"],
  ["ME", "缅因州", "Maine", "Maine BMV", "https://www.maine.gov/sos/bmv/"],
  ["MD", "马里兰州", "Maryland", "Maryland MVA", "https://mva.maryland.gov/"],
  ["MA", "马萨诸塞州", "Massachusetts", "Massachusetts RMV", "https://www.mass.gov/orgs/massachusetts-registry-of-motor-vehicles"],
  ["MI", "密歇根州", "Michigan", "Michigan Secretary of State", "https://www.michigan.gov/sos"],
  ["MN", "明尼苏达州", "Minnesota", "Minnesota DVS", "https://dps.mn.gov/divisions/dvs"],
  ["MS", "密西西比州", "Mississippi", "Mississippi DPS", "https://www.dps.ms.gov/driver-services"],
  ["MO", "密苏里州", "Missouri", "Missouri DOR", "https://dor.mo.gov/driver-license/"],
  ["MT", "蒙大拿州", "Montana", "Montana MVD", "https://mvdmt.gov/"],
  ["NE", "内布拉斯加州", "Nebraska", "Nebraska DMV", "https://dmv.nebraska.gov/"],
  ["NV", "内华达州", "Nevada", "Nevada DMV", "https://dmv.nv.gov/"],
  ["NH", "新罕布什尔州", "New Hampshire", "New Hampshire DMV", "https://www.dmv.nh.gov/"],
  ["NJ", "新泽西州", "New Jersey", "New Jersey MVC", "https://www.nj.gov/mvc/"],
  ["NM", "新墨西哥州", "New Mexico", "New Mexico MVD", "https://www.mvd.newmexico.gov/"],
  ["NY", "纽约州", "New York", "New York DMV", "https://dmv.ny.gov/new-york-state-drivers-manual-practice-tests"],
  ["NC", "北卡罗来纳州", "North Carolina", "North Carolina DMV", "https://www.ncdot.gov/dmv/"],
  ["ND", "北达科他州", "North Dakota", "North Dakota DOT", "https://www.dot.nd.gov/"],
  ["OH", "俄亥俄州", "Ohio", "Ohio BMV", "https://www.bmv.ohio.gov/"],
  ["OK", "俄克拉何马州", "Oklahoma", "Service Oklahoma", "https://oklahoma.gov/service/all-services/auto-vehicle.html"],
  ["OR", "俄勒冈州", "Oregon", "Oregon DMV", "https://www.oregon.gov/odot/dmv/"],
  ["PA", "宾夕法尼亚州", "Pennsylvania", "PennDOT", "https://www.pa.gov/agencies/dmv"],
  ["RI", "罗得岛州", "Rhode Island", "Rhode Island DMV", "https://dmv.ri.gov/"],
  ["SC", "南卡罗来纳州", "South Carolina", "South Carolina DMV", "https://www.scdmvonline.com/"],
  ["SD", "南达科他州", "South Dakota", "South Dakota DPS", "https://dps.sd.gov/driver-licensing"],
  ["TN", "田纳西州", "Tennessee", "Tennessee Driver Services", "https://www.tn.gov/safety/driver-services.html"],
  ["TX", "得克萨斯州", "Texas", "Texas DPS", "https://www.dps.texas.gov/section/driver-license"],
  ["UT", "犹他州", "Utah", "Utah DLD", "https://dld.utah.gov/"],
  ["VT", "佛蒙特州", "Vermont", "Vermont DMV", "https://dmv.vermont.gov/"],
  ["VA", "弗吉尼亚州", "Virginia", "Virginia DMV", "https://www.dmv.virginia.gov/"],
  ["WA", "华盛顿州", "Washington", "Washington DOL", "https://dol.wa.gov/"],
  ["WV", "西弗吉尼亚州", "West Virginia", "West Virginia DMV", "https://transportation.wv.gov/DMV/"],
  ["WI", "威斯康星州", "Wisconsin", "Wisconsin DMV", "https://wisconsindot.gov/Pages/dmv/"],
  ["WY", "怀俄明州", "Wyoming", "Wyoming DOT", "https://dot.state.wy.us/home/driver_license_records.html"],
  ["DC", "华盛顿特区", "District of Columbia", "DC DMV", "https://dmv.dc.gov/"],
];

const curatedDetails: Partial<Record<StateCode, Pick<StateProfile, "officialPassRule" | "note">>> = {
  CA: { officialPassRule: "官方知识考试及格线：80%", note: "州专属题库：路权、路缘颜色与安全驾驶规则" },
  NY: { officialPassRule: "官方笔试：20 题中至少答对 14 题，并答对至少 2 道标志题", note: "州专属题库：路权、校车与城市道路规则" },
  FL: { officialPassRule: "官方 Class E 知识考试及格线：80%", note: "州专属题库：恶劣天气、Move Over 法与道路安全" },
};

const accents = ["#e55039", "#3867d6", "#0e9f6e", "#8b5cf6", "#b7791f"];

export const stateProfiles: StateProfile[] = stateDirectory.map(([code, name, englishName, agency, handbookUrl], index) => ({
  code,
  name,
  englishName,
  agency,
  handbookUrl,
  officialPassRule: curatedDetails[code]?.officialPassRule ?? `考试标准请以 ${agency} 最新手册为准`,
  practiceLength: 10,
  accent: accents[index % accents.length],
  note: curatedDetails[code]?.note ?? "通用核心题库：道路标志与安全驾驶；附本州官方规则入口",
  curated: Boolean(curatedDetails[code]),
}));

const commonByState: Partial<Record<StateCode, Question[]>> = {
  CA: [
    {
      id: "ca-01", state: "CA", category: "停车规则",
      prompt: "在加州，涂成红色的路缘通常表示什么？",
      options: ["仅可短暂停车接人", "禁止停车、停留或泊车", "仅限残障人士停车", "仅限装卸货物"],
      answer: 1,
      explanation: "红色路缘表示禁止停车、停留或泊车。公交车可在特别标示的红色区域停靠。",
    },
    {
      id: "ca-02", state: "CA", category: "安全驾驶",
      prompt: "在加州，驾驶时遇到正在闪烁红灯的交通信号，应当怎么做？",
      options: ["减速后直接通过", "完全停车，确认安全后再行驶", "只有行人出现时才停车", "视为绿灯"],
      answer: 1,
      explanation: "闪烁红灯与 STOP 标志相同：先完全停车，再在安全时通行。",
    },
    {
      id: "ca-03", state: "CA", category: "州法规",
      prompt: "一名未满 18 岁、持加州 provisional permit 的驾驶者练车时，通常必须由谁陪同？",
      options: ["任何年满 18 岁的人", "持有效驾照且符合年龄要求的成年人或合格教练", "同龄朋友", "无需陪同"],
      answer: 1,
      explanation: "未成年人练车必须由符合加州规定的持照成年人或合格驾驶教练陪同。",
    },
    {
      id: "ca-04", state: "CA", category: "道路标志",
      prompt: "黄色菱形标志通常用来表示什么？",
      options: ["前方警告或道路状况变化", "法定停车要求", "服务设施", "路线编号"],
      answer: 0,
      explanation: "黄色菱形属于警告标志，提示前方弯道、并线、路口等状况。",
    },
    {
      id: "ca-05", state: "CA", category: "安全驾驶",
      prompt: "车辆开始在湿滑路面打滑时，最佳的第一反应是什么？",
      options: ["猛踩刹车", "朝希望车辆前进的方向平稳转向并松开油门", "迅速反向打满方向盘", "立刻加速"],
      answer: 1,
      explanation: "松开油门，避免猛刹，并平稳地朝希望车辆行驶的方向转向。",
    },
    {
      id: "ca-06", state: "CA", category: "州法规",
      prompt: "在加州，准备转弯时通常应至少提前多远打转向灯？",
      options: ["25 英尺", "50 英尺", "100 英尺", "200 英尺"],
      answer: 2,
      explanation: "通常应在转弯前最后 100 英尺持续发出信号。",
    },
    {
      id: "ca-07", state: "CA", category: "停车规则",
      prompt: "在加州坡道向下停车且有路缘时，前轮应朝向哪里？",
      options: ["远离路缘", "朝向路缘", "保持正直", "方向不限"],
      answer: 1,
      explanation: "下坡有路缘时将前轮转向路缘；车辆滑动时会被路缘挡住。",
    },
    {
      id: "ca-08", state: "CA", category: "安全驾驶",
      prompt: "在十字路口看到行人使用白手杖或导盲犬时，你应当怎么做？",
      options: ["按喇叭提醒后通过", "只有绿灯时才让行", "停车并给予其完整路权", "从行人身后快速绕行"],
      answer: 2,
      explanation: "对白手杖或导盲犬辅助的盲人行人必须特别谨慎并给予路权。",
    },
    {
      id: "ca-09", state: "CA", category: "道路标志",
      prompt: "五边形的黄色或黄绿色标志通常提醒驾驶者什么？",
      options: ["铁路道口", "学校区域或学生过街", "禁止超车", "医院区域"],
      answer: 1,
      explanation: "五边形警告标志用于学校区域和学生过街提示。",
    },
    {
      id: "ca-10", state: "CA", category: "安全驾驶",
      prompt: "与前车保持至少“三秒距离”主要是为了什么？",
      options: ["节省燃油", "给自己留出发现危险并制动的时间", "阻止其他车辆并线", "让后车更容易超车"],
      answer: 1,
      explanation: "时间间隔能为观察、反应和制动留出余地；恶劣条件下应增加距离。",
    },
  ],
  NY: [
    {
      id: "ny-01", state: "NY", category: "道路标志",
      prompt: "纽约州笔试中，红色八边形标志表示什么？",
      options: ["让行", "停止", "禁止进入", "铁路道口"],
      answer: 1,
      explanation: "八边形红色 STOP 标志要求在停车线、人行横道或路口前完全停车。",
    },
    {
      id: "ny-02", state: "NY", category: "州法规",
      prompt: "在纽约州，准备转弯或变道时通常应至少提前多远打信号？",
      options: ["50 英尺", "100 英尺", "150 英尺", "200 英尺"],
      answer: 1,
      explanation: "纽约州驾驶手册要求通常至少在转弯前 100 英尺发出信号。",
    },
    {
      id: "ny-03", state: "NY", category: "安全驾驶",
      prompt: "两辆车同时到达没有标志控制的交叉路口，谁通常有优先权？",
      options: ["左侧车辆", "右侧车辆", "车速更快者", "车身更大者"],
      answer: 1,
      explanation: "同时到达无控制交叉路口时，左侧驾驶者通常应让右侧车辆先行。",
    },
    {
      id: "ny-04", state: "NY", category: "州法规",
      prompt: "校车红灯闪烁、停车牌伸出时，通常意味着什么？",
      options: ["只有校车后方车辆需停车", "所有接近车辆都应按规定停车", "可低速通过", "只有学生在路上时才停车"],
      answer: 1,
      explanation: "纽约州对停靠校车有严格要求；从多数方向接近的车辆都必须停车，具体以道路分隔与现场情况为准。",
    },
    {
      id: "ny-05", state: "NY", category: "道路标志",
      prompt: "倒三角形红白标志表示什么？",
      options: ["停止", "让行", "禁止超车", "单行道"],
      answer: 1,
      explanation: "倒三角形 YIELD 标志要求减速，必要时停车，并让有路权者先行。",
    },
    {
      id: "ny-06", state: "NY", category: "安全驾驶",
      prompt: "下大雨时开启定速巡航为什么不安全？",
      options: ["会让雨刷停止", "可能降低你在打滑时对车辆的控制", "会使车灯变暗", "会自动提高限速"],
      answer: 1,
      explanation: "湿滑路面应保持主动控制速度，避免在车辆失去抓地力时继续自动加速。",
    },
    {
      id: "ny-07", state: "NY", category: "停车规则",
      prompt: "车辆停在消防栓附近时，最稳妥的做法是什么？",
      options: ["打开双闪即可停车", "保持法规要求的距离，不阻挡消防栓", "只要留人在车内即可", "夜间可以停"],
      answer: 1,
      explanation: "消防栓周围必须保持法定净距；不要依赖双闪或车内留人作为例外。",
    },
    {
      id: "ny-08", state: "NY", category: "安全驾驶",
      prompt: "如果紧急车辆在你后方鸣笛并闪灯，你通常应怎么做？",
      options: ["保持速度", "安全驶向道路右侧并停车", "在当前车道急停", "加速驶离"],
      answer: 1,
      explanation: "应安全靠右停车，为紧急车辆让出通道，待其通过后再继续。",
    },
    {
      id: "ny-09", state: "NY", category: "道路标志",
      prompt: "圆形黄色、带黑色 X 和字母 RR 的标志提示什么？",
      options: ["环岛", "铁路道口", "施工区域", "禁止掉头"],
      answer: 1,
      explanation: "圆形铁路预告标志提示前方有铁路道口，应减速观察。",
    },
    {
      id: "ny-10", state: "NY", category: "安全驾驶",
      prompt: "被其他车辆紧跟时，哪种做法更安全？",
      options: ["突然刹车警告对方", "增加与前车距离，并在安全时让其通过", "加速超过限速", "持续按喇叭"],
      answer: 1,
      explanation: "增加前方缓冲空间可以减少急刹需求；条件允许时安全让行。",
    },
  ],
  FL: [
    {
      id: "fl-01", state: "FL", category: "州法规",
      prompt: "佛州 Move Over 法要求接近停在路边、亮警示灯的执法或救援车辆时怎么做？",
      options: ["保持车道与速度", "条件允许时移开相邻车道，否则按规定明显降速", "停车等待", "鸣笛后通过"],
      answer: 1,
      explanation: "应在安全条件下变道远离；无法变道时则需按规定降低速度并谨慎通过。",
    },
    {
      id: "fl-02", state: "FL", category: "安全驾驶",
      prompt: "佛州暴雨中车辆发生水滑（hydroplaning）时，应该怎么做？",
      options: ["猛踩刹车", "松开油门并保持平稳转向", "迅速加速", "立即急转弯"],
      answer: 1,
      explanation: "逐渐松开油门，避免猛刹或急转，等轮胎恢复抓地力。",
    },
    {
      id: "fl-03", state: "FL", category: "道路标志",
      prompt: "橙色菱形标志通常代表什么？",
      options: ["学校区域", "施工或道路作业警告", "医院", "景点方向"],
      answer: 1,
      explanation: "橙色用于施工和维护区域的临时警告与指示。",
    },
    {
      id: "fl-04", state: "FL", category: "州法规",
      prompt: "佛州道路被积水覆盖且无法判断水深时，最安全的选择是什么？",
      options: ["快速冲过去", "跟随大车通过", "掉头寻找其他路线", "沿路肩通过"],
      answer: 2,
      explanation: "不要驶入看不清深度或路况的积水。掉头避让是更安全的选择。",
    },
    {
      id: "fl-05", state: "FL", category: "道路标志",
      prompt: "黄色三角旗形（pennant）标志通常表示什么？",
      options: ["前方禁止超车区域", "前方学校", "右侧道路封闭", "最低速度"],
      answer: 0,
      explanation: "三角旗形警告标志标示禁止超车区域的起点。",
    },
    {
      id: "fl-06", state: "FL", category: "安全驾驶",
      prompt: "看到前方道路上有行人时，即使没有标线清晰的人行横道，也应怎么做？",
      options: ["按喇叭并保持速度", "做好停车准备并依法让行", "从右侧绕过", "只有儿童才需让行"],
      answer: 1,
      explanation: "驾驶者有责任避免碰撞行人；应减速、保持警觉并依法让行。",
    },
    {
      id: "fl-07", state: "FL", category: "州法规",
      prompt: "夜间遇到迎面车辆时，应在适当距离切换近光灯，主要原因是什么？",
      options: ["节省电池", "避免强光使对方驾驶者眩目", "提高自己车速", "提醒对方让路"],
      answer: 1,
      explanation: "远光灯会影响对向驾驶者视线；应按手册规定及时使用近光灯。",
    },
    {
      id: "fl-08", state: "FL", category: "停车规则",
      prompt: "在下坡且有路缘的道路上停车，车轮应怎样转？",
      options: ["朝向路缘", "远离路缘", "始终保持正直", "朝向道路中心"],
      answer: 0,
      explanation: "下坡有路缘时将前轮朝向路缘，有助于阻止无人车辆滑入车流。",
    },
    {
      id: "fl-09", state: "FL", category: "道路标志",
      prompt: "白色矩形交通标志通常传达哪类信息？",
      options: ["法规或管制要求", "风景路线", "临时施工", "休息区服务"],
      answer: 0,
      explanation: "白色矩形标志常用于速度限制、车道使用等法规信息。",
    },
    {
      id: "fl-10", state: "FL", category: "安全驾驶",
      prompt: "轮胎突然爆裂时，正确做法是哪一项？",
      options: ["立刻猛踩刹车", "紧握方向盘、逐渐松油门并缓慢驶离车道", "快速转向路肩", "立刻挂入停车挡"],
      answer: 1,
      explanation: "保持方向控制，逐渐减速，确认安全后驶离行车道；避免急刹和猛转。",
    },
  ],
};

export const importantQuestionIds: Partial<Record<StateCode, string[]>> = {
  CA: ["ca-02", "ca-03", "ca-05", "ca-06", "ca-08", "ca-10"],
  NY: ["ny-01", "ny-03", "ny-04", "ny-06", "ny-08", "ny-10"],
  FL: ["fl-01", "fl-02", "fl-04", "fl-06", "fl-07", "fl-10"],
};

function genericQuestions(state: StateCode): Question[] {
  const prefix = state.toLowerCase();
  return [
    { id: `${prefix}-g01`, state, category: "道路标志", prompt: "红色八边形交通标志表示什么？", options: ["让行", "停止", "禁止进入", "铁路道口"], answer: 1, explanation: "红色八边形是 STOP 标志。应在停车线、人行横道或路口前完全停车。" },
    { id: `${prefix}-g02`, state, category: "安全驾驶", prompt: "遇到闪烁红灯时，正确做法是什么？", options: ["减速直接通过", "完全停车，确认安全后通过", "只有行人出现时停车", "视为绿灯"], answer: 1, explanation: "闪烁红灯应像 STOP 标志一样处理：先完全停车，再在安全时通行。" },
    { id: `${prefix}-g03`, state, category: "道路标志", prompt: "黄色菱形标志通常传达什么信息？", options: ["道路警告或前方状况变化", "停车法规", "服务设施", "路线编号"], answer: 0, explanation: "黄色菱形属于警告标志，常提示弯道、并线、路口或其他前方危险。" },
    { id: `${prefix}-g04`, state, category: "安全驾驶", prompt: "湿滑路面发生水滑时，应当怎么做？", options: ["猛踩刹车", "逐渐松开油门并保持平稳转向", "立即加速", "迅速左右转向"], answer: 1, explanation: "避免急刹和猛转，逐渐松开油门，等待轮胎恢复抓地力。" },
    { id: `${prefix}-g05`, state, category: "安全驾驶", prompt: "保持至少三秒跟车距离的主要目的是什么？", options: ["节省燃油", "留出观察、反应和制动时间", "阻止车辆并线", "让后车更易超车"], answer: 1, explanation: "安全间隔能增加反应和制动空间；雨雪、黑暗或跟随大型车辆时应进一步增加。" },
    { id: `${prefix}-g06`, state, category: "安全驾驶", prompt: "紧急车辆从后方鸣笛并闪灯接近时，通常应怎么做？", options: ["保持原速度", "安全驶向右侧并停车让行", "在当前车道急停", "加速驶离"], answer: 1, explanation: "应安全靠右并停车，为紧急车辆让出通道；还要服从现场指挥。" },
    { id: `${prefix}-g07`, state, category: "道路标志", prompt: "圆形黄色、带黑色 X 与 RR 的标志提示什么？", options: ["环岛", "铁路道口", "施工区", "禁止掉头"], answer: 1, explanation: "这是铁路道口预告标志，应减速、观察并准备停车。" },
    { id: `${prefix}-g08`, state, category: "道路标志", prompt: "橙色菱形标志通常表示什么？", options: ["学校区域", "施工或道路作业警告", "医院", "景点方向"], answer: 1, explanation: "橙色标志用于施工和道路维护区域的临时警告与指示。" },
    { id: `${prefix}-g09`, state, category: "停车规则", prompt: "下坡且有路缘时停车，车轮通常应朝哪里？", options: ["朝向路缘", "远离路缘", "保持正直", "朝道路中心"], answer: 0, explanation: "将车轮转向路缘有助于在车辆滑动时阻止它进入车流。" },
    { id: `${prefix}-g10`, state, category: "安全驾驶", prompt: "轮胎突然爆裂时，哪种处理方式更安全？", options: ["猛踩刹车", "紧握方向盘、逐渐松油门并缓慢驶离车道", "快速转向路肩", "立即挂入停车挡"], answer: 1, explanation: "保持方向控制并逐渐减速；确认安全后再平稳驶离行车道。" },
  ];
}

function genericAdvancedQuestions(state: StateCode): Question[] {
  const prefix = state.toLowerCase();
  return [
    { id: `${prefix}-g11`, state, category: "道路标志", prompt: "倒三角形的红白交通标志表示什么？", options: ["停止", "让行", "禁止超车", "单行道"], answer: 1, explanation: "YIELD 让行标志要求减速，并在必要时停车，让有优先权的车辆和行人先行。" },
    { id: `${prefix}-g12`, state, category: "道路标线", prompt: "道路中央的双实黄线通常表示什么？", options: ["双向车辆通常都不得越线超车", "可以随时超车", "仅夜间禁止超车", "道路即将变为单行道"], answer: 0, explanation: "双实黄线分隔相反方向车流，通常禁止两侧车辆越线超车；转弯等例外应遵守当地规则。" },
    { id: `${prefix}-g13`, state, category: "安全驾驶", prompt: "变换车道前，除了看后视镜和打转向灯，还应做什么？", options: ["加速后立即并线", "回头检查盲区", "鸣笛三次", "关闭转向灯"], answer: 1, explanation: "后视镜无法覆盖所有盲区。并线前应回头快速确认目标车道安全。" },
    { id: `${prefix}-g14`, state, category: "恶劣天气", prompt: "在浓雾中驾驶时，通常应使用哪种灯光？", options: ["远光灯", "近光灯", "仅停车灯", "关闭所有灯光"], answer: 1, explanation: "远光灯会被雾气反射并降低能见度；应减速并使用近光灯。" },
    { id: `${prefix}-g15`, state, category: "路权规则", prompt: "绿灯亮起但路口前方堵塞时，应怎么做？", options: ["驶入路口等待", "留在停止线后，等能完全通过时再进入", "鸣笛要求前车移动", "从路肩绕行"], answer: 1, explanation: "不要阻塞路口。即使是绿灯，也应等前方有足够空间后再进入。" },
    { id: `${prefix}-g16`, state, category: "安全驾驶", prompt: "安全带最重要的作用是什么？", options: ["帮助车辆更省油", "在碰撞中降低被抛出和严重受伤的风险", "让车辆更容易转弯", "代替安全气囊"], answer: 1, explanation: "安全带能在碰撞时约束乘员并降低严重伤害风险；它应与安全气囊配合使用。" },
    { id: `${prefix}-g17`, state, category: "共享道路", prompt: "超越骑自行车的人时，最安全的做法是什么？", options: ["贴近快速通过", "留出安全侧向距离，确认无来车后再平稳超越", "持续鸣笛", "迫使自行车驶上人行道"], answer: 1, explanation: "骑行者容易受风和路面影响。应减速、留出足够空间，并仅在安全合法时超越。" },
    { id: `${prefix}-g18`, state, category: "夜间驾驶", prompt: "夜间跟随另一辆车时，为什么应适时切换近光灯？", options: ["避免通过后视镜使前车驾驶者眩目", "让自己更容易超速", "提醒前车加速", "减少轮胎磨损"], answer: 0, explanation: "远光灯会通过前车后视镜造成眩光，影响驾驶者观察道路。" },
    { id: `${prefix}-g19`, state, category: "停车规则", prompt: "上坡且有路缘时停车，前轮通常应怎样转？", options: ["远离路缘", "朝向路缘", "保持笔直", "朝任意方向都可以"], answer: 0, explanation: "上坡有路缘时通常将前轮转离路缘，使车辆后滑时轮胎能靠住路缘。" },
    { id: `${prefix}-g20`, state, category: "行人安全", prompt: "转弯时遇到行人正在穿过你要进入的道路，应怎么做？", options: ["加速从行人前方通过", "停车或减速让行，等行人安全通过", "按喇叭要求行人停下", "从行人身后贴近通过"], answer: 1, explanation: "转弯车辆应主动观察人行横道和行人，并依法让行，避免抢行。" },
  ];
}

export function questionsForState(state: StateCode) {
  const stateSpecific = commonByState[state];
  return stateSpecific
    ? [...stateSpecific, ...genericQuestions(state)].slice(0, 20)
    : [...genericQuestions(state), ...genericAdvancedQuestions(state)];
}

export function importantQuestionsForState(state: StateCode) {
  const bank = questionsForState(state);
  const ids = importantQuestionIds[state];
  return ids ? bank.filter((question) => ids.includes(question.id)) : bank.slice(0, 6);
}

export const questions = stateProfiles.flatMap(({ code }) => questionsForState(code));

type EnglishQuestion = { prompt: string; options: string[]; explanation: string };

const englishById: Record<string, EnglishQuestion> = {
  "ca-01": { prompt: "In California, what does a red-painted curb generally mean?", options: ["Stop briefly to pick up passengers", "No stopping, standing, or parking", "Parking for people with disabilities only", "Loading and unloading only"], explanation: "A red curb means no stopping, standing, or parking. Buses may stop in areas specifically marked for buses." },
  "ca-02": { prompt: "What should you do at a flashing red traffic signal in California?", options: ["Slow down and continue", "Come to a complete stop, then proceed when safe", "Stop only if pedestrians are present", "Treat it like a green light"], explanation: "Treat a flashing red signal like a STOP sign: stop completely, then proceed when it is safe." },
  "ca-03": { prompt: "Who must normally accompany a driver under 18 who is practicing with a California provisional permit?", options: ["Anyone age 18 or older", "A properly licensed adult who meets the age requirement, or a qualified instructor", "A friend of the same age", "No one is required"], explanation: "A minor must practice with a licensed adult who meets California requirements or with a qualified driving instructor." },
  "ca-04": { prompt: "What does a yellow diamond-shaped sign usually indicate?", options: ["A warning or changing road condition ahead", "A mandatory stop", "Motorist services", "A route number"], explanation: "Yellow diamond-shaped signs warn about curves, merging traffic, intersections, and other conditions ahead." },
  "ca-05": { prompt: "What is the best first response if your vehicle begins to skid on a slippery road?", options: ["Brake hard", "Ease off the accelerator and steer smoothly where you want to go", "Turn the wheel sharply in the opposite direction", "Accelerate immediately"], explanation: "Ease off the accelerator, avoid hard braking, and steer smoothly in the direction you want the vehicle to travel." },
  "ca-06": { prompt: "In California, how far before a turn should you normally begin signaling?", options: ["25 feet", "50 feet", "100 feet", "200 feet"], explanation: "You should normally signal continuously during the last 100 feet before turning." },
  "ca-07": { prompt: "When parking downhill next to a curb in California, which way should you turn your front wheels?", options: ["Away from the curb", "Toward the curb", "Straight ahead", "Either direction"], explanation: "Turn the wheels toward the curb so the curb can help stop the vehicle if it rolls." },
  "ca-08": { prompt: "What should you do when a pedestrian using a white cane or guide dog is crossing?", options: ["Honk and continue", "Yield only when your light is green", "Stop and give the pedestrian the full right-of-way", "Pass quickly behind the pedestrian"], explanation: "Use special caution and always give the right-of-way to a blind pedestrian using a white cane or guide dog." },
  "ca-09": { prompt: "What does a five-sided yellow or yellow-green sign usually warn about?", options: ["A railroad crossing", "A school zone or school crossing", "A no-passing zone", "A hospital"], explanation: "Five-sided warning signs identify school zones and school crossings." },
  "ca-10": { prompt: "What is the main purpose of keeping at least a three-second following distance?", options: ["To save fuel", "To leave time to see a hazard, react, and brake", "To prevent other vehicles from merging", "To make it easier for vehicles behind you to pass"], explanation: "A time gap leaves room to observe, react, and brake. Increase it in poor conditions." },
  "ny-01": { prompt: "On the New York knowledge test, what does a red octagonal sign mean?", options: ["Yield", "Stop", "Do not enter", "Railroad crossing"], explanation: "A red octagonal STOP sign requires a complete stop before the stop line, crosswalk, or intersection." },
  "ny-02": { prompt: "In New York, how far before a turn or lane change should you normally signal?", options: ["50 feet", "100 feet", "150 feet", "200 feet"], explanation: "The New York Driver's Manual generally requires a signal at least 100 feet before a turn." },
  "ny-03": { prompt: "Two vehicles arrive at an uncontrolled intersection at the same time. Which vehicle normally has the right-of-way?", options: ["The vehicle on the left", "The vehicle on the right", "The faster vehicle", "The larger vehicle"], explanation: "When vehicles arrive at the same time, the driver on the left normally yields to the vehicle on the right." },
  "ny-04": { prompt: "What does it generally mean when a stopped school bus is flashing red lights and has its stop arm extended?", options: ["Only traffic behind the bus must stop", "Approaching traffic must stop as required by law", "You may pass slowly", "Stop only if children are visible"], explanation: "New York has strict school-bus stopping rules. Drivers approaching from most directions must stop, subject to the road layout and current law." },
  "ny-05": { prompt: "What does an upside-down red-and-white triangular sign mean?", options: ["Stop", "Yield", "No passing", "One way"], explanation: "A YIELD sign means slow down, stop if necessary, and give the right-of-way to traffic and pedestrians." },
  "ny-06": { prompt: "Why is using cruise control unsafe during heavy rain?", options: ["It turns off the windshield wipers", "It can reduce your control if the tires lose traction", "It dims the headlights", "It automatically raises the speed limit"], explanation: "On a slippery road, control your speed directly and avoid automatic acceleration when traction is lost." },
  "ny-07": { prompt: "What is the safest rule when parking near a fire hydrant?", options: ["Use hazard lights and park", "Keep the legally required distance and never block it", "Parking is allowed if someone stays in the car", "Parking is allowed at night"], explanation: "Keep the required legal clearance around a fire hydrant. Hazard lights or an occupied vehicle are not substitutes." },
  "ny-08": { prompt: "What should you normally do when an emergency vehicle approaches from behind with lights and siren?", options: ["Maintain your speed", "Move safely to the right and stop", "Stop immediately in your lane", "Accelerate away"], explanation: "Move safely to the right and stop so the emergency vehicle can pass, then continue when safe." },
  "ny-09": { prompt: "What does a round yellow sign with a black X and the letters RR warn about?", options: ["Roundabout", "Railroad crossing", "Work zone", "No U-turn"], explanation: "The round advance-warning sign means a railroad crossing is ahead. Slow down and look carefully." },
  "ny-10": { prompt: "What is the safer response when another vehicle is following you too closely?", options: ["Brake suddenly to warn the driver", "Increase space ahead and let the vehicle pass when safe", "Drive above the speed limit", "Keep sounding your horn"], explanation: "More space ahead reduces the need for sudden braking. Let the tailgater pass when it is safe." },
  "fl-01": { prompt: "Under Florida's Move Over law, what should you do when approaching a roadside enforcement or emergency vehicle displaying warning lights?", options: ["Maintain your lane and speed", "Move over when safe, or slow down substantially as required", "Stop and wait", "Honk before passing"], explanation: "Move over when it is safe. If you cannot, reduce speed as required and pass with caution." },
  "fl-02": { prompt: "What should you do if your vehicle begins to hydroplane during a Florida rainstorm?", options: ["Brake hard", "Ease off the accelerator and steer smoothly", "Accelerate quickly", "Make a sharp turn"], explanation: "Ease off the accelerator and avoid hard braking or sharp steering until the tires regain traction." },
  "fl-03": { prompt: "What does an orange diamond-shaped sign usually indicate?", options: ["School zone", "Construction or road-work warning", "Hospital", "Scenic route"], explanation: "Orange signs provide temporary warnings and directions in construction and maintenance areas." },
  "fl-04": { prompt: "What is the safest choice when floodwater covers a Florida road and you cannot judge its depth?", options: ["Drive through quickly", "Follow a large truck through", "Turn around and use another route", "Drive along the shoulder"], explanation: "Never drive into water when you cannot see the depth or road condition. Turn around and find another route." },
  "fl-05": { prompt: "What does a yellow pennant-shaped sign usually mean?", options: ["No-passing zone begins", "School ahead", "Right lane closed", "Minimum speed"], explanation: "A pennant-shaped warning sign marks the beginning of a no-passing zone." },
  "fl-06": { prompt: "What should you do when you see a pedestrian ahead, even if the crosswalk markings are not clear?", options: ["Honk and maintain speed", "Prepare to stop and yield as required", "Pass on the right", "Yield only to children"], explanation: "Drivers must use care to avoid a collision with a pedestrian. Slow down, stay alert, and yield as required." },
  "fl-07": { prompt: "Why should you switch to low beams at the proper distance from an oncoming vehicle at night?", options: ["To save the battery", "To avoid blinding the other driver", "To increase your speed", "To signal the driver to move over"], explanation: "High beams can impair an oncoming driver's vision. Dim them at the distance required by the handbook." },
  "fl-08": { prompt: "When parking downhill next to a curb, which way should the wheels be turned?", options: ["Toward the curb", "Away from the curb", "Straight ahead", "Toward the center of the road"], explanation: "Turn the front wheels toward the curb so it can help prevent an unattended vehicle from rolling into traffic." },
  "fl-09": { prompt: "What kind of information is usually shown on a white rectangular traffic sign?", options: ["Regulatory requirements", "Scenic routes", "Temporary construction", "Motorist services"], explanation: "White rectangular signs commonly display regulations such as speed limits and lane-use rules." },
  "fl-10": { prompt: "What should you do if a tire suddenly blows out?", options: ["Brake hard immediately", "Grip the wheel, ease off the accelerator, and leave the road gradually", "Turn sharply onto the shoulder", "Shift immediately into Park"], explanation: "Keep steering control, slow gradually, and move out of the travel lane when it is safe. Avoid hard braking and sharp steering." },
};

const genericEnglish: Record<string, EnglishQuestion> = {
  g01: { prompt: "What does a red octagonal traffic sign mean?", options: ["Yield", "Stop", "Do not enter", "Railroad crossing"], explanation: "A red octagonal sign is a STOP sign. Stop completely before the stop line, crosswalk, or intersection." },
  g02: { prompt: "What should you do at a flashing red traffic signal?", options: ["Slow down and continue", "Stop completely, then proceed when safe", "Stop only if pedestrians are present", "Treat it like a green light"], explanation: "Treat a flashing red signal like a STOP sign: stop completely, then proceed when safe." },
  g03: { prompt: "What does a yellow diamond-shaped sign usually indicate?", options: ["A warning or changing road condition ahead", "A parking regulation", "Motorist services", "A route number"], explanation: "Yellow diamond-shaped signs warn about curves, merging traffic, intersections, and other conditions ahead." },
  g04: { prompt: "What should you do if your vehicle begins to hydroplane?", options: ["Brake hard", "Ease off the accelerator and steer smoothly", "Accelerate immediately", "Steer sharply from side to side"], explanation: "Avoid hard braking and sharp steering. Ease off the accelerator until the tires regain traction." },
  g05: { prompt: "What is the main purpose of keeping at least a three-second following distance?", options: ["To save fuel", "To leave time to observe, react, and brake", "To prevent merging", "To help the vehicle behind pass"], explanation: "A time gap gives you more room to see hazards, react, and stop. Increase it in poor conditions." },
  g06: { prompt: "What should you normally do when an emergency vehicle approaches from behind with lights and siren?", options: ["Maintain speed", "Move safely to the right and stop", "Stop immediately in your lane", "Accelerate away"], explanation: "Move safely to the right and stop to clear a path, and always follow directions at the scene." },
  g07: { prompt: "What does a round yellow sign with a black X and the letters RR warn about?", options: ["Roundabout", "Railroad crossing", "Work zone", "No U-turn"], explanation: "This advance-warning sign means a railroad crossing is ahead. Slow down, look, and be ready to stop." },
  g08: { prompt: "What does an orange diamond-shaped sign usually indicate?", options: ["School zone", "Construction or road-work warning", "Hospital", "Scenic route"], explanation: "Orange signs provide temporary warnings and directions in construction and maintenance areas." },
  g09: { prompt: "When parking downhill next to a curb, which way should you normally turn the wheels?", options: ["Toward the curb", "Away from the curb", "Straight ahead", "Toward the center of the road"], explanation: "Turning the wheels toward the curb helps prevent the vehicle from rolling into traffic." },
  g10: { prompt: "What is the safer response to a sudden tire blowout?", options: ["Brake hard", "Grip the wheel, ease off the accelerator, and leave the road gradually", "Turn sharply onto the shoulder", "Shift immediately into Park"], explanation: "Keep steering control and slow gradually. Move out of the travel lane when it is safe." },
  g11: { prompt: "What does an upside-down red-and-white triangular sign mean?", options: ["Stop", "Yield", "No passing", "One way"], explanation: "A YIELD sign means slow down and stop if necessary so traffic and pedestrians with the right-of-way can proceed." },
  g12: { prompt: "What do double solid yellow center lines normally mean?", options: ["Traffic in both directions normally may not cross to pass", "Passing is always allowed", "Passing is prohibited only at night", "The road becomes one-way ahead"], explanation: "Double solid yellow lines separate opposing traffic and normally prohibit passing across them. Follow local rules for permitted turns and exceptions." },
  g13: { prompt: "Before changing lanes, what should you do in addition to checking mirrors and signaling?", options: ["Accelerate and merge immediately", "Turn your head to check the blind spot", "Honk three times", "Cancel the signal"], explanation: "Mirrors do not show every blind spot. Make a quick shoulder check before moving into the next lane." },
  g14: { prompt: "Which headlights should you normally use when driving in heavy fog?", options: ["High beams", "Low beams", "Parking lights only", "No lights"], explanation: "High beams reflect from fog and can reduce visibility. Slow down and use low beams." },
  g15: { prompt: "The light is green, but traffic is blocking the intersection. What should you do?", options: ["Enter and wait in the intersection", "Stay behind the line until you can clear the intersection", "Honk until traffic moves", "Pass on the shoulder"], explanation: "Do not block an intersection. Enter only when there is enough room to travel completely through it." },
  g16: { prompt: "What is the most important purpose of a seat belt?", options: ["Improve fuel economy", "Reduce the risk of ejection and serious injury in a crash", "Make turns easier", "Replace airbags"], explanation: "Seat belts restrain occupants during a crash and work together with airbags to reduce injury risk." },
  g17: { prompt: "What is the safest way to pass a person riding a bicycle?", options: ["Pass closely and quickly", "Leave safe lateral space and pass smoothly only when clear", "Keep honking", "Force the rider onto the sidewalk"], explanation: "Slow down, allow adequate space, and pass only when it is safe and legal." },
  g18: { prompt: "Why should you dim your high beams when following another vehicle at night?", options: ["To avoid blinding the driver through the mirrors", "To make speeding easier", "To tell the driver to accelerate", "To reduce tire wear"], explanation: "High beams can reflect through the vehicle's mirrors and interfere with the driver's vision." },
  g19: { prompt: "When parking uphill next to a curb, which way should the front wheels normally turn?", options: ["Away from the curb", "Toward the curb", "Straight ahead", "Any direction"], explanation: "With an uphill curb, the wheels are normally turned away so a rolling vehicle can be stopped by the curb." },
  g20: { prompt: "While turning, a pedestrian is crossing the road you want to enter. What should you do?", options: ["Accelerate in front of the pedestrian", "Stop or slow and yield until the pedestrian is safely across", "Honk so the pedestrian stops", "Pass closely behind the pedestrian"], explanation: "Turning drivers must watch for pedestrians and yield as required instead of trying to pass around them." },
};

export function englishForQuestion(question: Question): EnglishQuestion {
  const genericKey = question.id.split("-").at(-1) || "";
  return englishById[question.id] ?? genericEnglish[genericKey] ?? { prompt: question.prompt, options: question.options, explanation: question.explanation };
}

export function profileForState(state: StateCode) {
  return stateProfiles.find((profile) => profile.code === state) ?? stateProfiles[0];
}

export const STORAGE_KEYS = {
  selectedState: "roadready-selected-state-v1",
  mistakes: "roadready-mistakes-v1",
  attempts: "roadready-attempts-v1",
} as const;
