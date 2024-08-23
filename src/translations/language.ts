const isoLanguages = ['en', 'pt-BR']

export const getSystemLanguage = () => {
  const isoLang = navigator.language.slice(0, 2)

  const isoLanguage = isoLanguages.find(iso => iso === isoLang)

  return isoLanguage || isoLanguages[0]
}
