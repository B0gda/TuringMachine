# turing-api
API for Turing Machine

Simple API for Turing Machine with 2 preloaded algorythms: Unary Addition and Unary GCD.

Steps to launch: 
--

With Docker compose
1) Build project with **mvn package**
2) Build image for your project
3) Run **docker compose up -d**

With local run:
1) Install MongoDB on your PC
2) Configure connection
3) Run app with -dev- profile, ensuring that you have proper configs (check credentials and mongo url)
