// Chinesische Übersetzung (vereinfacht, zh-Hans) der Rechtstexte.
//
// Das deutsche Original in `legalContent.js` bleibt der verbindliche Text —
// deshalb beginnt jedes Dokument mit dem Abschnitt „以哪个版本为准“
// (Vorrang der deutschen Fassung). Man übersetzt, damit der Nutzer versteht,
// nicht um eine zweite Fassung mit eigener Geltung zu schaffen.
//
// Name, Anschrift und die österreichischen Fundstellen (§ 5 ECG, GISA, GewO,
// § 6 UStG, Bezirkshauptmannschaft Kitzbühel) werden nicht übersetzt: Es sind
// Eigennamen und Gesetzeszitate.
const BETREIBER = `Josef Gallab（个体经营者）
Oberhofenweg 21b
6380 St. Johann in Tirol，奥地利
电子邮件：kontakt@wellbooked.at`;

const VORRANG = {
  heading: '以哪个版本为准',
  body: '这是德语原文的参考译文。如内容有出入或解释有疑义，以德语版本为准。在个人资料中把应用语言设为“Deutsch”，即可查看德语版本。',
};

export default {
  imprint: {
    title: '运营者信息',
    updated: '最后更新：2026年9月17日',
    sections: [
      VORRANG,
      {
        heading: '依据 § 5 ECG 和 § 25 MedienG（奥地利）的信息',
        body: BETREIBER,
      },
      {
        heading: '经营范围',
        body: '运营健身与营养 Web 应用“FullRep”（fullrep.pages.dev）。',
      },
      {
        heading: '营业信息',
        body: '自由营业：“Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik”（自动化数据处理与信息技术服务）\nGISA 编号：39801937\n所属：蒂罗尔州经济商会（Wirtschaftskammer Tirol，基茨比厄尔分会）\n监管机构：Bezirkshauptmannschaft Kitzbühel\n适用法规：Gewerbeordnung (GewO)，可在 ris.bka.gv.at 查阅\n增值税：依据 § 6 Abs. 1 Z 27 UStG 的小规模经营者（无增值税号）',
      },
      {
        heading: '消费者争议解决',
        body: '我们既无意愿也无义务参加消费者调解机构的争议解决程序。原欧盟在线争议解决平台已于 2025年7月20日关闭。',
      },
      {
        heading: '内容责任',
        body: '本应用的内容经过认真编写，但我们不保证其正确、完整和及时。所有训练、营养和知识类内容仅供一般参考，不构成医疗建议。',
      },
    ],
  },

  privacy: {
    title: '隐私政策',
    updated: '最后更新：2026年10月30日',
    sections: [
      VORRANG,
      {
        heading: '1. 数据控制者',
        body: `应用“FullRep”中数据处理的负责人为：\n\n${BETREIBER}`,
      },
      {
        heading: '2. 我们处理的数据',
        body: '账户数据：注册所用的电子邮件地址和密码（已加密）。\n\n个人资料数据：姓名、年龄、性别、身高、体重、训练目标、活动水平、训练经验——即你在引导流程中自行填写的内容。\n\n使用数据：训练（动作、组数、重量）、饮食记录（食物、热量、宏量营养素）、饮水量、补剂、体重变化、训练计划、好友、经验值。\n\n健康数据（GDPR 第9条）：体重和身体围度、饮食与训练数据、月经周期数据和症状日记（如你开启了周期追踪）、来自 Apple Health / Health Connect 的步数和体重（如你开启了连接），以及你在 AI 教练中写下的所有内容——例如血液检查数值。我们只在获得你明确同意后处理这些数据。同意在引导流程中的单独一步给出（我们会在你的个人资料中记录时间），你可以随时撤回，撤回对今后生效——在个人资料中点“撤回健康数据同意”，或删除账户。撤回之前进行的处理仍然合法。由于没有这些数据 FullRep 无法正常发挥作用，撤回后要继续使用账户，需要重新同意。如果你不同意，可以申请删除账户。\n\nApple Health / Health Connect（可选）：如果你在个人资料中开启连接，FullRep 会从 Apple Health（iOS）或 Google Health Connect（Android）读取步数和体重，在应用中显示，并导入你的体重变化。授权通过系统对话框进行，你可以随时在那里撤销，也可以在个人资料中关闭连接。另外，你还可以在个人资料中开启“将训练保存到健康”。开启后，FullRep 会把完成的训练作为一次训练记录（类型、开始、结束）保存到 Apple Health 或 Health Connect——不包括组数、重量、热量和心率。保存的内容由系统管理；关闭该选项后，FullRep 不会删除它们。FullRep 绝不会把这些数据用于广告。\n\n活动卡路里与设备计步（可选，自1.6.2版起）：连接健康后，FullRep 还会读取你今日的活动（消耗）卡路里，并显示在首页和小组件中。另外，你可以在个人资料中开启“用手机计步”：FullRep 将直接从设备的运动传感器读取步数（iOS：运动与健身；Android：计步器，应用每15分钟短暂读取一次计数器）。这些步数数据只保留在你的设备上，不会发送给我们。你可以在系统设置中授予或撤销权限，也可以在个人资料中关闭此功能。\n\n照片：动作和商品照片只保存在你的设备上（IndexedDB），不会发送给我们。用于 AI 分析的餐食照片会发送给 Google（Gemini API）——见第 4 条。\n\n广告数据和购买数据（仅限 iOS 和 Android 应用）：为了展示广告，Google AdMob 会处理设备的广告标识符、IP 地址和设备技术数据。为了 Premium 订阅，我们会把应用内部的用户标识和商店的购买凭证发送给 RevenueCat。Web 应用不展示广告。\n\n错误报告：应用崩溃时，我们会向 Sentry 发送一条技术性错误信息，包括应用版本和设备型号——不包括姓名、电子邮件地址或内容（前提是该版本开启了错误收集）。',
      },
      {
        heading: '3. 目的和法律依据',
        body: '提供应用功能：GDPR 第6条第1款(b)项（履行合同）。\n\n健康数据：仅凭你的明确同意，GDPR 第9条第2款(a)项。\n\n应用内广告：只有在你同意后，我们才展示个性化广告（GDPR 第6条第1款(a)项）。我们会在第一次展示广告前通过 Google 的同意对话框征求你的同意，在 iOS 上还会通过 Apple 的“App 跟踪透明度”对话框询问。如果你拒绝，只会看到非个性化广告；其法律依据是我们为免费版筹措资金的正当利益（GDPR 第6条第1款(f)项）。你可以随时在个人资料中点“更改广告同意”修改选择。Premium 订阅完全没有广告。健康数据和使用数据绝不会用于广告，也绝不会与广告合作方共享。\n\n错误报告与安全：基于对应用稳定、安全运行的正当利益（GDPR 第6条第1款(f)项）。\n\n最低年龄：年满 16 岁才能创建账户；我们会在引导流程中核对出生日期。原因是：在德国等部分欧盟成员国，处理健康数据和接受个性化广告的同意须年满 16 岁才有效（GDPR 第8条）。\n\nWeb 应用不展示广告，也不使用广告 Cookie。我们使用 Cloudflare Web Analytics 统计 Web 版的访问量（见第 4 条）。',
      },
      // TODO(Josef): Gemini-API auf den bezahlten Tarif mit Auftragsverarbeitungs-
      // vertrag (DPA) umstellen — im kostenlosen Tarif darf Google Eingaben zur
      // Produktverbesserung nutzen; für Coach-Nachrichten (auch Blutwerte) nicht
      // tragbar. Erst danach darf hier ein unbedingter Satz zu Art. 28 stehen.
      {
        heading: '4. 接收方与处理者',
        body: 'Supabase, Inc.（美国，数据库与登录系统）：存储账户数据、个人资料数据和使用数据。\n\nCloudflare, Inc.（美国，托管）：分发应用和服务器功能，期间会产生技术上必要的服务器日志（例如 IP 地址）。在 Web 版中，Cloudflare Web Analytics 还会统计页面访问（访问的页面、时间、来源页面、国家、设备类型、浏览器、加载时间）——不使用 Cookie，不在你的设备上存储任何内容，也不保存 IP 地址。法律依据是我们对注重隐私的访问量统计的正当利益（GDPR 第6条第1款(f)项）。应用中不进行访问统计。\n\nGoogle LLC / Google Ireland Ltd.：(1) Gemini API——仅当你使用餐食照片分析时，所拍的照片才会发送给 Google 进行分析。仅当你使用 AI 教练时，你的消息连同当前对话的历史会由 Google（Gemini API）处理，以生成回答。Google 按照其 Gemini API 条款处理这些输入。我们不会发送姓名、电子邮件地址或账户 ID，也不会在我们的服务器上保存照片或消息。(2) AdMob——iOS 和 Android 应用中的广告（见第 2 条和第 3 条）。\n\nAnthropic, PBC（美国，AI 教练）：AI 教练的回答也可能由 Anthropic 的模型（Claude）代替 Gemini 生成。此时由 Anthropic 处理你的消息连同当前对话的历史——同样不包括姓名、电子邮件地址或账户 ID。\n\nRevenueCat, Inc.（美国，Premium 订阅）：为管理订阅并在新设备上恢复订阅，会接收应用内部的用户标识和商店的购买确认。实际付款由 Apple 或 Google 处理，我们看不到任何支付数据。\n\nFunctional Software, Inc.（Sentry，美国，错误报告）：在开启错误收集时，接收不含个人身份信息的技术性错误信息。\n\nOpen Food Facts（食品数据库）：搜索食物或扫描条形码时，搜索词或条形码（不是个人数据）会发送给 Open Food Facts。\n\n如果某个服务提供者提供依据 GDPR 第28条的数据处理协议，我们对该服务的使用即适用该协议。向美国传输数据的依据是欧盟标准合同条款，或在提供者已获认证的情况下依据 EU-US Data Privacy Framework。',
      },
      {
        heading: '5. 设备上的本地存储',
        body: '为了让应用离线也能使用且无需等待，应用也会把数据保存在你的设备上（localStorage/IndexedDB）。在访客模式下，所有数据只保存在你的设备上，不会发送给我们。在 Android 应用中，我们关闭了 Google 的自动备份（Android 备份），因此应用的本地数据不会进入你的 Google 云端硬盘备份。',
      },
      {
        heading: '6. 存储期限',
        body: '只要账户存在，我们就保存你的数据。删除账户后，所有数据会立即从数据库中删除。为防止数据丢失，我们每天备份数据库，备份会在 14 天后自动删除——在此之前，已删除的账户可能仍包含在备份中。这些副本仅用于故障后的恢复。\n\n与 AI 教练的对话记录只保存在你的设备上（最近 60 条消息）。我们的服务器只统计每天的提问次数。',
      },
      {
        heading: '7. 删除账户和数据',
        body: '你可以随时直接在应用中删除账户及所有数据：个人资料 → 删除账户。也可以通过上面的电子邮件地址以任意形式申请删除。',
      },
      {
        heading: '8. 你的权利',
        body: '你有权访问、更正、删除、限制处理、数据可携带和提出异议，并可随时撤回已给出的同意——健康数据同意可在个人资料中点“撤回健康数据同意”撤回，广告同意可点“更改广告同意”撤回。你还可以向奥地利数据保护机构（dsb.gv.at）投诉。',
      },
    ],
  },

  terms: {
    title: '使用条款',
    updated: '最后更新：2026年10月4日',
    sections: [
      VORRANG,
      {
        heading: '1. 适用范围',
        body: `本使用条款适用于 iOS 和 Android 应用“FullRep”及其 Web 版（fullrep.pages.dev）的使用。运营者为：\n\n${BETREIBER}`,
      },
      {
        heading: '2. 服务内容',
        body: 'FullRep 是一款记录训练和饮食的应用，并附带补充性的信息内容。基础功能免费。iOS 和 Android 应用的免费版由广告支持。额外功能——目前主要是 AI 教练——以及无广告使用，可通过 FullRep Premium 获得（见第 3 条）。我们不保证服务始终可用；功能可能会被更改或停止。在已付费的订阅期内，我们不会无正当理由大幅限制 Premium 功能。',
      },
      {
        heading: '3. FullRep Premium（订阅）',
        body: 'FullRep Premium 以按月或按年自动续订的订阅形式提供。购买只能通过 Apple App Store 或 Google Play 进行；付款和账单由相应商店处理，商店的条款同时适用。\n\n当前价格会在购买前的商店对话框中显示。确认购买时，费用会从你的 Apple 或 Google 账户扣除。除非你在当前周期结束前至少 24 小时取消，订阅会按所选周期自动续订。\n\n你可以随时在 Apple 或 Google 账户的订阅设置中管理和取消订阅。删除应用或 FullRep 账户不会终止订阅。取消后，Premium 在已付费周期结束前仍然有效。\n\nPremium 会移除应用内广告，并解锁 AI 教练等 Premium 功能（有每日次数上限）。',
      },
      {
        heading: '4. 免费试用',
        body: '新用户可以免费试用 Premium 7 天，仅限一次。试用在应用内开启，并与 FullRep 账户绑定。试用会自动结束，不会转为付费订阅——无需取消。只有你在商店中明确订阅，才会产生订阅。',
      },
      {
        heading: '5. 撤回与退款',
        body: '购买由 Apple 或 Google 处理。我们收不到任何支付数据，因此无法直接退还购买款项。退款以及行使法定撤回权，按照相应商店的条款和流程办理（Apple：reportaproblem.apple.com，Google Play：Google 账户中的订单记录）。消费者依强制性法律享有的权利不受影响。',
      },
      {
        heading: '6. 账户与义务',
        body: '要长期保存数据，需要一个账户。你同意对登录信息保密，并且不发布侵犯第三方权利的内容。你提供的社区数据（例如通过条形码录入的商品营养成分）会向所有用户开放。年满 16 岁才能创建账户。',
      },
      {
        heading: '7. 健康提示——不构成医疗建议',
        body: '应用中的所有内容——特别是训练计划、营养与饮食方案信息、热量计算以及知识库（包括关于补剂和肽类的信息）——仅供一般参考，不构成医疗、治疗或营养建议，绝不能代替医生的检查、诊断或治疗。开始训练或饮食计划、服用补剂之前，请先咨询医生，尤其是在你有基础疾病、怀孕或正在服药的情况下。AI 餐食照片分析给出的是估算值，不保证准确。更多信息请查看应用内的健康提示（个人资料 → 健康提示）。',
      },
      {
        heading: '8. 责任',
        body: '对于故意和重大过失造成的损害，以及对生命、身体或健康的伤害，我们承担无限责任。除此之外，轻微过失的责任予以排除。使用训练和营养建议的风险由你自行承担。',
      },
      {
        heading: '9. 变更',
        body: '我们可能会修改本使用条款，修改对今后生效。重大变更会在应用内通知。',
      },
      {
        heading: '10. 适用法律',
        body: '适用奥地利法律，但排除冲突法规范。你居住国关于消费者保护的强制性规定不受影响。',
      },
    ],
  },

  health: {
    title: '健康提示',
    updated: '最后更新：2026年9月17日',
    sections: [
      VORRANG,
      {
        heading: 'FullRep 不能代替医生的建议',
        body: '如需医疗建议、诊断或治疗，请务必咨询医生。FullRep 是一款记录训练和饮食的应用——不是医疗器械，不能代替医生的检查、诊断或治疗。',
      },
      {
        heading: '什么时候应该咨询医生',
        body: '在开始训练或饮食计划、开始节食或服用补剂之前——尤其是在你有基础疾病或不适、怀孕或哺乳、或正在服药的情况下。\n\n如果出现胸痛、呼吸困难、头晕或晕厥等症状，请停止训练并咨询医生。',
      },
      {
        heading: '应用内容能提供什么——不能提供什么',
        body: '训练计划、营养与饮食方案信息、热量和宏量营养素计算以及知识库（包括补剂、血液检查和肽类）仅供一般参考。内容是通用的，没有考虑你的个人情况。\n\n关于血液检查的信息只能帮你大致了解数值，不是诊断。只有医生才能评估你的数值。\n\n关于肽类：在许多国家，这些物质需要处方或未获批准。内容中特意不提供任何剂量。',
      },
      {
        heading: '估算值，而非测量值',
        body: '能量消耗计算器（TDEE，Mifflin-St Jeor）和 AI 餐食照片分析给出的是估算值。它们不保证准确，也不能代替测量或专业营养师的建议。',
      },
      {
        heading: 'AI 教练不是医生',
        body: 'AI 教练回答关于训练、营养和补剂的一般性问题。它不做诊断，不推荐治疗，也不给出剂量。回答可能有误。如需医疗建议、诊断或治疗，请咨询医生。',
      },
      {
        heading: '紧急情况',
        body: '遇到医疗紧急情况，请拨打急救电话（中国：急救 120，警察 110；欧盟：112）。不要在紧急情况下用 FullRep 求助，也不要因此推迟就医。',
      },
    ],
  },
};
