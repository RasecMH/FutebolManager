
export const noEmailReq = {
  password: 'any_password',
}

export const noPasswordReq = {
  email: 'any_email@email.com',
}

export const validLoginReq = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export const invalidPasswordReq = {
  email: 'admin@admin.com',
  password: 'wrong_password',
};

export const invalidEmailReq = {
  email: 'admin@admin.com',
  password: 'wrong_password',
};

export const createMatchReq = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const invalidMatchReq = {
  homeTeam: 16,
  awayTeam: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const invalidTeamMatchReq = {
  homeTeam: 160,
  awayTeam: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const updateMatchReq = {
  homeTeamGoals: 2,
  awayTeamGoals: 0
}