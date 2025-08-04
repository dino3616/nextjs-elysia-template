export const cultureData = [
  {
    id: "japan",
    destination: "日本",
    lastUpdated: "2025-07-28T10:00:00Z", // Example date, for stale check
    source: "日本文化研究会",
    reliability: "高",
    insights: {
      religiousBackground: "神道と仏教が主要な宗教です。多くの神社仏閣が存在し、参拝時には特定の作法があります。",
      socialManners: "公共の場での静粛性、列に並ぶこと、他者への配慮が重視されます。チップの習慣はありません。",
      traditionalGreetings: "お辞儀が一般的です。深さや回数で敬意の度合いを示します。",
      diningEtiquette:
        "食事の前に「いただきます」、食後に「ごちそうさま」と言います。箸の使い方は重要で、箸を立てたり、人に向けるのは避けます。",
      dressCode: "一般的に清潔感のある服装が好まれます。寺院や特定の場所では肌の露出を控えるべきです。",
    },
    sidebarInfo: "日本の文化は多様で地域差も大きいです。特に京都や奈良では伝統的な習慣が色濃く残っています。",
    warnings: [
      {
        activity: "寺院見学",
        type: "taboo", // "taboo" (red) or "consideration" (yellow)
        title: "寺院での写真撮影に関する注意事項",
        description: "多くの寺院では、本堂内や特定の仏像の撮影が禁止されています。フラッシュの使用も厳禁です。",
        consequences: "信仰の対象への冒涜と見なされ、退場を求められる場合があります。",
        alternative: "撮影が許可されている場所でのみ撮影し、禁止区域では心に留めるか、絵葉書などを購入しましょう。",
        legalRisk: "低",
      },
      {
        activity: "現地での写真撮影",
        type: "consideration",
        title: "人物撮影に関する注意事項",
        description: "日本で人物を撮影する際は、必ず事前に許可を得てください。特に子供の撮影には注意が必要です。",
        consequences: "プライバシー侵害と見なされる可能性があります。",
        alternative: "許可を得るか、背景や風景を中心に撮影しましょう。",
        legalRisk: "中",
      },
      {
        activity: "食事",
        type: "consideration",
        title: "箸の渡し方に関する注意事項",
        description:
          "食事中に箸から箸へ食べ物を渡すのは、火葬後の骨を拾う行為を連想させるため、非常に不適切とされています。",
        consequences: "相手に不快感を与える可能性があります。",
        alternative: "取り箸を使うか、一度皿に置いてから渡しましょう。",
        legalRisk: "無",
      },
    ],
    touristSpots: [
      {
        name: "金閣寺",
        nameLocal: "鹿苑寺 (Kinkaku-ji)",
        address: "京都市北区金閣寺町1",
        addressLocal: "京都市北区金閣寺町１ (Kyōto-shi Kita-ku Kinkakuji-chō 1)",
        openingHours: "9:00 - 17:00",
        openingHoursLocal: "午前9時〜午後5時 (Gozen ku-ji kara gogo go-ji)",
        culturalSignificance:
          "室町時代の代表的な建築物で、世界遺産にも登録されています。舎利殿は金箔で覆われ、池に映る姿が美しいです。",
        phrases: [
          {
            jp: "金閣寺はどこですか？",
            local: "Kinkaku-ji wa doko desu ka?",
            pronunciation: "キンカクジ ワ ドコ デス カ",
          },
          {
            jp: "入場料はいくらですか？",
            local: "Nyūjōryō wa ikura desu ka?",
            pronunciation: "ニュージョーリョー ワ イクラ デス カ",
          },
          {
            jp: "写真を撮ってもいいですか？",
            local: "Shashin o totte mo ii desu ka?",
            pronunciation: "シャシン オ トッテ モ イイ デス カ",
          },
          { jp: "ありがとうございます", local: "Arigatou gozaimasu", pronunciation: "アリガトウ ゴザイマス" },
        ],
      },
      {
        name: "東京タワー",
        nameLocal: "東京タワー (Tōkyō Tawā)",
        address: "東京都港区芝公園4丁目2-8",
        addressLocal: "東京都港区芝公園４丁目２−８ (Tōkyō-to Minato-ku Shibakōen 4-chōme 2-8)",
        openingHours: "9:00 - 22:30",
        openingHoursLocal: "午前9時〜午後10時30分 (Gozen ku-ji kara gogo jū-ji sanjup-pun)",
        culturalSignificance: "日本の高度経済成長のシンボルであり、東京のランドマークの一つです。夜景が特に有名です。",
        phrases: [
          {
            jp: "東京タワーはどこですか？",
            local: "Tōkyō Tawā wa doko desu ka?",
            pronunciation: "トーキョー タワー ワ ドコ デス カ",
          },
          {
            jp: "入場料はいくらですか？",
            local: "Nyūjōryō wa ikura desu ka?",
            pronunciation: "ニュージョーリョー ワ イクラ デス カ",
          },
          {
            jp: "写真を撮ってもいいですか？",
            local: "Shashin o totte mo ii desu ka?",
            pronunciation: "シャシン オ トッテ モ イイ デス カ",
          },
          { jp: "ありがとうございます", local: "Arigatou gozaimasu", pronunciation: "アリガトウ ゴザイマス" },
        ],
      },
    ],
  },
  {
    id: "thailand",
    destination: "タイ",
    lastUpdated: "2025-07-20T10:00:00Z",
    source: "タイ文化省",
    reliability: "高",
    insights: {
      religiousBackground: "仏教が主要な宗教です。寺院では敬意を払い、特定の服装規定があります。",
      socialManners:
        "頭は神聖なもの、足は不浄なものとされます。人の頭を触ったり、足で物を指したりするのは避けます。王室への敬意が非常に重要です。",
      traditionalGreetings: "合掌して挨拶する「ワイ」が一般的です。相手の地位によって手の高さが変わります。",
      diningEtiquette: "スプーンとフォークを使うのが一般的です。箸は麺料理で使われます。大皿料理は皆でシェアします。",
      dressCode: "寺院や王宮を訪れる際は、肩や膝が隠れる服装が必要です。ビーチ以外では水着での外出は避けます。",
    },
    sidebarInfo: "タイは「微笑みの国」として知られ、人々は親切ですが、文化的なタブーには注意が必要です。",
    warnings: [
      {
        activity: "寺院見学",
        type: "taboo",
        title: "寺院での服装に関する注意事項",
        description:
          "タイの寺院では、肩や膝が露出する服装は禁止されています。ノースリーブやショートパンツは避けましょう。",
        consequences: "入場を拒否されるか、不敬と見なされる可能性があります。",
        alternative: "長袖のシャツやズボン、スカートを着用するか、羽織るものを持参しましょう。",
        legalRisk: "低",
      },
      {
        activity: "現地での写真撮影",
        type: "consideration",
        title: "仏像撮影に関する注意事項",
        description: "仏像を撮影する際は、仏像に背を向けてポーズを取ったり、不適切な姿勢で撮影するのは避けましょう。",
        consequences: "不敬と見なされる可能性があります。",
        alternative: "敬意を払った姿勢で撮影し、仏像に背を向けないようにしましょう。",
        legalRisk: "無",
      },
      {
        activity: "食事",
        type: "consideration",
        title: "食事中の音に関する注意事項",
        description:
          "タイでは、麺類を食べる際に音を立てるのは一般的に問題ありませんが、他の料理では音を立てない方が良いとされています。",
        consequences: "特にありませんが、上品に見えない場合があります。",
        alternative: "麺類以外は静かに食べましょう。",
        legalRisk: "無",
      },
    ],
    touristSpots: [
      {
        name: "ワット・アルン",
        nameLocal: "วัดอรุณราชวรารามราชวรมหาวิหาร (Wat Arun Ratchawararam Ratchawaramahawihan)",
        address: "158 Thanon Wang Doem, Wat Arun, Bangkok Yai, Bangkok 10600",
        addressLocal:
          "158 ถนนวังเดิม แขวงวัดอรุณ เขตบางกอกใหญ่ กรุงเทพมหานคร 10600 (158 Thanon Wang Doem, Khwaeng Wat Arun, Khet Bangkok Yai, Krung Thep Maha Nakhon 10600)",
        openingHours: "8:00 - 17:30",
        openingHoursLocal: "8.00 น. - 17.30 น. (Paet Mong Chao - Ha Mong Khrueng Yen)",
        culturalSignificance:
          "チャオプラヤ川沿いに位置する美しい寺院で、「暁の寺」として知られています。陶器の破片で装飾された仏塔が特徴です。",
        phrases: [
          {
            jp: "ワット・アルンはどこですか？",
            local: "Wat Arun yoo tee nai krab/ka?",
            pronunciation: "ワット アルン ユー ティー ナイ クラップ/カー",
          },
          {
            jp: "入場料はいくらですか？",
            local: "Kha khao chamnan tao rai krab/ka?",
            pronunciation: "カー カオ チャムナン タオ ライ クラップ/カー",
          },
          {
            jp: "写真を撮ってもいいですか？",
            local: "Tai roop dai mai krab/ka?",
            pronunciation: "タイ ループ ダイ マイ クラップ/カー",
          },
          { jp: "ありがとうございます", local: "Khob khun krab/ka", pronunciation: "コップ クン クラップ/カー" },
        ],
      },
    ],
  },
]

export type CultureData = (typeof cultureData)[0]
export type CulturalInsight = CultureData["insights"]
export type CulturalWarning = CultureData["warnings"][0]
export type TouristSpot = CultureData["touristSpots"][0]
export type Phrase = TouristSpot["phrases"][0]
