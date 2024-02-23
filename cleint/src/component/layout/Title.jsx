import React from 'react'

const Title = () => {
  const style = getStyle()
  return (
    <h1 style={style.title}>People And their Cars</h1>
  )
}

const getStyle = () => ({
    title: {
        fontSize: 20,
        padding: "15px",
        marginBottom: "50px",
        borderBottom: "1px  solid #ccc"
    }
})

export default Title