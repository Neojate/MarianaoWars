using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    /**
     * Instituto hace referencia al servidor.
     * 
     * 
     */
    public class Instituto
    {

        public Guid ID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaIni { get; set; }
        public DateTime FechaCierre { get; set; }
        public int RatioTiempo { get; set; }
        public int RatioPrecio { get; set; }
        public int RatioActu { get; set; }
        public DateTime UltimaMod { get; set; }

        public Instituto(string nombre, string descripcion, DateTime fechaIni, DateTime fechaCierre, int ratioTiempo, int ratioPrecio, int ratioActu, DateTime ultimaMod)
        {
            Nombre = nombre;
            Descripcion = descripcion;
            FechaIni = fechaIni;
            FechaCierre = fechaCierre;
            RatioTiempo = ratioTiempo;
            RatioPrecio = ratioPrecio;
            RatioActu = ratioActu;
            UltimaMod = ultimaMod;
        }


    }
}
