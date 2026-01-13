
        const infoUrl = "https://mabinogi.nexon.co.jp/notice/infoBoardContent.asp?ix=";
        const eventUrl = "https://mabinogi.nexon.co.jp/notice/eventBoardContent.asp?ix=";

        function images(base, list) {
            let bun = '';
            list.forEach(it => {
                if (it.includes('mp4')) {
                    bun += '<video controls src="' + base + it + '" loop playsinline></video> ';
                }
                else {
                    bun += '<img src="' + base + it + '"> ';
                }
            });
            return bun;
        }

        function makeTable(key) {
            let html = '<h2>マビノギ呪文書＆リキュール -' + key + '</h2>'
                + '<table border="1" style="border-collapse: collapse">';

            datam.forEach(X => {
                if (X.date.includes(key) || X.name.includes(key) || X.weaName.includes(key) || X.liqName.includes(key) || X.effName.includes(key))
                {
                    let url = X.name.endsWith("ボックス") ? infoUrl : eventUrl;

                    html += '<tr><td width="300px"><p>' + X.date;
                    html += ' <a href="' + url + X.pageId + '" target="_blank" rel="noopener noreferrer">' + X.name + '</a></p>';
                    if( X.weaName ) { html += '<p>武器：' + X.weaName + '</p>'; }
                    if( X.liqName ) { html += '<p>リキュール：' + X.liqName+ '</p>'; }
                    if( X.effName ) { html += '<p>エフェクト：' + X.effName+ '</p>'; }
                    html += '</td><td>';
                    html += images(X.base, X.imgs);
                    html += '</td></tr>';
                }
            });
            return html + '</table>';
        }

        const targetArea = document.getElementById('target-area');

        //初期値は最新年
        targetArea.innerHTML = makeTable(2026);

        function changeContent(url) {
            targetArea.innerHTML = makeTable(url);
        }

        const inputArea = document.getElementById('input-area');
        function findScroll( e ) {
            e.preventDefault(); // ページリロードを防ぐ（一番重要！）

            const query = inputArea.value.trim();
            if (query.length > 0) {
                targetArea.innerHTML = makeTable(query);
            }
        }
