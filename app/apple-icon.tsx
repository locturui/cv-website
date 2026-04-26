import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

async function loadFont() {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Unbounded:wght@900',
    { headers: { 'User-Agent': 'Mozilla/5.0' } },
  ).then((r) => r.text())
  const url = css.match(/src:\s*url\((.+?)\)/)?.[1]
  if (!url) throw new Error('Font url not found')
  return await fetch(url).then((r) => r.arrayBuffer())
}

export default async function AppleIcon() {
  const fontData = await loadFont()
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(45deg, #FFE600 50%, #0A0A0A 50%)',
          border: '14px solid #0A0A0A',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            backgroundImage:
              'linear-gradient(45deg, #0A0A0A 50%, #FFE600 50%)',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: 150,
            fontWeight: 900,
            fontFamily: 'Unbounded',
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          S
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Unbounded', data: fontData, style: 'normal', weight: 900 }],
    },
  )
}
