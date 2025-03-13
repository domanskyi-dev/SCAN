export const parseDocuments = (document) => {
    const tags = [];
    if (document.ok.attributes.isTechNews) tags.push("Технические новости");
    if (document.ok.attributes.isAnnouncement) tags.push("Анонсы и события");
    if (document.ok.attributes.isDigest) tags.push("Сводки новостей");

    const date = new Date(document.ok.issueDate);
    const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const rawText = document.ok.content.markup
    const contentText = rawText
        .replace(/<\?xml.*?\?>/, '')
        .replace(/<\/?scandoc>/g, '')
        .replace(/<\/?sentence>/g, '')
        .replace(/<entity[^>]*>(.*?)<\/entity>/g, '$1')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    let imageUrl = rawText.match(/src="(https:\/\/[^"]+?)"/);
    if (!imageUrl) {
        imageUrl = rawText.match(/srcset="(https:\/\/[^"]+?)"/);
    }
    const imageSource = imageUrl ? imageUrl[1].split(' ')[0] : null;

    return {
        issueDate: formattedDate,
        sourceName: document.ok.source.name,
        titleText: document.ok.title.text,
        tags,
        imageSource,
        contentText,
        url: document.ok.url,
        wordCount: document.ok.attributes.wordCount
    };
}