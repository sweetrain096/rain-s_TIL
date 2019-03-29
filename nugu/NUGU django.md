# NUGU django

## 00. 기본 설정

1. python 및 가상환경 설정

   ```bash
   git clone https://github.com/pyenv/pyenv.git ~/.pyenv
   echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
   echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
   echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bashrc
   
   source ~/.bashrc
   pyenv install 3.6.7
   pyenv global 3.6.7
   python -V
   pip install --upgrade pip
   
   git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
   echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
   exec "$SHELL"
   
   pyenv virtualenv django-venv
   pyenv local django-venv
   ```

   

2. django 설치

   ```bash
   pip install django
   ```

   

3. request 및 beautifulSoup 설치

   ```bash
   pip install requests
   pip install bs4
   ```

   





