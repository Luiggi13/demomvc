using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Security;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace ngGitHouse.Models
{
    public class ADALTokenCache : TokenCache
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private string userId;
        private UserTokenCache Cache;

        public ADALTokenCache(string signedInUserId)
        {
            // Asociar la memoria caché al usuario actual de la aplicación web
            userId = signedInUserId;
            this.AfterAccess = AfterAccessNotification;
            this.BeforeAccess = BeforeAccessNotification;
            this.BeforeWrite = BeforeWriteNotification;
            // Buscar la entrada en la base de datos
            Cache = db.UserTokenCacheList.FirstOrDefault(c => c.webUserUniqueId == userId);
            // Colocar la entrada en la memoria
            this.Deserialize((Cache == null) ? null : MachineKey.Unprotect(Cache.cacheBits,"ADALCache"));
        }

        // Limpiar la base de datos
        public override void Clear()
        {
            base.Clear();
            var cacheEntry = db.UserTokenCacheList.FirstOrDefault(c => c.webUserUniqueId == userId);
            db.UserTokenCacheList.Remove(cacheEntry);
            db.SaveChanges();
        }

        // Se genera una notificación antes de que ADAL acceda a la memoria caché.
        // Esta es la oportunidad de actualizar la copia en memoria de la base de datos, si la versión en memoria está obsoleta
        void BeforeAccessNotification(TokenCacheNotificationArgs args)
        {
            if (Cache == null)
            {
                // Acceso por primera vez
                Cache = db.UserTokenCacheList.FirstOrDefault(c => c.webUserUniqueId == userId);
            }
            else
            {
                // Recuperar la última escritura de la base de datos
                var status = from e in db.UserTokenCacheList
                             where (e.webUserUniqueId == userId)
                select new
                {
                    LastWrite = e.LastWrite
                };

                // Si la copia en memoria es más antigua que la copia persistente
                if (status.First().LastWrite > Cache.LastWrite)
                {
                    // Leer del almacenamiento, actualizar copia en memoria
                    Cache = db.UserTokenCacheList.FirstOrDefault(c => c.webUserUniqueId == userId);
                }
            }
            this.Deserialize((Cache == null) ? null : MachineKey.Unprotect(Cache.cacheBits, "ADALCache"));
        }

        // Se genera una notificación después de que ADAL acceda a la caché.
        // Si la marca HasStateChanged está establecida, ADAL cambió el contenido de la memoria caché
        void AfterAccessNotification(TokenCacheNotificationArgs args)
        {
            // Si el estado ha cambiado
            if (this.HasStateChanged)
            {
                Cache = new UserTokenCache
                {
                    webUserUniqueId = userId,
                    cacheBits = MachineKey.Protect(this.Serialize(), "ADALCache"),
                    LastWrite = DateTime.Now
                };
                // Actualizar la base de datos y la última escritura
                db.Entry(Cache).State = Cache.UserTokenCacheId == 0 ? EntityState.Added : EntityState.Modified;
                db.SaveChanges();
                this.HasStateChanged = false;
            }
        }

        void BeforeWriteNotification(TokenCacheNotificationArgs args)
        {
            // Si quiere asegurarse de que no se produce ninguna escritura simultánea, use esta notificación para colocar un bloqueo en la entrada
        }

    public override void DeleteItem(TokenCacheItem item)
        {
            base.DeleteItem(item);
        }
    }
}
