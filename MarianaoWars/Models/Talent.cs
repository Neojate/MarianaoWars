using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarianaoWars.Models
{
    public class Talent
    {
        // ID del Talento. Primary Key Autoincremental.
        public int Id { get; set; }

        // Nivel de Talento del Refactor.
        public int RefactorLevel { get; set; }

        public int InheritanceLevel { get; set; }

        public int InjectionLevel { get; set; }

        public int UdpLevel { get; set; }

        public int TcpIpLevel { get; set; }

        public int SftpLevel { get; set; }

        public int SingletonLevel { get; set; }

        public int MvcLevel { get; set; }

        public int DaoLevel { get; set; }

        public int EcbLevel { get; set; }

        public int RsaLevel { get; set; }

        public int SslLevel { get; set; }

        public Computer Computer { get; set; }

        public Talent()
        {
            RefactorLevel = 0;
            InheritanceLevel = 0;
            InjectionLevel = 0;
            UdpLevel = 0;
            TcpIpLevel = 0;
            SftpLevel = 0;
            SingletonLevel = 0;
            MvcLevel = 0;
            DaoLevel = 0;
            EcbLevel = 0;
            RsaLevel = 0;
            SslLevel = 0;
        }

    }
}
