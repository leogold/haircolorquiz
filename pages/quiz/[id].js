import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({dbExterno}) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen 
        externalQuestions={dbExterno.questions}
        externalBg = {dbExterno.bg}
      />
    {/* <pre style={{ color: 'black'}}>
      {JSON.stringify(dbExterno.questions, null, 4)}
    </pre> */}
    </ThemeProvider>
  );
}


export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  // console.log('Info que o Next da para nós.', context.query.id)
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      throw new Error('Falha em pegar os Dados')
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
    .catch((err) => {
      console.error(err);
    })
  return {
    props: {
      dbExterno,
    }, // will be passed to the page component as props
  };
}