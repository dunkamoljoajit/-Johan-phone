// System & Navigation State
let openAppStack = [];
let currentApp = null;
let isViewerFav = false;
let currentLang = 'th';

// Photo Viewer State
let currentViewerPhotos = [];
let currentViewerIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// พจนานุกรมแปลภาษา 5 ภาษาแบบสมบูรณ์
const i18n = {
    th: {
        galleryTitle: 'แกลเลอรี', tabPictures: 'รูปภาพ', tabAlbums: 'อัลบั้ม', itemsSuffix: 'รายการ', today: 'วันนี้', yesterday: 'เมื่อวานนี้', noPhotos: 'ยังไม่มีรูปภาพ', favAdded: 'เพิ่มในรายการโปรดแล้ว', favRemoved: 'ลบออกจากรายการโปรด', langSelectedMsg: 'เลือกภาษาไทยเรียบร้อย', appNameGallery: 'แกลเลอรี', appNameMessages: 'ข้อความ', city: 'กรุงเทพมหานคร', weatherDesc: 'แดดจัด · สูงสุด 33°', summaryTitle: 'สรุปช่วงกลางวัน', searchPlaceholder: 'ค้นหา...', recentsTitle: 'แอปล่าสุด', recentsClear: 'ปิดทั้งหมด', recentsHome: 'กลับไปหน้าหลัก', noRecents: 'ไม่มีแอปล่าสุด', recentTapToOpen: 'แตะเพื่อกลับไปเปิด',
        msgContactName: 'North', msgContactStatus: 'ใช้งานเมื่อครู่นี้', 
        msgDate1: 'เมื่อวาน 08:30 น.', msgOld1: 'มอนิ่งครับ วันนี้มีเรียนเช้าไหม?', msgOld2: 'มีครับ 10 โมง', msgOld3: 'ตั้งใจเรียนนะ เลิกแล้วทักมา', msgOld4: 'ค้าบบบ พี่ก็สู้ๆ นะ ✌️',
        msgDate2: 'วันนี้ 12:15 น.', msgOld5: 'พักเที่ยงแล้ว กินอะไรหรือยัง?', msgOld6: 'กินก๋วยเตี๋ยวหน้ามอครับ อร่อยมากก 🍜',
        msgDateHeader: 'วันนี้ 16:30 น.', msgOutgoing: 'เลิกเรียนเดี๋ยวพี่ไปรับน่ะ', msgIncoming: 'ครับ รับทราบ',
        xUserName: 'North', xPostContent: 'My Wedding 💖 @j',
        viewerFav: 'โปรด', viewerEdit: 'แก้ไข', viewerShare: 'แชร์', viewerDelete: 'ลบ', albumTitles: { camera: 'กล้อง', favorites: 'รายการโปรด', screenshots: 'Pre wedding', downloads: 'ดาวน์โหลด' }
    },
    en: {
        galleryTitle: 'Gallery', tabPictures: 'Pictures', tabAlbums: 'Albums', itemsSuffix: 'items', today: 'Today', yesterday: 'Yesterday', noPhotos: 'No photos yet', favAdded: 'Added to favorites', favRemoved: 'Removed from favorites', langSelectedMsg: 'English selected', appNameGallery: 'Gallery', appNameMessages: 'Messages', city: 'Bangkok', weatherDesc: 'Sunny · H: 33°', summaryTitle: 'Day Summary', searchPlaceholder: 'Search...', recentsTitle: 'Recent Apps', recentsClear: 'Clear All', recentsHome: 'Back to Home', noRecents: 'No recent apps', recentTapToOpen: 'Tap to open',
        msgContactName: 'North', msgContactStatus: 'Active just now',
        msgDate1: 'Yesterday 08:30', msgOld1: 'Morning! Do you have morning classes today?', msgOld2: 'Yes, at 10 AM.', msgOld3: 'Study hard! Text me when you are done.', msgOld4: 'Will do! You do your best too ✌️',
        msgDate2: 'Today 12:15', msgOld5: 'Lunch break! Have you eaten?', msgOld6: 'Had noodles in front of uni. So good 🍜',
        msgDateHeader: 'Today 16:30', msgOutgoing: "I'll pick you up after class.", msgIncoming: 'Okay, got it.',
        xUserName: 'North', xPostContent: 'My Wedding 💖 @j',
        viewerFav: 'Fav', viewerEdit: 'Edit', viewerShare: 'Share', viewerDelete: 'Delete', albumTitles: { camera: 'Camera', favorites: 'Favorites', screenshots: 'Pre wedding', downloads: 'Downloads' }
    },
    ko: {
        galleryTitle: '갤러리', tabPictures: '사진', tabAlbums: '앨범', itemsSuffix: '항목', today: '오늘', yesterday: '어제', noPhotos: '사진 없음', favAdded: '즐겨찾기에 추가됨', favRemoved: '즐겨찾기에서 삭제됨', langSelectedMsg: '한국어가 선택되었습니다', appNameGallery: '갤러리', appNameMessages: '메시지', city: '방콕', weatherDesc: '맑음 · 최고 33°', summaryTitle: '오늘의 요약', searchPlaceholder: '검색...', recentsTitle: '최근 앱', recentsClear: '모두 닫기', recentsHome: '홈으로 이동', noRecents: '최근 앱 없음', recentTapToOpen: '탭하여 열기',
        msgContactName: 'North', msgContactStatus: '방금 전 활동',
        msgDate1: '어제 08:30', msgOld1: '좋은 아침! 오늘 오전 수업 있어?', msgOld2: '네, 10시요.', msgOld3: '공부 열심히 해! 끝나면 연락하고.', msgOld4: '네! 형도 화이팅 ✌️',
        msgDate2: '오늘 12:15', msgOld5: '점심시간이네! 밥 먹었어?', msgOld6: '학교 앞 국수 먹었어요. 진짜 맛있어요 🍜',
        msgDateHeader: '오늘 16:30', msgOutgoing: '수업 끝나면 데리러 갈게.', msgIncoming: '네, 알겠습니다.',
        xUserName: 'North', xPostContent: 'My Wedding 💖 @j',
        viewerFav: '즐겨찾기', viewerEdit: '편집', viewerShare: '공유', viewerDelete: '삭제', albumTitles: { camera: '카메라', favorites: '즐겨찾기', screenshots: 'Pre wedding', downloads: '다운로드' }
    },
    ja: {
        galleryTitle: 'ギャラリー', tabPictures: '写真', tabAlbums: 'アルバム', itemsSuffix: '件', today: '今日', yesterday: '昨日', noPhotos: '写真はありません', favAdded: 'お気に入りに追加しました', favRemoved: 'お気に入りから削除しました', langSelectedMsg: '日本語が選択されました', appNameGallery: 'ギャラリー', appNameMessages: 'メッセージ', city: 'バンコク', weatherDesc: '晴れ · 最高 33°', summaryTitle: '今日の概要', searchPlaceholder: '検索...', recentsTitle: '最近のアプリ', recentsClear: 'すべて閉じる', recentsHome: 'ホームへ戻る', noRecents: '最近のアプリはありません', recentTapToOpen: 'タップして開く',
        msgContactName: 'North', msgContactStatus: 'オンライン',
        msgDate1: '昨日 08:30', msgOld1: 'おはよう！今日午前授業ある？', msgOld2: 'はい、10時からです。', msgOld3: '勉強頑張ってね！終わったら連絡して。', msgOld4: 'はーい！先輩も頑張ってくださいね ✌️',
        msgDate2: '今日 12:15', msgOld5: 'お昼休みだね！ご飯食べた？', msgOld6: '大学の前で麺食べました。すごく美味しかったです 🍜',
        msgDateHeader: '今日 16:30', msgOutgoing: '授業が終わったら迎えに行くね。', msgIncoming: 'はい、了解です。',
        xUserName: 'North', xPostContent: 'My Wedding 💖 @j',
        viewerFav: 'お気に入り', viewerEdit: '編集', viewerShare: '共有', viewerDelete: '削除', albumTitles: { camera: 'カメラ', favorites: 'お気に入り', screenshots: 'Pre wedding', downloads: 'ダウンロード' }
    },
    zh: {
        galleryTitle: '相册', tabPictures: '照片', tabAlbums: '相册', itemsSuffix: '项目', today: '今天', yesterday: '昨天', noPhotos: '暂无照片', favAdded: '已添加到收藏夹', favRemoved: '已从收藏夹移除', langSelectedMsg: '已选择中文', appNameGallery: '相册', appNameMessages: '信息', city: '曼谷', weatherDesc: '晴朗 · 最高 33°', summaryTitle: '今日摘要', searchPlaceholder: '搜索...', recentsTitle: '最近使用的应用', recentsClear: '全部关闭', recentsHome: '返回主屏幕', noRecents: '没有最近使用的应用', recentTapToOpen: '点击打开',
        msgContactName: 'North', msgContactStatus: '刚刚在线',
        msgDate1: '昨天 08:30', msgOld1: '早上好！今天有早课吗？', msgOld2: '有的，10点。', msgOld3: '好好学习！下课发信息给我。', msgOld4: '好的！哥你也加油 ✌️',
        msgDate2: '今天 12:15', msgOld5: '午休啦！吃饭了吗？', msgOld6: '在学校门口吃了面条，超好吃 🍜',
        msgDateHeader: '今天 16:30', msgOutgoing: '下课后我去接你。', msgIncoming: '好的，知道了。',
        xUserName: 'North', xPostContent: 'My Wedding 💖 @j',
        viewerFav: '收藏', viewerEdit: '编辑', viewerShare: '分享', viewerDelete: '删除', albumTitles: { camera: '相机', favorites: '收藏夹', screenshots: 'Pre wedding', downloads: '下载' }
    }
};

// Album Photos Database Data
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

function openLanguageModal() {
    const modal = document.getElementById('lang-select-modal');
    if (modal) modal.classList.remove('hidden');
}

function chooseInitialLanguage(lang) {
    currentLang = lang;
    
    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) langBtnText.innerText = currentLang.toUpperCase();

    updateStaticUIText();
    renderPicturesTab();
    renderAlbumsGrid();

    const modal = document.getElementById('lang-select-modal');
    if (modal) modal.classList.add('hidden');

    showToast(i18n[currentLang].langSelectedMsg);
}

// ฟังก์ชันปรับเปลี่ยนข้อความภาษาทั้งหมดบนหน้าจอ (UI, Messages, Widgets, Recents)
function updateStaticUIText() {
    const txt = i18n[currentLang];
    
    // Gallery UI
    if (document.getElementById('ui-gallery-title')) document.getElementById('ui-gallery-title').innerText = txt.galleryTitle;
    if (document.getElementById('tab-btn-pictures')) document.getElementById('tab-btn-pictures').innerText = txt.tabPictures;
    if (document.getElementById('tab-btn-albums')) document.getElementById('tab-btn-albums').innerText = txt.tabAlbums;

    // Photo Viewer Actions
    if (document.getElementById('viewer-lbl-fav')) document.getElementById('viewer-lbl-fav').innerText = txt.viewerFav;
    if (document.getElementById('viewer-lbl-edit')) document.getElementById('viewer-lbl-edit').innerText = txt.viewerEdit;
    if (document.getElementById('viewer-lbl-share')) document.getElementById('viewer-lbl-share').innerText = txt.viewerShare;
    if (document.getElementById('viewer-lbl-delete')) document.getElementById('viewer-lbl-delete').innerText = txt.viewerDelete;

    // Home Screen App Labels & Widgets
    if (document.getElementById('app-label-gallery')) document.getElementById('app-label-gallery').innerText = txt.appNameGallery;
    if (document.getElementById('app-label-messages')) document.getElementById('app-label-messages').innerText = txt.appNameMessages;
    if (document.getElementById('widget-city')) document.getElementById('widget-city').innerText = txt.city;
    if (document.getElementById('widget-weather-desc')) document.getElementById('widget-weather-desc').innerText = txt.weatherDesc;
    if (document.getElementById('widget-summary')) document.getElementById('widget-summary').innerText = txt.summaryTitle;
    if (document.getElementById('widget-search-placeholder')) document.getElementById('widget-search-placeholder').innerText = txt.searchPlaceholder;

    // Recents Overlay
    if (document.getElementById('recents-title')) document.getElementById('recents-title').innerText = txt.recentsTitle;
    if (document.getElementById('recents-clear-btn')) document.getElementById('recents-clear-btn').innerText = txt.recentsClear;
    if (document.getElementById('recents-home-btn')) document.getElementById('recents-home-btn').innerText = txt.recentsHome;

    // Messages App
    if (document.getElementById('msg-contact-name')) document.getElementById('msg-contact-name').innerText = txt.msgContactName;
    if (document.getElementById('msg-contact-status')) document.getElementById('msg-contact-status').innerText = txt.msgContactStatus;
    
    // +++ เพิ่มส่วนประวัติแชทเก่า +++
    if (document.getElementById('msg-date-1')) document.getElementById('msg-date-1').innerText = txt.msgDate1;
    if (document.getElementById('msg-old-1')) document.getElementById('msg-old-1').innerText = txt.msgOld1;
    if (document.getElementById('msg-old-2')) document.getElementById('msg-old-2').innerText = txt.msgOld2;
    if (document.getElementById('msg-old-3')) document.getElementById('msg-old-3').innerText = txt.msgOld3;
    if (document.getElementById('msg-old-4')) document.getElementById('msg-old-4').innerText = txt.msgOld4;
    
    if (document.getElementById('msg-date-2')) document.getElementById('msg-date-2').innerText = txt.msgDate2;
    if (document.getElementById('msg-old-5')) document.getElementById('msg-old-5').innerText = txt.msgOld5;
    if (document.getElementById('msg-old-6')) document.getElementById('msg-old-6').innerText = txt.msgOld6;
    // +++++++++++++++++++++++++++++

    if (document.getElementById('msg-date-header')) document.getElementById('msg-date-header').innerText = txt.msgDateHeader;
    if (document.getElementById('msg-outgoing')) document.getElementById('msg-outgoing').innerText = txt.msgOutgoing;
    if (document.getElementById('msg-incoming')) document.getElementById('msg-incoming').innerText = txt.msgIncoming;

    // X App
    if (document.getElementById('x-user-name')) document.getElementById('x-user-name').innerText = txt.xUserName;
    if (document.getElementById('x-post-content')) document.getElementById('x-post-content').innerHTML = txt.xPostContent;
}

// ฟังก์ชันแปลงรูปแบบวันที่และเดือนให้เป็นภาษาที่เลือก (เช่น '23 ต.ค.' -> '23 Oct' / '10월 23일' / '10月23日')
function translateDateString(dateStr) {
    if (!dateStr) return '';

    const txt = i18n[currentLang];
    
    // 1. แปลงคำว่า "วันนี้" / "เมื่อวานนี้"
    let formatted = dateStr;
    if (formatted.includes('วันนี้')) {
        formatted = formatted.replace('วันนี้', txt.today);
    } else if (formatted.includes('เมื่อวานนี้')) {
        formatted = formatted.replace('เมื่อวานนี้', txt.yesterday);
    } else {
        // 2. แปลงเดือนภาษาไทยเป็นเดือนของภาษาต่าง ๆ
        const dayMatch = formatted.match(/(\d+)\s*ต\.ค\./);
        if (dayMatch) {
            const day = dayMatch[1];
            if (currentLang === 'en') formatted = formatted.replace(`${day} ต.ค.`, `${day} Oct`);
            else if (currentLang === 'ko') formatted = formatted.replace(`${day} ต.ค.`, `10월 ${day}일`);
            else if (currentLang === 'ja' || currentLang === 'zh') formatted = formatted.replace(`${day} ต.ค.`, `10月${day}日`);
        }
    }

    // 3. ตัดคำว่า "น." ในภาษาต่างประเทศ
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
    // อัปเดตอัลบั้มรายการโปรดให้เป็นข้อมูลล่าสุดก่อนเรนเดอร์เสมอ
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
        // ใส่ w-full กำกับคู่กับ aspect-square เพื่อป้องกันปัญหาแถวบีบซ้อนทับกัน
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

function openApp(appId, theme) {
    // 1. ซ่อนแอปทั้งหมดก่อน
    document.querySelectorAll('.app-view').forEach(app => {
        app.classList.remove('active');
        app.classList.add('hidden');
    });

    // 2. แสดงเฉพาะแอปที่ถูกกดเปิด
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
        app.classList.add('hidden'); // ซ่อนแอปทั้งหมด
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
    closeApp(); // ปิดแอปเพื่อเผยหน้า Home Screen ด้านหลัง
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
        'app-x': { name: 'X', icon: 'fab fa-twitter' }
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
                openApp(appId, appId === 'app-x' ? 'dark' : 'light');
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
    
    // เด้งป๊อปอัพเลือกภาษาทันทีเมื่อเปิดใช้งาน
    openLanguageModal();
});
