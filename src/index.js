
let participantes = [
  {
    nome: 'Mayk Brito',
    email: 'mayk@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataChekIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: 'Ana Silva',
    email: 'ana.silva@gmail.com',
    dataInscricao: new Date(2024, 2, 21, 14, 30),
    dataChekIn: new Date(2024, 2, 25, 10, 45)
  },
  {
    nome: 'Pedro Oliveira',
    email: 'pedro.oliveira@gmail.com',
    dataInscricao: new Date(2024, 2, 23, 11, 10),
    dataChekIn: new Date(2024, 2, 26, 9, 15)
  },
  {
    nome: 'Camila Santos',
    email: 'camila.santos@gmail.com',
    dataInscricao: new Date(2024, 2, 20, 18, 45),
    dataChekIn: null
  },
  {
    nome: 'Lucas Almeida',
    email: 'lucas.almeida@gmail.com',
    dataInscricao: new Date(2024, 2, 24, 10, 20),
    dataChekIn: new Date(2024, 2, 27, 8, 45)
  },
  {
    nome: 'Juliana Lima',
    email: 'juliana.lima@gmail.com',
    dataInscricao: new Date(2024, 2, 19, 20, 55),
    dataChekIn: null
  },
  {
    nome: 'Fernando Costa',
    email: 'fernando.costa@gmail.com',
    dataInscricao: new Date(2024, 2, 26, 16, 40),
    dataChekIn: new Date(2024, 2, 28, 14, 25)
  },
  {
    nome: 'Mariana Souza',
    email: 'mariana.souza@gmail.com',
    dataInscricao: new Date(2024, 2, 18, 9, 15),
    dataChekIn: null
  },
  {
    nome: 'Gabriel Santos',
    email: 'gabriel.santos@gmail.com',
    dataInscricao: new Date(2024, 2, 25, 13, 20),
    dataChekIn: new Date(2024, 2, 29, 11, 01)
  },
  {
    nome: 'Carolina Martins',
    email: 'carolina.martins@gmail.com',
    dataInscricao: new Date(2024, 2, 17, 21, 50),
    dataChekIn: new Date(2024, 2, 21, 19, 15)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
  let dataChekIn = dayjs(Date.now()).to(participante.dataChekIn);
  if (participante.dataChekIn == null) {
    dataChekIn = `
      <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    
    `
  }

  return `
  <tr>
        <td>
          <strong>
            ${participante.nome}
          </strong>
          <br>
          <small>
            ${participante.email}
          </small>
        </td>
        <td>
          ${dataInscricao}
        </td>
        <td>
          ${dataChekIn}
        </td>
  </tr>
  `

};

const atualizarLista = (participantes) => {
  let output = '';
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)

  }
  document.querySelector('tbody').innerHTML = output;
};

atualizarLista(participantes);

const adiconarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataChekIn: null
  };

  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email
  });
  if (participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

   event.target.querySelector('[name="nome"]').value=''
   event.target.querySelector('[name="email"]').value=''
};

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'tem certeza que deseja fazer o check-in?'
  if (confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find((p) =>{
    return p.email == event.target.dataset.email
  })
  
  participante.dataChekIn = new Date()

  atualizarLista(participantes)
}