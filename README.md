<h1 align="center">Documentacion</h1>

###

<p align="left">Este proyecto es un organizador de tareas diseñado para facilitar la gestión eficiente de pendientes y mejorar la productividad. La aplicación permite a los usuarios agregar, eliminar y actualizar el estado de sus tareas de manera sencilla e intuitiva.</p>

###

<h3 align="center">--Características principales--</h3>

###

<p align="left">*Gestión de tareas: Agrega, elimina y actualiza el estado de las tareas en tiempo real.<br><br>*Importación desde archivos JSON: Permite cargar múltiples tareas de forma masiva mediante archivos JSON.<br><br>*Exportación de la base de datos: Ofrece la posibilidad de exportar todas las tareas almacenadas en la base de datos en formato JSON para respaldos o análisis externo.</p>

###

<h3 align="center">--Tecnologias usadas--</h3>

###

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="40" alt="python logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" height="40" alt="fastapi logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" alt="postgresql logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height="40" alt="sqlalchemy logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" height="40" alt="css3 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" height="40" alt="html5 logo"  />
</div>

###

<h1 align="center">Instalacion</h1>

###

<p align="left">para ejecutar este programa deberas de crear una base de datos con el nombre de "taskflowchart" y crear a la vez una tabla llamada "tasks" puedes usar el codigo a continuacion para la creacion de la tabla =><br><br> CREATE TABLE tasks (<br>    id SERIAL PRIMARY KEY,<br>    title VARCHAR(255) NOT NULL,<br>    description VARCHAR(255),<br>    status VARCHAR(50) NOT NULL DEFAULT 'pending'<br>); <br><br>cuando la creacion de la base de datos sea completada en el archivo "database.py" intercambia la URL por la de tu base de datos  para poder vincularla.<br><br>Ahora en la consola nos ubicamos el el archivo del repositorio y ejecutamos el ambiente virtual con el siguiente codigo =><br><br>.\venv\Scripts\activate<br><br>y tambien activamos el servidor con el siguiente codigo<br><br>uvicorn main:app --reload<br><br>si no funciona, verifica que todo lo que se encuentra en el archivo "requirements.txt" este instalado, si el problema persiste ejecuta el siguiente comando<br><br>python -m uvicorn main:app --reload<br><br>cuando el servidor este activo y la base de datos creada, puede ingresar a el siguiente link y iniciar el uso de este proyecto<br><br>https://tackosday.github.io/TaskFlowchart/</p>

###

<p align="left"></p>

###
