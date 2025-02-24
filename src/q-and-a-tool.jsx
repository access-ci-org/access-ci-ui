import { useEffect } from 'preact/hooks';

export const QAndATool = (params) => {
    useEffect(() => {
        const version = params.version;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://cdn.jsdelivr.net/gh/necyberteam/qa-bot@v${version}/build/static/css/main.css`;
        document.head.appendChild(link);
        const scriptMain = document.createElement('script');
        scriptMain.src = `https://cdn.jsdelivr.net/gh/necyberteam/qa-bot@${version}/build/static/js/main.js`;
        scriptMain.async = true;
        document.body.appendChild(scriptMain);
        const scriptChunk = document.createElement('script');
        scriptChunk.async = true;
        scriptChunk.src = `https://cdn.jsdelivr.net/gh/necyberteam/qa-bot@v${version}/build/static/js/453.chunk.js`;
        document.body.appendChild(scriptChunk);

        return () => {
            document.body.removeChild(scriptMain);
            document.body.removeChild(scriptChunk);
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div></div>
    );
};