using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class Software
    {
        // ID del Software. Primary Key Autoincremental.
        public int Id { get; set; }

        // Versión del programa Gedit. Sirve para aumentar la velocidad de creación de los scripts.
        public int GeditVersion { get; set; }

        // Versión del programa MySql. Sirve para aumentar los almacenes de recursos
        public int MySqlVersion { get; set; }

        // Versión del programa GitHub. Sirve para almacenar más y mejores scripts.
        public int GitHubVersion { get; set; }

        // Versión del programa StackOverFlow. Sirve para desbloquear mejores talentos
        public int StackOverFlowVersion { get; set; }

        // Versión del programa PostMan. Sirve para desbloquear la alianza.
        public int PostManVersion { get; set; }

        // Versión del programa VirtualMachine. Sirve para aumentar la memoria del ordenador.
        public int VirtualMachineVersion { get; set; }

        public Computer Computer { get; set; }

        public Software()
        {
            GeditVersion = 0;
            MySqlVersion = 0;
            GitHubVersion = 0;
            StackOverFlowVersion = 0;
            PostManVersion = 0;
            VirtualMachineVersion = 0;
        }

    }
}
