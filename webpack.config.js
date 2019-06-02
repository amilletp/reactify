// LibrerÃ­as
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// Cuando no hay configuracion de source-maps se puede
// exportar directamente el JSON
//module.exports = {
const config = {
  entry: {
    main: "./src/index.js", // Punto de entrada a la aplicaciÃ³n
    // Contiene ReactDOM.render(...
    vendor: ["react", "react-dom", "react-router-dom"]
  },
  optimization: {
    // Genera un comentario automatico en los
    // exports no utilizados, es decir codigo o funciones
    // sin usar
    usedExports: true,
    // Similar a usedExports, solo que en vez de generar
    // comentario elimina el codigo no utlizado de la build
    // Pero no borra aquellas funciones no se puede identificar
    // si se estan usando al 100 % de seguridad
    // Ponerlo a false implica que las funciones dudosas se
    // eliminaran
    // Esta activa por defecto si no se especifica
    sideEffects: true,
    // Importamos todos los mÃ³dulos desde un Ãºnico runtime
    runtimeChunk: "single",
    // Configuramos splitChunks
    splitChunks: {
      // Configuramos los grupos de chunks
      cacheGroups: {
        // Definimos un grupo vendor que contendrÃ¡ las
        // librerÃ­as
        vendor: {
          // Apuntamos al entrypoint "vendor"
          test: "vendor",
          // Le damos un nombre al chunk
          name: "vendor",
          // Fuerza a Webpack a crear un chunk
          // de este grupo siempre
          enforce: true,
          // Selecciona todos los tipos de chunks,
          // sÃ­ncronos y asÃ­ncronos
          chunks: "all"
        }
      }
    }
  },
  output: {
    // Para gestionar mejor la cachÃ© de los ficheros en servidor,
    // puedes agregar un hash al final de cada fichero de salida.
    // El objetivo de esta optimizaciÃ³n es agregar un hash por cada
    // chunk que solo cambie cuando se haya modificado el cÃ³digo de este
    path: path.resolve(__dirname, "build"), // Carpeta salida de la build
    filename: "[name].[chunkhash:8].js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Extensiones a procesar
        exclude: /node_modules/, // Exclusiones
        loader: "babel-loader" // Procesador de la extension
      },
      {
        test: /\.css$/, // Extensiones a procesar
        use: ["style-loader", "css-loader"] // Cuando son mÃ¡s de un loader
      }, // se ponen con use
      {
        test: /\.(png|jpe?g|gif|mp3)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html", // Fichero origen para index.html
      filename: "./index.html" // Fichero salida
    }),
    new CopyPlugin([{ from: "public", to: "" }])
  ],
  // Configuraciones para el plugin webpack-dev-server
  // instalado separadamente
  devServer: {
    // Carpeta salida de la build
    contentBase: "./build",
    // Fuerza a que se sirva index.html en caso de una ruta 404
    historyApiFallback: true,
    // Todas las peticiones a /api* serÃ¡n redireccionadas a
    // localhost:3000
    proxy: {
      "/api/albums": "http://localhost:3001/albums",
      "/api/songs": "http://localhost:3001/songs"
    }
  }
};

// Configuracion del tipo de source-map a generar en la build
module.exports = (env, argv) => {
  // Comprobamos si estamos en desarrollo
  const isDevelopment = argv.mode === "development";
  if (isDevelopment) {
    config.devtool = "eval-source-map";
  } else {
    config.devtool = "source-map"; // o hidden-source-map
  }
  return config;
};
