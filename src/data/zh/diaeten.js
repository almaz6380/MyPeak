// Chinesische Fassung (vereinfacht, zh-Hans) von `src/data/dietsData.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. `quick` ist hier ein OBJEKT ({ methode, fuer_wen }), nicht
// wie bei den Wissensseiten ein Array — die Schlüssel müssen gleich bleiben.
// Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    fat_loss: '减脂',
    recomp: '体成分重塑',
    timing: '进餐时机',
    advanced: '进阶',
  },

  calorie_deficit: {
    name: '经典热量缺口',
    summary: '最经得起验证的减脂方法：每天比身体消耗的热量少吃约 500 kcal。有科学依据，适合大多数人。可带来每周约 0.5 kg 的可持续减重。',
    quick: {
      methode: '每天 TDEE 减去 500 kcal，高蛋白摄入（2 g/kg），宏量营养素均衡',
      fuer_wen: '想减脂又不想遵守复杂规则的新手到进阶者',
    },
    sections: [
      {
        title: '什么是经典热量缺口？',
        content: '经典热量缺口是减重最根本的原则，基于热力学第一定律在人体代谢中的应用。道理很简单：当你摄入的能量（热量）少于身体消耗的能量时，身体就必须从体内储备中获取缺少的能量——主要是脂肪组织（体脂）。\n\n每日总能量消耗（TDEE）由几个部分组成：基础代谢率（BMR）、食物热效应（TEF）、运动活动产热（EAT）以及非运动活动产热（NEAT）。每天 500 kcal 的缺口一周累计为 3,500 kcal，大致相当于 0.45 kg 体脂所含的能量。\n\n这一原则最早由 Max Wishnofsky 于 1958 年系统描述，他提出了“3,500 kcal 法则”（Wishnofsky, 1958, American Journal of Clinical Nutrition）。虽然这条法则是一种简化——身体会适应性地调整代谢——但热量缺口仍然是唯一经科学验证的减脂机制。\n\n关键在于选择 500 kcal 的适度缺口，而不是激进的缺口。Hall et al.（2011）通过数学模型表明，由于代谢适应，实际减重会低于简单的 3,500 kcal 法则所预测的数值。不过，适度缺口能把肌肉流失降到最低、减轻饥饿感，而且长期来看远比极端节食更容易坚持。几乎所有全球主要的营养学和运动科学机构都把这种方法视为健康、可持续减脂的黄金标准。',
      },
      {
        title: '科学背景',
        content: '能量平衡是热量缺口背后的核心概念。数十年的研究一再证实了这一原则。Strasser et al.（2007, Journal of the American College of Nutrition）的一项荟萃分析考察了 67 项研究，发现无论宏量营养素如何组成，能量限制都会导致体重下降——起决定作用的是缺口本身。\n\n代谢适应是一个重要的科学考量。当身体长期获得较少的热量时，它会降低自身的能量消耗。Rosenbaum & Leibel（2010, International Journal of Obesity）记录到，减重期间基础代谢率的下降比单纯由体重减少所能解释的多出 15–25%。这种常被称为“适应性产热”的效应，是进化而来的防饥饿保护机制。\n\n蛋白质在热量缺口期间起着关键作用。Mettler et al.（2010, Medicine & Science in Sports & Exercise）在一项随机对照试验中证明，与中等蛋白摄入（1.0 g/kg）的对照组相比，高蛋白摄入（2.3 g/kg）的受试者在热量缺口期间保留了明显更多的肌肉量。作者建议在限制热量的饮食期间每公斤体重至少摄入 1.8–2.0 g 蛋白质。\n\n此外，Helms et al.（2014, Journal of the International Society of Sports Nutrition）进行了一项系统综述，研究运动员在热量缺口中的最佳蛋白质摄入量，确认 1.8–2.7 g/kg 是最大限度保留瘦体重的理想范围。在缺口期间进行力量训练，对于维持肌肉组织和代谢率来说，与蛋白质摄入本身同样重要。',
      },
      {
        title: '好处与预期效果',
        content: '与更激进的节食方式相比，500 kcal 的适度热量缺口有许多优势。最重要的好处是可持续性：Wing & Phelan（2005, American Journal of Clinical Nutrition）在美国国家体重控制登记处（National Weight Control Registry）的研究中表明，适度减重的人长期维持体重的可能性明显更高。\n\n就预期效果而言，只要坚持执行，你可以期待每周减掉 0.3–0.5 kg 脂肪。在最初一到两周，体重秤上的下降往往更多（1–2 kg），因为身体排出了潴留的水分，糖原储备也在减少。不要把这种初期的水分流失与脂肪减少混为一谈。\n\n其他好处包括：与极端节食相比饱腹感更好，因为大多数人都能很好地承受 500 kcal 的缺口；睡眠质量更好、情绪也比激进方法更稳定（Nedeltcheva et al., 2010, Annals of Internal Medicine）；运动表现得以保持，而较大的缺口往往会损害运动表现；身体成分得到积极改变，而不只是体重下降。\n\nGarthe et al.（2011, International Journal of Sport Nutrition and Exercise Metabolism）在运动员中比较了慢速减重（每周减体重的 0.7%）与快速减重（每周减体重的 1.4%），发现慢速组的肌肉量反而增加了（+2.1%），而快速组的肌肉量减少了（-0.2%）。慢速组的力量增长也更好。这一发现强调：适度的缺口不仅更容易坚持，而且在减脂阶段保留甚至增加瘦组织方面，从生理上看也更胜一筹。',
      },
      {
        title: '适合谁？',
        content: '经典热量缺口是适用范围最广的节食方法，适合很多人群。它特别适合第一次有意识减重的新手，因为不需要复杂的规则或时间窗口。唯一的前提是能够大致估算或记录热量。\n\n对于力量训练者和健美运动员，这种模式同样理想，因为适度缺口加上高蛋白摄入能最大限度地保留肌肉。Helms et al.（2014）推荐把这种方法作为运动员在不明显影响表现的前提下降低体脂的标准方法。\n\nBMI 超过 25、出于健康原因需要减重的人尤其能从中受益。Diabetes Prevention Program Research Group（2002, New England Journal of Medicine）表明，即使只减轻体重的 5–7%，也能把糖尿病风险降低 58%。500 kcal 的缺口恰好能实现这种适度且有益健康的减重。\n\n有饮食失调史的人不太适合热量缺口法，因为计算热量可能诱发失调行为（Linardon & Mitchell, 2017, European Eating Disorders Review）。孕期或哺乳期女性以及未满 18 岁的人也不应刻意制造热量缺口。对于处于比赛季的精英运动员，即便是适度缺口也可能影响恢复和表现——这种情况下建议与运动营养师进行个别咨询。\n\n患有甲状腺疾病或激素失调的人，在开始热量缺口之前应先寻求医生的建议，因为他们的代谢反应可能与健康人不同。',
      },
      {
        title: '实际执行',
        content: '实际执行热量缺口，首先要计算你的 TDEE。使用被认为最准确的估算公式 Mifflin-St Jeor 公式（Mifflin et al., 1990, American Journal of Clinical Nutrition）：男性：10 x 体重(kg) + 6.25 x 身高(cm) - 5 x 年龄 - 5；女性：10 x 体重(kg) + 6.25 x 身高(cm) - 5 x 年龄 - 161。将结果乘以你的活动系数（久坐为 1.2，非常活跃为 1.9）。然后减去 500 kcal。\n\n宏量营养素的分配可以按这个框架：蛋白质优先——每公斤体重 2.0 g。体重 80 kg 就是 160 g 蛋白质（640 kcal）。脂肪至少 0.8–1.0 g/kg，以维持激素分泌（Dorgan et al., 1996, American Journal of Clinical Nutrition）。剩下的热量用碳水化合物补足。\n\n日常实用小贴士：提前准备餐食（meal prep），把热量摄入掌握在自己手里。最初几周使用厨房秤，培养对份量的感觉。选择体积大、热量密度低的食物（蔬菜、瘦肉蛋白、浆果）来保持饱腹。喝足够的水——每公斤体重至少 30 ml。\n\n每 6–8 周安排一周饮食休息期（diet break），这一周按 TDEE 水平进食。Byrne et al.（2018, International Journal of Obesity）在 MATADOR 研究中表明，在缺口总时长相同的情况下，带休息期的间歇节食比连续节食多减了 47% 的脂肪。饮食休息期能减轻代谢适应，并提高坚持度。\n\n每天早上空腹称重，并计算每周平均值。每天 0.5–1.5 kg 的波动是正常的，由水分平衡、消化和激素波动引起。关注几周内的趋势，而不是某一天的读数。',
      },
      {
        title: '风险与常见错误',
        content: '最常见的错误是缺口过大。很多人以为缺口越大见效越快，但 Trexler et al.（2014, Journal of the International Society of Sports Nutrition）记录到，激进的热量限制会导致更多肌肉流失、激素紊乱、皮质醇升高，最终导致放弃节食。对大多数人来说，不建议缺口超过 750 kcal。\n\n蛋白质不足是第二常见的错误。许多节食者把所有宏量营养素平均削减，结果蛋白质摄入不够理想。Longland et al.（2016, American Journal of Clinical Nutrition）表明，缺口期间的高蛋白饮食（2.4 g/kg）反而让瘦体重增加了 1.2 kg，而低蛋白组（1.2 g/kg）的瘦体重完全没有增加。\n\n其他常见错误包括：忽视力量训练——没有训练刺激，身体会把肌肉当作可以舍弃的东西；忽略酱料、油和饮料中的“隐形热量”；有氧过量导致 NEAT 下降（身体会通过减少日常活动来补偿）；以及只盯着体重秤，而不看镜子和力量水平。\n\n一个常被忽视的风险是对免疫系统的影响。Gleeson et al.（2004, Journal of Sports Sciences）表明，长期限制热量可能削弱免疫功能。因此，充足的睡眠（7–9 小时）、微量营养素摄入和压力管理都是重要的配套措施。\n\n最后，“溜溜球效应”是真实存在的风险：结束节食后，很多人回到旧的饮食习惯，减掉的体重又长了回来。Maclean et al.（2011, American Journal of Physiology）表明，减重带来的激素变化——比如胃饥饿素（ghrelin）升高、瘦素（leptin）降低——在节食结束后可能持续长达 12 个月。所以节食后有计划的过渡阶段至关重要。',
      },
      {
        title: '研究与参考文献',
        content: '以下科学论文是本章建议的依据，均发表于权威的同行评审期刊：\n\n1. Wishnofsky, M. (1958). “Caloric equivalents of gained or lost weight.” American Journal of Clinical Nutrition, 6(5), 542–546. — 关于 3,500 kcal 法则的原始论文，首次量化了热量缺口与减重之间的关系。\n\n2. Hall, K. D. et al. (2011). “Quantification of the effect of energy imbalance on bodyweight.” The Lancet, 378(9793), 826–837. — 建立了考虑代谢适应的动态数学模型，表明简单的 3,500 kcal 法则高估了减重效果。\n\n3. Mettler, S., Mitchell, N. & Tipton, K. D. (2010). “Increased protein intake reduces lean body mass loss during weight loss in athletes.” Medicine & Science in Sports & Exercise, 42(2), 326–337. — 随机对照试验，证明缺口期间高蛋白摄入（2.3 g/kg）能保留肌肉。\n\n4. Helms, E. R., Zinn, C., Rowlands, D. S. & Brown, S. R. (2014). “A systematic review of dietary protein during caloric restriction in resistance trained lean athletes.” Journal of the International Society of Sports Nutrition, 11, 20. — 系统综述，建议处于缺口中的运动员摄入 1.8–2.7 g/kg 蛋白质。\n\n5. Byrne, N. M. et al. (2018). “Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study.” International Journal of Obesity, 42(2), 129–138. — 证明饮食休息期能使减脂效果提高 47%。\n\n6. Garthe, I. et al. (2011). “Effect of two different weight-loss rates on body composition and strength and power-related performance in elite athletes.” International Journal of Sport Nutrition and Exercise Metabolism, 21(2), 97–104. — 比较了运动员慢速与快速减重的效果。\n\n7. Longland, T. M. et al. (2016). “Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss.” American Journal of Clinical Nutrition, 103(3), 738–746. — 证明在热量缺口下高蛋白摄入仍能增加肌肉。',
      },
    ],
  },

  reverse_dieting: {
    name: '反向节食（Reverse Dieting）',
    summary: '一种在节食阶段结束后逐步增加热量摄入的策略性方法。目的是让代谢重新提升，避免令人头疼的溜溜球效应。热量大约每两周增加 100 kcal。',
    quick: {
      methode: '每 2 周增加 100 kcal，蛋白质保持在 2 g/kg，持续监测体重',
      fuer_wen: '刚结束节食阶段的人、赛后的健美比赛选手、长期节食者',
    },
    sections: [
      {
        title: '什么是反向节食？',
        content: '反向节食是一种策略性的营养方法：在节食阶段结束后，热量摄入是逐步、有系统地增加，而不是突然恢复正常饮食。“反向”指的是把节食过程倒过来进行——热量不是减少，而是有计划地增加。\n\n这个概念起源于健美比赛圈，运动员需要一种方法，在极端节食阶段（往往是 12–20 周的大幅缺口）之后恢复正常饮食，同时又不会让脂肪暴涨。营养科学博士 Layne Norton 从 2010 年起在健身圈推广了这个说法，让更多人了解了它。\n\n其背后的原理很巧妙：节食之后，代谢处于被压低的状态。基础代谢率下降，饥饿激素升高，饱腹激素减少，身体在激素层面被设定为要把减掉的体重找回来。如果你突然恢复“正常”饮食，身体会把多出来的热量大部分储存为脂肪——这就是典型的溜溜球效应。\n\n反向节食通过小幅度增加热量来规避这个问题——通常每一到两周增加 50–150 kcal。这样代谢就有时间适应：基础代谢率上升，NEAT（非运动活动产热）恢复正常，激素状况也逐步改善。理想情况下，在 8–12 周内，你可以明显提高热量摄入，而不会增加明显的脂肪——甚至身体成分还会略有改善。\n\n这种方法需要耐心和自律，但对刚结束长期节食的人来说，它是从限制饮食过渡到正常饮食最有科学依据的桥梁。',
      },
      {
        title: '科学背景',
        content: '反向节食的科学基础来自对代谢适应的研究。当身体长时间处于热量缺口时，一系列适应机制会启动，降低能量消耗并促进能量摄入。\n\nRosenbaum et al.（2008, Journal of Clinical Investigation）在一项里程碑式研究中记录到，体重减轻 10% 后，人的每日能量消耗减少了约 300–400 kcal——即使已经扣除减少的体重因素。这种“代谢适应”影响能量消耗的所有组成部分：基础代谢率下降 15–20%，NEAT 在不知不觉中减少，训练效率提高（同样的运动消耗更少的热量）。\n\n在激素层面，Sumithran et al.（2011, New England Journal of Medicine）在一项被广泛引用的研究中记录到，减重后的激素变化——胃饥饿素升高、瘦素降低、肽 YY 降低、胆囊收缩素降低——即使在 12 个月后仍可测得。这些激素调节饥饿与饱腹感，它们的改变解释了为什么恢复正常热量摄入后体重常常迅速反弹。\n\n反向节食背后的理论认为，逐步增加热量能让代谢和激素有时间一步步恢复正常。Dirlewanger et al.（2000, American Journal of Clinical Nutrition）表明，有控制的过量进食可以提高基础代谢率和产热——反向节食正是有意利用了这一效应。Trexler et al.（2014, Journal of the International Society of Sports Nutrition）把反向节食描述为“减轻代谢适应影响的一种有前景的策略”，并强调还需要更多对照研究。\n\n需要注意的是，把反向节食作为完整概念进行的直接研究仍然有限。这一建议是综合多个研究领域得出的——代谢适应、激素调节和有控制的过量进食。尽管如此，其理论框架是稳固的，并有大量间接证据支持。',
      },
      {
        title: '好处与预期效果',
        content: '反向节食的主要好处在于预防溜溜球效应。Anderson et al.（2001, American Journal of Clinical Nutrition）分析了 29 项长期研究，发现超过三分之二的节食者在五年内长回的体重比减掉的还多。反向节食为摆脱这种模式提供了一条有结构的出路。\n\n典型的 8 周反向节食（4 个阶段，每阶段 2 周，每次 +100 kcal）的预期效果：第一阶段（第 1–2 周），热量摄入增加 100 kcal。体重通常保持稳定或略有上升（0.2–0.5 kg，主要是因为食物量增加和水分潴留）。精力和情绪往往已经明显改善。第二阶段（第 3–4 周），常能观察到 NEAT 增加——人会不自觉地多动、更坐不住、手势更多。基础代谢率开始上升。\n\n第三阶段（第 5–6 周），很多人反映睡眠质量和训练表现都有改善。饥饿激素部分恢复正常。执行正确的话，体重增加仍然很小（整个期间 0.5–1 kg）。第四阶段（第 7–8 周）往往是代谢率明显恢复的时间点。瘦素水平上升（Trexler et al., 2014），食物热效应（TEF）恢复正常。\n\n其他好处包括：从节食心态中心理恢复——“可以多吃了”的感觉大大减轻了心理压力；碳水摄入增加、糖原储备更充足，运动表现随之提升；激素功能恢复正常，尤其是节食期间常被抑制的甲状腺激素和性激素（Maestu et al., 2010, British Journal of Sports Medicine）。很多人在完成一个正确的反向节食阶段后，表示感觉“又找回了自己”。',
      },
      {
        title: '适合谁？',
        content: '反向节食是一种进阶策略，并不适合所有人。主要目标人群是刚完成一个有计划的节食阶段、现在想有控制地过渡到维持热量饮食的人。之前的节食越长、越激进，谨慎的反向节食就越重要。\n\n健美和健身比赛选手受益最大。在通常 12–24 周、缺口极大的备赛之后，这些运动员的代谢处于严重被压低的状态。Rossow et al.（2013, Journal of the International Society of Sports Nutrition）记录到，一位自然健美运动员在备赛期间睾酮下降了 75%，T3（甲状腺激素）下降了 18%，皮质醇上升了 275%。在这样的激素状况下突然恢复正常饮食，会导致大量脂肪堆积。\n\n维持热量缺口长达数月的长期节食者也是理想人选。即使他们的缺口不像健美运动员那样极端，他们的代谢也已经明显向下适应。\n\n有节食史、反复开始又放弃节食的人（长期节食者或“溜溜球节食者”）可以利用反向节食，在开始新的节食阶段之前先把被压低的代谢提上来。\n\n反向节食不太适合：只短暂（2–4 周）处于缺口的人——这种情况通常直接回到维持热量就够了；仍明显超重、应该继续减重的人；以及难以接受计算热量这一做法的人，因为反向节食需要在较长时间内精确记录摄入量和体重变化。',
      },
      {
        title: '实际执行',
        content: '执行反向节食需要耐心和有条理的方法。下面是 8 周反向节食的详细路线图：\n\n第 1 步——确定起点：记录节食结束时的热量摄入，这就是你的基线。例如：你结束时每天摄入 1,800 kcal。同时记录体重（每周平均值）、腰围，并拍摄进度照片。\n\n第 2 步——固定蛋白质：把蛋白质摄入稳定在每公斤体重 2.0 g。整个反向节食期间蛋白质保持不变。Morton et al.（2018, British Journal of Sports Medicine）在一项涵盖 49 项研究的荟萃分析中确认，1.6–2.2 g/kg 对保持和增长肌肉最为理想。\n\n第 3 步——增加热量：每两周增加 100 kcal。增加的热量应主要来自碳水化合物，因为碳水对瘦素和甲状腺激素的影响最大（Dirlewanger et al., 2000）。第 1–2 周：1,900 kcal；第 3–4 周：2,000 kcal；第 5–6 周：2,100 kcal；第 7–8 周：2,200 kcal。\n\n第 4 步——监测：每天早上空腹称重并计算每周平均值。可接受的体重增加：每周 0.1–0.3 kg。如果每周增加超过 0.5 kg，就在当前热量水平多停留一周，然后再继续增加。每周测量一次腰围——如果两周内增加超过 1 cm，就暂停增加热量。\n\n第 5 步——调整训练：随着热量摄入增加，逐步提高训练量。多出来的能量能让你承受更多训练。如果节食期间做了很多有氧，就逐步减少——这能保留代谢能力，让 NEAT 自然上升。\n\n第 6 步——终点：当你达到估算的维持热量（节食前的水平），或发现体重持续每周增加超过 0.3 kg 时，反向节食就结束了。之后在这个热量水平稳定至少 4 周，再考虑新的节食或增肌阶段。',
      },
      {
        title: '风险与常见错误',
        content: '反向节食最常见的错误是急躁。很多人热量加得太快——不是每两周加 100 kcal，而是一下子加 300–500 kcal。这会让仍被压低的代谢不堪重负，导致不成比例的脂肪堆积。矛盾的是，成功的反向节食所需的自律往往比节食本身还多——即使你很饿、“节食已经结束了”，也必须忍住不吃多。\n\n第二个常见错误在心理层面。Dulloo et al.（2012, Obesity Reviews）描述了“附带增脂”（collateral fattening）现象：节食之后，身体倾向于先不成比例地储存脂肪，然后才恢复瘦体重。这在心理上可能让人难受——即使反向节食做得正确，有时也会在身体成分恢复正常之前看到体脂率略有上升。\n\n其他常见错误包括：减少蛋白质来给更多碳水和脂肪腾出空间——蛋白质应保持不变；因为感觉更有力气就大幅增加训练量——循序渐进很重要，可以避免受伤；因为“节食结束了”就停止记录——反向节食需要和节食本身一样精确的记录。\n\n一个常被忽视的风险涉及心理健康。有健康食品强迫症倾向（强迫性追求健康饮食）的人，可能因为持续记录而陷入不健康的模式。Mitchell et al.（2017, Eating Behaviors）表明，过度记录可能加重易感人群的饮食失调症状。如果反向节食带来压力、对体重增加的恐惧或强迫行为，应考虑寻求专业帮助。\n\n最后，有些人可能永远回不到“原来”的维持热量——尤其是在极端或非常长的节食之后。身体会设定一个新的、更低的设定点，只有在正常热量水平下维持较长时间才能突破。',
      },
      {
        title: '研究与参考文献',
        content: '以下研究构成了反向节食的科学基础。虽然把反向节食作为完整概念的直接随机对照试验仍有待开展，但这一方法依托于大量关于代谢适应和节食后生理的研究：\n\n1. Rosenbaum, M. et al. (2008). “Long-term persistence of adaptive thermogenesis in subjects who have maintained a reduced body weight.” Journal of Clinical Investigation, 118(12), 3829–3841. — 表明代谢适应在节食结束数月后仍然存在。\n\n2. Sumithran, P. et al. (2011). “Long-term persistence of hormonal adaptations to weight loss.” New England Journal of Medicine, 365(17), 1597–1604. — 记录到饥饿与饱腹激素的变化在减重后至少持续 12 个月。\n\n3. Trexler, E. T., Smith-Ryan, A. E. & Norton, L. E. (2014). “Metabolic adaptation to weight loss: implications for the athlete.” Journal of the International Society of Sports Nutrition, 11, 7. — 把反向节食描述为对抗代谢适应的一种有前景的策略。\n\n4. Dirlewanger, M. et al. (2000). “Effects of short-term carbohydrate or fat overfeeding on energy expenditure and plasma leptin concentrations in healthy female subjects.” International Journal of Obesity, 24(11), 1413–1418. — 表明碳水过量进食比脂肪过量进食更能提高瘦素和产热。\n\n5. Rossow, L. M. et al. (2013). “Natural bodybuilding competition preparation and recovery: a 12-month case study.” International Journal of Sports Physiology and Performance, 8(5), 582–592. — 记录了一位自然健美运动员的极端激素变化。\n\n6. Morton, R. W. et al. (2018). “A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults.” British Journal of Sports Medicine, 52(6), 376–384. — 确认最佳蛋白质摄入量为 1.6–2.2 g/kg。\n\n7. Dulloo, A. G. et al. (2012). “How dieting makes the lean fatter: from a perspective of body composition autoregulation through adipostats and proteinstats.” Obesity Reviews, 13(S2), 1–21. — 描述了节食后的附带增脂现象。',
      },
    ],
  },

  body_recomp: {
    name: '体成分重塑（Body Recomp）',
    summary: '同时减脂和增肌——不需要经典的热量缺口。体成分重塑依靠维持热量、非常高的蛋白质摄入和高强度力量训练。非常适合新手和轻度超重的人。',
    quick: {
      methode: '按 TDEE 水平进食，蛋白质 2.2 g/kg，每周 3–5 次渐进式力量训练',
      fuer_wen: '训练新手、重新开始训练的人、肌肉量少的轻度超重者',
    },
    sections: [
      {
        title: '什么是体成分重塑？',
        content: '体成分重塑（Body Recomposition，常简称“recomp”）指的是同时减少体脂、增加肌肉量的过程。在健身圈里，这在很长时间内被认为是不可能的——主流观点是：要么在热量盈余中增肌（“增肌期”），要么在热量缺口中减脂（“减脂期”），但永远不能两者同时进行。\n\n近年来，新的研究结果从根本上改变了这种看法。Barakat et al.（2020, Strength and Conditioning Journal）发表了一篇全面的叙述性综述，表明体成分重塑不仅是可能的，而且在某些条件下其实是最佳策略。\n\n其原理如下：身体不是一个简单的热力学系统，而是一个复杂的生物体，可以同时从不同来源获取能量，并把能量投入到不同的组织中。当身体整体处于维持热量水平时（体重既不增加也不减少），它可以从脂肪储备中调动能量，并把这些能量与摄入的蛋白质一起用于合成新的肌肉。\n\n关键在于三个因素：第一，足够高的蛋白质摄入（至少 2.0–2.4 g/kg）；第二，通过渐进式力量训练带来强烈的训练刺激；第三，合适的起点——并不是每个人都能同样有效地进行体成分重塑。新手受益最大，因为他们的身体有巨大的增肌潜力（所谓的“新手红利”），同时还能把多余的体脂当作能量来源。\n\n体成分重塑不是速成法——体重秤上的变化很小，因为增肌和减脂会相互抵消。变化体现在镜子里、照片里、衣服的合身程度和力量数据上——而不是体重秤上。',
      },
      {
        title: '科学背景',
        content: '过去十年间，支持体成分重塑的科学证据大大增强。最有影响力的研究可能来自 Longland et al.（2016, American Journal of Clinical Nutrition）：40 名超重的年轻男性完成了为期 4 周的高强度训练计划。高蛋白组（2.4 g/kg）减掉了 4.8 kg 脂肪，同时增加了 1.2 kg 瘦体重——这是同步重塑的一个有力证明。\n\nAntonio et al.（2015, Journal of the International Society of Sports Nutrition）研究了按维持热量进食、同时摄入大量过剩蛋白质（4.4 g/kg）的受训男性。8 周后，他们的体脂率没有明显变化，这表明多余的蛋白质不会转化为脂肪——这一发现强调了高蛋白摄入的安全性。\n\n在机制层面，有几个过程可以解释体成分重塑为什么有效。身体的蛋白质周转——蛋白质不断地分解与重建——会消耗相当多的能量。仅通过产热，蛋白质所含热量就有约 20–25% 被消耗掉（Westerterp, 2004, Nutrition & Metabolism）。这意味着在高蛋白摄入下，实际的热量盈余会减少，同时仍有足够的氨基酸用于增肌。\n\n肌肉蛋白质合成（MPS）主要由力量训练和蛋白质摄入刺激，而不是由热量盈余本身刺激。Churchward-Venne et al.（2012, Journal of Physiology）表明，每餐 20–40 g 优质蛋白质就足以最大程度地刺激 MPS。只要训练刺激和蛋白质摄入充足，身体就可以从脂肪储备中获取增肌所需的能量。\n\nSchoenfeld et al.（2020, International Journal of Sport Nutrition and Exercise Metabolism）总结了现有证据，确认体成分重塑在未受训和中度超重的人群中尤其有效，但在特定条件下对受训运动员也可以成功。',
      },
      {
        title: '好处与预期效果',
        content: '体成分重塑最大的好处是你不必忍受难受的热量缺口。你按维持热量进食，因此日常生活和训练都有足够的能量，同时身体成分仍在改善。这让这种方法在心理上比经典节食舒服得多。\n\n预期效果因起点不同而差异很大。训练新手在最初 3–6 个月内可以取得惊人的效果：增加 2–4 kg 肌肉，同时减掉 3–5 kg 脂肪。体重几乎不变，但外观上的差别非常大。Aaberg（2007）把这种现象描述为“从内部重建身体”——变的是身体组成，而不是体重。\n\n对于重新开始训练的人（休息一段时间后恢复训练的人），所谓的“肌肉记忆”效应可以加速体成分重塑。Gundersen（2016, Frontiers in Physiology）表明，即使肌肉萎缩，肌纤维也会保留细胞核，这会加快重建。再结合体成分重塑，重新开始训练的人可以在 8–12 周内接近以前的状态。\n\n其他好处包括：不需要极端的节食阶段，从而消除了溜溜球效应和代谢被压低的风险；由于能量充足，训练表现更好；过度训练的风险更低，因为身体获得了足够的营养来恢复；以及可以“正常吃饭”的心理自由。\n\n局限：体脂率较低（低于 15%）、有多年训练经验的进阶运动员，进展会明显变慢。一个人训练水平越高、体脂越低，同步重塑就越难——这时周期性的增肌期和减脂期往往更有效。',
      },
      {
        title: '适合谁？',
        content: '体成分重塑对某些人群特别有效，因为他们同时增肌和减脂的条件最为理想。\n\n理想的目标人群是体脂率中等（18–30%）的训练新手。这些人增肌潜力最大，同时又有足够的脂肪储备可作为能量来源。Phillips et al.（2012, Applied Physiology, Nutrition, and Metabolism）强调，“新手效应”——训练最初几个月里快速的神经肌肉适应——大大促进了体成分重塑。\n\n在中断训练数月到数年后重新开始训练的人也能大大受益。肌肉记忆效应使人找回失去的肌肉比合成全新的肌肉组织更快。Staron et al.（1991, European Journal of Applied Physiology）表明，训练带来的肌纤维类型转变在停训一段时间后仍能部分保留。\n\n没有训练经验的轻度超重者（BMI 25–30）也是理想人选。他们有足够的以体脂形式存在的能量储备，而训练刺激会引发强烈的适应。\n\n体成分重塑不太适合：非常精瘦的人（男性体脂低于 12%，女性低于 20%），因为可作为能量来源的脂肪储备不足；有多年训练经验、已接近遗传增肌潜力的进阶力量训练者；体脂率很高（超过 35%）的人，他们一开始从经典热量缺口中获益更多；以及期待在体重秤上看到快速、明显效果的人——体成分重塑需要耐心，也要接受体重几乎不变。',
      },
      {
        title: '实际执行',
        content: '体成分重塑的实际执行围绕三大支柱：营养、训练和监测。\n\n营养：计算你的 TDEE，并按维持热量进食（没有缺口，也没有盈余）。蛋白质摄入是最关键的因素——设定为每公斤体重 2.2 g。体重 80 kg 就是每天 176 g 蛋白质。把蛋白质分配到 4–5 餐，每餐 30–40 g，以在一天中最大程度地促进肌肉蛋白质合成（Areta et al., 2013, Journal of Physiology）。脂肪至少 0.8 g/kg，用于激素分泌。剩下的用碳水化合物补足——它们在训练前后对表现和恢复尤其重要。\n\n训练：每周 3–5 次渐进式力量训练是必不可少的。没有训练刺激，就不会发生体成分重塑。重点做复合动作（深蹲、硬拉、卧推、划船、引体向上），并采用渐进超负荷。Schoenfeld et al.（2017, Journal of Strength and Conditioning Research）表明，每个肌群每周 10–20 组最有利于肌肉增长。可以做适量有氧（每周 2–3 次，每次 20–30 分钟），但有氧过量会妨碍体成分重塑。\n\n监测：由于体重几乎不变，你需要其他测量方法。每周测量腰围（应该减少），以及手臂、胸部和大腿围度（应该增加或保持稳定）。每 4 周在相同条件下拍一次进度照片（相同光线、相同姿势、一天中相同时间）。记录你的力量数据——训练重量持续增加是肌肉增长的最佳指标。\n\n营养时机：虽然进餐时间不如总摄入量重要，但 Aragon & Schoenfeld（2013, Journal of the International Society of Sports Nutrition）建议在训练前后 2 小时内各吃一餐含蛋白质的饭，以获得最佳效果。\n\n睡眠：Leproult & Van Cauter（2011, JAMA）表明，睡眠不足可使睾酮分泌减少多达 15%。七到九小时的睡眠对成功的体成分重塑至关重要。',
      },
      {
        title: '风险与常见错误',
        content: '体成分重塑最常见的错误是期望不对。很多人期待体重秤上快速出现结果，几周后看不到变化就感到沮丧。于是他们要么放弃，要么改成经典热量缺口，尽管体成分重塑其实已经在表面之下成功进行。解决办法：相信这个过程，用围度测量和照片代替体重秤。\n\n另一个常见错误是蛋白质摄入不足。很多人无法稳定达到建议的 2.2 g/kg。即使体重 75 kg，也需要 165 g 蛋白质——如果不刻意选择高蛋白食物，这对很多人来说都是挑战。Antonio et al.（2016, Journal of the International Society of Sports Nutrition）表明，受训人群即使摄入 3.4 g/kg 的蛋白质也没有不良健康影响——因此高蛋白摄入是安全的。\n\n训练刺激不足是另一个问题。只举轻重量、或者没有逐步加量的人，就没有给身体增肌的理由。渐进超负荷——随着时间有系统地增加重量、训练量或强度——是肌肉适应最强的刺激（Schoenfeld, 2010, Journal of Strength and Conditioning Research）。\n\n有氧太多会破坏体成分重塑。过量的耐力训练会抑制肌肉蛋白质合成——这种现象被称为“干扰效应”（Wilson et al., 2012, Journal of Strength and Conditioning Research）。每周两到三次适量有氧就够了；更多可能适得其反。\n\n睡眠质量差常常被低估。Dattilo et al.（2011, Medical Hypotheses）描述了睡眠不足会提高皮质醇水平、减少生长激素分泌——这两者都会明显恶化体成分重塑的条件。\n\n一个方法上的错误是自我评估不准：进阶训练者经常高估自己进行体成分重塑的能力。对于训练超过 3 年、体脂低于 15% 的人来说，周期化的增肌—减脂方式通常更有效。',
      },
      {
        title: '研究与参考文献',
        content: '以下研究构成了体成分重塑的科学基础，涵盖同步增肌与减脂、最佳蛋白质摄入以及训练设计：\n\n1. Barakat, C. et al. (2020). “Body Recomposition: Can Trained Individuals Build Muscle and Lose Fat at the Same Time?” Strength and Conditioning Journal, 42(5), 7–21. — 全面的叙述性综述，总结了受训和未受训人群进行体成分重塑的可行性与条件。\n\n2. Longland, T. M. et al. (2016). “Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss.” American Journal of Clinical Nutrition, 103(3), 738–746. — 证明在高蛋白摄入下可同时减脂（4.8 kg）和增肌（1.2 kg）。\n\n3. Antonio, J. et al. (2015). “A high protein diet (3.4 g/kg/d) combined with a heavy resistance training program improves body composition in healthy trained men and women.” Journal of the International Society of Sports Nutrition, 12, 39. — 证明了极高蛋白摄入的安全性和有效性。\n\n4. Churchward-Venne, T. A. et al. (2012). “Role of protein and leucine in maximizing muscle protein synthesis.” Journal of Physiology, 590(11), 2585–2592. — 确定了每餐最佳蛋白质剂量（20–40 g）。\n\n5. Areta, J. L. et al. (2013). “Timing and distribution of protein ingestion during prolonged recovery from resistance exercise alters myofibrillar protein synthesis.” Journal of Physiology, 591(9), 2319–2331. — 表明 4 餐、每餐 20 g 蛋白质比较少的几顿大餐更能刺激 MPS。\n\n6. Schoenfeld, B. J. et al. (2017). “Dose-response relationship between weekly resistance training volume and increases in muscle mass.” Medicine & Science in Sports & Exercise, 49(3), 661–667. — 确定每个肌群每周 10–20 组为最佳。\n\n7. Gundersen, K. (2016). “Muscle memory and a new cellular model for muscle atrophy and hypertrophy.” Journal of Experimental Biology, 219(2), 235–242. — 通过肌细胞核的保留解释了肌肉记忆效应。',
      },
    ],
  },

  intermittent_fasting: {
    name: '间歇性断食（16:8）',
    summary: '一种包含 16 小时断食期和 8 小时进食窗口的饮食模式。由于在更短的时间内吃更少的餐数，自然而然地让减少热量变得更简单。把适度的热量缺口与断食的代谢益处结合在一起。',
    quick: {
      methode: '断食 16 小时，进食窗口 8 小时（例如 12:00–20:00），TDEE 减去 300 kcal',
      fuer_wen: '喜欢有固定结构、早上不太想吃早餐的人',
    },
    sections: [
      {
        title: '什么是间歇性断食（16:8）？',
        content: '16:8 方案的间歇性断食（IF）是一种饮食模式：每天的进食被限制在 8 小时的窗口内，随后是 16 小时的断食期。它不是传统意义上的节食——对食物选择没有任何限制——而是一种基于时间的饮食理念，决定的是你什么时候吃，而不是吃什么。\n\n间歇性断食的理念由来已久。数千年来，断食在许多文化和宗教中都有一席之地（斋月、基督教斋戒、佛教的斋戒传统）。不过，关于间歇性断食的现代科学研究直到 2000 年代才开始，主要由美国国家衰老研究所（National Institute on Aging）的 Mark Mattson 和索尔克研究所（Salk Institute）的 Satchidananda Panda 的工作推动。\n\n16:8 方案是间歇性断食中最受欢迎、研究也最充分的形式。典型的一天是这样的：最后一餐在 20:00 前吃完，随后断食 16 小时（只允许喝水、无糖茶或黑咖啡）。第二天的第一餐在中午 12:00 吃。进食窗口为 12:00 到 20:00，在此期间吃 2–3 餐，可能再加些零食。\n\n生理背景：在 12–14 小时不进食后，肝糖原储备基本耗尽，身体开始越来越多地动员和氧化脂肪酸。与此同时，去甲肾上腺素和生长激素水平上升，进一步支持脂肪燃烧。Anton et al.（2018, Obesity）把这种转变描述为“代谢转换”——主要能量来源从葡萄糖转向脂肪氧化。\n\n与 300 kcal 的适度热量缺口相结合，这种断食方案能增强减脂效果，而不需要极端的缺口。',
      },
      {
        title: '科学背景',
        content: '近年来，关于间歇性断食的研究呈指数级增长。De Cabo & Mattson（2019, New England Journal of Medicine）在全球最权威的医学期刊上发表了一篇全面综述，总结了 IF 的证据，并认为它对预防和治疗肥胖、糖尿病和心血管疾病具有重要意义。\n\n在细胞层面，断食会激活一种叫自噬的过程——细胞的自我清理，受损的细胞成分被分解并回收利用。大隅良典（Yoshinori Ohsumi）因发现自噬机制获得了 2016 年诺贝尔生理学或医学奖。Alirezaei et al.（2010, Autophagy）表明，断食会明显增强神经元自噬，这可能具有神经保护作用。\n\n在身体成分方面，Moro et al.（2016, Journal of Translational Medicine）进行了一项最重要的研究：34 名受训男性被分为 16:8 IF 组和对照组。8 周后，IF 组减掉的脂肪量（-16.4%）明显多于对照组（-2.8%），而两组的瘦体重都得到了保留。值得注意的是，两组摄入的热量相同。\n\nTinsley et al.（2017, European Journal of Sport Science）表明，把 16:8 IF 与力量训练结合的年轻男性实现了减脂而没有流失瘦体重——即使没有刻意制造热量缺口。作者推测，受限的进食窗口会让人在不知不觉中减少约 300–500 kcal 的热量。\n\n在激素层面，Ho et al.（2013, Translational Research）记录到，在 24 小时断食期间生长激素可升高多达 300–500%。在 16:8 模式下，这一效应较温和但仍然显著，有助于保留肌肉和动员脂肪。\n\nCienfuegos et al.（2020, Cell Metabolism）比较了多种 IF 方案，发现 16:8 模式在效果和日常可行性之间取得了很好的平衡。',
      },
      {
        title: '好处与预期效果',
        content: '间歇性断食带来的好处不只是减重。最实际的优点是：吃的餐数少，意味着每天准备的时间、做饭的时间和要做的决定都更少。对忙碌的人来说，这能节省大量时间。\n\n在预期效果方面，荟萃分析显示，16:8 IF 在 8–12 周内平均可减掉体重的 3–5%（Welton et al., 2020, Canadian Family Physician）。对一个 80 kg 的人来说，就是 2–3 个月减掉 2.4–4 kg。与热量相同但不采用断食方案的对照组相比，减脂的比例更大（Moro et al., 2016）。\n\n代谢益处：Sutton et al.（2018, Cell Metabolism）进行了一项题为“Early Time-Restricted Feeding”的开创性研究，表明 IF 可改善胰岛素敏感性、降低血压并减轻氧化应激——与减重无关。这些发现表明，限制进食时间本身就有独立的健康益处。\n\n认知益处：很多实践 IF 的人反映，断食期间头脑更清晰、注意力更集中。Mattson et al.（2018, Nature Reviews Neuroscience）描述了断食会增加 BDNF（脑源性神经营养因子）的产生，这是一种促进神经细胞生长和认知功能的蛋白质。\n\n抗炎作用：Faris et al.（2012, Nutrition Research）发现，间歇性断食能明显降低全身性炎症指标（IL-6、CRP）。慢性低度炎症与许多文明病有关，从心血管疾病到某些癌症。\n\n一个不容小觑的优点是简单：与计算热量不同，你只需要看时间。对觉得记录热量很麻烦的人来说，IF 可以是一种让人轻松的替代方案。',
      },
      {
        title: '适合谁？',
        content: '16:8 形式的间歇性断食特别适合某些人群和生活方式。理想人选是早上天生食欲不大的人——对他们来说，不吃早餐不是一种限制，而是他们现有饮食习惯的自然延伸。\n\n午休时间有限的上班族也能受益。不用计划三餐加零食，而是专注于进食窗口内 2–3 顿能吃饱的饭。Gill & Panda（2015, Cell Metabolism）在一项观察性研究中发现，大多数人每天的进食跨度长达 15 小时——仅仅限制在 8 小时，就能通过时间上的限制自然减少热量。\n\n对于想减脂又不想流失肌肉的力量训练者，IF 是一个有证据支持的选择。Moro et al.（2016）表明，采用 16:8 IF 的受训男性减掉了明显的脂肪，而没有流失瘦体重。关键是把训练时间安排在进食窗口内，或者至少在训练后 1–2 小时内安排一顿富含蛋白质的饭。\n\n有胰岛素抵抗或糖尿病前期的人，在医生监督下也可以从 IF 中获益。Harvie et al.（2011, International Journal of Obesity）表明，在热量相同的情况下，间歇性断食比持续限制热量更能改善胰岛素敏感性。\n\n16:8 IF 不太适合：必须在固定时间随餐服药的人；有饮食失调史的人，断食期可能诱发暴食模式（Stice et al., 2008, Journal of Abnormal Psychology）；孕期和哺乳期女性；1 型糖尿病患者（有低血糖风险）；以及仍在发育、身体需要规律摄入营养的青少年。\n\n对于清晨（5:00–7:00）训练的人，标准的 16:8 窗口可能不太实用。这时建议调整：把进食窗口改为 8:00 到 16:00，而不是 12:00 到 20:00，以便安排训练后的那一餐。',
      },
      {
        title: '实际执行',
        content: '执行 16:8 间歇性断食相对简单，但需要有意识地规划，尤其是在开始阶段。\n\n第 1 步——选择进食窗口：选一个适合你生活方式的 8 小时窗口。最受欢迎的是 12:00–20:00，但 10:00–18:00 甚至 8:00–16:00 也很常见。Panda et al.（2016, Cell Metabolism）建议把进食窗口尽量提前，因为早上的胰岛素敏感性和消化效率最高。不过从实际出发，大多数人会选择较晚的窗口，以便和朋友家人一起吃晚饭。\n\n第 2 步——规划热量和宏量营养素：计算你的 TDEE 并减去 300 kcal。把热量分配到进食窗口内的 2–3 餐。蛋白质保持在每公斤体重 2.0 g。在 8 小时的进食窗口内吃 3 餐（12:00、16:00、19:30），每餐应含 40–60 g 蛋白质，以多次触发肌肉蛋白质合成（Schoenfeld & Aragon, 2018, Journal of the International Society of Sports Nutrition）。\n\n第 3 步——度过断食期：在 16 小时断食期间可以喝：水（至少 2 升）、黑咖啡、无糖茶。这些饮品不会打破断食，还能抑制食欲。咖啡因还有轻微的产热作用，可以增加脂肪氧化（Acheson et al., 2004, American Journal of Clinical Nutrition）。\n\n第 4 步——适应：不要一开始就直接做 16:8，而是逐步适应。第 1 周：12:12（断食 12 小时，例如 20:00–8:00）。第 2 周：14:10（把早餐推迟到 10:00）。从第 3 周起：16:8（把早餐推迟到 12:00）。大多数人反映，最初 3–5 天饥饿感最强，之后会明显减弱——身体会根据新的进食时间调整胃饥饿素的分泌（Natalucci et al., 2005, Journal of Endocrinological Investigation）。\n\n第 5 步——安排训练：最好在断食期的最后三分之一（10:00–12:00）训练，然后吃第一餐。也可以在进食窗口内训练（例如 17:00）。如果你空腹训练，训练前补充 BCAA（5–10 g）可以把肌肉分解降到最低，不过这方面的证据并不一致（Dieter et al., 2016, Journal of the International Society of Sports Nutrition）。',
      },
      {
        title: '风险与常见错误',
        content: '间歇性断食最常见的错误是在进食窗口内补偿性进食。很多人在这 8 小时里吃得太多，结果断食没有净效果——甚至比不断食时吃得还多。Ravussin et al.（2019, Nutrients）观察到，有些受试者在进食窗口内不知不觉地把热量摄入增加了 20–30%。解决办法：即使在进食窗口内也要留意总热量，至少在最初几周要这样做。\n\n第二个常见错误是忽视蛋白质摄入。要在短短 8 小时内吃够 160 g 以上的蛋白质，需要有意识地规划。很多人反而会选择热量高、蛋白质低的饭菜。后果是：尽管在断食，肌肉还是流失了。每餐应至少含 40 g 优质蛋白质。\n\n社交压力和不够灵活是另外的挑战。遇到早上 8 点的商务早餐或周末的家庭早午餐时，实践 IF 的人需要灵活应对。偶尔偏离（每周 1–2 次）没有问题，也不会明显影响效果。不顾社交后果死守时间窗口，可能导致社交退缩和健康食品强迫症倾向。\n\n咖啡因摄入过多是一个被低估的风险。很多人在断食期把咖啡当作抑制食欲的工具，午饭前就喝 4–6 杯。这可能导致睡眠障碍、焦虑加重和胃部不适。Drake et al.（2013, Journal of Clinical Sleep Medicine）表明，即使在睡前 6 小时摄入咖啡因，也会明显降低睡眠质量。\n\n女性还需要注意一些特殊情况。Meczekalski et al.（2014, Gynecological Endocrinology）记录到，间歇性断食可能影响部分女性的月经周期，尤其是与热量缺口结合时。因此，女性应特别关注月经周期是否规律，一旦出现异常就调整或暂停断食方案。\n\n脱水是一个常被忽视的风险。很多人有相当一部分水分来自食物。少吃几顿饭时，就需要有意识地多喝水——断食期间至少额外多喝 500 ml。',
      },
      {
        title: '研究与参考文献',
        content: '以下研究是关于间歇性断食最重要的科学成果，构成了本章建议的证据基础：\n\n1. De Cabo, R. & Mattson, M. P. (2019). “Effects of Intermittent Fasting on Health, Aging, and Disease.” New England Journal of Medicine, 381(26), 2541–2551. — 关于 IF 最全面的综述，发表于全球最权威的医学期刊。总结了减重、胰岛素敏感性、炎症和神经保护方面的证据。\n\n2. Moro, T. et al. (2016). “Effects of eight weeks of time-restricted feeding (16/8) on basal metabolism, maximal strength, body composition, inflammation, and cardiovascular risk factors in resistance-trained males.” Journal of Translational Medicine, 14, 290. — 在热量摄入相同的情况下，16:8 IF 组减脂 16.4%，对照组为 2.8%。\n\n3. Tinsley, G. M. et al. (2017). “Time-restricted feeding in young men performing resistance training: A randomized controlled trial.” European Journal of Sport Science, 17(2), 200–207. — 证明 IF 结合力量训练可以减脂而不流失瘦体重。\n\n4. Anton, S. D. et al. (2018). “Flipping the Metabolic Switch: Understanding and Applying the Health Benefits of Fasting.” Obesity, 26(2), 254–268. — 描述了从葡萄糖到脂肪氧化的“代谢转换”。\n\n5. Sutton, E. F. et al. (2018). “Early Time-Restricted Feeding Improves Insulin Sensitivity, Blood Pressure, and Oxidative Stress Even without Weight Loss in Men with Prediabetes.” Cell Metabolism, 27(6), 1212–1221. — 表明 IF 的代谢益处与减重无关。\n\n6. Alirezaei, M. et al. (2010). “Short-term fasting induces profound neuronal autophagy.” Autophagy, 6(6), 702–710. — 记录了断食对自噬的激活作用。\n\n7. Welton, S. et al. (2020). “Intermittent fasting and weight loss: Systematic review.” Canadian Family Physician, 66(2), 117–125. — 系统综述，确认 IF 可减重 3–5%。',
      },
    ],
  },

  high_protein: {
    name: '高蛋白饮食',
    summary: '以蛋白质为核心的营养策略，每公斤体重摄入 2.5–3 g 蛋白质。高蛋白摄入能在节食期间最大程度地保留肌肉，并提高产热。对想减少体脂又不想流失肌肉的力量训练者尤其有效。',
    quick: {
      methode: '每公斤体重 2.5–3 g 蛋白质，适度缺口（-400 kcal），相应调整脂肪和碳水',
      fuer_wen: '处于减脂期的力量训练者、希望最大程度保留肌肉的有经验训练者',
    },
    sections: [
      {
        title: '什么是高蛋白饮食？',
        content: '高蛋白饮食是一种营养策略，蛋白质摄入量明显高于常规建议——通常为每天每公斤体重 2.5 到 3 g。膳食营养素推荐摄入量（RDA）建议久坐的成年人摄入 0.8 g/kg，大多数健身指南推荐 1.6–2.0 g/kg，而这种策略有意超出这些水平。\n\n核心原理很简单：在热量缺口期间，总存在肌肉和脂肪一起流失的风险。蛋白质摄入越高，防止肌肉分解的保护就越强。此外，蛋白质在所有宏量营养素中热效应最高——仅消化过程就会消耗约 20–30% 的蛋白质热量，而碳水化合物只有 5–10%，脂肪只有 0–3%。\n\n实际执行需要仔细规划：对一位 80 kg 的运动员来说，2.8 g/kg 意味着每天摄入 224 g 蛋白质。这相当于仅蛋白质就提供约 896 kcal。如果总预算是比如 2000 kcal（扣除缺口后），留给脂肪和碳水化合物的只有 1104 kcal——这种分配必须精心安排，才能保证微量营养素摄入和训练表现。\n\n高蛋白饮食不是速成节食，而是一种在运动营养研究中被广泛研究、有证据支持的策略。它与力量训练以及比维持热量低约 400 kcal 的适度缺口结合时效果最好。',
      },
      {
        title: '科学背景',
        content: '节食期间高蛋白摄入的科学基础稳固，而且还在不断增加。Antonio et al.（2014, Journal of the International Society of Sports Nutrition）的一项标志性研究表明，摄入 4.4 g/kg 蛋白质的受试者尽管热量摄入增加，却没有增加额外的体脂——这证明了蛋白质的高产热效应。\n\nLongland et al.（2016, American Journal of Clinical Nutrition）在一项缺口为 40% 的随机对照试验中比较了 1.2 g/kg 与 2.4 g/kg 的蛋白质摄入。高蛋白组平均增加了 1.2 kg 肌肉，减掉了 4.8 kg 脂肪；而低蛋白组流失了肌肉，只减掉了 3.5 kg 脂肪。这项研究被视为里程碑，因为它证明只要蛋白质充足，即使在缺口中也有可能增肌。\n\nMettler et al.（2010, Medicine and Science in Sports and Exercise）研究了更激进的 60% 缺口，发现与 1.0 g/kg 相比，2.3 g/kg 的蛋白质明显减少了瘦体重的流失。Westerterp（2004, Nutrition & Metabolism）全面记录了蛋白质的热效应：蛋白质通过消化使能量消耗增加 20–30%，在高摄入量下每天可额外多消耗 150–200 kcal。\n\nHelms et al.（2014, Journal of the International Society of Sports Nutrition）在其被广泛引用的综述中，建议备赛健美运动员每公斤去脂体重摄入 2.3–3.1 g 蛋白质——这一建议直接基于荟萃分析。换算到一般受训人群的总体重，大约相当于 2.0–2.8 g/kg。',
      },
      {
        title: '好处与预期效果',
        content: '高蛋白饮食最重要的好处是在限制热量期间能更好地保留肌肉。研究一致表明，蛋白质摄入较高的运动员比蛋白质较低的对照组少流失 50–80% 的瘦体重。在某些情况下，尤其是训练水平较低的人，还有可能同时增肌。\n\n热效应提高是另一个明显的优势。每天摄入 200 g 以上的蛋白质，估计仅消化就能额外消耗 150–200 kcal。在 12 周的节食期内，累计约 12,600–16,800 kcal——大约相当于 1.5–2 kg 体脂。\n\n蛋白质是饱腹感最强的宏量营养素。Leidy et al.（2015, Advances in Nutrition）总结指出，每餐摄入超过 25 g 蛋白质能明显增加饱腹感并减少嘴馋。这让坚持热量缺口在心理上容易得多。\n\n在 8–12 周内坚持执行的预期效果：减脂 4–8 kg（缺口 400 kcal 时），保留现有肌肉的 95–100%，即使体重秤读数变化不大，身体成分也得到改善，持续的氨基酸供应让精力更稳定，与低蛋白饮食相比训练表现更好。力量水平通常保持稳定或只略有下降（5–10%），而蛋白质摄入较低时，下降 15–25% 很常见。',
      },
      {
        title: '适合谁？',
        content: '高蛋白饮食主要适合正在进行减脂期、把最大程度保留肌肉放在首位的力量训练者和健美运动员。对于已经有扎实肌肉基础、想在节食期间保护它的人尤其有效。\n\n理想人选是有至少 1–2 年力量训练经验、熟悉宏量营养素记录的进阶训练者。较高的蛋白质需求要求具备规划能力，并愿意在每一餐中稳定地加入富含蛋白质的食物。\n\n肾功能受损的人需要谨慎。虽然 Martin et al.（2005, Nutrition & Metabolism）表明，高蛋白摄入不会损害健康的肾脏，但已有肾脏疾病的人在如此高的蛋白质摄入之前应先寻求医生的建议。EFSA（2012）确认，对健康成年人来说，蛋白质摄入最高 2.8 g/kg 被认为是安全的。\n\n这种策略不太适合没有记录经验的新手，因为如果没有成熟的宏量营养素规划习惯，很难达到这么高的蛋白质量。对素食者和纯素食者来说执行也可能有难度，但借助豆腐、天贝、面筋（seitan）和豆类等植物蛋白来源，必要时再补充蛋白粉，是可以做到的。预算紧张的人要注意，富含蛋白质的食物往往更贵——不过灵活选择（鸡蛋、夸克奶酪、茅屋奶酪、实惠的肉类部位）可以把花费控制在合理范围内。',
      },
      {
        title: '实际执行',
        content: '实际执行从计算个人的蛋白质需求开始。按每公斤体重 2.8 g 计算，75 kg 的运动员每天需要 210 g 蛋白质。应把它分配到 4–5 餐中，以最佳方式刺激肌肉蛋白质合成——Schoenfeld & Aragon（2018, Journal of the International Society of Sports Nutrition）建议每餐 0.4–0.55 g/kg。\n\n典型的一日计划可以是这样：早餐（40 g 蛋白质）：4 个鸡蛋 + 200 g 低脂夸克奶酪。午餐（50 g 蛋白质）：200 g 鸡胸肉 + 蔬菜 + 米饭。加餐（30 g 蛋白质）：牛奶冲蛋白粉。晚餐（50 g 蛋白质）：200 g 三文鱼 + 红薯 + 沙拉。夜宵（40 g 蛋白质）：300 g 茅屋奶酪 + 浆果。\n\n执行要点：在每一份饮食计划中都把蛋白质放在第一位，然后围绕蛋白质目标安排脂肪和碳水。每天至少额外多喝 1.5–2 升水，因为蛋白质代谢需要更多水分。有意识地加入高纤维食物，因为以蛋白质为主的饮食往往纤维偏少。\n\n关于碳水化合物和脂肪：确保每公斤体重至少摄入 1 g 脂肪（为了激素功能），剩余热量用碳水化合物补足，最好安排在训练前后。周末做好备餐能在工作日节省大量时间，并保证达到蛋白质目标。蛋白粉每天可以提供 1–2 份，但不应成为主要的蛋白质来源。',
      },
      {
        title: '风险与常见错误',
        content: '最常见的错误是为了蛋白质而忽视其他宏量营养素。脂肪低于 0.7 g/kg 时可能出现激素问题——Dorgan et al.（1996, American Journal of Clinical Nutrition）表明，极低脂饮食可使睾酮水平降低多达 15%。每天至少 50–70 g 脂肪是必需的。\n\n另一个错误是蛋白质摄入分配不均。只在两餐里吃下 150 g 蛋白质，并不能最好地利用肌肉蛋白质合成。Areta et al.（2013, Journal of Physiology）表明，在一天中分 4 次、每次 20–40 g 摄入，比少数几次大剂量明显更有效。\n\n蛋白质摄入突然增加时，消化问题很常见。身体不习惯大量蛋白质时，可能出现腹胀、便秘和不适。建议用 2–3 周时间，从目前的摄入量逐步增加到 2.8 g/kg 的目标。\n\n肾功能是一个常被高估的风险：在健康人群中，没有证据表明高蛋白摄入会损害肾脏（Devries et al., 2018, British Journal of Sports Medicine）。不过应相应调整饮水量——在这种蛋白质水平下，每天至少要喝 2.5–3 升水。已有肾脏问题的人必须咨询医生。最后，过分专注于蛋白质有时会导致微量营养素不足——建议补充复合维生素，并吃足够的蔬菜。',
      },
      {
        title: '研究与参考文献',
        content: 'Antonio, J. et al. (2014). “The effects of consuming a high protein diet (4.4 g/kg/d) on body composition in resistance-trained individuals.” Journal of the International Society of Sports Nutrition, 11, 19. — 表明极高的蛋白质摄入并没有导致脂肪增加。\n\nLongland, T. M. et al. (2016). “Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss.” American Journal of Clinical Nutrition, 103(3), 738-746. — 里程碑研究：尽管缺口达 40%，2.4 g/kg 仍带来了肌肉增长。\n\nMettler, S. et al. (2010). “Increased protein intake reduces lean body mass loss during weight loss in athletes.” Medicine and Science in Sports and Exercise, 42(2), 326-337. — 2.3 g/kg 比 1.0 g/kg 明显更好地保护了瘦体重。\n\nHelms, E. R. et al. (2014). “A systematic review of dietary protein during caloric restriction in resistance trained lean athletes.” Journal of the International Society of Sports Nutrition, 11, 20. — 建议：备赛健美运动员每公斤去脂体重 2.3–3.1 g。\n\nWesterterp, K. R. (2004). “Diet induced thermogenesis.” Nutrition & Metabolism, 1(1), 5. — 记录了蛋白质的热效应（20–30%）。\n\nLeidy, H. J. et al. (2015). “The role of protein in weight loss and maintenance.” American Journal of Clinical Nutrition, 101(6), 1320S-1329S. — 总结了蛋白质的饱腹作用。\n\nSchoenfeld, B. J. & Aragon, A. A. (2018). “How much protein can the body use in a single meal for muscle-building?” Journal of the International Society of Sports Nutrition, 15, 10. — 蛋白质分配与每餐最佳剂量。',
      },
    ],
  },

  carb_cycling: {
    name: '碳水循环',
    summary: '一种进阶营养策略，碳水化合物摄入量在训练日和休息日之间变化。训练日多吃碳水以支持表现，休息日减少碳水、增加脂肪。这样可以优化营养分配和脂肪代谢。',
    quick: {
      methode: '训练日：+200 kcal，50% 碳水。休息日：-400 kcal，25% 碳水。',
      fuer_wen: '有记录经验、想同时优化表现和减脂的进阶训练者',
    },
    sections: [
      {
        title: '什么是碳水循环？',
        content: '碳水循环是一种营养策略，碳水化合物摄入量在高碳日和低碳日之间有系统地变化。与宏量营养素固定不变的死板饮食计划不同，碳水循环让营养摄入配合实际的能量需求——训练日多吃碳水，休息日少吃。\n\n其基本原理在于：身体在高强度体力活动时主要以碳水化合物作为燃料。在训练日，当高强度训练消耗了糖原储备时，身体能从较高的碳水摄入中受益。而在休息日，能量需求较低，身体能更有效地把脂肪储备当作能量来源。\n\n在实际操作中，通常是这样：训练日约 50% 的热量来自碳水化合物，并在维持热量基础上略有盈余（+200 kcal）。休息日碳水比例降到 25%，并制造 -400 kcal 的缺口。蛋白质保持在每公斤体重 2.2 g 不变，而脂肪和碳水化合物此消彼长。\n\n按每周 4 个训练日、3 个休息日的典型节奏，每周的净缺口约为 -400 kcal，对应适度且可持续的减脂，同时不影响训练表现。碳水循环的优势在于：既能利用热量缺口的好处，又不必承受持续缺口带来的坏处。',
      },
      {
        title: '科学背景',
        content: '碳水循环的科学基础建立在几项生理学原理之上。首先是胰岛素和营养分配的作用：在训练日，肌肉的胰岛素敏感性提高——这是运动带来的——从而确保碳水化合物优先被肌肉细胞吸收（Richter & Hargreaves, 2013, Physiological Reviews）。这能促进糖原再合成并支持恢复。\n\n让碳水化合物配合能量需求的想法得到了代谢灵活性概念的支持。Galgani et al.（2008, American Journal of Clinical Nutrition）表明，在碳水氧化和脂肪氧化之间交替，能提高身体高效利用能量底物的能力。在低碳日，脂肪酸氧化增强，有助于减脂。\n\nImpey et al.（2018, Journal of Physiology）描述了“Sleep Low”方案，即在糖原储备较低时训练，可促进线粒体生成和脂肪代谢。这支持了在休息日少吃碳水的原则。Marquet et al.（2016, Medicine and Science in Sports and Exercise）在一项针对铁人三项运动员的研究中表明，周期化的碳水摄入使耐力表现提高了 3%，同时减脂效果也比碳水均匀分配更好。\n\nHuberman（2021）也强调了碳水化合物对血清素和睡眠质量的作用——这是在训练日（尤其是晚上）多吃碳水、以优化夜间恢复的一个理由。',
      },
      {
        title: '好处与预期效果',
        content: '碳水循环的核心优势在于按实际需求优化营养摄入。训练日有足够的碳水支持高强度表现，休息日减少碳水摄入则能最大化脂肪燃烧。这种“两全其美”的原则把碳水循环与死板的饮食方法区分开来。\n\n心理上的好处也很明显：与持续节食不同，这里会定期有允许多吃碳水和热量的“高”日。这减轻了被限制的感觉，让饮食长期更容易坚持。Dirlewanger et al.（2000, American Journal of Clinical Nutrition）表明，周期性的碳水摄入可以部分逆转节食带来的激素适应（尤其是瘦素下降）。\n\n8–12 周的预期效果：适度减脂 3–5 kg，训练表现基本保持；同时保留肌肉，身体成分得到改善；精力比持续低碳饮食更稳定；高碳日的训练表现更好；整体上饮食依从性更高。\n\n另一个优势是灵活：碳水循环可以配合不同的训练分化。高强度的练腿日可以分配比较轻松的上肢日更多的碳水。这种个性化让该策略特别能适应不同的训练计划和生活方式。',
      },
      {
        title: '适合谁？',
        content: '碳水循环是一种进阶策略，主要面向有扎实记录基础的有经验训练者。从来没记录过宏量营养素的人，很快就会被每天的变化搞得手忙脚乱。前提是对营养 App 和食物秤有一定的使用习惯。\n\n碳水循环特别适合每周训练 4–5 次、训练日和休息日分明的力量训练者。训练计划越固定，这种策略效果越好，因为碳水摄入直接与训练节奏挂钩。\n\n进入备赛期的运动员可以从碳水循环中受益，因为它能在保持高训练强度的同时减脂。处于体成分重塑阶段（同时减脂和增肌）的运动员也会发现碳水循环是一种有效的策略。\n\n碳水循环不太适合还没掌握基本营养原则的新手。有饮食失调或与食物关系紧张的人也应谨慎，因为不断的变化可能让人感到有压力。对每天都高强度训练的耐力运动员来说，碳水循环的好处较少，因为他们几乎每天都需要大量碳水。最后，碳水循环需要规律的训练节奏——因为工作或家庭原因训练不规律的人，会觉得规划很麻烦。',
      },
      {
        title: '实际执行',
        content: '执行从确定 TDEE（每日总能量消耗）开始。假设 TDEE 为 2500 kcal：训练日摄入 2700 kcal（+200 kcal），其中 50% 来自碳水化合物 = 337 g 碳水。休息日摄入 2100 kcal（-400 kcal），其中 25% 来自碳水化合物 = 131 g 碳水。蛋白质保持在 2.2 g/kg 不变。\n\n训练日示例（80 kg 运动员，2700 kcal）：蛋白质：176 g（704 kcal），碳水化合物：337 g（1348 kcal），脂肪：72 g（648 kcal）。早上：燕麦粥配浆果和蛋白粉。训练前：米饼配蜂蜜。训练后：鸡肉配米饭和蔬菜。晚上：红薯配三文鱼。\n\n休息日示例（80 kg 运动员，2100 kcal）：蛋白质：176 g（704 kcal），碳水化合物：131 g（524 kcal），脂肪：97 g（873 kcal）。早上：鸡蛋配牛油果。午餐：金枪鱼沙拉配橄榄油。晚餐：牛肉末炒蔬菜。加餐：坚果和夸克奶酪。\n\n关键规则：训练日把碳水集中在训练前后（每日总量的 60–70% 在训练前后摄入）。休息日的碳水优先来自蔬菜和豆类。休息日增加脂肪，让热量缺口更容易承受。记录 App 必不可少——没有精确的记录，碳水循环就失去了优势。过渡应循序渐进，最好有 2–3 周的适应期。',
      },
      {
        title: '风险与常见错误',
        content: '碳水循环最常见的错误是在训练日过度补偿。很多人把较多的碳水当作放开吃的借口，吃得远超计划中的 +200 kcal。这里必须精确记录——对碳水循环来说，估算是不够的。\n\n另一个典型错误是宏量营养素分配不对：有些人在休息日减少了碳水，却没有相应增加脂肪，导致缺口过大、精力耗尽。两种日子的总热量都必须正确，变化的只是构成。\n\n体重波动可能带来心理负担。碳水化合物会结合水分（每克糖原约结合 3–4 g 水），这意味着高碳日体重可能增加 1–2 kg，低碳日又降回来。Olsson & Saltin（1970, Acta Physiologica Scandinavica）在 50 多年前就记录了这一效应。不了解这一点的人会被体重秤打击积极性。\n\n过度复杂是另一个风险：有些人加入中碳日或改变蛋白质，让规划变得不必要地复杂。保持简单——两种定义清楚的日型就足够了。最后，脑子里不停想着吃（今天是什么日子？我能吃多少碳水？）可能让部分人对食物产生不健康的执念。如果这种饮食带来的压力多于条理，就更适合选择更简单的方法。',
      },
      {
        title: '研究与参考文献',
        content: 'Richter, E. A. & Hargreaves, M. (2013). “Exercise, GLUT4, and skeletal muscle glucose uptake.” Physiological Reviews, 93(3), 993-1017. — 训练后胰岛素敏感性提高的理论基础。\n\nGalgani, J. E. et al. (2008). “Metabolic flexibility and insulin resistance.” American Journal of Clinical Nutrition, 87(5), 1323-1328. — 代谢灵活性与能量底物利用之间的关系。\n\nImpey, S. G. et al. (2018). “Fuel for the work required: a theoretical framework for carbohydrate periodization.” Journal of Physiology, 596(13), 2353-2365. — 碳水周期化的科学框架。\n\nMarquet, L. A. et al. (2016). “Enhanced endurance performance by periodization of carbohydrate intake: Sleep Low strategy.” Medicine and Science in Sports and Exercise, 48(4), 663-672. — 周期化碳水使铁人三项运动员的表现提高 3%。\n\nDirlewanger, M. et al. (2000). “Effects of short-term carbohydrate or fat overfeeding on energy expenditure and plasma leptin concentrations.” American Journal of Clinical Nutrition, 72(3), 726-733. — 碳水再进食（refeed）对瘦素的影响。\n\nOlsson, K. E. & Saltin, B. (1970). “Variation in total body water with muscle glycogen changes in man.” Acta Physiologica Scandinavica, 80(1), 11-18. — 糖原储存引起的水分潴留。\n\nBartlett, J. D. et al. (2015). “Carbohydrate availability and exercise training adaptation.” Journal of Sports Sciences, 33(7), 712-720. — 低糖原与高糖原储备下训练的概述。',
      },
    ],
  },

  diet_break: {
    name: '饮食休息期（Diet Break）',
    summary: '一种策略性的饮食暂停：在 2 周热量缺口之后，用 1 周按维持热量进食。饮食休息期能对抗代谢适应、让饥饿激素恢复正常，并让长期节食在心理上更容易坚持。非常适合 12 周以上的长期节食。',
    quick: {
      methode: '2 周缺口（-500 kcal），然后 1 周维持热量（无缺口）。循环重复。',
      fuer_wen: '处于长期节食阶段（12 周以上）、想突破平台期并减轻节食疲劳的人',
    },
    sections: [
      {
        title: '什么是饮食休息期？',
        content: '饮食休息期（Diet Break）是一种有计划、有策略地暂停热量限制的方法，在规定的时间内——通常为 1–2 周——按维持热量进食。它明确不是失控的暴食，而是有意识地回到没有缺口的热量需求水平。\n\n这个概念基于这样的认识：身体会对持续的热量限制做出一系列适应，阻碍进一步减脂。这种代谢适应包括基础代谢率下降、自发活动（NEAT）减少、饥饿感增强以及激素变化——尤其是瘦素下降、胃饥饿素上升。\n\n经典的饮食休息期方案是 2 周缺口加 1 周维持热量的循环。缺口阶段摄入比 TDEE 低 500 kcal 的热量；休息周则把摄入提高到 TDEE 水平。蛋白质保持在每公斤体重 2.0 g 不变，增加的热量主要来自碳水化合物。\n\n它与“欺骗日”或因缺乏自律而中断节食的关键区别在于：饮食休息期是事先计划好的、控制热量的，并且有明确的终点。它是营养周期化的一种策略工具，而不是失败的标志。在 12 周内采用这种 2:1 方案，实际上有 8 周处于缺口、4 周处于维持热量——但根据研究，总减脂量与持续缺口相当。',
      },
      {
        title: '科学背景',
        content: '关于饮食休息期最重要的研究是 Byrne et al.（2018, International Journal of Obesity）的 MATADOR 研究。在这项随机对照试验中，研究人员比较了 16 周的持续缺口与间歇方式（2 周缺口、2 周维持，共 30 周）。间歇组减掉的脂肪明显更多（14.1 kg 对 9.1 kg），代谢适应也更少。\n\n其生理基础在于瘦素的变化。瘦素这种“饱腹激素”会随着体脂率和热量限制持续时间成比例地下降。Rosenbaum et al.（2005, Journal of Clinical Investigation）表明，仅减掉 10% 的体重就可能使瘦素水平下降 50–70%。短期按维持热量进食可以让瘦素水平部分恢复正常，从而稳定饥饿感和代谢率。\n\nTrapp et al.（2008, International Journal of Obesity）和 Dulloo et al.（2012, Obesity Reviews）描述了“适应性产热”——能量消耗的下降超出了单纯由体重减少所能解释的程度。这种适应可达原基础代谢率的 10–15%，如果不采取应对措施，即使节食结束后也会持续存在。\n\nCampbell et al.（2020, Journal of Functional Morphology and Kinesiology）在一篇综述中确认，有计划的饮食休息期能提高饮食依从性，而不会明显减慢整体减脂速度。知道“再过 X 天就能休息”带来的心理放松，是一个不容小觑的因素。',
      },
      {
        title: '好处与预期效果',
        content: '饮食休息期的主要好处是减弱代谢适应。通过定期按维持热量进食，基础代谢率得以稳定，下降幅度比持续节食时更小。MATADOR 研究表明，在研究结束时，间歇组的静息代谢率比持续缺口组每天高出 230 kcal。\n\n激素恢复正常是另一个重要好处。瘦素、胃饥饿素、皮质醇、甲状腺激素和睾酮都会受到热量缺口的负面影响。按维持热量休息——尤其是同时增加碳水——可以在 7–14 天内让这些激素部分重置（Chin-Chance et al., 2000, American Journal of Clinical Nutrition）。\n\n心理层面往往是长期成功的决定性因素。12–20 周的长期节食在心理上极其消耗。有计划的休息期就像“隧道尽头的光”，让节食明显更容易承受。依从率明显提高，暴食发作的风险降低。\n\n预期效果：在 15 周的周期内（10 周缺口 + 5 周维持），减脂 5–8 kg 是现实的。由于定期有维持阶段，训练表现更稳定，训练之间的恢复也更好。结束节食后，“反弹效应”的风险更低，因为代谢没有被压得那么低。',
      },
      {
        title: '适合谁？',
        content: '饮食休息期对需要进行 12 周或更长时间节食的人特别有价值。这主要包括需要在 16–24 周内把体脂降到比赛水平的备赛健美运动员，以及想减掉大量体重、无法在一次短期节食中实现的超重者。\n\n在以往节食中卡在平台期的人，尤其能从饮食休息期的代谢“重置”效应中受益。当体重在 4–6 周后停滞、又无法再进一步减少热量时，饮食休息期提供了一个巧妙的解决办法。\n\n心理上较脆弱的人——容易暴食或极度节食疲劳的人——也会发现饮食休息期是一个有用的工具。有计划的休息能减轻心理压力，防止失控暴食。\n\n饮食休息期不太适合只想减掉 3–5 kg 脂肪的人。在 6–8 周的短期节食中，代谢适应还不够明显，不值得安排休息期。对于自律性较差的人，维持周也可能有风险，如果被用来不受控制地摄入热量的话。饮食休息期需要和缺口阶段同样精确的记录——“维持热量”不等于“想吃什么就吃什么”。',
      },
      {
        title: '实际执行',
        content: '标准方案很简单：2 周缺口（比 TDEE 低 500 kcal），然后 1 周维持热量（TDEE）。两个阶段的蛋白质都保持在每公斤体重 2.0 g。维持周多出的 500 kcal 应主要来自碳水化合物，因为碳水对瘦素恢复正常的作用最强。\n\n以 TDEE 为 2800 kcal 的 80 kg 运动员为例：缺口阶段（第 1–2 周）：每天 2300 kcal，160 g 蛋白质，230 g 碳水化合物，70 g 脂肪。维持阶段（第 3 周）：每天 2800 kcal，160 g 蛋白质，350 g 碳水化合物，80 g 脂肪。然后回到第 1 周。\n\n执行要点：开始前精确确定 TDEE（在热量摄入稳定的情况下记录 2 周体重）。维持周期间不要每天看体重——由于碳水增加，身体会潴留 1–2 kg 水分，这是正常的，不是脂肪。维持周不要减少训练；保持同样的水平，甚至可以略微提高强度。\n\n调整方案：能很好承受缺口阶段的人，也可以采用 3 周缺口 + 1 周维持。进阶者可以选择更激进的 -700 kcal 缺口，但可能需要更频繁地安排休息期。对于非常长的节食（20 周以上），建议每 4–6 周缺口后安排完整的 2 周维持期。',
      },
      {
        title: '风险与常见错误',
        content: '最大的错误是把“维持热量”和“欺骗日”混为一谈。饮食休息期是指在 TDEE 水平有控制地进食，而不是失控地暴饮暴食。在休息周比 TDEE 多吃 3000–4000 kcal 的人，会抵消 2 周缺口取得的进展。休息期间同样必须严格记录。\n\n另一个常见错误是维持周对体重秤的恐惧。由于碳水增加，身体会潴留 1–3 kg 水分。这在生理上是正常的，回到缺口后 2–3 天内就会消失。不了解这一点的人会提前结束休息期或陷入恐慌——两者都适得其反。\n\n有些人过于频繁地把饮食休息期当作退出节食的借口。如果每熬过一个艰难的星期就“休息”一次，实际上就已经不再节食了。缺口与维持的比例至少应为 2:1，最好是 3:1。\n\n休息之后重新回到缺口在心理上可能比较困难。吃得多的一周过后，缺口一开始会感觉比休息前更难熬。这是正常的，2–3 天内就会调整过来。把休息期看作计划中不可或缺的一部分会有帮助——它不是必须努力挣来的奖励，而是一种策略工具。\n\n最后，休息期不应成为减少训练的理由。维持周期间应保持甚至提高训练量和强度，以充分利用多出来的能量。',
      },
      {
        title: '研究与参考文献',
        content: 'Byrne, N. M. et al. (2018). “Intermittent energy restriction improves weight loss efficiency in obese men: the MATADOR study.” International Journal of Obesity, 42(2), 129-138. — 关键研究：间歇缺口比持续缺口多减了 54% 的脂肪。\n\nRosenbaum, M. et al. (2005). “Low-dose leptin reverses skeletal muscle, autonomic, and neuroendocrine adaptations to maintenance of reduced body weight.” Journal of Clinical Investigation, 115(12), 3579-3586. — 减重期间瘦素下降及其代谢后果。\n\nDulloo, A. G. et al. (2012). “Adaptive thermogenesis in human body weight regulation: more of a concept than a measurable entity?” Obesity Reviews, 13(S2), 105-121. — 适应性产热概述。\n\nTrapp, E. G. et al. (2008). “The effects of high-intensity intermittent exercise training on fat loss.” International Journal of Obesity, 32(4), 684-691. — 代谢适应的机制。\n\nChin-Chance, C. et al. (2000). “Twenty-four-hour leptin levels respond to cumulative short-term energy imbalance.” American Journal of Clinical Nutrition, 72(3), 694-701. — 瘦素对短期能量平衡变化的反应。\n\nCampbell, B. I. et al. (2020). “Intermittent energy restriction attenuates the loss of fat-free mass in resistance trained individuals.” Journal of Functional Morphology and Kinesiology, 5(1), 19. — 力量训练者的饮食休息期。\n\nPeos, J. J. et al. (2019). “Intermittent dieting: theoretical considerations for the athlete.” Sports, 7(1), 22. — 运动领域间歇节食方法的理论框架。',
      },
    ],
  },

  mini_cut: {
    name: '迷你减脂期（Mini Cut）',
    summary: '一个为期 4–6 周的短期激进减脂周期，热量缺口高达 -800 kcal。只要蛋白质保持在高水平、训练保持高强度，迷你减脂期就能在肌肉流失极少的情况下快速减脂。非常适合作为两个增肌期之间的短期调整。',
    quick: {
      methode: '4–6 周激进缺口（-800 kcal），高蛋白（2.5 g/kg），保持训练强度',
      fuer_wen: '增肌期结束后想快速降低体脂、又不想经历漫长节食的有经验力量训练者',
    },
    sections: [
      {
        title: '什么是迷你减脂期？',
        content: '迷你减脂期（Mini Cut）是一个为期 4–6 周的短期高强度减脂阶段，热量缺口较为激进，通常比每日消耗低 800 kcal。与持续 12–20 周的常规节食阶段不同，迷你减脂期用更大的缺口压缩了时间。\n\n这个概念起源于健美圈，并由 Eric Helms 和 Lyle McDonald 等营养教练推广开来。核心思路是：短期激进的缺口比长期适度的缺口引起的代谢适应更少，因为在 4–6 周内，身体没有足够的时间明显下调代谢率。\n\n迷你减脂期通常用在两个增肌期之间，即增肌阶段后体脂升得太高的时候。与其执行完整的 12 周减脂期，不如用 4–6 周的迷你减脂期减掉 2–4 kg 脂肪，让训练者回到可接受的体脂范围，再开始下一个增肌期。\n\n成功的关键是每公斤体重 2.5 g 的高蛋白摄入（以确保保留肌肉），以及保持训练强度——重量不应降低，不过训练量（组数）可以适度减少。由于时间短，迷你减脂期在心理上比长期节食更容易坚持，这是它最大的优势之一。',
      },
      {
        title: '科学背景',
        content: '迷你减脂期的科学基础在于代谢适应随时间变化的规律。Trexler et al.（2014, Journal of the International Society of Sports Nutrition）在其全面综述中描述，代谢适应会随时间推进，在节食的头 2–3 周仍相对轻微。基础代谢率要到 4–6 周后才会明显下降，这就确定了迷你减脂期的时间窗口。\n\nMurphy & Koehler（2022, Sports Medicine）在一项荟萃分析中分析了不同缺口大小对身体成分的影响。他们发现，只要蛋白质摄入至少达到 2.3 g/kg，700–1000 kcal 的激进缺口在短期内（6 周以内）对保留肌肉的效果与适度缺口相当。但在较长时间（超过 8 周）时，适度缺口明显更优。\n\nGarthe et al.（2011, International Journal of Sport Nutrition and Exercise Metabolism）在 4–12 周内比较了 20% 缺口（慢速，约 -400 kcal）与 30% 缺口（快速，约 -800 kcal）的运动员。慢速组的肌肉量反而增加了，而快速组略有减少——不过在高蛋白摄入且时间较短的情况下，差别很小。\n\nChappell et al.（2018, Journal of the International Society of Sports Nutrition）记录到，在自然健美运动员中，缺口较大的短期节食阶段在激素方面的负面影响比长期适度节食更小，尤其是在睾酮和甲状腺激素方面。',
      },
      {
        title: '好处与预期效果',
        content: '迷你减脂期最大的优势是省时。只需 4–6 周就能取得明显效果，而不必花好几个月节食。对主要关注增肌的训练者来说，迷你减脂期能在下一个增肌期开始前，快速“修正”体脂率。\n\n代谢适应极少，是相比长期节食的一个关键优势。由于代谢在 4–6 周内没有明显下调，迷你减脂期结束后可以无缝过渡到增肌期或维持期，而不需要花数周进行“反向节食”（逐步增加热量）。\n\n在心理上，迷你减脂期比 12–20 周的节食容易坚持得多。知道艰难阶段最多 6 周就会结束，能提高依从性，降低放弃节食的风险。效果很快可见所带来的高涨动力会进一步加强这种效应。\n\n坚持执行的预期效果：4–6 周内减脂 2–4 kg，保留 90–95% 的肌肉（蛋白质和训练到位的情况下），体脂率降低 2–3 个百分点，为接下来的增肌期改善胰岛素敏感性，以及更好的脂肪与肌肉比例。迷你减脂期之后，增肌条件往往比之前更好，因为较低的体脂率能改善营养分配。',
      },
      {
        title: '适合谁？',
        content: '迷你减脂期主要为有至少 2–3 年训练经验的有经验力量训练者设计。理解训练强度与训练量之间的区别、知道如何根据缺口调整训练的进阶训练者，会取得最好的效果。\n\n适合迷你减脂期的理想情境：增肌期后体脂升到 18–20%（男性）或 28–30%（女性）以上时。假期或活动前希望快速看到效果时。在长期增肌计划中作为改善胰岛素敏感性的阶段性措施。\n\n现实的起始体脂率很重要。迷你减脂期在体脂 15–22%（男性）或 25–32%（女性）时效果最好。如果体脂已经很低（男性低于 12%），-800 kcal 的激进缺口对保留肌肉来说风险太大，更适合选择更长、更温和的节食。\n\n迷你减脂期不适合：新手（他们从较长时间的适度缺口中受益更多）、有饮食失调或有极端节食倾向的人、减重目标超过 10 kg 的人（时间太短），以及同时进行高水平耐力训练和力量训练的人，因为激进的缺口会严重影响恢复。',
      },
      {
        title: '实际执行',
        content: '执行遵循清晰的 4–6 周计划。第 1 步：确定 TDEE 并减去 800 kcal。TDEE 为 2800 kcal 时，就是每天 2000 kcal。第 2 步：蛋白质设定为 2.5 g/kg（80 kg 时 = 200 g = 800 kcal）。第 3 步：把剩下的 1200 kcal 分配给脂肪（至少 60 g = 540 kcal）和碳水化合物（165 g = 660 kcal）。\n\n训练调整至关重要：训练强度（杠铃上的重量）保持不变，但训练量减少 20–30%。具体来说：如果平时每个肌群每周练 20 组，迷你减脂期间 14–16 组就够了。大重量复合动作（深蹲、硬拉、卧推）保留在计划中；孤立动作可以减少。\n\n营养时机：把蛋白质平均分配到 4–5 餐。碳水化合物最好安排在训练前后。多吃体积大、热量低的食物（蔬菜、沙拉、浆果），以最大程度地增加饱腹感。\n\n每周监测：记录体重（7 天平均值）、腰围、训练中的力量水平以及主观感受。如果力量下降超过 15% 或出现严重疲劳，应提前结束迷你减脂期。迷你减脂期结束后：立即回到维持热量（不是逐步增加），因为仅 4–6 周后的代谢适应很小。维持 1–2 周后，就可以开始下一个增肌期。',
      },
      {
        title: '风险与常见错误',
        content: '迷你减脂期最大的风险是延长到计划的 4–6 周之后。效果好的时候，人很容易想“再多加几周”。这会适得其反，因为从第 6–8 周起代谢适应会明显增强，而且在 -800 kcal 缺口下无法长时间保证保留肌肉。严格遵守计划好的结束日期。\n\n一个常见错误是同时降低训练强度和训练量。训练量可以适度减少，但强度（重量）必须保持。McDonald（2005）强调，缺口期间保留肌肉最强的刺激是机械张力——也就是大重量。因为精力不足就练轻重量，会有加速肌肉流失的风险。\n\n在如此激进的缺口下，蛋白质不足尤其危险。每比 2.3 g/kg 少一克，肌肉流失的风险都会明显增加。在饮食规划中，蛋白质必须是最高优先级——拿不准的时候，进一步减少的是碳水和脂肪，永远不是蛋白质。\n\n睡眠不足和压力会明显恶化迷你减脂期的效果。Nedeltcheva et al.（2010, Annals of Internal Medicine）表明，睡眠不足（5.5 小时对 8.5 小时）使总减重中脂肪所占比例降低了 55%，肌肉分解则增加了一倍。迷你减脂期间至少 7–8 小时的睡眠是没有商量余地的。最后，不要在一次迷你减脂期结束后紧接着再做一次——两次之间至少应隔开 8–12 周的增肌期或维持期。',
      },
      {
        title: '研究与参考文献',
        content: 'Trexler, E. T. et al. (2014). “Metabolic adaptation to weight loss: implications for the athlete.” Journal of the International Society of Sports Nutrition, 11(1), 7. — 关于代谢适应随时间变化规律的全面综述。\n\nGarthe, I. et al. (2011). “Effect of two different weight-loss rates on body composition and strength and power-related performance in elite athletes.” International Journal of Sport Nutrition and Exercise Metabolism, 21(2), 97-104. — 比较了运动员慢速与快速减重的效果。\n\nMurphy, C. & Koehler, K. (2022). “Energy deficiency impairs resistance training gains in lean mass but not strength.” Sports Medicine, 52(2), 249-259. — 关于缺口大小与身体成分的荟萃分析。\n\nChappell, A. J. et al. (2018). “Nutritional strategies of high level natural bodybuilders during competition preparation.” Journal of the International Society of Sports Nutrition, 15(1), 4. — 来自自然健美运动员的实践数据，涉及节食时长和激素影响。\n\nNedeltcheva, A. V. et al. (2010). “Insufficient sleep undermines dietary efforts to reduce adiposity.” Annals of Internal Medicine, 153(7), 435-441. — 睡眠不足使节食期间的肌肉流失增加了一倍。\n\nHelms, E. R. et al. (2014). “Evidence-based recommendations for natural bodybuilding contest preparation.” Journal of the International Society of Sports Nutrition, 11, 20. — 关于缺口期间蛋白质和训练调整的建议。\n\nMcDonald, L. (2005). “The Rapid Fat Loss Handbook.” Lyle McDonald Publishing. — 关于高蛋白短期激进节食的实用手册。',
      },
    ],
  },
};
