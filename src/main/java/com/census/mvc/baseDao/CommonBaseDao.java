package com.census.mvc.baseDao;
import org.hibernate.Session;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Properties;


public class CommonBaseDao {
    protected String sqlQuery;
    @PersistenceContext(unitName = "census")
    protected EntityManager em;
    @Autowired
    @Qualifier("queryProps")
    protected Properties properties;

    protected Session getCurrentSession() {
        return em.unwrap(Session.class);
    }
    protected org.hibernate.Query hibernateQuery(String query, Class dtoClazz) {
        return getCurrentSession()
                .createSQLQuery(query)
                .setResultTransformer(Transformers.aliasToBean(dtoClazz));
    }

    protected org.hibernate.query.Query sqlQuery(String query, Class dtoClazz) {
        return getCurrentSession()
                .createSQLQuery(query)
                .setResultTransformer(new AliasToBeanResultTransformer(dtoClazz));
    }
    protected org.hibernate.query.Query sqlQuery(String query) {
        return getCurrentSession().createSQLQuery(query);
    }

    protected Query persistenceQuery(String query, Class entityClazz) {
        return em.createNativeQuery(query, entityClazz);
    }
    protected org.hibernate.Query hibernateQuery(String query) {
        return getCurrentSession().createSQLQuery(query);
    }

    protected void saveOrUpdate(Object obj) {
        getCurrentSession().saveOrUpdate(obj);
    }

    protected void deleteE(Object obj) {
        em.remove(obj);
    }
    protected Query persistenceQuery(String query) {
        return em.createNativeQuery(query);
    }
    protected org.hibernate.Query hibernateQueryToken(String query, Class dtoClazz) {
        return getCurrentSession().createSQLQuery(query)
                .addScalar("id", StandardBasicTypes.INTEGER)
                .addScalar("access_token", StandardBasicTypes.STRING)
                .addScalar("scope", StandardBasicTypes.STRING)
                .addScalar("token_type", StandardBasicTypes.STRING)
                .addScalar("created_on", StandardBasicTypes.LONG)
                .addScalar("expires_in", StandardBasicTypes.INTEGER)
                .setResultTransformer(Transformers.aliasToBean(dtoClazz));
    }

}
