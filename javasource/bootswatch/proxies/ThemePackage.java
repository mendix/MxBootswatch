// This file was generated by Mendix Business Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package bootswatch.proxies;

import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixIdentifier;
import com.mendix.systemwideinterfaces.core.IMendixObject;

/**
 * 
 */
public class ThemePackage extends system.proxies.FileDocument
{
	/**
	 * Internal name of this entity
	 */
	public static final String entityName = "Bootswatch.ThemePackage";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		Minified("Minified"),
		Defaulttheme("Defaulttheme"),
		FileID("FileID"),
		Name("Name"),
		DeleteAfterDownload("DeleteAfterDownload"),
		Contents("Contents"),
		HasContents("HasContents"),
		ThemePackage_Theme("Bootswatch.ThemePackage_Theme");

		private String metaName;

		MemberNames(String s)
		{
			metaName = s;
		}

		@Override
		public String toString()
		{
			return metaName;
		}
	}

	public ThemePackage(IContext context)
	{
		this(context, Core.instantiate(context, "Bootswatch.ThemePackage"));
	}

	protected ThemePackage(IContext context, IMendixObject themePackageMendixObject)
	{
		super(context, themePackageMendixObject);
		if (!Core.isSubClassOf("Bootswatch.ThemePackage", themePackageMendixObject.getType()))
			throw new IllegalArgumentException("The given object is not a Bootswatch.ThemePackage");
	}

	/**
	 * @deprecated Use 'new ThemePackage(Context)' instead. Note that the constructor will not insert the new object in the database.
	 */
	@Deprecated
	public static bootswatch.proxies.ThemePackage create(IContext context) throws CoreException
	{
		IMendixObject mendixObject = Core.create(context, "Bootswatch.ThemePackage");
		return new bootswatch.proxies.ThemePackage(context, mendixObject);
	}

	/**
	 * @deprecated Use 'ThemePackage.load(IContext, IMendixIdentifier)' instead.
	 */
	@Deprecated
	public static bootswatch.proxies.ThemePackage initialize(IContext context, IMendixIdentifier mendixIdentifier) throws CoreException
	{
		return bootswatch.proxies.ThemePackage.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.getSudoContext() can be used to obtain sudo access).
	 */
	public static bootswatch.proxies.ThemePackage initialize(IContext context, IMendixObject mendixObject)
	{
		return new bootswatch.proxies.ThemePackage(context, mendixObject);
	}

	public static bootswatch.proxies.ThemePackage load(IContext context, IMendixIdentifier mendixIdentifier) throws CoreException
	{
		IMendixObject mendixObject = Core.retrieveId(context, mendixIdentifier);
		return bootswatch.proxies.ThemePackage.initialize(context, mendixObject);
	}

	public static java.util.List<bootswatch.proxies.ThemePackage> load(IContext context, String xpathConstraint) throws CoreException
	{
		java.util.List<bootswatch.proxies.ThemePackage> result = new java.util.ArrayList<bootswatch.proxies.ThemePackage>();
		for (IMendixObject obj : Core.retrieveXPathQuery(context, "//Bootswatch.ThemePackage" + xpathConstraint))
			result.add(bootswatch.proxies.ThemePackage.initialize(context, obj));
		return result;
	}

	/**
	 * @return value of Minified
	 */
	public final Boolean getMinified()
	{
		return getMinified(getContext());
	}

	/**
	 * @param context
	 * @return value of Minified
	 */
	public final Boolean getMinified(IContext context)
	{
		return (Boolean) getMendixObject().getValue(context, MemberNames.Minified.toString());
	}

	/**
	 * Set value of Minified
	 * @param minified
	 */
	public final void setMinified(Boolean minified)
	{
		setMinified(getContext(), minified);
	}

	/**
	 * Set value of Minified
	 * @param context
	 * @param minified
	 */
	public final void setMinified(IContext context, Boolean minified)
	{
		getMendixObject().setValue(context, MemberNames.Minified.toString(), minified);
	}

	/**
	 * @return value of Defaulttheme
	 */
	public final Boolean getDefaulttheme()
	{
		return getDefaulttheme(getContext());
	}

	/**
	 * @param context
	 * @return value of Defaulttheme
	 */
	public final Boolean getDefaulttheme(IContext context)
	{
		return (Boolean) getMendixObject().getValue(context, MemberNames.Defaulttheme.toString());
	}

	/**
	 * Set value of Defaulttheme
	 * @param defaulttheme
	 */
	public final void setDefaulttheme(Boolean defaulttheme)
	{
		setDefaulttheme(getContext(), defaulttheme);
	}

	/**
	 * Set value of Defaulttheme
	 * @param context
	 * @param defaulttheme
	 */
	public final void setDefaulttheme(IContext context, Boolean defaulttheme)
	{
		getMendixObject().setValue(context, MemberNames.Defaulttheme.toString(), defaulttheme);
	}

	/**
	 * @return value of ThemePackage_Theme
	 */
	public final bootswatch.proxies.Theme getThemePackage_Theme() throws CoreException
	{
		return getThemePackage_Theme(getContext());
	}

	/**
	 * @param context
	 * @return value of ThemePackage_Theme
	 */
	public final bootswatch.proxies.Theme getThemePackage_Theme(IContext context) throws CoreException
	{
		bootswatch.proxies.Theme result = null;
		IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.ThemePackage_Theme.toString());
		if (identifier != null)
			result = bootswatch.proxies.Theme.load(context, identifier);
		return result;
	}

	/**
	 * Set value of ThemePackage_Theme
	 * @param themepackage_theme
	 */
	public final void setThemePackage_Theme(bootswatch.proxies.Theme themepackage_theme)
	{
		setThemePackage_Theme(getContext(), themepackage_theme);
	}

	/**
	 * Set value of ThemePackage_Theme
	 * @param context
	 * @param themepackage_theme
	 */
	public final void setThemePackage_Theme(IContext context, bootswatch.proxies.Theme themepackage_theme)
	{
		if (themepackage_theme == null)
			getMendixObject().setValue(context, MemberNames.ThemePackage_Theme.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.ThemePackage_Theme.toString(), themepackage_theme.getMendixObject().getId());
	}

	@Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final bootswatch.proxies.ThemePackage that = (bootswatch.proxies.ThemePackage) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

	/**
	 * @return String name of this class
	 */
	public static String getType()
	{
		return "Bootswatch.ThemePackage";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@Override
	@Deprecated
	public String getGUID()
	{
		return "ID_" + getMendixObject().getId().toLong();
	}
}
