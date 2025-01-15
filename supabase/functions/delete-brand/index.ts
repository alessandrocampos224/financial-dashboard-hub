import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { brandId } = await req.json()
    console.log('Iniciando exclusão da marca:', brandId)

    // Primeiro verifica se a marca existe
    const { data: brand, error: fetchError } = await supabase
      .from('brands')
      .select('*')
      .eq('id', brandId)
      .single()

    if (fetchError) {
      console.error('Erro ao buscar marca:', fetchError)
      throw new Error('Marca não encontrada')
    }

    // Verifica se existem produtos usando esta marca
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id')
      .eq('brand_id', brandId)
      .is('deleted_at', null)

    if (productsError) {
      console.error('Erro ao verificar produtos:', productsError)
      throw productsError
    }

    if (products && products.length > 0) {
      throw new Error('Não é possível excluir a marca pois existem produtos vinculados a ela')
    }

    // Soft delete da marca
    const { error: deleteError } = await supabase
      .from('brands')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', brandId)

    if (deleteError) {
      console.error('Erro ao excluir marca:', deleteError)
      throw deleteError
    }

    return new Response(JSON.stringify(brand), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Erro na função:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})