using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    /**
     * Instituto hace referencia al servidor.
     */
    public class Instituto
    {
        // ID del Instituto. Primary Key Autoincremental.
        public Guid ID { get; set; }

        // Nombre del servidor.
        public string Nombre { get; set; }

        // Descripción del servidor.
        public string Descripcion { get; set; }

        // Fecha en la que se inicia el servidor.
        public DateTime FechaIni { get; set; }

        // Fecha en la que se cierra el servidor y se termina la partida.
        public DateTime FechaCierre { get; set; }

        // Multiplicador de tiempo. Por defecto es 1.
        public int RatioTiempo { get; set; }

        // Multiplicador de precio. Por defecto es 1.
        public int RatioPrecio { get; set; }

        // Indica cada cuantas milésimas de segundo se actualiza la bbdd.
        public int RatioActu { get; set; }

        // La cantidad máxima de jugadores que permite el servidor
        public int maxJugadores { get; set; }



        public Instituto(string nombre, string descripcion, DateTime fechaIni, DateTime fechaCierre, int ratioTiempo, int ratioPrecio, int ratioActu, int maxJugadores)
        {
            Nombre = nombre;
            Descripcion = descripcion;
            FechaIni = fechaIni;
            FechaCierre = fechaCierre;
            RatioTiempo = ratioTiempo;
            RatioPrecio = ratioPrecio;
            RatioActu = ratioActu;
            this.maxJugadores = maxJugadores;
        }

    }
}
