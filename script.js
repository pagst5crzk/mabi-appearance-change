
        const infoUrl = "https://mabinogi.nexon.co.jp/notice/infoBoardContent.asp?ix=";
        const eventUrl = "https://mabinogi.nexon.co.jp/notice/eventBoardContent.asp?ix=";

        function images(base, list)
        {
            let bun = '';
            const LL = list.split("/").filter(Boolean);
            LL.forEach(it => {
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
            let html = '<h2> - ' + key + ' -</h2>'
                + '<table border="1" style="border-collapse: collapse">';

            datam.forEach(X => {
                if (X.date.includes(key) || X.name.includes(key) || X.weaName.includes(key) || X.liqName.includes(key) || X.effName.includes(key) || X.titleNames.includes(key))
                {
                    let url = X.name.endsWith("ボックス") ? infoUrl : eventUrl;

                    html += '<tr><td width="300px"><p>' + X.date;
                    html += ' <a href="' + url + X.pageId + '" target="_blank" rel="noopener noreferrer">' + X.name + '</a></p>';

                    let imgs = "";

                    function nameSplitImg(label, str)
                    {
                        const sub = str.split("|");
                        if(sub.length == 2 && sub[0])
                        {
                            html += '<p>' + label + sub[0] + '</p>';
                            imgs += sub[1] + "/";
                        }
                    }

                    nameSplitImg("武器：", X.weaName );
                    nameSplitImg("リキュール：", X.liqName );
                    nameSplitImg("エフェクト：", X.effName );
                    nameSplitImg("2次タイ：", X.titleNames );

                    html += '</td><td>';
                    html += images(X.base, imgs);
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
