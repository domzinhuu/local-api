import { Request, Response } from 'express';

class InversareController {
  static loginInversare = async (req: Request, res: Response) => {
    res.status(200).send(login);
  };

  static getFilaEnviados = async (req: Request, res: Response) => {
    return res.status(200).send(queueSend);
  };

  static getFilaRecebidos = async (req: Request, res: Response) => {
    return res.status(200).send(queueReceived);
  };

  static getCardHolder = async (req: Request, res: Response) => {
    return res.status(200).send(login.user);
  };

  static sendFinancialIncentive = async (req: Request, res: Response) => {
    setTimeout(() => {
      return res.status(200).send({});
    }, 1000);
  };
}

export default InversareController;

const login = {
  user: {
    code: '7560001012040',
    name: 'TESTE 4WARD',
    email: 'teste4wrd@cabal.com.br',
    document: {
      value: '98234432460',
      type: 'cpf'
    },
    status: 'ACTIVE',
    profiles: [
      {
        id: 2,
        name: 'ADMINISTRADOR INTERCAMBIO',
        description: 'ADMINISTRADOR INTERCAMBIO',
        jurisdictions: [
          {
            id: 14,
            name: 'Ler Usuarios',
            description: 'READ_USERS',
            type: 'READ_USERS'
          },
          {
            id: 13,
            name: 'Ler Transacoes',
            description: 'READ_TRANSACTIONS',
            type: 'READ_TRANSACTIONS'
          },
          {
            id: 38,
            name: 'Editar Fila',
            description: 'EDIT_QUEUE',
            type: 'EDIT_QUEUE'
          },
          {
            id: 11,
            name: 'Ler Relatorios',
            description: 'READ_REPORTS',
            type: 'READ_REPORTS'
          },
          {
            id: 8,
            name: 'Ler Estabelecimento',
            description: 'READ_MERCHANT',
            type: 'READ_MERCHANT'
          },
          {
            id: 2,
            name: 'Ler Bandeira',
            description: 'READ_BRAND',
            type: 'READ_BRAND'
          },
          {
            id: 4,
            name: 'Ler Motivos Disputa',
            description: 'READ_DISPUTE_REASONS',
            type: 'READ_DISPUTE_REASONS'
          },
          {
            id: 6,
            name: 'Ler Motivos Disputa Interna',
            description: 'READ_INTERNAL_DISPUTE_REASONS',
            type: 'READ_INTERNAL_DISPUTE_REASONS'
          },
          {
            id: 24,
            name: 'Criar Fila',
            description: 'CREATE_QUEUE',
            type: 'CREATE_QUEUE'
          },
          {
            id: 12,
            name: 'Ler Perfis',
            description: 'READ_ROLES',
            type: 'READ_ROLES'
          },
          {
            id: 1,
            name: 'Ler Adquirente',
            description: 'READ_ACQUIRER',
            type: 'READ_ACQUIRER'
          },
          {
            id: 26,
            name: 'Criar Perfis',
            description: 'CREATE_ROLES',
            type: 'CREATE_ROLES'
          },
          {
            id: 27,
            name: 'Criar Transacoes',
            description: 'CREATE_TRANSACTIONS',
            type: 'CREATE_TRANSACTIONS'
          },
          {
            id: 9,
            name: 'Ler Personalizar Layouts',
            description: 'READ_PERSONALIZED_LAYOUTS',
            type: 'READ_PERSONALIZED_LAYOUTS'
          },
          {
            id: 53,
            name: 'Desativar Relatorios',
            description: 'DEACTIVATE_REPORTS',
            type: 'DEACTIVATE_REPORTS'
          },
          {
            id: 41,
            name: 'Editar Transacoes',
            description: 'EDIT_TRANSACTIONS',
            type: 'EDIT_TRANSACTIONS'
          },
          {
            id: 7,
            name: 'Ler Emissor',
            description: 'READ_ISSUER',
            type: 'READ_ISSUER'
          },
          {
            id: 55,
            name: 'Desativar Transacoes',
            description: 'DEACTIVATE_TRANSACTIONS',
            type: 'DEACTIVATE_TRANSACTIONS'
          },
          {
            id: 40,
            name: 'Editar Perfis',
            description: 'EDIT_ROLES',
            type: 'EDIT_ROLES'
          },
          {
            id: 3,
            name: 'Ler Motivos Bandeira',
            description: 'READ_BRAND_REASONS',
            type: 'READ_BRAND_REASONS'
          },
          {
            id: 5,
            name: 'Ler Grupo Economico',
            description: 'READ_ECONOMIC_GROUPS',
            type: 'READ_ECONOMIC_GROUPS'
          },
          {
            id: 25,
            name: 'Criar Relatorios',
            description: 'CREATE_REPORTS',
            type: 'CREATE_REPORTS'
          },
          {
            id: 52,
            name: 'Desativar Fila',
            description: 'DEACTIVATE_QUEUE',
            type: 'DEACTIVATE_QUEUE'
          },
          {
            id: 10,
            name: 'Ler Fila',
            description: 'READ_QUEUE',
            type: 'READ_QUEUE'
          },
          {
            id: 54,
            name: 'Desativar Perfis',
            description: 'DEACTIVATE_ROLES',
            type: 'DEACTIVATE_ROLES'
          },
          {
            id: 39,
            name: 'Editar Relatorios',
            description: 'EDIT_REPORTS',
            type: 'EDIT_REPORTS'
          }
        ]
      },
      {
        id: 4,
        name: 'ANALISTA INTERCAMBIO',
        description: 'ANALISTA INTERCAMBIO',
        jurisdictions: [
          {
            id: 24,
            name: 'Criar Fila',
            description: 'CREATE_QUEUE',
            type: 'CREATE_QUEUE'
          },
          {
            id: 41,
            name: 'Editar Transacoes',
            description: 'EDIT_TRANSACTIONS',
            type: 'EDIT_TRANSACTIONS'
          },
          {
            id: 13,
            name: 'Ler Transacoes',
            description: 'READ_TRANSACTIONS',
            type: 'READ_TRANSACTIONS'
          },
          {
            id: 38,
            name: 'Editar Fila',
            description: 'EDIT_QUEUE',
            type: 'EDIT_QUEUE'
          },
          {
            id: 55,
            name: 'Desativar Transacoes',
            description: 'DEACTIVATE_TRANSACTIONS',
            type: 'DEACTIVATE_TRANSACTIONS'
          },
          {
            id: 11,
            name: 'Ler Relatorios',
            description: 'READ_REPORTS',
            type: 'READ_REPORTS'
          },
          {
            id: 27,
            name: 'Criar Transacoes',
            description: 'CREATE_TRANSACTIONS',
            type: 'CREATE_TRANSACTIONS'
          },
          {
            id: 25,
            name: 'Criar Relatorios',
            description: 'CREATE_REPORTS',
            type: 'CREATE_REPORTS'
          },
          {
            id: 52,
            name: 'Desativar Fila',
            description: 'DEACTIVATE_QUEUE',
            type: 'DEACTIVATE_QUEUE'
          },
          {
            id: 10,
            name: 'Ler Fila',
            description: 'READ_QUEUE',
            type: 'READ_QUEUE'
          },
          {
            id: 53,
            name: 'Desativar Relatorios',
            description: 'DEACTIVATE_REPORTS',
            type: 'DEACTIVATE_REPORTS'
          },
          {
            id: 39,
            name: 'Editar Relatorios',
            description: 'EDIT_REPORTS',
            type: 'EDIT_REPORTS'
          }
        ]
      }
    ],
    cards: [
      {
        id: 4,
        number: '5127070006825754',
        cardHolder: {},
        cardType: {},
        titularCard: {}
      },
      {
        id: 5,
        number: '5127070017185593',
        cardHolder: {},
        cardType: {},
        titularCard: {}
      },
      {
        id: 6,
        number: '5127070152631156',
        cardHolder: {},
        cardType: {},
        titularCard: {}
      }
    ]
  }
};

const queueSend = [
  {
    id: 12,
    brand: {
      name: 'MASTERCARD'
    },
    card: {
      id: 1,
      cardAccount: {
        code: 7563188492082
      },
      cardHolder: {},
      cardType: {},
      titularCard: {}
    },
    chargebackId: '300002063556',
    claim: {
      id: 11,
      type: 'Standard',
      brandClaimId: '200002020654',
      clearingTransactionId: 'ccCnaMDqmto4wnL+BSUKSdzROqGJ7YELoKhEvluycwKNg3XTz/faIJhFDkl9hW081B5tTqFFiAwCpcocPdB2My4t7DtSTk63VXDl1CySA8Y',
      saved: '2019-05-28 15:50:43'
    },
    documentIndicator: true,
    filename: 'teste.pdf',
    fraudId: '520',
    partialChargeback: false,
    messageText: 'Testando',
    transaction: {
      transactionId: '1',
      originValue: '100.00',
      originCurrency: 'USD',
      reasonCode: '4853'
    },
    saved: '2019-05-28 15:50:43',
    stage: 'CHARGEBACK',
    status: 'CREATED',
    type: 'FRAUD'
  }
];

const queueReceived = {
  pageNumber: 0,
  pageSize: 10,
  totalElements: 1,
  totalPages: 1,
  content: [
    {
      id: 200002020654,
      type: 'Standard',
      value: '25.00 USD',
      clearingDueDate: '2017-11-13 00:00:00',
      clearingNetwork: 'GCMS',
      createDate: '2017-11-13 00:00:00',
      dueDate: '2017-11-13 00:00:00',
      isAccurate: true,
      isAcquirer: true,
      isIssuer: false,
      isOpen: true,
      lastModifiedBy: 'user1234',
      lastModifiedDate: '2017-11-08 00:00:00',
      progressState: 'CB1-4807-O-A-NEW',
      queueName: 'Pending',
      transaction: {
        issuer: {
          code: 5258,
          responsibles: []
        },
        acquirer: {
          code: 5195,
          document: {},
          responsibles: []
        },
        merchant: {
          code: '0024038000200',
          document: {},
          address: {},
          acquirer: {
            responsibles: []
          },
          economicGroup: {},
          paymentFacilitator: {
            responsibles: []
          },
          salesChannel: {},
          responsibles: [],
          cnaes: [],
          terminals: []
        },
        transactionId: '118411681',
        acquirerReferenceNumber: '05103246259000000000126',
        cardSequenceNumber: '52751494691484000'
      }
    }
  ]
};
