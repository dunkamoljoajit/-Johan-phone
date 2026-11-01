// ============================================
// System & Navigation State
// ============================================
let openAppStack = [];
let currentApp = null;
let isViewerFav = false;
let currentLang = localStorage.getItem('sim_lang') || 'th';

// Photo Viewer State
let currentViewerPhotos = [];
let currentViewerIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// ============================================
// พจนานุกรมแปลภาษา 5 ภาษาแบบสมบูรณ์ (Production-Ready)
// ============================================
const i18n = {
    th: {
        galleryTitle: 'แกลเลอรี', tabPictures: 'รูปภาพ', tabAlbums: 'อัลบั้ม', itemsSuffix: 'รายการ', today: 'วันนี้', yesterday: 'เมื่อวานนี้', noPhotos: 'ยังไม่มีรูปภาพ', favAdded: 'เพิ่มในรายการโปรดแล้ว', favRemoved: 'ลบออกจากรายการโปรด', langSelectedMsg: 'เลือกภาษาไทยเรียบร้อย', appNameGallery: 'แกลเลอรี', appNameMessages: 'ข้อความ', appNameIg: 'Instagram', appNameLine: 'LINE', appNameKbank: 'K PLUS', appNameStore: 'Store', appNameStocks: 'หุ้น',
        city: 'กรุงเทพมหานคร', weatherDesc: 'แดดจัด · สูงสุด 33°', summaryTitle: 'สรุปช่วงกลางวัน', searchPlaceholder: 'ค้นหา...', recentsTitle: 'แอปล่าสุด', recentsClear: 'ปิดทั้งหมด', recentsHome: 'กลับไปหน้าหลัก', noRecents: 'ไม่มีแอปล่าสุด', recentTapToOpen: 'แตะเพื่อกลับไปเปิด',
        msgContactName: 'North', msgContactStatus: 'ใช้งานเมื่อครู่นี้', 
        msgDate1: 'เมื่อวาน 08:30 น.', msgOld1: 'มอนิ่งครับ วันนี้มีเรียนเช้าไหม?', msgOld2: 'มีครับ 10 โมง', msgOld3: 'ตั้งใจเรียนนะ เลิกแล้วทักมา', msgOld4: 'ค้าบบบ พี่ก็สู้ๆ นะ ✌️',
        msgDate2: 'วันนี้ 12:15 น.', msgOld5: 'พักเที่ยงแล้ว กินอะไรหรือยัง?', msgOld6: 'กินก๋วยเตี๋ยวหน้ามอครับ อร่อยมากก 🍜',
        msgDateHeader: 'วันนี้ 16:30 น.', msgOutgoing: 'เลิกเรียนเดี๋ยวพี่ไปรับนะ', msgIncoming: 'ครับ รับทราบ',
        xUserName: 'North', xPostContent: 'our wedding ceremony  @j💖', xViewTranslate: 'ดูคำแปล', igAppName: 'Instagram',
        lineTitle: 'แชท LINE', lineTabChat: 'แชท', lineTabFriend: 'เพื่อน', lineTabGroup: 'กลุ่ม', lineChat1Msg: 'มันตัวน่ารำคาญนะครับ พี่เลยบล็อกไปให้จบ ๆ เจอกันที่ห้องนะ', lineChat2Msg: 'คุณได้บล็อก Arthit', lineChat3Msg: 'มีข้อความใหม่',
        kbankAcc: 'บัญชีของฉัน', kbankBalanceLabel: 'ยอดเงินคงเหลือ', kbankTransfer: 'โอนเงิน', kbankScan: 'สแกนจ่าย', kbankTopup: 'เติมเงิน', kbankAll: 'ทั้งหมด', kbankFav: 'รายการโปรด', kbankEdit: 'แก้ไข', kbankRecent: 'รายการล่าสุด', kbankTx1: 'โอนเงินให้ North', kbankTx2: 'ชำระค่าสินค้า (ซื้อของ)', kbankTx3: 'ชำระค่าสินค้า (ค่าคอม)', kbankModalTitle: 'โอนเงิน / ชำระเงิน', kbankAmountLabel: 'จำนวนเงิน (บาท)', kbankConfirmBtn: 'ยืนยันการโอนเงิน',
        stocksTitle: 'พอร์ตลงทุน', stocksWatchlist: 'รายการที่ติดตาม', stocksUsMarket: 'ตลาดหุ้นสหรัฐฯ', stocksBuy: 'ซื้อ', stocksSell: 'ขาย',
        toastPhone: 'โทรศัพท์', toastInternet: 'อินเทอร์เน็ต', toastCamera: 'กล้อง', toastStore: 'สโตร์', toastNewAlbum: 'อัลบั้มใหม่', toastSearch: 'ค้นหา', toastMore: 'เพิ่มเติม', toastEditor: 'เครื่องมือแต่งภาพ AI', toastShare: 'แชร์ด่วน', toastDeleted: 'ลบแล้ว', toastSimOnly: 'หน้าซื้อขายจำลองเท่านั้น', toastChatSearch: 'ค้นหาแชท', toastAddFriend: 'เพิ่มเพื่อน / สร้างกลุ่ม',
        viewerFav: 'โปรด', viewerEdit: 'แก้ไข', viewerShare: 'แชร์', viewerDelete: 'ลบ', albumTitles: { camera: 'กล้อง', favorites: 'รายการโปรด', screenshots: 'Pre wedding', downloads: 'ดาวน์โหลด' },
        
        arthitMsg1: "โจทำไรอยู่", arthitMsg2: "มึงอ่านแล้วตอบหน่อยสิโจ", arthitMsg3: "มึงไม่ตอบกูเลยนะโจ", arthitMsg4: "น่ารำคาญ",
        arthitMsg5: "มึงไปกวนอะไรนอร์ธ", arthitMsg6: "ก็มึงไม่ตอบกูอะโจ", arthitMsg7: "แถมบล็อกกูอีก", arthitMsg8: "โจตังกูไม่พอว่ะ โอนให้หน่อย",
        arthitMsg9: "เออไอสัส", arthitMsg10: "มีอะไรก็ว่ามา", arthitMsg11: "เดี๋ยวกูต้องไปทานข้าวเที่ยงกับนอร์ธแล้ว", arthitMsg12: "นี่มึงจนขนาดขอตังค์กูเลยเหรอทิตย์",
        arthitMsg13: "โอนมาเหอะโจ เดี๋ยวมึงไปทานข้าวเที่ยงกับนอร์ธไม่ทันนะ และอย่าคิดบล็อกกู เพราะกูจะทักไปกวนเมียมึงไม่จบไม่สิ้นแน่",
        arthitMsg14: "ส่งสลิป", arthitMsg15: "พอใจมึงแล้วใช่ไหมทิตย์", arthitMsg16: "เออ ก็แค่นี้",

        northMsg1: "ตอนเย็นพี่ไปรับนะ", northMsg2: "มีประชุมไม่ใช่เหรอครับ เหมือนพี่ปรางจะบอกนอร์ธนะ",
        northMsg3: "พอดีเกิดเรื่องนิดหน่อยน่ะ ประชุมเลยเลื่อน ไม่อยากให้พี่ไปรับเหรอ", northMsg4: "ไม่ใช่อย่างนั้นสักหน่อย นอร์ธแค่สงสัยเฉยๆ เจอกันตอนเย็นนะครับพี่โจ",
        northMsg5: "พักเที่ยงแล้วครับนอร์ธ ทานข้าวหรือยังเอ่ย? อย่าลืมทานให้ตรงเวลานะครับ 🍲",
        northMsg6: "กำลังทานก๋วยเตี๋ยวหน้ามอครับกับพวกจิ๋ว อร่อยมากก แต่ถ้ามีพี่โจมานั่งทานด้วยคงอร่อยกว่านี้",
        northMsg7: "เลิกเรียนหรือยังครับ? เดี๋ยวพี่ขับรถไปรับข้างหน้าตึกนะ อยากเจอหน้าจะแย่แล้ว",
        northMsg8: "เลิกพอดีเลยครับ! นอร์ธรออยู่ตรงม้านั่งนะ รีบมาน้าา คิดถึงที่สุดเลยครับ",
        northMsg9: "ครับ พี่จะรีบไปนะ! คิดถึงเหมือนกัน", northMsg10: "อย่ารีบนะครับ ค่อยๆ ขับรถมาน้า นอร์ธรอได้",
        northMsg11: "ครับ พี่จะค่อยๆ ขับไปนะ", northMsg12: "ครับ นอร์ธรอได้",
        northMsg13: "พี่มีประชุมด่วนครับนอร์ธ สัญญาว่าจะมาทานข้าวตอนเที่ยงด้วยแท้ๆ",
        northMsg14: "ก็ว่าอยู่พี่โจหายไปไหน ประชุมนี่เอง สัญญาแล้วนะครับว่าจะมาทานข้าวด้วยกัน",
        northMsg15: "สัญญาแล้วนะครับว่าจะมาทานข้าวด้วยกัน", northMsg16: "น่าจะติดประชุมอยู่แน่เลย นอร์ธไปหาอะไรทานก่อนนะครับ",
        northMsg17: "นอร์ธกินข้าวอยู่ พี่ทิตย์ก็มากวนนอร์ธอีกแล้ว บ่นว่าพี่โจบล็อกมัน พี่มันทำอะไรพี่โจอีกแล้วครับ เดี๋ยวนอร์ธจัดการให้",
        northMsg18: "เดี๋ยวพี่กลับไปเล่าให้ฟังที่ห้องนะครับ ตอนทานข้าวเที่ยงด้วยกัน",
        northMsg19: "ทำไมบอกนอร์ธเลยไม่ได้ล่ะครับพี่โจ", northMsg20: "มันเป็นตัวน่ารำคาญนะครับ พี่เลยบล็อกไปให้จบๆ เจอกันที่ห้องนะ"
    },
    en: {
        galleryTitle: 'Gallery', tabPictures: 'Pictures', tabAlbums: 'Albums', itemsSuffix: 'items', today: 'Today', yesterday: 'Yesterday', noPhotos: 'No photos yet', favAdded: 'Added to favorites', favRemoved: 'Removed from favorites', langSelectedMsg: 'English selected', appNameGallery: 'Gallery', appNameMessages: 'Messages', appNameIg: 'Instagram', appNameLine: 'LINE', appNameKbank: 'K PLUS', appNameStore: 'Store', appNameStocks: 'Stocks',
        city: 'Bangkok', weatherDesc: 'Sunny · H: 33°', summaryTitle: 'Day Summary', searchPlaceholder: 'Search...', recentsTitle: 'Recent Apps', recentsClear: 'Clear All', recentsHome: 'Back to Home', noRecents: 'No recent apps', recentTapToOpen: 'Tap to open',
        msgContactName: 'North', msgContactStatus: 'Active now',
        msgDate1: 'Yesterday 08:30', msgOld1: 'Morning! Do you have morning classes today?', msgOld2: 'Yes, at 10 AM.', msgOld3: 'Study hard! Text me when you are done.', msgOld4: 'Will do! You do your best too, P\'Jo ✌️',
        msgDate2: 'Today 12:15', msgOld5: 'Lunch break! Have you eaten?', msgOld6: 'Having noodles in front of the uni. It\'s so good 🍜',
        msgDateHeader: 'Today 16:30', msgOutgoing: "I'll pick you up after class.", msgIncoming: 'Okay, got it.',
        xUserName: 'North', xPostContent: 'our wedding ceremony  @j💖', xViewTranslate: 'See translation', igAppName: 'Instagram',
        lineTitle: 'LINE Chat', lineTabChat: 'Chats', lineTabFriend: 'Friends', lineTabGroup: 'Groups', lineChat1Msg: 'He\'s just annoying, so I blocked him to end it. See you in the room.', lineChat2Msg: 'You blocked Arthit', lineChat3Msg: 'New message',
        kbankAcc: 'My Account', kbankBalanceLabel: 'Available Balance', kbankTransfer: 'Transfer', kbankScan: 'Scan QR', kbankTopup: 'Top Up', kbankAll: 'All', kbankFav: 'Favorites', kbankEdit: 'Edit', kbankRecent: 'Recent Transactions', kbankTx1: 'Transfer to North', kbankTx2: 'Payment (Shopping)', kbankTx3: 'Payment (Commission)', kbankModalTitle: 'Transfer / Payment', kbankAmountLabel: 'Amount (THB)', kbankConfirmBtn: 'Confirm Transfer',
        stocksTitle: 'Portfolio', stocksWatchlist: 'Watchlist', stocksUsMarket: 'US Market', stocksBuy: 'Buy', stocksSell: 'Sell',
        toastPhone: 'Phone', toastInternet: 'Internet', toastCamera: 'Camera', toastStore: 'Store', toastNewAlbum: 'New Album', toastSearch: 'Search', toastMore: 'More', toastEditor: 'AI Photo Editor', toastShare: 'Quick Share', toastDeleted: 'Deleted', toastSimOnly: 'Simulation only', toastChatSearch: 'Search chats', toastAddFriend: 'Add Friend / Create Group',
        viewerFav: 'Fav', viewerEdit: 'Edit', viewerShare: 'Share', viewerDelete: 'Delete', albumTitles: { camera: 'Camera', favorites: 'Favorites', screenshots: 'Pre wedding', downloads: 'Downloads' },
        
        arthitMsg1: "Jo, what are you doing?", arthitMsg2: "Read and reply to me, Jo.", arthitMsg3: "You're seriously ignoring me, Jo.", arthitMsg4: "Fucking annoying.",
        arthitMsg5: "Why the hell are you bothering North?", arthitMsg6: "Because you weren't answering me, Jo.", arthitMsg7: "And you even blocked me.", arthitMsg8: "Jo, I'm short on cash. Transfer some to me.",
        arthitMsg9: "Yeah, you bastard.", arthitMsg10: "Just spit it out.", arthitMsg11: "I have to go have lunch with North soon.", arthitMsg12: "Are you really so broke that you have to beg me for money, Thit?",
        arthitMsg13: "Just transfer it, Jo. Otherwise you'll be late for your lunch with North. And don't even think about blocking me, or I'll harass your wife endlessly.",
        arthitMsg14: "Send slip", arthitMsg15: "Are you satisfied now, Thit?", arthitMsg16: "Yeah, that's more like it.",

        northMsg1: "I'll pick you up this evening.", northMsg2: "Don't you have a meeting? I thought P'Prang mentioned it to North.",
        northMsg3: "Something came up, so the meeting got postponed. Don't you want me to pick you up?", northMsg4: "It's not like that at all! North was just wondering. See you this evening, P'Jo.",
        northMsg5: "It's lunch break, North. Have you eaten yet? Don't forget to eat on time 🍲",
        northMsg6: "North is having noodles in front of the uni with Jiw's gang. It's really good, but it would be even better if P'Jo was eating here with me.",
        northMsg7: "Are classes over? I'll drive over and wait in front of your building. I'm dying to see you.",
        northMsg8: "Just finished! North is waiting at the bench. Hurry up, I miss you so much.",
        northMsg9: "Okay, I'll be right there! I miss you too.", northMsg10: "Don't rush, drive safely. North can wait.",
        northMsg11: "Got it, I'll drive carefully.", northMsg12: "Okay, North can wait.",
        northMsg13: "I've got an urgent meeting, North. And I promised I'd have lunch with you too...",
        northMsg14: "I was wondering where P'Jo disappeared to. So it's a meeting. You promised we'd have lunch together, you know.",
        northMsg15: "You promised we'd have lunch together.", northMsg16: "He must still be stuck in the meeting. North will go find something to eat first.",
        northMsg17: "North is eating right now, and P'Thit is bothering me again, complaining that P'Jo blocked him. What did he do to P'Jo this time? North will handle him for you.",
        northMsg18: "I'll tell you about it back in the room while we have lunch together.",
        northMsg19: "Why can't you just tell North right now, P'Jo?", northMsg20: "He's just annoying, so I blocked him to be done with it. See you in the room."
    },
    ko: {
        galleryTitle: '갤러리', tabPictures: '사진', tabAlbums: '앨범', itemsSuffix: '항목', today: '오늘', yesterday: '어제', noPhotos: '사진 없음', favAdded: '즐겨찾기에 추가됨', favRemoved: '즐겨찾기에서 삭제됨', langSelectedMsg: '한국어가 선택되었습니다', appNameGallery: '갤러리', appNameMessages: '메시지', appNameIg: 'Instagram', appNameLine: 'LINE', appNameKbank: 'K PLUS', appNameStore: '스토어', appNameStocks: '주식',
        city: '방콕', weatherDesc: '맑음 · 최고 33°', summaryTitle: '오늘의 요약', searchPlaceholder: '검색...', recentsTitle: '최근 앱', recentsClear: '모두 닫기', recentsHome: '홈으로 이동', noRecents: '최근 앱 없음', recentTapToOpen: '탭하여 열기',
        msgContactName: 'North', msgContactStatus: '현재 활동 중',
        msgDate1: '어제 08:30', msgOld1: '좋은 아침! 오늘 오전 수업 있어?', msgOld2: '네, 10시요.', msgOld3: '공부 열심히 해! 끝나면 연락하고.', msgOld4: '네! 형도 화이팅 ✌️',
        msgDate2: '오늘 12:15', msgOld5: '점심시간이네! 밥은 먹었어?', msgOld6: '학교 앞 국수 먹었어요. 진짜 맛있어요 🍜',
        msgDateHeader: '오늘 16:30', msgOutgoing: '수업 끝나면 데리러 갈게.', msgIncoming: '네, 알겠습니다.',
        xUserName: 'North', xPostContent: '우리의 결혼식 @j (우리의 웨딩 세리머니 @j💖', xViewTranslate: '번역 보기', igAppName: 'Instagram',
        lineTitle: 'LINE 채팅', lineTabChat: '채팅', lineTabFriend: '친구', lineTabGroup: '그룹', lineChat1Msg: '귀찮은 새끼라서 그냥 차단했어. 방에서 보자.', lineChat2Msg: 'Arthit님을 차단했습니다', lineChat3Msg: '새 메시지',
        kbankAcc: '내 계좌', kbankBalanceLabel: '잔액', kbankTransfer: '이체', kbankScan: 'QR 스캔', kbankTopup: '충전', kbankAll: '전체', kbankFav: '즐겨찾기', kbankEdit: '편집', kbankRecent: '최근 거래', kbankTx1: 'North에게 이체', kbankTx2: '상품 결제 (쇼핑)', kbankTx3: '상품 결제 (수수료)', kbankModalTitle: '이체 / 결제', kbankAmountLabel: '금액 (THB)', kbankConfirmBtn: '이체 확인',
        stocksTitle: '투자 포트폴리오', stocksWatchlist: '관심 종목', stocksUsMarket: '미국 시장', stocksBuy: '매수', stocksSell: '매도',
        toastPhone: '전화', toastInternet: '인터넷', toastCamera: '카메라', toastStore: '스토어', toastNewAlbum: '새 앨범', toastSearch: '검색', toastMore: '더보기', toastEditor: 'AI 사진 편집기', toastShare: '퀵 공유', toastDeleted: '삭제됨', toastSimOnly: '시뮬레이션 전용', toastChatSearch: '채팅 검색', toastAddFriend: '친구 추가 / 그룹 생성',
        viewerFav: '즐겨찾기', viewerEdit: '편집', viewerShare: '공유', viewerDelete: '삭제', albumTitles: { camera: '카메라', favorites: '즐겨찾기', screenshots: 'Pre wedding', downloads: '다운로드' },

        arthitMsg1: "조, 뭐 하냐?", arthitMsg2: "읽었으면 대답 좀 해라, 조.", arthitMsg3: "내 연락 아예 씹네, 조.", arthitMsg4: "아, 짜증 나게.",
        arthitMsg5: "너 왜 노스한테 지랄이야?", arthitMsg6: "네가 내 연락 안 받으니까 그렇지, 조.", arthitMsg7: "게다가 나 차단까지 했잖아.", arthitMsg8: "조, 나 돈 쪼들려. 좀 보내라.",
        arthitMsg9: "그래 이 새끼야.", arthitMsg10: "할 말 있으면 해.", arthitMsg11: "나 곧 노스랑 점심 먹으러 가야 되니까.", arthitMsg12: "너 나한테 돈 구걸할 정도로 거지냐, 팃?",
        arthitMsg13: "그냥 보내라, 조. 안 그러면 너 노스랑 점심 먹는 거 늦어진다. 그리고 차단할 생각 마, 네 마누라 끝까지 귀찮게 할 테니까.",
        arthitMsg14: "송금표 전송", arthitMsg15: "이제 만족하냐, 팃?", arthitMsg16: "어, 이 정도면 됐어.",

        northMsg1: "저녁에 형이 데리러 갈게.", northMsg2: "미팅 있지 않아요? 프랑 누나가 노스한테 그렇게 말한 것 같은데.",
        northMsg3: "마침 일이 좀 생겨서 미팅이 연기됐어. 형이 데리러 가는 거 싫어?", northMsg4: "그런 거 절대 아니에요! 노스는 그냥 궁금해서 물어본 거죠. 저녁에 봐요, 조 형.",
        northMsg5: "점심시간이네, 노스. 밥 먹었어? 제때 잘 챙겨 먹어 🍲",
        northMsg6: "지우네 무리랑 학교 앞에서 국수 먹고 있어요. 엄청 맛있는데, 조 형이 같이 앉아서 먹었으면 더 맛있었을 텐데.",
        northMsg7: "수업 끝났어? 형이 건물 앞으로 차 가지고 갈게. 너무 보고 싶어서 미치겠네.",
        northMsg8: "마침 딱 끝났어요! 노스 벤치에 앉아서 기다릴게요. 빨리 와요, 엄청 보고 싶어요.",
        northMsg9: "알았어, 형이 빨리 갈게! 형도 보고 싶어.", northMsg10: "서두르지 마세요. 조심히 운전해서 와요, 노스 기다릴 수 있으니까.",
        northMsg11: "그래, 조심히 운전해서 갈게.", northMsg12: "네, 노스는 기다릴 수 있어요.",
        northMsg13: "형이 갑자기 급한 미팅이 생겼어, 노스. 점심 같이 먹기로 약속했는데...",
        northMsg14: "어쩐지 조 형이 어디 갔나 했더니 미팅 때문이었군요. 같이 점심 먹기로 약속했잖아요.",
        northMsg15: "같이 밥 먹기로 약속한 거잖아요.", northMsg16: "미팅이 길어지나 보네. 노스 먼저 뭐 좀 먹으러 갈게요.",
        northMsg17: "노스 밥 먹고 있는데 팃 형이 또 귀찮게 굴어요. 조 형이 자길 차단했다고 징징대네요. 그 형이 조 형한테 또 무슨 짓 했어요? 노스가 알아서 처리할게요.",
        northMsg18: "방에 돌아가서 다 얘기해줄게. 점심 같이 먹으면서.",
        northMsg19: "왜 노스한테 바로 말 안 해줬어요, 조 형?", northMsg20: "귀찮은 새끼라서 형이 그냥 깔끔하게 차단했어. 방에서 보자."
    },
    ja: {
        galleryTitle: 'ギャラリー', tabPictures: '写真', tabAlbums: 'アルバム', itemsSuffix: '件', today: '今日', yesterday: '昨日', noPhotos: '写真はありません', favAdded: 'お気に入りに追加しました', favRemoved: 'お気に入りから削除しました', langSelectedMsg: '日本語が選択されました', appNameGallery: 'ギャラリー', appNameMessages: 'メッセージ', appNameIg: 'Instagram', appNameLine: 'LINE', appNameKbank: 'K PLUS', appNameStore: 'ストア', appNameStocks: '株価',
        city: 'バンコク', weatherDesc: '晴れ · 最高 33°', summaryTitle: '今日の概要', searchPlaceholder: '検索...', recentsTitle: '最近のアプリ', recentsClear: 'すべて閉じる', recentsHome: 'ホームへ戻る', noRecents: '最近のアプリはありません', recentTapToOpen: 'タップして開く',
        msgContactName: 'North', msgContactStatus: 'オンライン',
        msgDate1: '昨日 08:30', msgOld1: 'おはよう！今日午前授業ある？', msgOld2: 'はい、10時からです。', msgOld3: '勉強頑張ってね！終わったら連絡して。', msgOld4: 'はーい！P\'ジョーも頑張ってくださいね ✌️',
        msgDate2: '今日 12:15', msgOld5: 'お昼休みだね！ご飯食べた？', msgOld6: '大学の前で麺食べました。すごく美味しかったです 🍜',
        msgDateHeader: '今日 16:30', msgOutgoing: '授業が終わったら迎えに行くね。', msgIncoming: 'はい、了解です。',
        xUserName: 'North', xPostContent: '私たちの結婚式 @j💖', xViewTranslate: '翻訳を見る', igAppName: 'Instagram',
        lineTitle: 'LINE チャット', lineTabChat: 'チャット', lineTabFriend: '友達', lineTabGroup: 'グループ', lineChat1Msg: 'うざい奴だからブロックして終わらせたよ。部屋で会おう。', lineChat2Msg: 'Arthitをブロックしました', lineChat3Msg: '新着メッセージ',
        kbankAcc: 'マイ口座', kbankBalanceLabel: '利用可能残高', kbankTransfer: '振込', kbankScan: 'QRスキャン', kbankTopup: 'チャージ', kbankAll: 'すべて', kbankFav: 'お気に入り', kbankEdit: '編集', kbankRecent: '最近の取引', kbankTx1: 'Northへ振込', kbankTx2: '商品支払い (ショッピング)', kbankTx3: '商品支払い (手数料)', kbankModalTitle: '振込 / 支払い', kbankAmountLabel: '金額 (THB)', kbankConfirmBtn: '振込を確認',
        stocksTitle: 'ポートフォリオ', stocksWatchlist: 'ウォッチリスト', stocksUsMarket: '米国市場', stocksBuy: '買付', stocksSell: '売却',
        toastPhone: '電話', toastInternet: 'インターネット', toastCamera: 'カメラ', toastStore: 'ストア', toastNewAlbum: '新規アルバム', toastSearch: '検索', toastMore: 'その他', toastEditor: 'AI写真エディタ', toastShare: 'クイック共有', toastDeleted: '削除済み', toastSimOnly: 'シミュレーション専用', toastChatSearch: 'チャット検索', toastAddFriend: '友達追加 / グループ作成',
        viewerFav: 'お気に入り', viewerEdit: '編集', viewerShare: '共有', viewerDelete: '削除', albumTitles: { camera: 'カメラ', favorites: 'お気に入り', screenshots: 'Pre wedding', downloads: 'ダウンロード' },

        arthitMsg1: "ジョー、何してる？", arthitMsg2: "既読無視してないで返事しろよ、ジョー。", arthitMsg3: "完全に無視かよ、ジョー。", arthitMsg4: "マジうざい。",
        arthitMsg5: "お前、なんでノースに絡んでんだよ？", arthitMsg6: "お前が返事しないからだろ、ジョー。", arthitMsg7: "そのうえブロックまでしやがって。", arthitMsg8: "ジョー、金がねぇわ。ちょっと振り込んでくれ。",
        arthitMsg9: "ああ、クソ野郎。", arthitMsg10: "用があるならさっさと言え。", arthitMsg11: "もうすぐノースと昼飯に行かなきゃならないんだよ。", arthitMsg12: "お前、俺に金せびるほど金欠なのかよ、ティット？",
        arthitMsg13: "さっさと振り込めよ、ジョー。じゃないとノースとの昼飯に遅れるぞ。それにブロックしようとか考えるなよ、お前の嫁にいつまでも付きまとってやるからな。",
        arthitMsg14: "送金明細を送る", arthitMsg15: "これで満足か、ティット？", arthitMsg16: "ああ、これでいいんだよ。",

        northMsg1: "夕方、迎えに行くね。", northMsg2: "会議じゃなかったですか？プラーン先輩がノースにそう言ってた気がするけど。",
        northMsg3: "ちょっと用事ができて会議が延期になったんだ。迎えに来てほしくない？", northMsg4: "そんなことないですよ！ノースはちょっと気になっただけです。夕方会いましょうね、P\'ジョー。",
        northMsg5: "お昼休みだね、ノース。ご飯食べた？時間通りに食べてね 🍲",
        northMsg6: "ジウたちと大学の前で麺食べてます。すごく美味しいけど、P\'ジョーが一緒に座って食べてくれたらもっと美味しいのに。",
        northMsg7: "授業終わった？今から建物の前まで車で迎えに行くね。会いたくてたまらないよ。",
        northMsg8: "ちょうど終わったところです！ノース、ベンチで待ってますね。早く来てください、すごく会いたいです。",
        northMsg9: "うん、すぐ行くね！俺も会いたいよ。", northMsg10: "急がないでくださいね。ゆっくり運転してきて、ノースは待てるから。",
        northMsg11: "分かった、ゆっくり運転していくね。", northMsg12: "はい、ノース待ってます。",
        northMsg13: "急な会議が入っちゃったんだ、ノース。お昼ご飯一緒に行くって約束したのに……",
        northMsg14: "どうりでP\'ジョーがいないと思った、会議だったんですね。一緒にお昼食べるって約束したのに。",
        northMsg15: "一緒にご飯食べるって約束したのに。", northMsg16: "きっとまだ会議中なんですよね。ノース、先になにか食べてきますね。",
        northMsg17: "ノースご飯食べてるのに、P\'ティットがまた邪魔してきて、P\'ジョーにブロックされたって文句言ってるんです。あの人、またP\'ジョーに何かしたんですか？ノースが何とかしますよ。",
        northMsg18: "部屋に戻ってから話すよ。一緒にお昼ご飯を食べながら。",
        northMsg19: "どうしてすぐにノースに教えてくれなかったんですか、P\'ジョー？", northMsg20: "うざい奴だから、俺がすっきりブロックしたんだよ。部屋で会おうね。"
    },
    zh: {
        galleryTitle: '相册', tabPictures: '照片', tabAlbums: '相册', itemsSuffix: '项目', today: '今天', yesterday: '昨天', noPhotos: '暂无照片', favAdded: '已添加到收藏夹', favRemoved: '已从收藏夹移除', langSelectedMsg: '已选择中文', appNameGallery: '相册', appNameMessages: '信息', appNameIg: 'Instagram', appNameLine: 'LINE', appNameKbank: 'K PLUS', appNameStore: '商店', appNameStocks: '股票',
        city: '曼谷', weatherDesc: '晴朗 · 最高 33°', summaryTitle: '今日摘要', searchPlaceholder: '搜索...', recentsTitle: '最近使用的应用', recentsClear: '全部关闭', recentsHome: '返回主屏幕', noRecents: '没有最近使用的应用', recentTapToOpen: '点击打开',
        msgContactName: 'North', msgContactStatus: '当前在线',
        msgDate1: '昨天 08:30', msgOld1: '早上好！今天有早课吗？', msgOld2: '有的，10点。', msgOld3: '好好学习！下课发信息给我。', msgOld4: '好的！Jo哥你也加油 ✌️',
        msgDate2: '今天 12:15', msgOld5: '午休啦！吃饭了吗？', msgOld6: '在学校门口吃了面条，超好吃 🍜',
        msgDateHeader: '今天 16:30', msgOutgoing: '下课后我去接你。', msgIncoming: '好的，知道了。',
        xUserName: 'North', xPostContent: '我们的婚礼 @j💖', xViewTranslate: '查看翻译', igAppName: 'Instagram',
        lineTitle: 'LINE 聊天', lineTabChat: '聊天', lineTabFriend: '好友', lineTabGroup: '群组', lineChat1Msg: '烦人的家伙，我直接把他拉黑了。待会儿房间见。', lineChat2Msg: '你已屏蔽 Arthit', lineChat3Msg: '新消息',
        kbankAcc: '我的账户', kbankBalanceLabel: '可用余额', kbankTransfer: '转账', kbankScan: '扫码', kbankTopup: '充值', kbankAll: '全部', kbankFav: '收藏夹', kbankEdit: '编辑', kbankRecent: '最近交易', kbankTx1: '转账给 North', kbankTx2: '商品付款 (购物)', kbankTx3: '商品付款 (佣金)', kbankModalTitle: '转账 / 付款', kbankAmountLabel: '金额 (THB)', kbankConfirmBtn: '确认转账',
        stocksTitle: '投资组合', stocksWatchlist: '关注列表', stocksUsMarket: '美国市场', stocksBuy: '买入', stocksSell: '卖出',
        toastPhone: '电话', toastInternet: '网页', toastCamera: '相机', toastStore: '商店', toastNewAlbum: '新相册', toastSearch: '搜索', toastMore: '更多', toastEditor: 'AI照片编辑器', toastShare: '快速分享', toastDeleted: '已删除', toastSimOnly: '仅模拟交易', toastChatSearch: '搜索聊天', toastAddFriend: '添加好友 / 创建群组',
        viewerFav: '收藏', viewerEdit: '编辑', viewerShare: '分享', viewerDelete: '删除', albumTitles: { camera: '相机', favorites: '收藏夹', screenshots: 'Pre wedding', downloads: '下载' },

        arthitMsg1: "Jo，你在干嘛？", arthitMsg2: "看了就回一下消息啊，Jo。", arthitMsg3: "你根本不回我消息啊，Jo。", arthitMsg4: "真他妈烦人。",
        arthitMsg5: "你去打扰North干嘛？", arthitMsg6: "还不是因为你不回我消息，Jo。", arthitMsg7: "而且你还把我拉黑了。", arthitMsg8: "Jo，我手头紧，转点钱给我。",
        arthitMsg9: "行，你个混蛋。", arthitMsg10: "有什么事快说。", arthitMsg11: "我一会儿得去跟North吃午饭了。", arthitMsg12: "你穷到要跟我要钱的地步了吗，Thit？",
        arthitMsg13: "赶紧转过来吧，Jo。不然你跟North吃午饭该迟到了。还有别想着拉黑我，不然我没完没了地去烦你老婆。",
        arthitMsg14: "发送转账凭证", arthitMsg15: "这下你满意了吧，Thit？", arthitMsg16: "行，这就对了。",

        northMsg1: "傍晚我去接你吧。", northMsg2: "不是有会议吗？Prang姐好像跟North说过。",
        northMsg3: "刚好出了一点事，会议推迟了。难道你不想我去接你吗？", northMsg4: "才没有呢！North只是好奇而已。傍晚见啦，Jo哥。",
        northMsg5: "午休啦，North。吃饭了吗？记得按时吃饭哦 🍲",
        northMsg6: "North正和Jiw他们在校门口吃面呢，超级好吃。不过要是Jo哥能来一起吃肯定更香。",
        northMsg7: "下课了吗？我开车去楼下接你啦。好想快点见到你。",
        northMsg8: "刚好下课！North在长椅这儿等你哦。快来呀，超级想你的。",
        northMsg9: "好，我马上就去！我也很想你。", northMsg10: "别太急呀，慢慢开车来，North等得起。",
        northMsg11: "好，我会慢慢开的。", northMsg12: "嗯，North能等。",
        northMsg13: "哥临时有个急会，North。明明答应过要一起吃午饭的……",
        northMsg14: "就说Jo哥去哪了，原来是开会。说好了要一起吃午饭的哦。",
        northMsg15: "说好了要一起吃午饭的哦。", northMsg16: "估计还在开会吧。North先去吃点东西啦。",
        northMsg17: "North正吃饭呢，Thit哥又来打扰我，抱怨说Jo哥把他拉黑了。他又对Jo哥做什么了？North去收拾他。",
        northMsg18: "等我回房间讲给你听吧。边吃午饭边说。",
        northMsg19: "为什么不直接告诉North呢，Jo哥？", northMsg20: "那是个烦人的家伙，我直接拉黑了事。房间见哦。"
    }
};
// ============================================
// ฟังก์ชันจัดการภาษา (Language & UI Translation)
// ============================================
function openLanguageModal() {
    const modal = document.getElementById('lang-select-modal');
    if (modal) modal.classList.remove('hidden');
}

function chooseInitialLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('sim_lang', lang);
    
    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) langBtnText.innerText = currentLang.toUpperCase();

    updateStaticUIText();
    renderPicturesTab();
    renderAlbumsGrid();

    const modal = document.getElementById('lang-select-modal');
    if (modal) modal.classList.add('hidden');

    showToast(i18n[currentLang].langSelectedMsg);
}

function updateStaticUIText() {
    const txt = i18n[currentLang];
    
    if (document.getElementById('ui-gallery-title')) document.getElementById('ui-gallery-title').innerText = txt.galleryTitle;
    if (document.getElementById('tab-btn-pictures')) document.getElementById('tab-btn-pictures').innerText = txt.tabPictures;
    if (document.getElementById('tab-btn-albums')) document.getElementById('tab-btn-albums').innerText = txt.tabAlbums;

    if (document.getElementById('viewer-lbl-fav')) document.getElementById('viewer-lbl-fav').innerText = txt.viewerFav;
    if (document.getElementById('viewer-lbl-edit')) document.getElementById('viewer-lbl-edit').innerText = txt.viewerEdit;
    if (document.getElementById('viewer-lbl-share')) document.getElementById('viewer-lbl-share').innerText = txt.viewerShare;
    if (document.getElementById('viewer-lbl-delete')) document.getElementById('viewer-lbl-delete').innerText = txt.viewerDelete;

    if (document.getElementById('app-label-gallery')) document.getElementById('app-label-gallery').innerText = txt.appNameGallery;
    if (document.getElementById('app-label-messages')) document.getElementById('app-label-messages').innerText = txt.appNameMessages;
    if (document.getElementById('app-label-ig')) document.getElementById('app-label-ig').innerText = txt.appNameIg;
    if (document.getElementById('app-label-line')) document.getElementById('app-label-line').innerText = txt.appNameLine;
    if (document.getElementById('app-label-kbank')) document.getElementById('app-label-kbank').innerText = txt.appNameKbank;
    if (document.getElementById('app-label-stocks')) document.getElementById('app-label-stocks').innerText = txt.appNameStocks;
    if (document.getElementById('app-label-store')) document.getElementById('app-label-store').innerText = txt.appNameStore;

    if (document.getElementById('widget-city')) document.getElementById('widget-city').innerText = txt.city;
    if (document.getElementById('widget-weather-desc')) document.getElementById('widget-weather-desc').innerText = txt.weatherDesc;
    if (document.getElementById('widget-summary')) document.getElementById('widget-summary').innerText = txt.summaryTitle;
    if (document.getElementById('widget-search-placeholder')) document.getElementById('widget-search-placeholder').innerText = txt.searchPlaceholder;

    if (document.getElementById('recents-title')) document.getElementById('recents-title').innerText = txt.recentsTitle;
    if (document.getElementById('recents-clear-btn')) document.getElementById('recents-clear-btn').innerText = txt.recentsClear;
    if (document.getElementById('recents-home-btn')) document.getElementById('recents-home-btn').innerText = txt.recentsHome;

    if (document.getElementById('msg-contact-name')) document.getElementById('msg-contact-name').innerText = txt.msgContactName;
    if (document.getElementById('msg-contact-status')) document.getElementById('msg-contact-status').innerText = txt.msgContactStatus;
    if (document.getElementById('msg-date-1')) document.getElementById('msg-date-1').innerText = txt.msgDate1;
    if (document.getElementById('msg-old-1')) document.getElementById('msg-old-1').innerText = txt.msgOld1;
    if (document.getElementById('msg-old-2')) document.getElementById('msg-old-2').innerText = txt.msgOld2;
    if (document.getElementById('msg-old-3')) document.getElementById('msg-old-3').innerText = txt.msgOld3;
    if (document.getElementById('msg-old-4')) document.getElementById('msg-old-4').innerText = txt.msgOld4;
    if (document.getElementById('msg-date-2')) document.getElementById('msg-date-2').innerText = txt.msgDate2;
    if (document.getElementById('msg-old-5')) document.getElementById('msg-old-5').innerText = txt.msgOld5;
    if (document.getElementById('msg-old-6')) document.getElementById('msg-old-6').innerText = txt.msgOld6;
    if (document.getElementById('msg-date-header')) document.getElementById('msg-date-header').innerText = txt.msgDateHeader;
    if (document.getElementById('msg-outgoing')) document.getElementById('msg-outgoing').innerText = txt.msgOutgoing;
    if (document.getElementById('msg-incoming')) document.getElementById('msg-incoming').innerText = txt.msgIncoming;

    if (document.getElementById('ig-app-title')) document.getElementById('ig-app-title').innerText = txt.igAppName;
    if (document.getElementById('x-user-name')) document.getElementById('x-user-name').innerText = txt.xUserName;
    if (document.getElementById('x-post-content')) document.getElementById('x-post-content').innerHTML = txt.xPostContent;
    if (document.getElementById('ig-view-translate')) document.getElementById('ig-view-translate').innerText = txt.xViewTranslate;

    if (document.getElementById('line-title-text')) document.getElementById('line-title-text').innerHTML = `${txt.lineTabChat} <span class="text-[#06C755]">LINE</span>`;
    if (document.getElementById('line-tab-chat')) document.getElementById('line-tab-chat').innerText = txt.lineTabChat;
    if (document.getElementById('line-tab-friend')) document.getElementById('line-tab-friend').innerText = txt.lineTabFriend;
    if (document.getElementById('line-tab-group')) document.getElementById('line-tab-group').innerText = txt.lineTabGroup;
    if (document.getElementById('line-chat1-msg')) document.getElementById('line-chat1-msg').innerText = txt.lineChat1Msg;
    if (document.getElementById('line-chat2-msg')) document.getElementById('line-chat2-msg').innerText = txt.lineChat2Msg;
    if (document.getElementById('line-chat3-msg')) document.getElementById('line-chat3-msg').innerText = txt.lineChat3Msg;

    if (document.getElementById('kbank-acc-label')) document.getElementById('kbank-acc-label').innerText = txt.kbankAcc;
    if (document.getElementById('kbank-bal-label')) document.getElementById('kbank-bal-label').innerText = txt.kbankBalanceLabel;
    if (document.getElementById('kbank-btn-transfer')) document.getElementById('kbank-btn-transfer').innerText = txt.kbankTransfer;
    if (document.getElementById('kbank-btn-scan')) document.getElementById('kbank-btn-scan').innerText = txt.kbankScan;
    if (document.getElementById('kbank-btn-topup')) document.getElementById('kbank-btn-topup').innerText = txt.kbankTopup;
    if (document.getElementById('kbank-btn-all')) document.getElementById('kbank-btn-all').innerText = txt.kbankAll;
    if (document.getElementById('kbank-fav-title')) document.getElementById('kbank-fav-title').innerText = txt.kbankFav;
    if (document.getElementById('kbank-fav-edit')) document.getElementById('kbank-fav-edit').innerText = txt.kbankEdit;
    if (document.getElementById('kbank-recent-title')) document.getElementById('kbank-recent-title').innerText = txt.kbankRecent;
    if (document.getElementById('kbank-tx1-text')) document.getElementById('kbank-tx1-text').innerText = txt.kbankTx1;
    if (document.getElementById('kbank-tx2-text')) document.getElementById('kbank-tx2-text').innerText = txt.kbankTx2;
    if (document.getElementById('kbank-tx3-text')) document.getElementById('kbank-tx3-text').innerText = txt.kbankTx3;
    if (document.getElementById('kbank-modal-title')) document.getElementById('kbank-modal-title').innerText = txt.kbankModalTitle;
    if (document.getElementById('kbank-amount-label')) document.getElementById('kbank-amount-label').innerText = txt.kbankAmountLabel;
    if (document.getElementById('kbank-confirm-btn')) document.getElementById('kbank-confirm-btn').innerText = txt.kbankConfirmBtn;

    if (document.getElementById('stocks-title')) document.getElementById('stocks-title').innerText = txt.stocksTitle;
    if (document.getElementById('stocks-watchlist')) document.getElementById('stocks-watchlist').innerText = txt.stocksWatchlist;
    if (document.getElementById('stocks-usmarket')) document.getElementById('stocks-usmarket').innerText = txt.stocksUsMarket;
    if (document.getElementById('stocks-btn-buy')) document.getElementById('stocks-btn-buy').innerText = txt.stocksBuy;
    if (document.getElementById('stocks-btn-sell')) document.getElementById('stocks-btn-sell').innerText = txt.stocksSell;
}

// ============================================
// ฐานข้อมูลรูปภาพและอัลบั้ม (Album Photos Database)
// ============================================
const albumData = {
    camera: {
        photos: [
            { url: 'https://i.pinimg.com/1200x/0f/d7/19/0fd719f4793afdbe0fdb8f345d7de779.jpg', date: 'วันนี้, 14:20 น.' },
            { url: 'https://i.pinimg.com/736x/a0/79/78/a07978b4f404bae022234ac944cce65c.jpg', date: 'วันนี้, 12:15 น.' },
            { url: 'https://i.pinimg.com/736x/1d/c1/4a/1dc14aaadd062d1257dede7c5e28cfad.jpg', date: 'วันนี้, 12:15 น.' },
            { url: 'https://i.pinimg.com/1200x/5a/e1/82/5ae182ee6c6416625cbf3ac60dea52bd.jpg', date: '20 ต.ค., 09:40 น.' },
            { url: 'https://i.pinimg.com/736x/61/75/7b/61757b699f3cd0a712e3181358c116b9.jpg', date: '23 ต.ค., 09:41 น.' },
            { url: 'https://i.pinimg.com/1200x/b9/c3/00/b9c300108fd5832282ef08fb33cd64ad.jpg', date: '18 ต.ค., 14:30 น.' },
            { url: 'https://i.pinimg.com/736x/be/8f/f5/be8ff5c2588f10b6dc92ef1379a59dbf.jpg', date: '19 ต.ค., 14:30 น.' },
            { url: 'https://i.pinimg.com/736x/fb/df/bf/fbdfbf66c7265618bd4dcab238ed779f.jpg', date: '19 ต.ค., 14:30 น.' }
        ]
    },
    favorites: { photos: [] },
    screenshots: {
        photos: [
            { url: 'https://i.pinimg.com/1200x/8d/bb/b8/8dbbb882929048c327e853120a4b5487.jpg', date: '22 ต.ค., 14:35 น.' },
            { url: 'https://i.pinimg.com/1200x/1c/33/5f/1c335fcda9853822514cefbae30c64d4.jpg', date: '22 ต.ค., 14:35 น.' },
            { url: 'https://i.pinimg.com/736x/84/e1/21/84e1216d715e637d31dfbffb56332801.jpg', date: '22 ต.ค., 09:40 น.' },
            { url: 'https://i.pinimg.com/1200x/c2/07/d3/c207d32f187b792701c1584170ca2627.jpg', date: '21 ต.ค., 18:30 น.' }
        ]
    },
    downloads: {
        photos: [
            { url: 'https://i.pinimg.com/736x/d3/e4/11/d3e411fbdc0ccbc4486febfbcd325cf5.jpg', date: '21 ต.ค., 16:45 น.' },
            { url: 'https://i.pinimg.com/736x/83/28/21/832821fd79639960e79c74ab9f927a8f.jpg', date: '20 ต.ค., 10:00 น.' },
            { url: 'https://i.pinimg.com/736x/8a/a4/c5/8aa4c585fc23f85a79e695632c441768.jpg', date: '19 ต.ค., 14:30 น.' },
            { url: 'https://i.pinimg.com/736x/41/99/ae/4199ae29ba9ecb0fb699656939e546a6.jpg', date: '18 ต.ค., 14:30 น.' }, 
            { url: 'https://i.pinimg.com/736x/12/ef/b1/12efb1be0bc5cff919d50c5b7e7345ec.jpg', date: '18 ต.ค., 14:35 น.' },
            { url: 'https://i.pinimg.com/736x/16/2f/eb/162feb0fe79d080634d9095bac942dd8.jpg', date: '23 ต.ค., 18:30 น.' },
            { url: 'https://i.pinimg.com/736x/3c/2c/71/3c2c716364aef868ca0264fb94f4ef33.jpg', date: '21 ต.ค., 14:35 น.' },
            { url: 'https://i.pinimg.com/736x/ad/e9/9e/ade99e2f8dd0326fa6e5292a70d245cf.jpg', date: '20 ต.ค., 14:35 น.' }
        ]
    }
};

// ============================================
// ฟังก์ชันจัดการวันที่และอัลบั้มรูปภาพ
// ============================================
function translateDateString(dateStr) {
    if (!dateStr) return '';

    const txt = i18n[currentLang];
    
    let formatted = dateStr;
    if (formatted.includes('วันนี้')) {
        formatted = formatted.replace('วันนี้', txt.today);
    } else if (formatted.includes('เมื่อวานนี้')) {
        formatted = formatted.replace('เมื่อวานนี้', txt.yesterday);
    } else {
        const dayMatch = formatted.match(/(\d+)\s*ต\.ค\./);
        if (dayMatch) {
            const day = dayMatch[1];
            if (currentLang === 'en') formatted = formatted.replace(`${day} ต.ค.`, `${day} Oct`);
            else if (currentLang === 'ko') formatted = formatted.replace(`${day} ต.ค.`, `10월 ${day}일`);
            else if (currentLang === 'ja' || currentLang === 'zh') formatted = formatted.replace(`${day} ต.ค.`, `10月${day}日`);
        }
    }

    if (currentLang !== 'th') {
        formatted = formatted.replace('น.', '').trim();
    }

    return formatted;
}

function getPhotoScore(dateStr) {
    if (!dateStr) return 0;

    let hours = 0, minutes = 0;
    const timeMatch = dateStr.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
        hours = parseInt(timeMatch[1], 10);
        minutes = parseInt(timeMatch[2], 10);
    }

    let dayWeight = 0;
    if (dateStr.includes('วันนี้')) dayWeight = 9999;
    else if (dateStr.includes('เมื่อวานนี้')) dayWeight = 9998;
    else {
        const dayMatch = dateStr.match(/\d+/);
        if (dayMatch) {
            const dayNum = parseInt(dayMatch[0], 10);
            dayWeight = (10 * 100) + dayNum;
        }
    }

    return (dayWeight * 10000) + (hours * 100) + minutes;
}

function updateFavoritesAlbum() {
    const allPhotos = [];
    const seenUrls = new Set();

    Object.keys(albumData).forEach(key => {
        if (key === 'favorites') return;

        albumData[key].photos.forEach(photo => {
            if (photo.url && photo.url.trim() !== '' && !seenUrls.has(photo.url)) {
                seenUrls.add(photo.url);
                allPhotos.push(photo);
            }
        });
    });

    allPhotos.sort((a, b) => getPhotoScore(b.date) - getPhotoScore(a.date));
    albumData.favorites.photos = allPhotos;
}

function renderPicturesTab() {
    const container = document.getElementById('gallery-pictures-view');
    if (!container) return;

    const txt = i18n[currentLang];
    const allPhotos = [];
    const seenUrls = new Set();

    Object.keys(albumData).forEach(key => {
        if (key === 'favorites') return;

        albumData[key].photos.forEach(photo => {
            if (photo.url && photo.url.trim() !== '' && !seenUrls.has(photo.url)) {
                seenUrls.add(photo.url);
                allPhotos.push(photo);
            }
        });
    });

    allPhotos.sort((a, b) => getPhotoScore(b.date) - getPhotoScore(a.date));

    const groups = {};
    allPhotos.forEach(photo => {
        let grp = photo.group;
        if (!grp && photo.date) {
            grp = photo.date.split(',')[0].trim();
            if (grp.includes('ต.ค') && !grp.endsWith('.')) grp = grp + '.';
        }
        grp = grp || 'รูปภาพทั้งหมด';

        if (!groups[grp]) groups[grp] = [];
        groups[grp].push(photo);
    });

    container.innerHTML = '';

    if (Object.keys(groups).length === 0) {
        container.innerHTML = `<div class="text-center text-gray-400 py-10 text-xs">${txt.noPhotos}</div>`;
        return;
    }

    Object.keys(groups).forEach(grpName => {
        const photoList = groups[grpName];
        const displayGrpName = translateDateString(grpName);
        
        const grpSection = document.createElement('div');
        grpSection.className = 'mb-5';

        const headerHtml = `
            <div class="bg-white py-2 px-1 flex justify-between items-center text-xs font-semibold text-gray-700">
                <span>${displayGrpName}</span>
                <span class="text-[11px] text-gray-400 font-normal">${photoList.length} ${txt.itemsSuffix}</span>
            </div>
        `;

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-3 gap-1.5 content-start';

        photoList.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = "aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm active:scale-95 transition-transform cursor-pointer";
            card.onclick = () => openPhotoViewer(photoList, index);
            card.innerHTML = `<img src="${item.url}" class="w-full h-full object-cover">`;
            grid.appendChild(card);
        });

        grpSection.innerHTML = headerHtml;
        grpSection.appendChild(grid);
        container.appendChild(grpSection);
    });
}

function renderAlbumsGrid() {
    const albumsContainer = document.querySelector('#gallery-albums-view .grid');
    if (!albumsContainer) return;

    const txt = i18n[currentLang];
    albumsContainer.innerHTML = '';

    Object.keys(albumData).forEach(key => {
        const album = albumData[key];
        const validPhotos = album.photos.filter(p => p.url && p.url.trim() !== '');
        const count = validPhotos.length;
        const coverUrl = count > 0 ? validPhotos[0].url : 'https://via.placeholder.com/300';
        const albumTitle = txt.albumTitles[key] || album.title;

        const card = document.createElement('div');
        card.className = "flex flex-col cursor-pointer group";
        card.onclick = () => openAlbumDetail(key);

        let badgeHtml = '';
        if (key === 'favorites') {
            badgeHtml = `<div class="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-md rounded-full w-6 h-6 flex items-center justify-center">
                            <i class="fas fa-heart text-xs text-rose-500"></i>
                         </div>`;
        }

        card.innerHTML = `
            <div class="aspect-square bg-gray-100 rounded-[22px] overflow-hidden shadow-sm relative mb-2 group-active:scale-95 transition-transform">
                <img src="${coverUrl}" class="w-full h-full object-cover">
                ${badgeHtml}
            </div>
            <div class="font-semibold text-sm text-gray-900 leading-tight">${albumTitle}</div>
            <div class="text-xs text-gray-400 mt-0.5">${count} ${txt.itemsSuffix}</div>
        `;

        albumsContainer.appendChild(card);
    });
}

function openAlbumDetail(albumKey) {
    if (albumKey === 'favorites') {
        updateFavoritesAlbum();
    }

    const data = albumData[albumKey];
    if (!data) return;

    const txt = i18n[currentLang];
    const validPhotos = data.photos.filter(p => p.url && p.url.trim() !== '');
    validPhotos.sort((a, b) => getPhotoScore(b.date) - getPhotoScore(a.date));

    const albumTitle = txt.albumTitles[albumKey] || data.title;
    document.getElementById('album-detail-title').innerText = albumTitle;
    document.getElementById('album-detail-count').innerText = `${validPhotos.length} ${txt.itemsSuffix}`;

    const grid = document.getElementById('album-detail-grid');
    grid.innerHTML = '';

    validPhotos.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = "w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm active:scale-95 transition-transform cursor-pointer";
        card.onclick = () => openPhotoViewer(validPhotos, index);
        card.innerHTML = `<img src="${item.url}" class="w-full h-full object-cover">`;
        grid.appendChild(card);
    });

    document.getElementById('gallery-album-detail-view').classList.remove('hidden');
}

function closeAlbumDetail() {
    const detailView = document.getElementById('gallery-album-detail-view');
    if (detailView) detailView.classList.add('hidden');
}

// ============================================
// ฟังก์ชัน Photo Viewer & Swipe Gestures
// ============================================
function openPhotoViewer(photosList, index = 0) {
    if (typeof photosList === 'string') {
        currentViewerPhotos = [{ url: photosList, date: 'วันนี้' }];
        currentViewerIndex = 0;
    } else if (Array.isArray(photosList)) {
        currentViewerPhotos = photosList;
        currentViewerIndex = index;
    }

    if (currentViewerPhotos.length === 0) return;

    updateViewerContent();
    document.getElementById('photo-viewer').classList.remove('hidden');
    
    isViewerFav = false;
    const favIcon = document.getElementById('viewer-fav-icon');
    if (favIcon) favIcon.className = "far fa-heart text-xl";
}

function updateViewerContent() {
    const photo = currentViewerPhotos[currentViewerIndex];
    if (!photo) return;

    const imgEl = document.getElementById('viewer-img');
    const dateEl = document.getElementById('viewer-date');

    if (imgEl) imgEl.src = photo.url;
    if (dateEl) dateEl.innerText = translateDateString(photo.date || 'วันนี้');
}

function showNextPhoto() {
    if (currentViewerIndex < currentViewerPhotos.length - 1) {
        currentViewerIndex++;
        updateViewerContent();
    }
}

function showPrevPhoto() {
    if (currentViewerIndex > 0) {
        currentViewerIndex--;
        updateViewerContent();
    }
}

function setupPhotoViewerSwipe() {
    const viewerContainer = document.getElementById('photo-viewer');
    if (!viewerContainer) return;

    viewerContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewerContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    document.addEventListener('keydown', e => {
        const photoViewer = document.getElementById('photo-viewer');
        if (photoViewer && !photoViewer.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') showNextPhoto();
            if (e.key === 'ArrowLeft') showPrevPhoto();
        }
    });
}

function handleSwipe() {
    const swipeThreshold = 40;
    const diffX = touchStartX - touchEndX;

    if (diffX > swipeThreshold) {
        showNextPhoto();
    } else if (diffX < -swipeThreshold) {
        showPrevPhoto();
    }
}

function closePhotoViewer() {
    document.getElementById('photo-viewer').classList.add('hidden');
}

function toggleViewerFavorite() {
    const txt = i18n[currentLang];
    isViewerFav = !isViewerFav;
    const favIcon = document.getElementById('viewer-fav-icon');
    if (isViewerFav) {
        favIcon.className = "fas fa-heart text-xl text-rose-500";
        showToast(txt.favAdded);
    } else {
        favIcon.className = "far fa-heart text-xl";
        showToast(txt.favRemoved);
    }
}

// ============================================
// ฟังก์ชันควบคุมแอปพลิเคชัน (App Navigation & Stack)
// ============================================
function openApp(appId, theme) {
    document.querySelectorAll('.app-view').forEach(app => {
        app.classList.remove('active');
        app.classList.add('hidden');
    });

    const targetApp = document.getElementById(appId);
    if (targetApp) {
        targetApp.classList.remove('hidden');
        targetApp.classList.add('active');
        currentApp = appId;
        if (!openAppStack.includes(appId)) {
            openAppStack.push(appId);
        }
    }
}

function closeApp() {
    document.querySelectorAll('.app-view').forEach(app => {
        app.classList.remove('active');
        app.classList.add('hidden');
    });
    currentApp = null;
    closeAlbumDetail();
    closePhotoViewer();
}

function switchGalleryTab(tab) {
    const picturesView = document.getElementById('gallery-pictures-view');
    const albumsView = document.getElementById('gallery-albums-view');
    const btnPic = document.getElementById('tab-btn-pictures');
    const btnAlb = document.getElementById('tab-btn-albums');

    if (tab === 'pictures') {
        picturesView.classList.remove('hidden');
        albumsView.classList.add('hidden');
        btnPic.className = "flex-1 py-2 text-center text-black border-b-2 border-black transition-colors";
        btnAlb.className = "flex-1 py-2 text-center text-gray-400 border-b-2 border-transparent transition-colors";
        renderPicturesTab();
    } else {
        picturesView.classList.add('hidden');
        albumsView.classList.remove('hidden');
        btnAlb.className = "flex-1 py-2 text-center text-black border-b-2 border-black transition-colors";
        btnPic.className = "flex-1 py-2 text-center text-gray-400 border-b-2 border-transparent transition-colors";
        renderAlbumsGrid();
    }
}

function goHome() {
    hideRecents();
    closePhotoViewer();
    closeAlbumDetail();
    closeApp();
}

function goBack() {
    const recentsOverlay = document.getElementById('recents-overlay');
    const photoViewer = document.getElementById('photo-viewer');
    const albumDetail = document.getElementById('gallery-album-detail-view');

    if (recentsOverlay && !recentsOverlay.classList.contains('hidden')) {
        hideRecents();
        return;
    }
    if (photoViewer && !photoViewer.classList.contains('hidden')) {
        closePhotoViewer();
        return;
    }
    if (albumDetail && !albumDetail.classList.contains('hidden')) {
        closeAlbumDetail();
        return;
    }
    if (currentApp) {
        closeApp();
    }
}

function showRecents() {
    const recentsOverlay = document.getElementById('recents-overlay');
    const recentsList = document.getElementById('recents-list');
    if (!recentsOverlay || !recentsList) return;

    const txt = i18n[currentLang];
    recentsList.innerHTML = '';
    
    const appTitles = {
        'app-gallery': { name: txt.appNameGallery, icon: 'fas fa-image' },
        'app-messages': { name: txt.appNameMessages, icon: 'fas fa-comment-alt' },
        'app-ig': { name: txt.appNameIg, icon: 'fab fa-instagram' },
        'app-line': { name: txt.appNameLine, icon: 'fab fa-line' },
        'app-kbank': { name: txt.appNameKbank, icon: 'fas fa-university' },
        'app-stocks': { name: txt.appNameStocks, icon: 'fas fa-chart-line' }
    };

    if (openAppStack.length === 0) {
        recentsList.innerHTML = `<div class="col-span-2 text-center text-gray-400 py-10 text-xs">${txt.noRecents}</div>`;
    } else {
        openAppStack.forEach(appId => {
            const appInfo = appTitles[appId] || { name: appId, icon: 'fas fa-mobile-alt' };
            const card = document.createElement('div');
            card.className = 'bg-gray-800/90 border border-gray-700 rounded-2xl p-3 flex flex-col justify-between h-36 cursor-pointer hover:border-gray-500 transition';
            card.onclick = () => {
                hideRecents();
                openApp(appId, 'light');
            };
            card.innerHTML = `
                <div class="flex items-center justify-between text-xs text-gray-200">
                    <span class="flex items-center gap-1.5"><i class="${appInfo.icon}"></i> ${appInfo.name}</span>
                    <i class="fas fa-times text-gray-400 p-1 hover:text-red-400" onclick="event.stopPropagation(); removeRecent('${appId}')"></i>
                </div>
                <div class="flex-1 my-2 bg-gray-900/60 rounded-xl flex items-center justify-center text-gray-400 text-[10px]">
                    ${txt.recentTapToOpen}
                </div>
            `;
            recentsList.appendChild(card);
        });
    }

    recentsOverlay.classList.remove('hidden');
    recentsOverlay.classList.add('flex');
}

function hideRecents() {
    const recentsOverlay = document.getElementById('recents-overlay');
    if (recentsOverlay) {
        recentsOverlay.classList.add('hidden');
        recentsOverlay.classList.remove('flex');
    }
}

function clearRecents() {
    openAppStack = [];
    showRecents();
}

function removeRecent(appId) {
    openAppStack = openAppStack.filter(id => id !== appId);
    if (currentApp === appId) closeApp();
    showRecents();
}

// ============================================
// Toast Notification & Event Listeners
// ============================================
let toastTimer;
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesAlbum();
    updateStaticUIText();
    renderPicturesTab();
    renderAlbumsGrid();
    setupPhotoViewerSwipe();
    
    if (!localStorage.getItem('sim_lang')) {
        openLanguageModal();
    }
});

window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetAppId = window.location.hash.substring(1);
        if (targetAppId === 'app-line') {
            const modal = document.getElementById('lang-select-modal');
            if (modal) modal.classList.add('hidden');
            
            openApp('app-line', 'light');
            history.replaceState(null, null, window.location.pathname);
        }
    }
});
