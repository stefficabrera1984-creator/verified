(function () {

    const $ = (sel, parent = document) => parent.querySelector(sel);

    const query = searchToObject();
    const initUrl = window.location.origin + '/webhosting/' + OAO.inline.projectId + '/explorer/core';
    const fileUrl = query.path + '/' + query.file;
    const fetchUrl = initUrl + '?path=' + fileUrl
    const saveUrl = initUrl + '/edit/?path=' + fileUrl;

    let mode, editor;

    showLoadingIndicator();
    fetchFile();
    initCodeMirror();
    setFileName();

    $('#save-file').addEventListener("click", saveFile);

    function setFileName() {
        document.querySelectorAll('.file-name').forEach(function (el, i) {
            el.innerText = query.file;
        });
    }

    function fetchFile() {
        fetch(fetchUrl, {
            mode: 'same-origin',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="_csrf"]').content
            }
        })
            .then(function (response) {
                if (response.status === 200) {
                    return response;
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((response) => response.text())
            .then((text) => {
                $('#code-area').value = text;
                runCodeMirror();
                removeLoadingState();
            }).catch(function (error) {
            // console.log('error', error)
            $('#load-error').classList.remove('hidden');
            $('.errors').classList.remove('hidden');
            removeLoadingState(true);
        });
    }

    function removeLoadingState(error = false) {
        if (!error) {
            $('#code-area').removeAttribute('disabled');
        }
        $('#save-file').classList.remove('button--disabled');
    }

    function saveFile(ev) {
        ev.preventDefault();

        if (ev.target.classList.contains('button--disabled')) {
            return;
        }

        fetch(saveUrl, {
            mode: 'same-origin',
            body: editor.getValue(),
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="_csrf"]').content
            }
        })
            .then(function (data) {
                $('.button--with-loader').classList.remove('button--loading');

                // show success message
                if (data.status === 200) {
                    $('#save-success').classList.remove('hidden');

                    //redirect to main Webspace explorer
                    window.setTimeout(function () {
                        window.location.href = window.location.origin + '/webhosting/' + OAO.inline.projectId + '/webspace-explorer?path=' + query.path;
                    }, 2500);
                }
                // show error message
                else {
                    $('#save-error').classList.remove('hidden');
                    $('.errors').classList.remove('hidden');
                }
            });
    }


    function initCodeMirror() {

        const pluginPath = "/webhosting/js/libraries/codemirror/modes/";

        const file = query.file;
        const fileType = file.substr(file.lastIndexOf('.') + 1);

        const codeCompletionPlugins = {
            js: "javascript",
            css: "css",
            php: "php",
            xml: "xml",
            html: "htmlmixed"
        };

        const pluginsDependencies = {
            html: ["xml", "javascript", "css"],
            php: ["xml", "javascript", "css", "htmlmixed", "clike"]
        };

        if (fileType in pluginsDependencies) {
            for (let i = pluginsDependencies[fileType].length - 1; i >= 0; i--) {
                let script = document.createElement("script");
                script.type = "text/javascript";
                script.src = pluginPath + pluginsDependencies[fileType][i] + ".min.js";
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }

        if (fileType in codeCompletionPlugins) {
            mode = codeCompletionPlugins[fileType];
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = pluginPath + mode + ".min.js";
            document.getElementsByTagName("head")[0].appendChild(script);
        }

    }


    function runCodeMirror() {
        window.setTimeout(function () {

            $('#file-editor').classList.remove('loading');
            $('#file-editor .loading-square').remove();

            editor = CodeMirror.fromTextArea(
                $('#code-area'),
                {lineNumbers: true, mode: mode, autofocus: true, styleActiveLine: true, matchBrackets: true}
            );

        }, 700);
    }

    function showLoadingIndicator() {
        const loading = document.createElement('div');
        loading.classList.add('loading-square');
        const div = document.createElement('div');
        loading.appendChild(div);
        $('#file-editor').appendChild(loading);
    }

// helper function
// https://stackoverflow.com/questions/6539761/window-location-search-query-as-json
    function searchToObject() {
        var pairs = window.location.search.substring(1).split("&"),
            obj = {},
            pair,
            i;

        for (i in pairs) {
            if (pairs[i] === "") continue;
            pair = pairs[i].split("=");
            obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }

        return obj;
    }


})(); // end SEAF
