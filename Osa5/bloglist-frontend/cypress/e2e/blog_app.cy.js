describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST',
    'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'mara666',
      name: 'Martti',
      password: 'salainen'
    }
    const user2 = {
      username: 'Alex123',
      name: 'Cai Göran',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  it('user can log in', function() {
    cy.get('#username').type('mara666')
    cy.get('#password').type('salainen')
    cy.get('#login_button').click()

    cy.contains('Martti logged in')
  })

  it('user cant log in wrong password', function() {
    cy.get('#username').type('mara666')
    cy.get('#password').type('salaisa')
    cy.get('#login_button').click()

    cy.contains('Wrong username or password')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mara666')
      cy.get('#password').type('salainen')
      cy.get('#login_button').click()
    })

    it('new blog can be created', function() {
      cy.get('#new_blog_button').click()
      cy.get('#title').type('Clean Code')
      cy.get('#author').type('Martin')
      cy.get('#url').type('testurl.com')
      cy.get('#create_button').click()
      cy.contains('a new blog \'Clean Code\' by \'Martin\' added')
    })

    it('user can like a blog', function() {
      cy.get('#new_blog_button').click()
      cy.get('#title').type('Clean Code')
      cy.get('#author').type('Martin')
      cy.get('#url').type('testurl.com')
      cy.get('#create_button').click()
      cy.get('#view_button').click()
      cy.get('#like_button').click()
      cy.contains('likes 1')
    })
    it('user can delete a blog', function() {
      cy.get('#new_blog_button').click()
      cy.get('#title').type('Clean Code')
      cy.get('#author').type('Martin')
      cy.get('#url').type('testurl.com')
      cy.get('#create_button').click()
      cy.reload()
      cy.get('#view_button').click()
      cy.get('#remove_button').click()
      cy.contains('Clean Code by Martin has been removed')
    })
    it('user can not delete a blog that is created by another user', function() {
      cy.get('#new_blog_button').click()
      cy.get('#title').type('Clean Code')
      cy.get('#author').type('Martin')
      cy.get('#url').type('testurl.com')
      cy.get('#create_button').click()
      cy.get('#logout_button').click()
      cy.reload()
      cy.get('#username').type('Alex123')
      cy.get('#password').type('salainen')
      cy.get('#login_button').click()
      cy.get('#view_button').click()
      cy.get('#remove_button').should('not.exist')
    })
    it('blogs are ordered by likes', function() {
      cy.get('#new_blog_button').click()
      cy.get('#title').type('Clean Code')
      cy.get('#author').type('Martin')
      cy.get('#url').type('testurl.com')
      cy.get('#create_button').click()
      cy.reload()
      cy.get('#new_blog_button').click()
      cy.get('#title').type('Clean Code2')
      cy.get('#author').type('Martin')
      cy.get('#url').type('testurl.com')
      cy.get('#create_button').click()
      cy.reload()
      cy.contains('Clean Code2').find('#view_button').click()
      cy.get('#like_button').click()
      cy.reload()
      cy.get('.blog').eq(0).should('contain', 'Clean Code2')
      cy.get('.blog').eq(1).should('contain', 'Clean Code')
    
    })
})
})
