
  
  async function logout() {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const role = localStorage.getItem('role');
  
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const logoutEndpoint = role === 'admin' ? 'https://mybrand-backend-s9f7.onrender.com/api/admin/logout' : 'https://mybrand-backend-s9f7.onrender.com/api/user/logout';
  
      const response = await fetch(logoutEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        window.location.href = 'https://robsdagreat.github.io/MyBrand-Robert/adminlog.html';
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  function isAuthenticated() {
    const userToken = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
  
    if (!userToken && !adminToken) {
      return false; 
    }
  
    try {
      if (userToken) {
        const decodedUserToken = parseJwt(userToken);
        if (decodedUserToken.isAdmin === false) {
          return 'user'; 
        }
      }
  
      if (adminToken) {
        const decodedAdminToken = parseJwt(adminToken);
        if (decodedAdminToken.isAdmin === true) {
          return 'admin'; 
        }
      }
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return false; 
    }
  
    return false; 
  }

  function parseJwt(token) {
    try {

      if (typeof token !== 'string') {
        throw new Error('Invalid token type');
      }
  
      
      const [headerBase64, payloadBase64, signature] = token.split('.');
  

      if (!headerBase64 || !payloadBase64 || !signature) {
        throw new Error('Invalid token structure');
      }
  
      
      const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
  

      return JSON.parse(payloadJson);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  function handleAdminDashboardAccess() {
    const authStatus = isAuthenticated();
    const isAdminDashboard = window.location.pathname.includes('/dashboard.html');
  
    if (isAdminDashboard) {
    
      if (authStatus === 'admin') {
    
        renderAdminDashboard();
      } else if (authStatus === 'user') {
        redirectToCurrentPage();
      } else {
        redirectToLoginPage();
      }
    } 
  }

  function redirectToCurrentPage() {
    window.location.replace(window.location.href);
  }

  function renderAdminDashboard() {

    const body = document.body;
  
    if (body) {
  
      const adminDashboardContent = `
      <header>
      <div id="up">
          <div class="dash">
             <p>Pages/<span>Dashboard</span></p>
          </div>
          <div class="search">
               <input type="text" id="search" placeholder="Type here...">
          </div>
          <div class="icon">
          <div class="setting">
             <a href="setting.html"> <img src="./imgs/bi_gear-fill.svg" alt=""></a>
          </div>
          <div class="prof">
              <a href="setting.html#current"><img src="./imgs/healthicons_ui-user-profile.svg" alt=""></a>
          </div>
      </div>
      </div>
     </header> 
     <main>
      <div id="dash">
          <h3><span class="one">RO</span><span class="two">BS</span> DASHBOARD</h3>
          <div class="border"></div>
          <div id="options">
              <div class="active">
                  <div class="img"><img src="./imgs/ph_squares-four-fill.svg" alt=""></div>
                  <div class="page"><a href=""><span>DASHBOARD</span></a></div>
              </div>
              <div class="link">
                  <div class="img"><img src="./imgs/flowbite_home-solid.svg" alt=""></div>
                  <div class="page"><a href="index.html#home"><span>HOME</span></a></div>
              </div>
              <div class="link">
                  <div class="img"><img src="./imgs/bxs_up-arrow-square.svg" alt=""></div>
                  <div class="page"><a href="index.html#about"><span>ABOUT</span></a></div>
              </div>
              <div class="link">
                  <div class="img"><img src="./imgs/ic_baseline-call.svg" alt=""></div>
                  <div class="page"><a href="index.html#contact"><span>CONTACT</span></a></div>
              </div>
              <div class="link">
                  <div class="img"><img src="./imgs/clarity_login-solid.svg" alt=""></div>
                  <div class="page"><a href="./login.html"><span>LOGIN</span></a></div>
              </div>
              <div class="link">
                  <div class="img"><img src="./imgs/carbon_ibm-watson-knowledge-studio.svg" alt=""></div>
                  <div class="page"><a href="./skills.html"><span>SKILLS</span></a></div>
              </div>
              <div class="link">
                  <div class="img"><img src="./imgs/zondicons_portfolio.svg" alt=""></div>
                  <div class="page"><a href="./portfolio.html"><span>PORTFOLIO</span></a></div>
              </div>
              <div class="link">
                  <div class="img"><img src="./imgs/iconoir_post-solid.svg" alt=""></div>
                  <div class="page"><a href="./blog.html"><span>BLOG</span></a></div>
              </div>
          </div>
          <div id="admin-options">
              <div class="link">
                  <div class="img"><img src="./imgs/ri_question-fill.svg" alt=""></div>
                  <div class="page"><a href="./queries.html"><span>QUERIES</span></a></div>
              </div>
              <div class="link">
                  <div class="img"><img src="./imgs/ooui_articles-rtl.svg" alt=""></div>
                  <div class="page"><a href="./article.html"><span>ARTICLES</span></a></div>
              </div>
              <div class="link">
                  <div class="img"><img src="./imgs/bi_gear-fill.svg" alt=""></div>
                  <div class="page"><a href="./setting.html"><span>SETTINGS</span></a></div>
              </div>
          </div>
          <div class="logout">
              <div class="img"><img src="./imgs/ph_squares-four-fill.svg" alt=""></div>
              <div class="page"><a ><span id="logout">SIGN OUT</span></a></div>
          </div>
      </div>
      
      <div id="cards">
          <div class="card">
              <span>30+</span>
              <p>Articles</p>
              <p>per month</p>
          </div>
          <div class="card">
              <span>15+</span>
              <p>Subscribers</p>
              <p>per month</p>
          </div>
          <div class="card">
              <span>40+</span>
              <p>Visitors</p>
              <p>per month</p>
          </div>
      </div>
  
     </main>
      `;
  
  
      body.innerHTML = adminDashboardContent;
      const logoutButton = document.querySelector('#logout');
    if (logoutButton) {
      logoutButton.style.cursor = 'pointer';
      logoutButton.addEventListener('click', logout);
    } else {
      console.error('Logout button not found in the rendered dashboard');
    }
    
    } else {
      console.error('Body element not found');
    }
  }

  function redirectToLoginPage() {
    window.location.href = 'https://robsdagreat.github.io/MyBrand-Robert/login.html';
  }