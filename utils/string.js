// XSS 공격 방지를 위함
export function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (char) => {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }
    return escapeMap[char]
  })
}
