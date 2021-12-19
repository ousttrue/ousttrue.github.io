---
title: "UnityのSerializedObject"
date: 2016-01-27
taxonomies: {tags: ["unity"]}
---

UnityのSerializedObjectのメモ。


PropertyDrawers have two uses:
- Customize the GUI of every instance of a Serializable class.
- Customize the GUI of script members with custom PropertyAttributes.

できることは２つ。
Serializeable classのPropertyDrawerを定義する。
PropertyAttributeを定義して既存のSerializable classのPropertyDrawerを差し替える。
Not Serializableなclassに対してPropertyDrawerを定義することはできぬ(TimeSpanとかね)。
PropertyDrawerを定義してみる
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#endif

public class SampleAttribute : PropertyAttribute
{
}

#if UNITY_EDITOR
[CustomPropertyDrawer(typeof(SampleAttribute))]
public class SampleDrawer : PropertyDrawer
{
    public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
    {
        var sampleAttribute = (SampleAttribute)attribute;
        Debug.Log(property);
        EditorGUI.PropertyField(position, property, new GUIContent("Hoge"));
    }
}
#endif

public class SampleBehaviour : MonoBehaviour
{
    [Sample]
    public int Value;
}

property.Path
(x:14.00, y:154.00, width:266.00, height:16.00) path: Value

OnGUIでデバッグプリント
        Debug.LogFormat("{0} path: {1}", position, property.propertyPath);

なるほど。次のプロパティではどうか。
    [Sample]
    public List<int> ValueArray;

    [Sample]
    public List<int> ValueList;

OnGUIが呼ばれぬ。プリミティブ型以外はだめなのか？
かと思いきや中身に対して呼ばれることが分かった。
配列、Listの中身に対してPropertyDrawerが呼ばれる。
(x:14.00, y:208.00, width:258.00, height:16.00) path: ValueArray.Array.data[0]
(x:14.00, y:262.00, width:258.00, height:16.00) path: ValueList.Array.data[0]

Serializable class
public enum IngredientUnit { Spoon, Cup, Bowl, Piece }

// Custom serializable class
[Serializable]
public class Ingredient
{
    [Sample]
    public string name;

    [Sample]
    public int amount = 1;

    [Sample]
    public IngredientUnit unit;
}

    public Ingredient ingredient;

    public List<Ingredient> ingredientList;

(x:14.00, y:298.00, width:258.00, height:16.00) path: ingredient.name
(x:14.00, y:406.00, width:258.00, height:16.00) path: ingredientList.Array.data[0].name

CustomEditor
デフォルトと同じ挙動。DrawDefaultInspector()の前後にボタンを追加したりできる。
[CustomEditor(typeof(SampleBehaviour))]
public class ObjectGeneratorEditor : Editor
{
    public override void OnInspectorGUI()
    {
        DrawDefaultInspector();
    }
}

SerializedObjectのPropertyを列挙してみる
    public override void OnInspectorGUI()
    {
        serializedObject.Update();

        var it = serializedObject.GetIterator();
        bool hasNext = it.NextVisible(true);
        while(hasNext)
        {
            //Debug.Log(it.propertyPath);
            var expand = EditorGUILayout.PropertyField(it, false);
            hasNext=it.NextVisible(expand);
        }

        serializedObject.ApplyModifiedProperties();
    }


EditorGUIの関数はpositionが必要
EditorGUILayoutはposition無用。

